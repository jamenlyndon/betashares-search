/* Imports
---------------------------------------------------------------------------------------------------- */
// Search component
import {
	component_search_html,
	component_search_init
} from '../components/search/_index.js';



/* Load the search component into the page
Please note:
We're loading the component this way as we have not included an advanced server such as Express (for simplicity's sake).
---------------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	// Target the <div> element
	const searchComponentDiv = document.getElementById('component_search');

	// If we found the <div> element
	if (searchComponentDiv) {
		// Load the search component HTML
		searchComponentDiv.innerHTML = component_search_html();

		// Init the search component JS
		component_search_init();
	}
});
