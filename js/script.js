/* Import components
---------------------------------------------------------------------------------------------------- */
// Search
import '../components/search/js/_script.js';



/* Load a component
---------------------------------------------------------------------------------------------------- */
function loadComponent(component) {
	// Get the component's HTML using fetch
	fetch('/components/' + component + '/index.html')
		// Get the response text
		.then((response) => {
			return response.text();
		})
		// Success
		.then((text) => {
			// Add the search component to the <main> tag of the page
			document.querySelector('main').insertAdjacentHTML('beforeend', text);
		})
		// Error
		.catch((error) => {
			console.log(`The "${component}" component could not be loaded.`);
		});
}



/* Init
---------------------------------------------------------------------------------------------------- */
function init() {
	// Load the search component
	loadComponent('search');
}

// Init the page when all assets are loaded
window.addEventListener('load', init);
