// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robot.js | Purpose:
// Define the robot and all functions related to its orientation and movement.
// The public functions defined here will be called from either the command input
// on the GUI or from the console.
// ================================================================================
"use strict"
var validate = (function(){

	const orientationType = function(input,orientationType){

		var result = {
			found: false,
			index: null,
			message: `Robot cannot understand the meaning of ${input}.`
		};

		var matchedIndex = app_settings[orientationType].findIndex(orientationType => orientationType.name==input);

		if (matchedIndex != -1){
			result.found = true;
			result.index = matchedIndex;
		}
		return result;
	};
	
	const robotIsPlaced = function(){

		var result = {
			onGrid: false,
			message: "Robot has not been placed on the grid."
		};

		if (robot.isPlaced) {
			result.onGrid = true,
			result.message = null
		}
		return result;
	}

	const coordinates = function(x_position,y_position){
		
		var result = {
			valid: true,
			message: null
		};

		// Check if the coordinates are outside the grid
		if (singleCoordinate(x_position) && singleCoordinate(y_position)){ return result;}

		result.valid = false;
		result.message = `Position (${x_position},${y_position}) is not on the grid.`;

		return result;
	};

	const singleCoordinate = function(n){

		if (n>=app_settings.gridSize){ return false;}
		if (n<0){ return false;}
		return true;
	}

	const userInput = function(input){

		var inputCommand;
		var inputParameters = "";
		var inputArray = [];
		var parameterArray = [];
		var cleanInput;

		var result =  {
			"isValid":false,
			"command": null,
			"parameters":null,
			"message":`Robot does not know how to ${input}.`
		};

		cleanInput = input.toLowerCase();
		cleanInput = cleanInput.trim();

		// check if the input has parameters
		if (cleanInput.indexOf(" ")==-1){
			// No parameters
			inputCommand = cleanInput;


		} else {
			// Input has one or more parameters 

			inputArray = cleanInput.split(" ");

			inputCommand = inputArray[0];
			inputParameters = inputArray.slice(1).join("");
			parameterArray = inputParameters.split(',');
		}

		// check if the user is calling a function which should be redirected
		// e.g. call to 'left' should actually call 'turn' 
		switch (inputCommand) {
			case "left":
				inputCommand = "turn";
				if (parameterArray.length == 0){parameterArray = ["left"];}
				break;

			case "right":
				inputCommand = "turn";
				if (parameterArray.length == 0){parameterArray = ["right"];}
				break;

			case "uturn":
				inputCommand = "turn";
				if (parameterArray.length == 0){parameterArray = ["uturn"];}
				break;

			case "move": 	// allow move with no parameters - default to move forwards 1 space
				if (parameterArray.length == 0){parameterArray = ["forwards",1];}
				break;
		}
		
		//check if command exists
		if (typeof robot[inputCommand] !== "function"){

			result.message = `Robot does not know the ${inputCommand} command.`;
			return result;
		}

		// check if the correct number of parameters are supplied
		if (robot[inputCommand].length !== parameterArray.length){

			result.message = `Robot expected ${robot[inputCommand].length} parameters for the ${inputCommand} command.`;
			return result;
		}

		// check all parameters to see is they are either ints or orientations






		// valid function call. Parameters will be validated from within that function
		result.isValid = true;
		result.command = inputCommand;
		result.parameters = parameterArray;
		result.message = null;

		return result;
	}

	// public functions/variables
	return {
		userInput:userInput,
		coordinates:coordinates,
		orientationType:orientationType,
		robotIsPlaced:robotIsPlaced
	};
}());
