/* Imports
---------------------------------------------------------------------------------------------------- */
// Search component
import {
	component_search_html,
	component_search_init
} from '../components/search/_index.js';



/* Load the search component into the page
---------------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	// Target the <div> element
	const searchComponentDiv = document.getElementById('component_search');

	// If we found the <div> element
	if (searchComponentDiv) {
		// Load the search component's HTML
		searchComponentDiv.innerHTML = component_search_html();

		// Init the search component's JS
		component_search_init();
	}
});
