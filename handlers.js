/*
Request handlers
*/

//Define handler container
var handlers = {};

// Dictionary of greetings in different languages for hello handler
var greetings = 
{ 
	esp : 'Saluton',
	be  : 'Здарова',
	cz  : 'Ahoj',
	de  : 'Hallo',
	en  : 'Hello',
	es  : 'Hola',
	pl  : 'Cześć',
	ru  : 'Привет'
};

// Define the hello handler
handlers.hello = function(data, callback){

	// Get lang header
	var language = typeof(data.queryStringObject.lang) == 'string' ? data.queryStringObject.lang.toLowerCase() : false;
	// Set the greeting, the default is esperanto
	var greeting = (language in greetings) ? greetings[language] : greetings.esp;

	callback(200, {'message': greeting + '!'});
};

// Define the default handler
handlers.default = function(data, callback){
	callback(404,{'message' : "Please send a request to /hello to receive a greeting in Esperanto. " + 
	"For other language please add a query string, eg.: /hello?lang=en (English), be (Belarusian), cz (Czech), de (German), es (Spanish), esp (Esperanto), pl (Polish), ru (Russian)."});
};

//Export the module
module.exports = handlers;
