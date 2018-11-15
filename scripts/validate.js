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

var validate = (function(){

	const checkRobotLogic = function(input,arrayName){

		var result = {
			found: false,
			index: null,
			message: `Robot cannot understand the meaning of ${input}.`
		};

		var matchedIndex = robotLogic[arrayName].findIndex(arrayName => arrayName.name==input);

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

	const coordinates = function(x,y){
		
		var result = {
			valid: true,
			message: null
		};

		// Check if the coordinates are outside the grid
		if (singleCoordinate(x) && singleCoordinate(y)){ return result;}

		result.valid = false;
		result.message = `Position (${x},${y}) is not on the grid.`;

		return result;
	};

	const singleCoordinate = function(n){

		if (n>=config.gridSize){ return false;}
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
		checkRobotLogic:checkRobotLogic,
		robotIsPlaced:robotIsPlaced
	};
}());
