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

var log = (function(){

	var logArray = [];
	var length;
	var selector;
	
	// ================================================================================
	// Function: log.addEntry
	// Parameters :
	//	command : The instruction sent to the robot
	// 	success : A boolean indicating success/failure of that command
	// 	message : Used to pass on the error message
	// --------------------------------------------------------------------------------
	// Purpose:
	// Add a new entry to the log.
	// ================================================================================
	var addEntry = function(command,success,message){

		// build into an object to contain success info
		var entry = {
			"command":command,
			"success":success,
			"message":message
		};

		logArray.push(entry);

		// only keep most recent commands
		if (logArray.length>=log.length){
			logArray.shift();
		}

		// redraw the log
		draw();
	}; // End Function: log.addEntry


	// ================================================================================
	// Function: log.clear
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Remove all entries from the log
	// ================================================================================
	const clear = function(){

		// empty the log then redraw it
		logArray = [];
		draw();
	}; // End Function: log.clear


	// ================================================================================
	// Function: log.draw
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Draw the contents of the log on the GUI.
	// --------------------------------------------------------------------------------
	// Notes:
	// This function is only used by the log object so has not been made public
	// ================================================================================
	const draw = function(){

		// clear the log then recreate it
		log.selector.empty();

		for (var i = logArray.length - 1; i >= 0; i--) {
			log.selector.append(`<li id='log_${i}' class='list-group-item'>${logArray[i].command} <span class="logMessage"></span></li>`);

			// if the command failed then style it appropriately
			if(!logArray[i].success){
				jQuery(`#log_${i}`).addClass("commandFailed");
				jQuery(`#log_${i}>.logMessage`).append(logArray[i].message);
			}
		}
	}; // End Function: log.draw


	// ================================================================================
	// Function: log.init
	// Parameters :
	// 	length 	 : The number of entries to keep in the log.
	// 	selector : The jQuery selector used to access the log element on the DOM
	// --------------------------------------------------------------------------------
	// Purpose:
	// Initialise the log object with the supplied values.
	// ================================================================================
	var init = function(length,selector){
		this.length = length;
		this.selector = selector;
	}; // End Function: log.init

	// public functions/variables
	return {
		addEntry:addEntry,
		clear:clear,
		init:init
	};
})();