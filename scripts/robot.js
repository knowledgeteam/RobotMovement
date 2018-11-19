// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robot.js | Purpose:
// Stores robot current status info, Receives commands and executes them.
// ================================================================================
var robot = (function(){
	"use strict";

	var currentPosition = {
		x_position: null,
		y_position: null,
		orientation: null,
		isPlaced: false
	};

	var commandLog = [];

	const executeCommand = function(command){

		var executionResult = command.execute(currentPosition, command.parameters);
		robot.currentPosition = executionResult.currentPosition;
		return executionResult;
	};

	const addCommandLog = function(command,message){
		var entry = {
			"command": command,
			"message": message
		};
		commandLog.push(entry);
		if (commandLog.length>=app_settings.logLength){commandLog.shift();} // only keep most recent commands
	};

	const addCommandLogError = function(message){
		commandLog[commandLog.length-1].message = message; // add message to most recent entry
	};

	const invokeCommand = function(rawUserCommand){
		console.group(`Invoke command: ${rawUserCommand}`);

		var success = true;
		var validatedUserCommand = validate.userCommand(rawUserCommand);
		var executedUserCommand;

		addCommandLog(rawUserCommand,null);

		if (validatedUserCommand.valid){
			// Assume there are multiple parameters
			executedUserCommand = executeCommand(robotCommands[validatedUserCommand.command].apply(null,validatedUserCommand.parameters));

			if (!executedUserCommand.executionSuccess){
				console.warn(`Execution error: ${executedUserCommand.message}`);
				robot.addCommandLogError(executedUserCommand.message);
				success = false;
			}

		} else {
			console.warn(`Validation error: ${validatedUserCommand.message}`);
			robot.addCommandLogError(validatedUserCommand.message);
			success = false;
		}
		console.groupEnd();
 		return success;
	};
	return {
		invokeCommand:invokeCommand,
		currentPosition:currentPosition,
		commandLog:commandLog,
		addCommandLog:addCommandLog,
		addCommandLogError:addCommandLogError
	};
}());