/*
 The primary file for the API
*/


// #region Dependencies
var server = require('./server');
var helpers = require('./helpers');
var cluster = require('cluster');
var os = require('os'); // Operating system module
var debug = require('debug')('cluster');
// #endregion

// #region Container
var app = {};
// #endregion

// #region Functions
//Initialize the app
app.init = function () {

    cluster.on('listening', (worker, address) => {
        debug(
            `A worker thread ${worker.id} is now connected to port:${address.port}`);
    });

    //Master thread of the application begins here
    if (cluster.isMaster) {

        //Fork the process in each cpu
        let cpus = os.cpus();

        for (var i = 0; i < cpus.length; ++i) {

            const workerThread = cluster.fork(); //Forking can only be called from the master process.
            debug(`Thread with id ${workerThread.id} was forked.`);
        }

        //If the app is in the debug mode, print out information about each CPU
        debug(helpers.printOutCPUInfo());

    } else {

        //Start the server on each of forked threads
        //All of the forked threads will be listening to users' requests
        server.init();
    }
};
// #endregion

//Execute the init function to start the app
app.init();

//Export the app
module.exports = app;