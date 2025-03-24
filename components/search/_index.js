/* Imports
---------------------------------------------------------------------------------------------------- */
// Helper functions
import {
	helper_addClass,
	helper_removeClass,
	helper_ucFirst
} from '../../js/partials/_helpers.js';



/* HTML
---------------------------------------------------------------------------------------------------- */
function component_search_html() {
	return (`
		<div class='component_search'>


			<!-- Field
			================================================== -->
			<div class='field'>
				<!-- Search field
				================================================== -->
				<div class='searchField'>
					<div class='icon'>search</div>
					<input type='text' placeholder='Search our funds'>
					<button class='searchButton'>
						<div class='icon'>search</div>
					</button> <!-- .searchButton -->
				</div> <!-- .searchField -->

				<!-- Suggestions
				================================================== -->
				<div class='suggestions hidden'>
					<!-- This is populated dynamically with JS -->
				</div> <!-- .suggestions -->
			</div> <!-- .field -->


			<!-- Filters
			================================================== -->
			<button class='filtersButton hidden'>
				<div class='icon'>tune</div>
				<div class='text'>Filter results<span class='activeFilters'></span></div>
			</button> <!-- .filtersButton -->

			<div class='filtersPopup hidden'>
				<div class='top'>
					<div class='title'>Filter results</div>
					<button class='closeButton'>
						<div class='icon'>close</div>
					</button> <!-- .closeButton -->
				</div> <!-- .top -->

				<form>
					<div class='filter'>
						<div class='label'>Fund size</div>
						<div class='fields'>
							<input type='number' placeholder='Min' name='fundSize_min' data-min='0'>
							<input type='number' placeholder='Max' name='fundSize_max' data-min='0'>
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>Management fee (%)</div>
						<div class='fields'>
							<input type='number' placeholder='Min' step='0.01' name='managementFee_min' data-min='0' data-max='100'>
							<input type='number' placeholder='Max' step='0.01' name='managementFee_max' data-min='0' data-max='100'>
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>1 year return (%)</div>
						<div class='fields'>
							<input type='number' placeholder='Min' name='oneYearReturn_min'>
							<input type='number' placeholder='Max' name='oneYearReturn_max'>
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>Five year return (%)</div>
						<div class='fields'>
							<input type='number' placeholder='Min' name='fiveYearReturn_min'>
							<input type='number' placeholder='Max' name='fiveYearReturn_max'>
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>Fund category</div>
						<div class='fields'>
							<div class='selectContainer'>
								<select name='fundCategory'>
									<option value='' selected>Any</option>
									<option>Australian Equities</option>
									<option>Cash</option>
									<option>Australian Bonds</option>
									<option>Technology</option>
									<option>Thematic</option>
									<option>Shorts Funds & Geared Funds</option>
									<option>International Bonds</option>
									<option>International Equities</option>
									<option>Diversified</option>
									<option>International Equities - Emerging Markets</option>
									<option>International - Countries & Regions</option>
									<option>International Equities - Asia</option>
									<option>Gold & Commodities</option>
									<option>International Equities - US</option>
									<option>Currency</option>
									<option>Property & Infrastructure</option>
								</select>
								<div class='icon'>keyboard_arrow_down</div>
							</div> <!-- .selectContainer -->
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>Investment suitability</div>
						<div class='fields'>
							<div class='selectContainer'>
								<select name='investmentSuitability'>
									<option value='' selected>Any</option>
									<option>Capital growth and regular income</option>
									<option>Regular income</option>
									<option>Capital growth</option>
									<option>Income distribution</option>
								</select>
								<div class='icon'>keyboard_arrow_down</div>
							</div> <!-- .selectContainer -->
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>Management approach</div>
						<div class='fields'>
							<div class='selectContainer'>
								<select name='managementApproach'>
									<option value='' selected>Any</option>
									<option>Passive</option>
									<option>Active</option>
								</select>
								<div class='icon'>keyboard_arrow_down</div>
							</div> <!-- .selectContainer -->
						</div> <!-- .fields -->
					</div> <!-- .filter -->

					<div class='filter'>
						<div class='label'>Dividend frequency</div>
						<div class='fields'>
							<div class='selectContainer'>
								<select name='dividendFrequency'>
									<option value='' selected>Any</option>
									<option>Annually</option>
									<option>Semiannually</option>
									<option>Quarterly</option>
									<option>Monthly</option>
								</select>

								<div class='icon'>keyboard_arrow_down</div>
							</div> <!-- .selectContainer -->
						</div> <!-- .fields -->
					</div> <!-- .filter -->
				</form>

				<button class='clearFiltersButton'>
					<div class='text'>Clear all filters</div>
				</button>
			</div> <!-- .filters -->


			<!-- Results
			================================================== -->
			<div class='results hidden'>
				<!-- Results table
				========================= -->
				<table class='resultsTable hidden'>
					<thead>
						<tr>
							<th></th>
							<th data-sort='symbol'>
								<div class='headerContainer'>
									<div class='text'>Code</div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
							<th data-sort='display_name'>
								<div class='headerContainer'>
									<div class='text'>Fund name</div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
							<th class='hide_l' data-sort='kind'>
								<div class='headerContainer'>
									<div class='text'>Type</div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
							<th class='hide_l' data-sort='fund_size'>
								<div class='headerContainer'>
									<div class='text'>Fund size</div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
							<th class='hide_s' data-sort='one_year_return'>
								<div class='headerContainer'>
									<div class='text'>1 year<span class='hide_m'> return</span></div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
							<th class='hide_s' data-sort='five_year_return'>
								<div class='headerContainer'>
									<div class='text'>5 year<span class='hide_m'> return</span></div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
							<th class='hide_s' data-sort='management_fee'>
								<div class='headerContainer'>
									<div class='text'>Cost p/a</div>
									<div class='icon'>keyboard_arrow_down</div>
								</div> <!-- .headerContainer -->
							</th>
						</tr>
					</thead>
					<tbody>
						<!-- This is populated dynamically with JS -->
					</tbody>
				</table> <!-- .resultsTable -->


				<!-- Skeleton loading
				========================= -->
				<table class='skeletonLoading hidden'>
					<thead>
						<tr>
							<th><div class='box'></div></th>
							<th><div class='box'></div></th>
							<th colspan='6'><div class='box'></div></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><div class='box'></div></td>
							<td><div class='box'></div></td>
							<td colspan='6'><div class='box'></div></td>
						</tr>
						<tr>
							<td><div class='box'></div></td>
							<td><div class='box'></div></td>
							<td colspan='6'><div class='box'></div></td>
						</tr>
						<tr>
							<td><div class='box'></div></td>
							<td><div class='box'></div></td>
							<td colspan='6'><div class='box'></div></td>
						</tr>
					</tbody>
				</table> <!-- .skeletonLoading -->


				<!-- Pagination
				========================= -->
				<div class='pagination hidden'>
					<!-- This is populated dynamically with JS -->
				</div> <!-- .pagination -->


				<!-- No results
				========================= -->
				<div class='noResults hidden'>
					<div class='title'>Sorry, we could not find any results.</div>
					<div class='text'>Try searching for something else<span class='clearFilters hidden'>, <a href='javascript:;'>clear all filters</a></span> or <a href='https://www.betashares.com.au/fund/'>view all funds</a>.</div>
				</div> <!-- .noResults -->
			</div> <!-- .results -->


		</div> <!-- .component_search -->
	`);
}



