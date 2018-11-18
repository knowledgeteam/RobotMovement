// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// validate.js | Purpose:
// Functions to validate user commands
// ================================================================================

var validate = (function(){
	"use strict";

	// check for given orientationName (eg left) in any of the orientation arrays defined in app_settings
	const orientationType = function(orientationName,orientationTypeName){

		var matchedIndex = app_settings[orientationTypeName].findIndex(orientationTypeName => orientationTypeName.name==orientationName);

		if (matchedIndex !=-1){
			return {
				valid: true,
				index: matchedIndex,
				message: null
			};
		} else {
			return {
				valid: false,
				index: null,
				message: `Robot cannot understand the meaning of ${orientationName}.`
			};
		}
	};

	const robotIsPlaced = function(){

		if (robot.currentPosition.isPlaced) {
			return {
				valid: true,
				message: null
			};
		} else {
			return {
				valid: false,
				message: "Robot has not been placed on the grid."
			};
		}
	};

	const coordinates = function(x_position,y_position){

		if (singleCoordinate(x_position).valid && singleCoordinate(y_position).valid){
			return {
				valid: true,
				message: null
			};
		} else {
			return {
				valid: false,
				message: `Position (${x_position},${y_position}) is not on the grid.`
			};
		}
	};

	const singleCoordinate = function(n){

		if (isNaN(parseInt(n)) || n>=app_settings.gridSize || n<0) {
			return { valid: false};
		} else {
			return { valid: true };
		}
	};

	// const userInput = function(input){
	const userCommand = function(rawUserString){

		var parsedUserString;
		var parsedCommandArray;
		var parsedCommand;
		var parsedParameters;

		parsedUserString = rawUserString.toLowerCase();
		parsedUserString = parsedUserString.trim();

		parsedCommandArray = parsedUserString.split(" ");
		parsedCommand = parsedCommandArray[0];

		// check if any parameters were supplied
		if (parsedUserString.indexOf(" ") == -1){
			parsedParameters = [];
		} else {
			parsedParameters = parsedCommandArray.slice(1).join("").split(',');
		}


		// check if the user is calling a function which should be redirected
		// e.g. call to function 'left' should actually call function 'turn' with left as a parameter
		switch (parsedCommand) {
			case "left":
				parsedCommand = "turn";
				if (parsedParameters.length == 0){parsedParameters = ["left"];}
				break;

			case "right":
				parsedCommand = "turn";
				if (parsedParameters.length == 0){parsedParameters = ["right"];}
				break;

			case "uturn":
				parsedCommand = "turn";
				if (parsedParameters.length == 0){parsedParameters = ["uturn"];}
				break;

			case "move": 	// allow move with no parameters - default to move forwards 1 space
				if (parsedParameters.length == 0){parsedParameters = ["forwards",1];}
				break;
		}

		//check if command exists
		if (typeof robotCommands[parsedCommand] !== "function"){

			return {
				valid: false,
				command: null,
				parameters: null,
				message: `Robot does not know the ${parsedCommand} command.`
			};
		}

		// check if the correct number of parameters are supplied
		if (robotCommands[parsedCommand].length !== parsedParameters.length){

			return {
				valid: false,
				command: null,
				parameters: null,
				message: `Robot expected ${robotCommands[parsedCommand].length} parameters for the ${parsedCommand} command.`
			};
		}

		// valid function call. Parameters will be validated when function is executed.
		return {
			valid: true,
			command: parsedCommand,
			parameters: parsedParameters,
			message: null
		};
	};

	return {
		userCommand:userCommand,
		coordinates:coordinates,
		orientationType:orientationType,
		robotIsPlaced:robotIsPlaced
	};
}());
