/*
 Helper functions
*/

// #region Dependencies
var cluster = require('cluster');
var os = require('os'); // Operating system module
// #endregion

// #region Container for functions
var helpers = {};
// #endregion

// #region Functions

//Print out information about each of CPUs availables on the Operating System to the debug
helpers.printOutCPUInfo = function () {

    let cpus = os.cpus();
    let output = '';

    if (cpus instanceof Array && cpus != 'undefined' && cpus.length > 0) {

        output += `--------------- CPUs INFO (${cpus.length}) ---------------\n`;
  
        for (i = 0; i < cpus.length; ++i) {
            output += `CPU ${1 + i}. Model: ${cpus[i].model}\tSpeed: ${cpus[i].speed}\n`;
        }
        output += `\n--------------- CPUs INFO END ---------------`;
    }

    return output;
};
// #endregion

//Export the container
module.exports = helpers;