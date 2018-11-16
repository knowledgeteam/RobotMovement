// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// log.js | Purpose:
// The log is a list of the most recent commands sent to the robot. It will also
// display error messages along with the command when appropriate.
// The public functions defined here will be initialised from main.js then called
// from robot.js
// ================================================================================
"use strict"
var command_history = (function(){

	var logArray = [];
	
	var addEntry = function(command,message){

		var entry = {
			"command":command,
			"message":message
		};

		logArray.push(entry);

		// only keep most recent commands
		if (logArray.length>=app_settings.logLength){
			logArray.shift();
		}
	};
	// public functions/variables
	return {
		addEntry:addEntry,
		logArray:logArray
	};
})();