/* Init / JS
---------------------------------------------------------------------------------------------------- */
function component_search_init() {
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
		dom_field_input?.addEventListener('focus', field_handleFocusInput);

		// Input - input
		dom_field_input?.addEventListener('input', field_handleFocusInput);

		// Input - key down
		dom_field_input?.addEventListener('keydown', field_handleKeyDown);

		// Search button - click
		dom_field_button?.addEventListener('click', (event) => {
			results_show();
		});
	}


	/* Handle focus / input
	-------------------------------------------------- */
	function field_handleFocusInput(event) {
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
			suggestions_focusNext();
		}

		// If they pressed "Arrow up"
		else if (event.key === 'ArrowUp') {
			// Focus previous suggestion
			suggestions_focusPrev();
		}
	}


	/* Handle blur
	-------------------------------------------------- */
	function field_handleBlur(event) {
		// Remove the field's focus state
		helper_removeClass('focus', dom_field);

		window.requestAnimationFrame(() => {
			// If we're not focused within the suggestions
			if (!document.activeElement.closest('.component_search .suggestions')) {
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
				suggestion.addEventListener('blur', suggestions_handleBlur);

				// Click
				// This is a very strange fix, for some reason we need to use these events instead of "click" to make Safari work?
				suggestion.addEventListener('touchend', suggestions_handleClick);
				suggestion.addEventListener('mouseup', suggestions_handleClick);

				// Key down
				suggestion.addEventListener('keydown', suggestions_handleKeyDown);
			});
		}

		// If we've got HTML output and we're focused in the field
		if (htmlOutput && document.activeElement.closest('.component_search .field')) {
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
	function suggestions_handleBlur(event) {
		// Wait one animation frame for the focus to update in the browser
		window.requestAnimationFrame(() => {
			// If we're not focused within the suggestions or the input element
			if (!document.activeElement.closest('.component_search .suggestions') && !document.activeElement.closest('.component_search .field')) {
				// Hide the suggestions
				suggestions_hide();
			}
		});
	}


	/* Handle click
	-------------------------------------------------- */
	function suggestions_handleClick(event) {
		// Get the text of the clicked suggestion
		const suggestionText = event.currentTarget?.querySelector('.text');

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
	function suggestions_handleKeyDown(event) {
		// If they pressed "Escape"
		if (event.key === 'Escape') {
			// Hide the suggestions
			suggestions_hide();
		}
	}


	/* Focus next suggestion
	-------------------------------------------------- */
	function suggestions_focusNext() {
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
	function suggestions_focusPrev() {
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

					// Reload the results (keep filters and sorting)
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
				const fieldElement = event.currentTarget;

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
				const fieldElement = event.currentTarget;

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

		// Reload the results (keep filters and sorting)
		results_show(true);
	}



	/* Results
	---------------------------------------------------------------------------------------------------- */
	/* Init
	-------------------------------------------------- */
	function results_init() {
		// Get the table headers
		const tableHeaders = dom_results?.querySelectorAll('thead th');

		// For each table header
		tableHeaders.forEach((tableHeader) => {
			// Add a click event listener (this enables sorting)
			tableHeader.addEventListener('click', results_tableHeaders_handleClick);
		});
	}


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
		const investmentSuitability = dom_filters_form?.querySelector('select[name="investmentSuitability"]').value;
		const managementApproach = dom_filters_form?.querySelector('select[name="managementApproach"]').value;
		const dividendFrequency = dom_filters_form?.querySelector('select[name="dividendFrequency"]').value;

		// Get the sorting
		let sort = '';
		if (results_sort_name && results_sort_order) {
			// If we're sorting by an alphabetial field, let's reverse the sort order
			// This is more intuitive - as "descending" should infer "A -> Z" but the API returns the opposite
			let sortOrder = results_sort_order;
			if (results_sort_name === 'symbol' || results_sort_name === 'display_name' || results_sort_name === 'kind') {
				if (results_sort_order === 'desc') {
					sortOrder = 'asc';
				}
				else {
					sortOrder = 'desc';
				}
			}

			// Build the sorting param
			sort = results_sort_name + '.' + sortOrder;
		}

		// Build the query params
		const params = {
			'from': pagination_page,
			'size': 10,
			'order_by': sort,
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
				if (typeof data !== 'object' || typeof data.results !== 'object' || typeof data.count !== 'number' || data.results.length === 0) {
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
						const data_fundCode = result.symbol ? result.symbol.toUpperCase() : '-';
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
									<a href='https://www.betashares.com.au/direct/get/?symbol=${data_fundCode}' class='resultButton'></a>
									<button class='expandCollapseButton'>
										<div class='icon'>keyboard_arrow_down</div>
									</button> <!-- .expandCollapseButton -->
								</td>
								<td>
									<div class='fundCode'>
										<div class='text'>${data_fundCode}</div>
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

									<a href='https://www.betashares.com.au/direct/get/?symbol=${data_fundCode}' class='investButton'>
										<div class='text'>Invest with us</div>
									</a>
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

					// Show the results table
					helper_removeClass('hidden', dom_results_table);

					// If there's more than 10 results
					if (data.count > 10) {
						// Populate the pagination
						pagination_populate(pagination_page, data.count);

						// Show pagination
						helper_removeClass('hidden', dom_results_pagination);
					}
					// Otherwise, there's less than 10 results
					else {
						// Hide pagination
						helper_addClass('hidden', dom_results_pagination);
					}

					// Attach event listeners to the results
					const results = dom_results_table?.querySelectorAll('.result');
					results.forEach((result) => {
						// Target the expand / collapse button
						const expandCollapseButton = result.querySelector('.expandCollapseButton');

						// If we found the expand / collapse button
						if (expandCollapseButton) {
							// Expand / collapse button - click
							expandCollapseButton.addEventListener('click', results_expandCollapseButton_handleClick);
						}
					});
				}

				// Remove the min height from the body (this helps to make the UX a litte nicer, stops the scroll from jumping around)
				document.body.style.minHeight = '0px';
			}
		);
	}


	/* Show search results
	-------------------------------------------------- */
	function results_show(keepFiltersAndSorting = false, keepPagination = false) {
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

		// If we're not keeping the filters and sorting
		if (!keepFiltersAndSorting) {
			// Reset the table headers
			results_tableHeaders_reset();

			// Reset the filters form
			dom_filters_form.reset();

			// Update the active filters count
			filters_button_updateActiveFiltersCount();

			// Hide the filters popup
			helper_addClass('hidden', dom_filters_popup);
		}

		// If we're not keeping the pagination
		if (!keepPagination) {
			// Reset the pagination to the first page
			pagination_page = 1;
		}

		// If we're keeping the filters or pagination
		if (keepFiltersAndSorting || keepPagination) {
			// Set a min height on the body (this helps to make the UX a litte nicer, stops the scroll from jumping around)
			document.body.style.minHeight = document.body.offsetHeight + 'px';
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

		// Hide the filters popup
		helper_addClass('hidden', dom_filters_popup);
	}


	/* Table headers - handle click
	-------------------------------------------------- */
	// Create variables to store the sorting
	let results_sort_name = '';
	let results_sort_order = '';
	function results_tableHeaders_handleClick(event) {
		// Target the table header
		const tableHeader = event.currentTarget;

		// If we found the table header
		if (tableHeader) {
			// If we're already sorted descending
			if (tableHeader.classList.contains('desc')) {
				// Sort ascending
				tableHeader.classList.remove('desc');
				tableHeader.classList.add('asc');

				// Update the sort variables
				results_sort_name = tableHeader.getAttribute('data-sort');
				results_sort_order = 'asc';
			}
			// Otherwise, we're not sorted descending
			else {
				// Reset the table headers
				results_tableHeaders_reset();

				// Sort descending
				tableHeader.classList.add('sort');
				tableHeader.classList.add('desc');

				// Update the sort variables
				results_sort_name = tableHeader.getAttribute('data-sort');
				results_sort_order = 'desc';
			}

			// Reload the results (keep filters and sorting)
			results_show(true);
		}
	}


	/* Table headers - reset
	-------------------------------------------------- */
	function results_tableHeaders_reset() {
		// Reset the sorting variables
		results_sort_name = '';
		results_sort_order = '';

		// Remove all sorted headers
		dom_results_table?.querySelector('.sort')?.classList.remove('sort');
		dom_results_table?.querySelector('.asc')?.classList.remove('asc');
		dom_results_table?.querySelector('.desc')?.classList.remove('desc');
	}


	/* Expand / collapse button - handle click
	-------------------------------------------------- */
	function results_expandCollapseButton_handleClick(event) {
		// Stop the event from hitting the parent result
		event.preventDefault();
		event.stopPropagation();

		// Target the result container
		const result = event.currentTarget?.closest('.component_search .result');

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



	/* Pagination
	---------------------------------------------------------------------------------------------------- */
	/* Populate pagination
	-------------------------------------------------- */
	// Create a shared variable to store the current page
	let pagination_page = 1;
	function pagination_populate(currentPage, totalResults) {
		/* Update the shared variable to the current page passed in
		------------------------- */
		pagination_page = currentPage;


		/* Create the pages HTML output
		------------------------- */
		// Work out how many pages there are in total
		const totalPages = Math.ceil(totalResults / 10);

		// Create the HTML output variable
		let pagesOutput = '';

		// For each page
		for (let i = 0; i < totalPages; i++) {
			// Add a selected class to the current page
			let selectedClass = '';
			if (i === (currentPage - 1)) {
				selectedClass = ' selected';
			}

			// Output the page HTML
			pagesOutput += `
				<button class='page${selectedClass}' data-page='${(i + 1)}'>
					<div class='text'>${(i + 1)}</div>
				</button>
			`;
		}


		/* Create the results text HTML output
		------------------------- */
		// Results from
		let resultsTextStart = ((currentPage * 10) - (10 - 1));
		if (resultsTextStart < 0) {
			resultsTextStart = 0;
		}

		// Results to
		let resultsTextEnd = (currentPage * 10);
		if (resultsTextEnd > totalResults) {
			resultsTextEnd = totalResults;
		}

		// Output the results text HTML
		const resultsTextOutput = `Showing results ${resultsTextStart} - ${resultsTextEnd} of ${totalResults}`;


		/* Create the previous button HTML
		------------------------- */
		// Is this button disable (we're on the first page already)
		let prevDisabledClass = '';
		if (currentPage === 1) {
			prevDisabledClass = ' disabled';
		}

		// Output the previous button HTML
		const prevButtonOutput = `
			<button class='prev${prevDisabledClass}'>
				<div class='icon'>keyboard_arrow_left</div>
			</button> <!-- .prev -->
		`;


		/* Create the previous button HTML
		------------------------- */
		// Is this button disable (we're on the first page already)
		let nextDisabledClass = '';
		if (currentPage === totalPages) {
			nextDisabledClass = ' disabled';
		}

		// Output the next button HTML
		const nextButtonOutput = `
			<button class='next${nextDisabledClass}'>
				<div class='icon'>keyboard_arrow_right</div>
			</button> <!-- .prev -->
		`;


		/* Create the pagination HTML output
		------------------------- */
		const htmlOutput = `
			<div class='buttons'>
				${prevButtonOutput}

				<div class='pages'>
					${pagesOutput}
				</div> <!-- .pages -->

				${nextButtonOutput}
			</div> <!-- .buttons -->

			<div class='resultsText'>
				${resultsTextOutput}
			</div> <!-- .resultsText -->
		`;


		/* Populate the pagination's HTML
		------------------------- */
		dom_results_pagination.innerHTML = htmlOutput;


		/* Attach event listeners
		------------------------- */
		// Previous button
		const prevButton = dom_results_pagination.querySelector('.prev');
		if (prevButton) {
			prevButton.addEventListener('click', pagination_prevPage);
		}

		// Next button
		const nextButton = dom_results_pagination.querySelector('.next');
		if (nextButton) {
			nextButton.addEventListener('click', pagination_nextPage);
		}

		// Page buttons
		const pageButtons = dom_results_pagination.querySelectorAll('.page');
		pageButtons.forEach((pageButton) => {
			pageButton.addEventListener('click', pagination_changePage);
		});
	}


	/* Change page
	-------------------------------------------------- */
	function pagination_changePage(event) {
		// Get the "data-page" attribute of the clicked page
		const page = event.currentTarget?.getAttribute('data-page');

		// If we found the "data-page" attribute
		if (page) {
			// Update the current page
			pagination_page = parseInt(page);

			// Reload the results (keep filters/sorting and pagination)
			results_show(true, true);
		}
	}


	/* Next page
	-------------------------------------------------- */
	function pagination_nextPage() {
		// Update the current page
		pagination_page++;

		// Reload the results (keep filters/sorting and pagination)
		results_show(true, true);
	}


	/* Previous page
	-------------------------------------------------- */
	function pagination_prevPage() {
		// Update the current page
		pagination_page--;

		// Reload the results (keep filters/sorting and pagination)
		results_show(true, true);
	}



	/* Setup
	---------------------------------------------------------------------------------------------------- */
	/* Target DOM elements
	-------------------------------------------------- */
	/* Component
	------------------------- */
	const dom_search = document.querySelector('.component_search');


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
	const dom_filters_button = dom_search?.querySelector('.filtersButton');

	// Popup
	const dom_filters_popup = dom_search?.querySelector('.filtersPopup');

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

	// Results
	results_init();
}



/* Exports
---------------------------------------------------------------------------------------------------- */
export {
	component_search_html,
	component_search_init
};
