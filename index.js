/* Imports
---------------------------------------------------------------------------------------------------- */
const httpInstance = require('http');
const httpStatusInstance = require('http-status-codes');
const fsInstance = require('fs');



/* Functions
---------------------------------------------------------------------------------------------------- */
/* Load a file
-------------------------------------------------- */
function loadFile(file, res) {
	// Remove leading slashes
	file = file.replace(/^\/+/g, '');

	// If the file exists
	if (fsInstance.existsSync(file)) {
		// Read the file
		fsInstance.readFile(file, (error, data) => {
			// If there was an error reading the file
			if (error) {
				// Output an error message
				handleError(res);
			}
			// Otherwise, the read was successful
			else {
				// Output the file
				res.write(data);
				res.end();
			}
		});
	}
	// Otherwise, the file does not exist
	else {
		// Output an error message
		handleError(res);
	}
}


/* Output an error message
-------------------------------------------------- */
function handleError(res) {
	// Set the HTTP status
	res.writeHead(httpStatusInstance.StatusCodes.NOT_FOUND, {
		'Content-Type': 'text/html'
	});

	// Output the error message
	res.write(`<h1>File not found!</h1>`);
	res.end();
}



/* Server (for simplicity's sake, this has been done with some very basic static routing instead of using Express or similar)
---------------------------------------------------------------------------------------------------- */
/* Create the server instance
-------------------------------------------------- */
const httpServer = httpInstance.createServer((req, res) => {
	/* CSS
	------------------------- */
	if (req.url.indexOf('.css') !== -1) {
		// Set the HTTP status
		res.writeHead(httpStatusInstance.StatusCodes.OK, {
			'Content-Type': 'text/css'
		});
	}


	/* JS
	------------------------- */
	else if (req.url.indexOf('.js') !== -1) {
		// Set the HTTP status
		res.writeHead(httpStatusInstance.StatusCodes.OK, {
			'Content-Type': 'text/javascript'
		});
	}


	/* Fonts
	------------------------- */
	else if (req.url.indexOf('.woff2') !== -1) {
		// Set the HTTP status
		res.writeHead(httpStatusInstance.StatusCodes.OK, {
			'Content-Type': 'font/woff2'
		});
	}


	/* HTML
	------------------------- */
	else {
		// Set the HTTP status
		res.writeHead(httpStatusInstance.StatusCodes.OK, {
			'Content-Type': 'text/html'
		});

		// Update the file path
		req.url = 'index.html';
	}

	// Load the file
	loadFile(req.url, res);
});


/* Start the server instance at "http://localhost:3000"
-------------------------------------------------- */
const portNumber = 3000;
httpServer.listen(portNumber, () => {
	// eslint-disable-next-line no-console
	console.log(`\n\n--------------------------------------------------\nServer started at http://localhost:${portNumber}\n--------------------------------------------------\n\n`);
});
