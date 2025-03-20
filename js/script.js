/* Dynamically load a component
Note: This is a simple way to include something using a very minimal Node.js server.
We're doing this so we can avoid setting up Express.js or similar (as that's overkill for this little demo / code test)
---------------------------------------------------------------------------------------------------- */
function loadComponent(component) {
	/* Fetch the component's HTML
	-------------------------------------------------- */
	fetch('/components/' + component + '/index.html')
		// Get the response text
		.then((response) => {
			return response.text();
		})
		// Success
		.then((html) => {
			// Add the component's HTML to the <main> tag of the page
			document.querySelector('main')?.insertAdjacentHTML('beforeend', html);


			/* Fetch the component's JS
			Note: We must wait for the HTML to load before doing this, as the JS expects the DOM to exist
			-------------------------------------------------- */
			fetch('/components/' + component + '/js/_script.js')
				// Get the response text
				.then((response) => {
					return response.text();
				})
				// Success
				.then((js) => {
					// Add the component's JS to the <head> tag of the page
					const script = document.createElement('script');
					script.innerHTML = js;
					document.head.appendChild(script);
				})
				// Error
				.catch((error) => {
					console.log(`The "${component}" component's JS could not be loaded.`);
				});


		})
		// Error
		.catch((error) => {
			console.log(`The "${component}" component's HTML could not be loaded.`);
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
