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

		if (isNaN(parseInt(n)) || n >= app_settings.gridSize || n < 0) {
			return { valid: false};
		} else {
			return { valid: true };
		}
	};

	const userCommand = function(rawUserString){

		var cleanUserString;
		var parsedCommand;
		var parsedParameters;

		var suppliedParameterCount;
		var requiredParameterCount;

		cleanUserString = rawUserString.toLowerCase().trim();

		parsedCommand = cleanUserString.split(" ")[0];

		// check if any parameters were supplied
		if (cleanUserString.indexOf(" ") == -1){
			parsedParameters = [];
		} else {
			parsedParameters = cleanUserString.split(" ").slice(1).join("").split(',');
		}

		suppliedParameterCount = parsedParameters.length;

		switch (parsedCommand) {
			case "left": // Turn commands need to have the turnName as a parameter since they call function 'turn'
				if (parsedParameters.length == 0){ parsedParameters = ["left"];	}
				requiredParameterCount = 0;
				break;

			case "right":
				if (parsedParameters.length == 0){parsedParameters = ["right"];}
				requiredParameterCount = 0;
				break;

			case "uturn":
				if (parsedParameters.length == 0){parsedParameters = ["uturn"];}
				requiredParameterCount = 0;
				break;

			case "move": // allow move with no parameters - default to move forwards 1 space
				if (parsedParameters.length == 0){parsedParameters = ["forwards",1];}
				requiredParameterCount = 0;
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

		if (typeof requiredParameterCount == "undefined") {
			requiredParameterCount = robotCommands[parsedCommand].length;
		}

		// check if the correct number of parameters are supplied
		if (suppliedParameterCount !== requiredParameterCount){
			return {
				valid: false,
				command: null,
				parameters: null,
				message: `Robot expected ${requiredParameterCount} parameters for the ${parsedCommand} command.`
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