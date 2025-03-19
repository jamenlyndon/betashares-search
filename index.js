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



/* Server
---------------------------------------------------------------------------------------------------- */
/* Create the server instance
-------------------------------------------------- */
const httpServer = httpInstance.createServer((req, res) => {
	// Set the HTTP status
	res.writeHead(httpStatusInstance.StatusCodes.OK, {
		'Content-Type': 'text/html'
	});

	// Load "index.html"
	loadFile('index.html', res);
});


/* Start the server instance at "http://localhost:3000"
-------------------------------------------------- */
const portNumber = 3000;
httpServer.listen(portNumber, () => {
	console.log('Server started at http://localhost:' + portNumber);
});
