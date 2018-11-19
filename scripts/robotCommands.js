// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robotCommands.js | Purpose:
// Define all the actions the robot can make.
// ================================================================================
var robotCommands = (function(){
	"use strict";
	
	const command = function(execute,parameters){
		this.execute = execute;
		this.parameters = parameters;
	};

	const place = function(new_x_position,new_y_position,direction){
		var placeParameters = {
			"new_x_position" : new_x_position,
			"new_y_position" : new_y_position,
			"direction" : direction};
		return new command(placeFunction,placeParameters);
	};

	const move = function(moveType,moveDistance){
		var moveParameters = {
			"moveType" : moveType,
			"moveDistance" : moveDistance};
		return new command(moveFunction,moveParameters);
	};
	
	// note that left, right and uturn all call turn
	const left = function(turnName){
		var turnParameters = {"turnName" : turnName};
		return new command(turnFunction,turnParameters);
	};
	const right = function(turnName){
		var turnParameters = {"turnName" : turnName};
		return new command(turnFunction,turnParameters);
	};
	const uturn = function(turnName){
		var turnParameters = {"turnName" : turnName};
		return new command(turnFunction,turnParameters);
	};

	const report = function(){
		return new command(reportFunction);
	};

	const reset = function(){
		return new command(resetFunction);
	};

	const placeFunction = function(currentPosition,moveParameters){

		var newCoordinates = validate.coordinates(moveParameters.new_x_position,moveParameters.new_y_position);
		var newDirection = validate.orientationType(moveParameters.direction,"orientations");

		if (!newCoordinates.valid){
			return {
				currentPosition: currentPosition,
				executionSuccess: false,
				message: newCoordinates.message
			};
		}
		if (!newDirection.valid){
			return {
				currentPosition: currentPosition,
				executionSuccess: false,
				message: newDirection.message
			};
		}

		currentPosition.x_position = parseInt(moveParameters.new_x_position);
		currentPosition.y_position = parseInt(moveParameters.new_y_position);
		currentPosition.orientation = newDirection.index;
		currentPosition.isPlaced = true;

		return {
			currentPosition: currentPosition,
			executionSuccess: true,
			message: null
		};

	};

	const moveFunction = function(currentPosition,moveParameters){

		var new_x_position, new_y_position;
		var newCoordinates;
		var relativeMovementIndex;
		var robotPlaced = validate.robotIsPlaced();
		var moveTypeIndex = validate.orientationType(moveParameters.moveType,"movementRelativeToOrientation");

		if (!robotPlaced.valid){
			return {
				currentPosition: currentPosition,
				executionSuccess: false,
				message: robotPlaced.message
			};
		}
		if (!moveTypeIndex.valid){
			return {
				currentPosition: currentPosition,
				executionSuccess: false,
				message: moveTypeIndex.message
			};
		}

		//relative movement is the direction of travel - not neccessarily the direction the robot is facing
		relativeMovementIndex = robot.currentPosition.orientation + app_settings.movementRelativeToOrientation[moveTypeIndex.index].movementOrientationAdjustment;
		relativeMovementIndex = adjustToValidOrientation(relativeMovementIndex);

		new_x_position = robot.currentPosition.x_position + (app_settings.orientations[relativeMovementIndex].xAxisChange*moveParameters.moveDistance);
		new_y_position = robot.currentPosition.y_position + (app_settings.orientations[relativeMovementIndex].yAxisChange*moveParameters.moveDistance);

		newCoordinates = validate.coordinates(new_x_position,new_y_position);

		if (!newCoordinates.valid){
			return {
				currentPosition: currentPosition,
				executionSuccess: false,
				message: newCoordinates.message
			};
		}
		
		currentPosition.x_position = new_x_position;
		currentPosition.y_position = new_y_position;

		return {
			currentPosition: currentPosition,
			executionSuccess: true,
			message: null
		};
	};

	const turnFunction = function(currentPosition,turnParameters){

		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.valid){
			return {
				currentPosition: currentPosition,
				executionSuccess: false,
				message: robotPlaced.message
			};
		}

		var relativeOrientation = validate.orientationType(turnParameters.turnName,"relativeOrientation");

		if (relativeOrientation.valid){
			// change the orientation of the robot by the number indicated in the orientationChange field for that move
			currentPosition.orientation = robot.currentPosition.orientation + app_settings.relativeOrientation[relativeOrientation.index].orientationChange;
			currentPosition.orientation = adjustToValidOrientation(robot.currentPosition.orientation);
		}
		return {
			currentPosition: currentPosition,
			executionSuccess: true,
			message: null
		};

	};

	const adjustToValidOrientation = function(orientationIndex){

		while (orientationIndex <0){
			orientationIndex = orientationIndex + app_settings.orientations.length;
		}
		while (orientationIndex >= app_settings.orientations.length){
			orientationIndex = orientationIndex - app_settings.orientations.length;
		}
		return orientationIndex;
	};

	const reportFunction = function(currentPosition){

		if (!robot.isPlaced){
			robot.addCommandLog("Report: Robot not on grid.",null);
		}
		robot.addCommandLog(`Report: Position: (${currentPosition.x_position},${currentPosition.y_position}) facing ${app_settings.orientations[currentPosition.orientation].name}`,null);
		
		return {
			currentPosition: currentPosition,
			executionSuccess: true,
			message: null
		};
	};

	const resetFunction = function(currentPosition){
		
		currentPosition.x_position = null;
		currentPosition.y_position = null;
		currentPosition.orientation = null;
		currentPosition.isPlaced = false;

		return {
			currentPosition: currentPosition,
			executionSuccess: true,
			message: null
		};
	};

	return {
		place:place,
		move:move,
		// turn:turn,
		left:left,
		right:right,
		uturn:uturn,
		report:report,
		reset:reset,
	};
}());