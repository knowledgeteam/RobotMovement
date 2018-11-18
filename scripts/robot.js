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

	const executeCommand = function(command){
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

		var success = true;
		var errorMessage;
		var commandResult;
		var parsedUserCommand = validate.userInput(rawUserCommand);

		addCommandLog(rawUserCommand,null);

		if (parsedUserCommand.valid){
			// Assume there are multiple parameters
			executeCommand(robotCommands[parsedUserCommand.command].apply(null,parsedUserCommand.parameters));

		} else {
			// command validation failed
			console.warn(`Validation error: ${parsedUserCommand.message}`);
			robot.addCommandLogError(parsedUserCommand.message);
			success = false;
		}

 		return success;
	};
	return {
		invokeCommand:invokeCommand,
		currentPosition:currentPosition,
		commandLog:commandLog,
		addCommandLog:addCommandLog,
		addCommandLogError:addCommandLogError,
		currentPosition:currentPosition
	};
}());