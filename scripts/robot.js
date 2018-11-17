// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robot.js | Purpose:
// Define the robot and all functions related to its orientation and movement.
// The public functions defined here will be called from either the command input
// on the GUI or from the console.
	//receiver
// ================================================================================
"use strict"

var robot = (function(){

	var currentPosition = {
		x_position : null,
		y_position : null,
		orientation : null,
		isPlaced : false
	};

	var commandLog = [];

	const execute = function(command){
		robot.currentPosition = command.execute(currentPosition, command.parameters);
	};

	var addCommandLog = function(command,message){
		var entry = {	"command":command,
						"message":message};
		commandLog.push(entry);
		// only keep most recent commands
		if (commandLog.length>=app_settings.logLength){commandLog.shift();}
	};

	var addCommandLogError = function(message){
		commandLog[commandLog.length-1].message = message; // add message to most recent entry
	}

	const invokeCommand = function(rawUserCommand){

		var checkInput = validate.userInput(rawUserCommand);
		var commandResult;
		var errorMessage;
		var success = true;

		addCommandLog(rawUserCommand,null);

		if (checkInput.isValid){
			// Assume there are multiple parameters
			execute(robot_abilities[checkInput.command].apply(null,checkInput.parameters));

			// if there was an error message then log it.
			if (!jQuery.isEmptyObject(commandResult)){
				console.warn(`Execution error: ${commandResult.message}`);
				errorMessage = commandResult.message;
				success = false;
			}

		} else {
			// command validation failed
			console.warn(`Validation error: ${checkInput.message}`);
			errorMessage = checkInput.message;
			success = false;
		}

 		return success;

	};
	return {
		invokeCommand:invokeCommand,
		execute:execute,
		currentPosition:currentPosition,
		commandLog:commandLog,
		addCommandLog:addCommandLog,
		addCommandLogError:addCommandLogError,
		currentPosition:currentPosition
	};
}());