/*
* Main server file
*/

// Dependencies
const http = require('http');
const https = require('https'); 
const url = require('url');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const handlers = require('./handlers');

// Instantiate the server module object
var server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req,res) {
		server.unifiedServer(req, res)
	});

// Instantiate the HTTPS server
server.httpsServerOptions = {
	'key' : fs.readFileSync(path.join(__dirname,'./https/key.pem')),
	'cert' : fs.readFileSync(path.join(__dirname,'./https/cert.pem'))
	};

server.httpsServer = https.createServer(server.httpsServerOptions, function(req,res) {
		server.unifiedServer(req, res)
	});

// All the server logic for http and https server
server.unifiedServer = function(req, res){

		const 	parsedUrl = url.parse(req.url, true);
		var		path = parsedUrl.pathname;
		const 	trimmedPath = path.replace(/^\/+|\/+$/g,'');
		
		//Get the query string as an object
		var queryStringObject = parsedUrl.query;

		//Get HTTP method
		var method = req.method.toLowerCase();

		var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.default;

		//Construct the data object to send to the handler
		var data = 
		{
			'trimmedPath' : trimmedPath,
			'queryStringObject' : queryStringObject,
			'method' : method			
		};

		//Route the request to the handler specified in the router
		chosenHandler(data, function(statusCode, payload) {
			//Use the status code called back by the handler, or default to 200
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
			payload = typeof(payload) == 'object' ? payload : {};

			//Convert payload to a string
			var payloadString = JSON.stringify(payload);
				
			//Return the response
			res.setHeader('Content-Type','application/json');
			res.writeHead(statusCode);
			res.end(payloadString);
		});	
};

server.router = {
	'default' : handlers.default,
	'hello' : handlers.hello
};

server.init = function(){

	//Start the HTTP server
    server.httpServer.listen(config.httpPort, function () {
		console.log('\x1b[36m%s\x1b[0m','The HTTP server is listening on port ' + config.httpPort + ' in ' + config.envName + '.');
	});

	//Start the HTTPS server
	server.httpsServer.listen(config.httpsPort, function() {
		console.log('\x1b[35m%s\x1b[0m','The HTTPS server is listening on port ' + config.httpsPort + ' in ' + config.envName + '.');
    });

    console.log('');
};

module.exports = server;