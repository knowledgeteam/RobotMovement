// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// validate.js | Purpose:
// Functions to validate user commands and parameters 
// ================================================================================
"use strict"
var validate = (function(){

	// check for given orientationName (eg left) in any of the orientation arrays defined in app_settings
	const orientationType = function(orientationName,orientationTypeName){

		var validationResult;
		var matchedIndex = app_settings[orientationTypeName].findIndex(orientationTypeName => orientationTypeName.name==orientationName);

		if (matchedIndex !=-1){
			validationResult = {
				valid: true,
				index: matchedIndex,
				message: null
			};
		} else {
			validationResult = {
				valid: false,
				index: null,
				message: `Robot cannot understand the meaning of ${orientationName}.`
			}
		}
		return validationResult;
	};
	
	const robotIsPlaced = function(){

		var validationResult;

		if (robot.currentPosition.isPlaced) {
			validationResult = {
				valid: true,
				message: null
			}
		} else {
			validationResult = {
				valid: false,
				message: "Robot has not been placed on the grid."
			};
		}
		return validationResult;
	}

	const coordinates = function(x_position,y_position){
	
		var validationResult;

		if (singleCoordinate(x_position).valid && singleCoordinate(y_position).valid){
			validationResult = {
				valid: true,
				message: null
			};
		} else {
			validationResult = {
				valid: false,
				message: `Position (${x_position},${y_position}) is not on the grid.`
			};
		}
		return validationResult;
	};

	const singleCoordinate = function(n){

		var validationResult;

		if (isNaN(parseInt(n)) || n>=app_settings.gridSize || n<0) {
			validationResult = { valid: false};
		} else {
			validationResult = { valid: true };
		}
		return validationResult;
	}

	// const userInput = function(input){
	const userInput = function(rawUserString){

		var validationResult;
		var parsedString;
		var parsedCommandArray;
		var parsedCommand;
		var parsedParameters;

		// var inputCommand;
		// var inputParameters = "";
		// var inputArray = [];
		// var parameterArray = [];

		// var result =  {
		// 	valid : false,
		// 	command : null,
		// 	parameters : null,
		// 	message : `Robot does not know how to ${rawUserString}.`
		// };

		parsedString = rawUserString.toLowerCase();
		parsedString = parsedString.trim();

		parsedCommandArray = parsedString.split(" ");
		parsedCommand = parsedCommandArray[0];

		parsedParameters = parsedCommandArray.slice(1).join("").split(',');


		// // check if the input has parameters
		// if (parsedCommand.indexOf(" ")==-1){
		// 	// No parameters
		// 	inputCommand = parsedCommand;
		// 	// parameterArray = null;

		// } else {
		// 	// Input has one or more parameters 

		// 	inputArray = parsedCommand.split(" ");

		// 	inputCommand = inputArray[0];
		// 	inputParameters = inputArray.slice(1).join("");
		// 	parameterArray = inputParameters.split(',');
		// }


		// check if the user is calling a function which should be redirected
		// e.g. call to 'left' should actually call 'turn' 
		switch (parsedCommand) {
			case "left":
				parsedCommand = "turn";
				if (parsedParameters[0] == ""){parsedParameters = ["left"];}
				break;

			case "right":
				parsedCommand = "turn";
				if (parsedParameters[0] == ""){parsedParameters = ["right"];}
				break;

			case "uturn":
				parsedCommand = "turn";
				if (parsedParameters[0] == ""){parsedParameters = ["uturn"];}
				break;

			case "move": 	// allow move with no parameters - default to move forwards 1 space
				if (parsedParameters[0] == ""){parsedParameters = ["forwards",1];}
				break;
		}

		//check if command exists
		if (typeof robotCommands[parsedCommand] !== "function"){

			validationResult = {
				valid: false,
				command: null,
				parameters: null,
				message: `Robot does not know the ${parsedCommand} command.`
			};
			return validationResult;
		}

		// check if the correct number of parameters are supplied
		// if (robotCommands[inputCommand].length !== parsedParameters.length){

		// 	result.message = `Robot expected ${robotCommands[inputCommand].length} parameters for the ${inputCommand} command.`;
		// 	return result;
		// }

		// check all parameters to see is they are either ints or orientations


		// valid function call. Parameters will be validated from within that function
		validationResult = {
				valid: true,
				command: parsedCommand,
				parameters: parsedParameters,
				message: null
			};
		
		return validationResult;
	}

	// public functions/variables
	return {
		userInput:userInput,
		coordinates:coordinates,
		orientationType:orientationType,
		robotIsPlaced:robotIsPlaced
	};
}());
