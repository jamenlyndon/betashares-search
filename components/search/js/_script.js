(function () {
	/* Helper functions
	---------------------------------------------------------------------------------------------------- */
	/* Add a class
	-------------------------------------------------- */
	function helper_addClass(className, element) {
		if (!element?.classList.contains(className)) {
			element?.classList.add(className);
		}
	}


	/* Remove a class
	-------------------------------------------------- */
	function helper_removeClass(className, element) {
		if (element?.classList.contains(className)) {
			element?.classList.remove(className);
		}
	}



	/* Search API
	---------------------------------------------------------------------------------------------------- */
	/* Setup shared search variables
	-------------------------------------------------- */
	// Create a variable for the abort controller
	let api_abortController;

	// Create a variable for debouncing
	let api_debounce;


	/* Abort the current API query
	-------------------------------------------------- */
	function api_abort() {
		// Clear the debounce timer
		clearTimeout(api_debounce);

		// Abort any currently running queries
		if (api_abortController) {
			api_abortController.abort('aborted');
		}

		// Create a new abort controller (it's consumed once you abort)
		api_abortController = new AbortController();
	}


	/* Query the API
	-------------------------------------------------- */
	function api_query(params, callback) {
		// Sanity check - make sure we have an object for the params
		if (typeof params !== 'object') {
			return;
		}

		// Abort any currently running queries
		api_abort();

		// Call the API (debounced by 250ms)
		api_debounce = setTimeout(() => {
			// Call the search API
			fetch('https://search.betashares.services/search', {
				signal: api_abortController.signal,
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params)
			})
				// Convert the response to JSON
				.then(response => {
					return response.json();
				})
				// Success
				.then(data => {
					// Call the callback function
					if (typeof callback === 'function') {
						callback(data);
					}

					// If the search string was empty, repopulate the "emptySuggestions"
					// This helps to resolve an edge case where the user starts to search before we've preloaded empty results - which aborts the preloading query!
					if (typeof params.search_text !== 'undefined' && params.search_text === '') {
						emptySuggestions = data;
					}
				})
				// Error
				.catch((error) => {
					// If we didn't abort manually
					if (error !== 'aborted') {
						// Show a console error
						console.log('Error querying the search API', error);
					}
				});
		}, 250);
	}



	/* Field
	---------------------------------------------------------------------------------------------------- */
	/* Handle focus / input / click
	-------------------------------------------------- */
	function field_handleFocusInputClick(event) {
		// Get the search text
		let searchText = dom_field?.value;

		// Ensure the search text is a string
		if (!searchText) {
			searchText = '';
		}

		// If there's no search text and we have empty suggestions preloaded
		if (searchText === '' && emptySuggestions) {
			// Abort any currently running queries
			api_abort();

			// Show the empty suggestions
			suggestions_show(emptySuggestions);
		}
		// Otherwise, there is search text or we have not got empty suggestions preloaded
		else {
			// Query the search API (limit to 8 results)
			api_query(
				{
					'search_text': searchText,
					'size': 8
				},
				(data) => {
					// Show the returned suggestions
					suggestions_show(data);
				}
			);
		}
	}


	/* Handle key down
	-------------------------------------------------- */
	function field_handleKeyDown(event) {
		// If they pressed "Escape"
		if (event.key === 'Escape') {
			// Hide the suggestions
			suggestions_hide();
		}

		// If they pressed "Enter"
		if (event.key === 'Enter') {
			// Show the results
			results_show();
		}

		// If they pressed "Arrow down"
		else if (event.key === 'ArrowDown') {
			// Focus next suggestion
			suggestion_focusNext();
		}

		// If they pressed "Arrow up"
		else if (event.key === 'ArrowUp') {
			// Focus previous suggestion
			suggestion_focusPrev();
		}
	}


	/* Handle blur
	-------------------------------------------------- */
	function field_handleBlur(event) {
		window.requestAnimationFrame(() => {
			// If we're not focused within the suggestions
			if (!document.activeElement.closest('.search .suggestions')) {
				// Hide the suggestions
				suggestions_hide();
			}
		});
	}



	/* Suggestions
	---------------------------------------------------------------------------------------------------- */
	/* Populate and show suggestions
	-------------------------------------------------- */
	function suggestions_show(data) {
		// Create a variable to hold the HTML output
		let htmlOutput = '';

		// If we have data
		if (typeof data !== 'undefined') {
			// Loop through the results and create HTML to populate the suggestions
			data?.results?.forEach((result) => {
				htmlOutput += `
					<button class='suggestion'>
						<div class='icon'>search</div>
						<div class='text'>${result.display_name}</div>
					</button> <!-- .suggestion -->
				`;
			});

			// Populate the suggestions
			dom_suggestions.innerHTML = htmlOutput;

			// Attach event listeners to the suggestions
			const suggestions = dom_suggestions?.querySelectorAll('.suggestion');
			suggestions.forEach((suggestion) => {
				// Blur
				suggestion.addEventListener('blur', suggestion_handleBlur);

				// Click
				suggestion.addEventListener('click', suggestion_handleClick);

				// Key down
				suggestion.addEventListener('keydown', suggestion_handleKeyDown);
			});
		}

		// If we've got HTML output
		if (htmlOutput) {
			// Show the suggestions
			helper_removeClass('hidden', dom_suggestions);
		}
		// Otherwise, we don't have HTML output
		else {
			// Hide the suggestions
			helper_addClass('hidden', dom_suggestions);
		}
	}


	/* Hide the suggestions
	-------------------------------------------------- */
	function suggestions_hide() {
		// Hide the suggestions DOM element
		helper_addClass('hidden', dom_suggestions);
	}


	/* Handle blur
	-------------------------------------------------- */
	function suggestion_handleBlur(event) {
		// Wait one animation frame for the focus to update in the browser
		window.requestAnimationFrame(() => {
			// If we're not focused within the suggestions or the input element
			if (!document.activeElement.closest('.search .suggestions') && !document.activeElement.closest('.search .field')) {
				// Hide the suggestions
				suggestions_hide();
			}
		});
	}


	/* Handle click
	-------------------------------------------------- */
	function suggestion_handleClick(event) {
		// Get the text of the clicked suggestion
		const suggestionText = event.target.closest('.suggestion')?.querySelector('.text');

		// If we found it
		if (suggestionText) {
			// Update the value of the field
			dom_field.value = suggestionText?.innerText;

			// Show the search results
			results_show();
		}
	}


	/* Handle key down
	-------------------------------------------------- */
	function suggestion_handleKeyDown(event) {
		// If they pressed "Escape"
		if (event.key === 'Escape') {
			// Hide the suggestions
			suggestions_hide();
		}
	}


	/* Focus next suggestion
	-------------------------------------------------- */
	function suggestion_focusNext() {
		// If suggestions exist
		if (dom_suggestions?.querySelectorAll('.suggestion').length) {
			// Show the suggetions (but don't repopulate them)
			helper_removeClass('hidden', dom_suggestions);
		}

		// Target the currently focused suggestion
		const focusedSuggestion = dom_suggestions?.querySelector('.suggestion.focused');

		// If there is NOT a focused suggestion
		if (!focusedSuggestion) {
			// Target the suggestions
			const suggestions = dom_suggestions?.querySelectorAll('.suggestion');

			// If we found the suggestions
			if (suggestions.length) {
				// Focus the first suggestion
				helper_addClass('focused', suggestions[0]);
			}
		}

		// Otherwise, there IS a focused suggestion
		else {
			// Target the next suggestion
			const nextSuggestion = focusedSuggestion.nextElementSibling;

			// Defocus the currently focused suggestion
			helper_removeClass('focused', focusedSuggestion);

			// If we found it
			if (nextSuggestion) {
				// Focus the next suggestion
				helper_addClass('focused', nextSuggestion);
			}
			// Otherwise, we didn't find it
			else {
				// Target the suggestions
				const suggestions = dom_suggestions?.querySelectorAll('.suggestion');

				// If we found the suggestions
				if (suggestions.length) {
					// Focus the first suggestion
					helper_addClass('focused', suggestions[0]);
				}
			}
		}

		// Update the field text with the selected suggestion

		// Target the text of the currently focused suggestion
		const focusedSuggestionText = dom_suggestions?.querySelector('.suggestion.focused .text');

		// If we found it
		if (focusedSuggestionText) {
			// Update the value of the field
			dom_field.value = focusedSuggestionText?.innerText;

			// Stop the arrow key event from changing the cursor position
			event.preventDefault();
			event.stopPropagation();
		}
	}


	/* Focus previous suggestion
	-------------------------------------------------- */
	function suggestion_focusPrev() {
		// If suggestions exist
		if (dom_suggestions?.querySelectorAll('.suggestion').length) {
			// Show the suggetions (but don't repopulate them)
			helper_removeClass('hidden', dom_suggestions);
		}

		// Target the currently focused suggestion
		const focusedSuggestion = dom_suggestions?.querySelector('.suggestion.focused');

		// If there is NOT a focused suggestion
		if (!focusedSuggestion) {
			// Target the suggestions
			const suggestions = dom_suggestions?.querySelectorAll('.suggestion');

			// If we found the suggestions
			if (suggestions.length) {
				// Focus the last suggestion
				helper_addClass('focused', suggestions[suggestions.length - 1]);
			}
		}

		// Otherwise, there IS a focused suggestion
		else {
			// Target the previous suggestion
			const prevSuggestion = focusedSuggestion.previousElementSibling;

			// Defocus the currently focused suggestion
			helper_removeClass('focused', focusedSuggestion);

			// If we found it
			if (prevSuggestion) {
				// Focus the previous suggestion
				helper_addClass('focused', prevSuggestion);
			}
			// Otherwise, we didn't find it
			else {
				// Target the suggestions
				const suggestions = dom_suggestions?.querySelectorAll('.suggestion');

				// If we found the suggestions
				if (suggestions.length) {
					// Focus the last suggestion
					helper_addClass('focused', suggestions[suggestions.length - 1]);
				}
			}
		}

		// Update the field text with the selected suggestion

		// Target the text of the currently focused suggestion
		const focusedSuggestionText = dom_suggestions?.querySelector('.suggestion.focused .text');

		// If we found it
		if (focusedSuggestionText) {
			// Update the value of the field
			dom_field.value = focusedSuggestionText?.innerText;

			// Stop the arrow key event from changing the cursor position
			event.preventDefault();
			event.stopPropagation();
		}
	}



	/* Results
	---------------------------------------------------------------------------------------------------- */
	/* Populate and show search results
	-------------------------------------------------- */
	function results_show() {
		// Hide the suggestions
		suggestions_hide();

		// Blur the field
		dom_field?.blur();

		// Show the results
		console.log('todo: show the results');
	}



	/* Init
	---------------------------------------------------------------------------------------------------- */
	/* Target DOM elements
	-------------------------------------------------- */
	// Component
	const dom_search = document.querySelector('.search');

	// Field
	const dom_field = dom_search?.querySelector('.field input');

	// Suggestions
	const dom_suggestions = dom_search?.querySelector('.suggestions');

	// Filters
	const dom_filters_button = dom_search?.querySelector('.filterButton');
	const dom_filters_form = dom_search?.querySelector('.filters');

	// Results
	const dom_results = dom_search?.querySelector('.results');
	const dom_results_table = dom_results?.querySelector('.resultsTable');
	const dom_results_loading = dom_results?.querySelector('.skeletonLoading');
	const dom_results_pagination = dom_results?.querySelector('.pagination');
	const dom_results_empty = dom_results?.querySelector('.noResults');


	/* Attach event listeners
	-------------------------------------------------- */
	// Field - blur
	dom_field?.addEventListener('blur', field_handleBlur);

	// Field - focus
	dom_field?.addEventListener('focus', field_handleFocusInputClick);

	// Field - click
	dom_field?.addEventListener('click', field_handleFocusInputClick);

	// Field - input
	dom_field?.addEventListener('input', field_handleFocusInputClick);

	// Field - key down
	dom_field?.addEventListener('keydown', field_handleKeyDown);


	/* Gets some suggestions to display instantly (these show when the search field is empty)
	-------------------------------------------------- */
	// Create a variable to hold the empty search field suggestions
	let emptySuggestions;

	// Query the API with an empty string (limit to 8 results)
	api_query(
		{
			'search_text': '',
			'size': 8
		},
		(data) => {
			// Populate the empty suggestions with the returned data
			emptySuggestions = data;
		}
	);



})();
