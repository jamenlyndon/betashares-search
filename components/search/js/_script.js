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


	/* Make the first letter uppercase
	-------------------------------------------------- */
	function helper_ucFirst(str) {
		return str && String(str[0]).toUpperCase() + String(str).slice(1);
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
	/* Init
	-------------------------------------------------- */
	function field_init() {
		/* Attach event listeners
		------------------------- */
		// Input - blur
		dom_field_input?.addEventListener('blur', field_handleBlur);

		// Input - focus
		dom_field_input?.addEventListener('focus', field_handleFocusInputClick);

		// Input - click
		dom_field_input?.addEventListener('click', field_handleFocusInputClick);

		// Input - input
		dom_field_input?.addEventListener('input', field_handleFocusInputClick);

		// Input - key down
		dom_field_input?.addEventListener('keydown', field_handleKeyDown);

		// Search button - click
		dom_field_button?.addEventListener('click', results_show);
	}


	/* Handle focus / input / click
	-------------------------------------------------- */
	function field_handleFocusInputClick(event) {
		// Set the field's focus state
		helper_addClass('focus', dom_field);

		// Get the search text
		const searchText = dom_field_input?.value;

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
					'search_text': searchText ? searchText : '',
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
		// Remove the field's focus state
		helper_removeClass('focus', dom_field);

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
	// Create a variable to hold the empty search field suggestions
	let emptySuggestions;
	function suggestions_init() {
		/* Fetch some suggestions to display instantly (these show when the search field is empty)
		------------------------- */
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
	}


	/* Populate and show suggestions
	-------------------------------------------------- */
	function suggestions_show(data) {
		// Create a variable to hold the HTML output
		let htmlOutput = '';

		// If we have data
		if (typeof data === 'object' && typeof data.results === 'object' && data.results.length > 0) {
			// Loop through the results and create HTML to populate the suggestions
			data.results.forEach((result) => {
				if (typeof result.display_name === 'string') {
					htmlOutput += `
						<button class='suggestion'>
							<div class='icon'>search</div>
							<div class='text'>${result.display_name}</div>
						</button> <!-- .suggestion -->
					`;
				}
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

		// If we've got HTML output and we're focused in the field
		if (htmlOutput && document.activeElement.closest('.search .field')) {
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
		const suggestionText = event.target.closest('.search .suggestion')?.querySelector('.text');

		// If we found it
		if (suggestionText) {
			// Update the value of the field
			dom_field_input.value = suggestionText?.innerText;

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
			dom_field_input.value = focusedSuggestionText?.innerText;

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
			dom_field_input.value = focusedSuggestionText?.innerText;

			// Stop the arrow key event from changing the cursor position
			event.preventDefault();
			event.stopPropagation();
		}
	}



	/* Filters
	---------------------------------------------------------------------------------------------------- */
	/* Init
	-------------------------------------------------- */
	function filters_init() {
		/* Attach event listeners
		------------------------- */
		// Filter results button - click
		dom_filters_button?.addEventListener('click', filters_button_handleClick);

		// Close button - click
		dom_filters_closeButton?.addEventListener('click', filters_closeButton_handleClick);

		// Clear filters button - click
		dom_filters_clearFiltersButton?.addEventListener('click', filters_clearFiltersButton_handleClick);

		// No results message - clear filters - click
		dom_results_noResults_clearFilters?.addEventListener('click', filters_clearFiltersButton_handleClick);

		// All fields - on change
		const fields = dom_filters_form.querySelectorAll('input, select');
		fields.forEach((field) => {
			field.addEventListener('input', () => {
				// Delay by one animation frame - this allows the auto formatting setup below to complete first
				window.requestAnimationFrame(() => {
					// Update the active filters count
					filters_button_updateActiveFiltersCount();

					// Reload the results (keep filters)
					results_show(true);
				});
			});
		});


		/* Setup auto formatting for min field values
		------------------------- */
		// Get all fields with a "data-min" attribute
		const minFields = dom_filters_form.querySelectorAll('input[data-min]');

		// For each field
		minFields.forEach((field) => {
			// On input
			field.addEventListener('input', (event) => {
				// Target the field element
				const fieldElement = event.target;

				// Get the field value (as a number)
				const fieldValue = parseFloat(fieldElement.value);

				// Get the min attribute (as a number)
				const minAttr = parseFloat(fieldElement.getAttribute('data-min'));

				// If the value is less than the min attribute
				if (fieldValue < minAttr) {
					// Set the field value to be the min attribute
					fieldElement.value = minAttr;
				}
			});
		});


		/* Setup auto formatting for max field values
		------------------------- */
		// Get all fields with a "data-max" attribute
		const maxFields = dom_filters_form.querySelectorAll('input[data-max]');

		// For each field
		maxFields.forEach((field) => {
			// On input
			field.addEventListener('input', (event) => {
				// Target the field element
				const fieldElement = event.target;

				// Get the field value (as a number)
				const fieldValue = parseFloat(fieldElement.value);

				// Get the max attribute (as a number)
				const maxAttr = parseFloat(fieldElement.getAttribute('data-max'));

				// If the value is greater than the max attribute
				if (fieldValue > maxAttr) {
					// Set the field value to be the max attribute
					fieldElement.value = maxAttr;
				}
			});
		});
	}


	/* Update the active filters count (this is the text in brackets that appears next to the "filter results" button)
	-------------------------------------------------- */
	function filters_button_updateActiveFiltersCount() {
		// Set a variable to count the active filters
		let activeFilters = 0;

		// Target the active filters element
		const activeFiltersElement = dom_filters_button?.querySelector('.activeFilters');

		// Sanity check - make sure we found the active filters element
		if (!activeFiltersElement) {
			return;
		}

		// Target all filter fields
		const filterFields = dom_filters_form.querySelectorAll('input, select');

		// For each filter field
		filterFields.forEach((field) => {
			// If there's a value set
			if (field.value !== '') {
				// Increment the active filters count
				activeFilters++;
			}
		});

		// If we have active filters
		if (activeFilters > 0) {
			// Add the text to the active filters element
			activeFiltersElement.innerHTML = ' (' + activeFilters + ')';

			// Show the no results message - clear filters element
			helper_removeClass('hidden', dom_results_noResults_clearFilters);
		}
		// Otherwise, we do not have active filters
		else {
			// Remove the text from the active filters element
			activeFiltersElement.innerHTML = '';

			// Hide the no results message - clear filters element
			helper_addClass('hidden', dom_results_noResults_clearFilters);
		}
	}


	/* Filter results button - handle click
	-------------------------------------------------- */
	function filters_button_handleClick(event) {
		// Show / hide the filters popup
		dom_filters_popup?.classList.toggle('hidden');
	}


	/* Close button - handle click
	-------------------------------------------------- */
	function filters_closeButton_handleClick(event) {
		// Hide the filters popup
		helper_addClass('hidden', dom_filters_popup);
	}


	/* Clear filters - handle click
	-------------------------------------------------- */
	function filters_clearFiltersButton_handleClick(event) {
		// Reset the filters form
		dom_filters_form.reset();

		// Hide the filters popup
		helper_addClass('hidden', dom_filters_popup);

		// Update the active filters count
		filters_button_updateActiveFiltersCount();

		// Reload the results (keep filters)
		results_show(true);
	}



	/* Results
	---------------------------------------------------------------------------------------------------- */
	/* Populate search results
	-------------------------------------------------- */
	function results_populate() {
		// Get the search text
		const searchText = dom_field_input?.value;

		// Get the filters
		const fundSize_min = dom_filters_form?.querySelector('input[name="fundSize_min"]').value;
		const fundSize_max = dom_filters_form?.querySelector('input[name="fundSize_max"]').value;

		const managementFee_min = dom_filters_form?.querySelector('input[name="managementFee_min"]').value;
		const managementFee_max = dom_filters_form?.querySelector('input[name="managementFee_max"]').value;

		const oneYearReturn_min = dom_filters_form?.querySelector('input[name="oneYearReturn_min"]').value;
		const oneYearReturn_max = dom_filters_form?.querySelector('input[name="oneYearReturn_max"]').value;

		const fiveYearReturn_min = dom_filters_form?.querySelector('input[name="fiveYearReturn_min"]').value;
		const fiveYearReturn_max = dom_filters_form?.querySelector('input[name="fiveYearReturn_max"]').value;

		const fundCategory = dom_filters_form?.querySelector('select[name="fundCategory"]').value;
		const investmentSuitability = dom_filters_form?.querySelector('input[name="investmentSuitability"]').value;
		const managementApproach = dom_filters_form?.querySelector('input[name="managementApproach"]').value;
		const dividendFrequency = dom_filters_form?.querySelector('select[name="dividendFrequency"]').value;

		// Build the query params
		const params = {
			'search_text': searchText ? searchText : '',
			'fund_size': {
				'min': fundSize_min ? fundSize_min : null,
				'max': fundSize_max ? fundSize_max : null
			},
			'management_fee': {
				'min': managementFee_min ? managementFee_min : null,
				'max': managementFee_max ? managementFee_max : null
			},
			'one_year_return': {
				'min': oneYearReturn_min ? oneYearReturn_min : null,
				'max': oneYearReturn_max ? oneYearReturn_max : null
			},
			'five_year_return': {
				'min': fiveYearReturn_min ? fiveYearReturn_min : null,
				'max': fiveYearReturn_max ? fiveYearReturn_max : null
			},
			'categories': fundCategory ? [fundCategory] : [],
			'investment_suitability': investmentSuitability ? [investmentSuitability] : [],
			'management_approach': managementApproach ? [managementApproach] : [],
			'dividend_frequency': dividendFrequency ? [dividendFrequency] : []
		};

		// Query the search API
		api_query(
			params,
			(data) => {
				// If we got no data back
				if (typeof data !== 'object' || typeof data.results !== 'object' || data.results.length === 0) {
					// Hide results loading, table, pagination
					helper_addClass('hidden', dom_results_loading);
					helper_addClass('hidden', dom_results_table);
					helper_addClass('hidden', dom_results_pagination);

					// Show the no results message
					helper_removeClass('hidden', dom_results_noResults);
				}

				// Otherwise, we got data back
				else {
					// Create a variable to hold the HTML output
					let htmlOutput = '';

					// For each result
					data.results.forEach((result) => {
						// Format the data
						const data_code = result.symbol ? result.symbol.toUpperCase() : '-';
						const data_fundName = result.display_name ? helper_ucFirst(result.display_name) : '-';
						let data_type = result.kind ? helper_ucFirst(result.kind) : '-';
						if (data_type === 'Etf') {
							data_type = 'ETF';
						}
						const data_fundSize = result.fund_size ? parseInt(result.fund_size) : '-';
						const data_oneYearReturn = result.one_year_return ? (parseFloat(result.one_year_return).toFixed(2) + '%') : '-';
						const data_fiveYearReturn = result.five_year_return ? (parseFloat(result.five_year_return).toFixed(2) + '%') : '-';
						const data_managementCost = result.management_fee ? (parseFloat(result.management_fee).toFixed(2) + '%') : '-';
						const data_description = result.flagship_description_short ? ("<div class='description'>" + helper_ucFirst(result.flagship_description_short) + "</div>") : '';
						const data_categories = result.categories.length ? result.categories.join(', ') : '-';
						const data_investmentSuitability = result.investment_suitability ? helper_ucFirst(result.investment_suitability) : '-';
						const data_managementApproach = result.management_approach ? helper_ucFirst(result.management_approach) : '-';
						const data_dividendFrequency = result.dividend_frequency ? helper_ucFirst(result.dividend_frequency) : '-';

						// Create HTML to populate the results table
						htmlOutput += `
							<tr class='result'>
								<td>
									<button class='expandCollapseButton'>
										<div class='icon'>keyboard_arrow_down</div>
									</button> <!-- .expandCollapseButton -->
								</td>
								<td>
									<div class='fundCode'>
										<div class='text'>${data_code}</div>
									</div> <!-- .fundCode -->
								</td>
								<td>
									<div class='text fundName'>${data_fundName}</div>
								</td>
								<td class='hide_l'>
									<div class='text'>${data_type}</div>
								</td>
								<td class='hide_l'>
									<div class='text'>${data_fundSize}</div>
								</td>
								<td class='hide_s'>
									<div class='text'>${data_oneYearReturn}</div>
								</td>
								<td class='hide_s'>
									<div class='text'>${data_fiveYearReturn}</div>
								</td>
								<td class='hide_s'>
									<div class='text'>${data_managementCost}</div>
								</td>
							</tr>

							<tr class='expandCollapseContent hidden'>
								<td colspan='8'>
									${data_description}

									<div class='infoContainer'>
										<div class='info hidden show_l'>
											<div class='title'>Type</div>
											<div class='text'>${data_type}</div>
										</div> <!-- .info -->

										<div class='info hidden show_l'>
											<div class='title'>Fund size</div>
											<div class='text'>${data_fundSize}</div>
										</div> <!-- .info -->

										<div class='info hidden show_s'>
											<div class='title'>1 year return</div>
											<div class='text'>${data_oneYearReturn}</div>
										</div> <!-- .info -->

										<div class='info hidden show_s'>
											<div class='title'>5 year return</div>
											<div class='text'>${data_fiveYearReturn}</div>
										</div> <!-- .info -->

										<div class='info hidden show_s'>
											<div class='title'>Cost p/a</div>
											<div class='text'>${data_managementCost}</div>
										</div> <!-- .info -->

										<div class='info'>
											<div class='title'>Categories</div>
											<div class='text'>${data_categories}</div>
										</div> <!-- .info -->

										<div class='info'>
											<div class='title'>Investment suitability</div>
											<div class='text'>${data_investmentSuitability}</div>
										</div> <!-- .info -->

										<div class='info'>
											<div class='title'>Management approach</div>
											<div class='text'>${data_managementApproach}</div>
										</div> <!-- .info -->

										<div class='info'>
											<div class='title'>Dividend frequency</div>
											<div class='text'>${data_dividendFrequency}</div>
										</div> <!-- .info -->
									</div> <!-- .infoContainer -->
								</td>
							</tr> <!-- .expandCollapseContent -->
						`;
					});

					// Target the results table body
					const resultsTableBody = dom_results_table?.querySelector('tbody');

					// Make sure we found the table body
					if (resultsTableBody) {
						// Populate the results table body
						resultsTableBody.innerHTML = htmlOutput;
					}

					// Hide results loading, no results message
					helper_addClass('hidden', dom_results_loading);
					helper_addClass('hidden', dom_results_noResults);

					// Show the results table, pagination
					helper_removeClass('hidden', dom_results_table);
					helper_removeClass('hidden', dom_results_pagination);


					// Attach event listeners to the results
					const results = dom_results_table?.querySelectorAll('.result');
					results.forEach((result) => {
						// Click
						result.addEventListener('click', results_handleClick);
					});
				}
			}
		);
	}


	/* Show search results
	-------------------------------------------------- */
	function results_show(keepFilters = false) {
		// Hide the suggestions
		suggestions_hide();

		// Blur the field
		dom_field_input?.blur();

		// Get the search text
		const searchText = dom_field_input?.value;

		// If the search text is empty
		if (!searchText) {
			// Hide the results
			results_hide();
			return;
		}

		// Show the filter button
		helper_removeClass('hidden', dom_filters_button);

		// If we're not keeping the filters
		if (!keepFilters) {
			// Reset the filters form
			dom_filters_form.reset();

			// Update the active filters count
			filters_button_updateActiveFiltersCount();

			// Hide the filters popup
			helper_addClass('hidden', dom_filters_popup);
		}

		// Hide results table, pagination, no results message
		helper_addClass('hidden', dom_results_table);
		helper_addClass('hidden', dom_results_pagination);
		helper_addClass('hidden', dom_results_noResults);

		// Show results loading, container
		helper_removeClass('hidden', dom_results_loading);
		helper_removeClass('hidden', dom_results);

		// Populate the results
		results_populate();
	}


	/* Hide search results
	-------------------------------------------------- */
	function results_hide() {
		// Abort any currently running queries
		api_abort();

		// Hide the results
		helper_addClass('hidden', dom_results);

		// Hide the filter button
		helper_addClass('hidden', dom_filters_button);

		// Hide the filters form
		helper_addClass('hidden', dom_filters_popup);
	}


	/* Handle click
	-------------------------------------------------- */
	function results_handleClick(event) {
		// Target the result container
		const result = event.target.closest('.result');

		// If we found the result container
		if (result) {
			// If the result is collapsed
			if (!result.classList.contains('expanded')) {
				// Collapse any other already expanded results
				helper_removeClass('expanded', dom_results_table.querySelector('.result.expanded'));

				// Expand this result
				result.classList.add('expanded');
			}
			// Otherwise the result is expanded
			else {
				// Collapse this result
				result.classList.remove('expanded');
			}


			// Target the "expand / collapse content" (this is the next element in the DOM)
			const expandCollapseContent = result.nextElementSibling;

			// If we found the "expand / collapse content"
			if (expandCollapseContent) {
				// If the "expand / collapse content" is hidden
				if (expandCollapseContent.classList.contains('hidden')) {
					// Hide any other already visible "expand / collapse content"
					dom_results_table.querySelector('.expandCollapseContent:not(.hidden)')?.classList.add('hidden');

					// Show this "expand / collapse content"
					expandCollapseContent.classList.remove('hidden');
				}
				// Otherwise the "expand / collapse content" is visible
				else {
					// Hide this "expand / collapse content"
					expandCollapseContent.classList.add('hidden');
				}
			}
		}
	}



	/* Setup
	---------------------------------------------------------------------------------------------------- */
	/* Target DOM elements
	-------------------------------------------------- */
	/* Component
	------------------------- */
	const dom_search = document.querySelector('.search');


	/* Field
	------------------------- */
	// Search field container
	const dom_field = dom_search?.querySelector('.field .searchField');

	// Input
	const dom_field_input = dom_field?.querySelector('input');

	// Search button
	const dom_field_button = dom_field?.querySelector('.searchButton');


	/* Suggestions
	------------------------- */
	// Suggestions container
	const dom_suggestions = dom_search?.querySelector('.suggestions');


	/* Filters
	------------------------- */
	// Filter results button
	const dom_filters_button = dom_search?.querySelector('.filterButton');

	// Popup container
	const dom_filters_popup = dom_search?.querySelector('.filters');

	// Close button
	const dom_filters_closeButton = dom_filters_popup?.querySelector('.closeButton');

	// Form
	const dom_filters_form = dom_filters_popup?.querySelector('form');

	// Clear filters button
	const dom_filters_clearFiltersButton = dom_filters_popup?.querySelector('.clearFiltersButton');


	/* Results
	------------------------- */
	// Results container
	const dom_results = dom_search?.querySelector('.results');

	// Table
	const dom_results_table = dom_results?.querySelector('.resultsTable');

	// Loading
	const dom_results_loading = dom_results?.querySelector('.skeletonLoading');

	// Pagination
	const dom_results_pagination = dom_results?.querySelector('.pagination');

	// No results message
	const dom_results_noResults = dom_results?.querySelector('.noResults');
	const dom_results_noResults_clearFilters = dom_results_noResults?.querySelector('.clearFilters');


	/* Call init functions
	-------------------------------------------------- */
	// Field
	field_init();

	// Suggestions
	suggestions_init();

	// Filters
	filters_init();
})();
