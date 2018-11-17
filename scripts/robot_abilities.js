// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robot_abilities.js | Purpose:
// Define the robot and all functions related to its orientation and movement.
// The public functions defined here will be called from either the command input
// on the GUI or from the console.
// ================================================================================
"use strict"

var robot_abilities = (function(){

	const command = function(execute,parameters){
		this.execute = execute;
		this.parameters = parameters;
	};

	const place = function(new_x_position,new_y_position,direction){
		var placeParameters = {	"new_x_position" : new_x_position,
								"new_y_position" : new_y_position,
								"direction" : direction};
		return new command(placeFunction,placeParameters);
	};

	const move = function(moveType,moveDistance){
		var moveParameters = {	"moveType" : moveType,
								"moveDistance" : moveDistance};
		return new command(moveFunction,moveParameters);
	};

	const turn = function(turnName){
		var turnParameters = {	"turnName" : turnName};
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
			robot.addCommandLogError(newCoordinates.message);
			return currentPosition;
		}
		if (!newDirection.found){
			robot.addCommandLogError(newDirection.message);
			return currentPosition;
		}

		currentPosition.x_position = parseInt(moveParameters.new_x_position);
		currentPosition.y_position = parseInt(moveParameters.new_y_position);
		currentPosition.orientation = newDirection.index;
		currentPosition.isPlaced = true;

		return currentPosition;
	};

	const moveFunction = function(currentPosition,moveParameters){

		var new_x_position, new_y_position;
		var newCoordinates;
		var relativeMovementIndex;
		var robotPlaced = validate.robotIsPlaced();
		var moveTypeIndex = validate.orientationType(moveParameters.moveType,"movementRelativeToOrientation");

		if (!robotPlaced.onGrid){
			robot.addCommandLogError(robotPlaced.message);
			return currentPosition;
		}
		if (!moveTypeIndex.found){
			robot.addCommandLogError(moveTypeIndex.message);
			return currentPosition;
		}

		//relative movement is the direction of travel - not neccessarily the direction the robot is facing
		relativeMovementIndex = robot.currentPosition.orientation + app_settings.movementRelativeToOrientation[moveTypeIndex.index].movementOrientationAdjustment;
		relativeMovementIndex = adjustToValidOrientation(relativeMovementIndex);

		new_x_position = robot.currentPosition.x_position + (app_settings.orientations[relativeMovementIndex].xAxisChange*moveParameters.moveDistance);
		new_y_position = robot.currentPosition.y_position + (app_settings.orientations[relativeMovementIndex].yAxisChange*moveParameters.moveDistance);

		newCoordinates = validate.coordinates(new_x_position,new_y_position);

		if (newCoordinates.valid){
				currentPosition.x_position = new_x_position;
				currentPosition.y_position = new_y_position;

		} else {
			robot.addCommandLogError(newCoordinates.message);
			return currentPosition;
		}

		return currentPosition;
	};

	const turnFunction = function(currentPosition,turnParameters){

		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.onGrid){
			robot.addCommandLogError(robotPlaced.message);
			return currentPosition;
		}

		var relativeOrientation = validate.orientationType(turnParameters.turnName,"relativeOrientation");

		if (relativeOrientation.found){
			// change the orientation of the robot by the number indicated in the orientationChange field for that move
			currentPosition.orientation = robot.currentPosition.orientation + app_settings.relativeOrientation[relativeOrientation.index].orientationChange;
			currentPosition.orientation = adjustToValidOrientation(robot.currentPosition.orientation);
		}
		return currentPosition;
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

		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.onGrid){
			robot.addCommandLogError(robotPlaced.message);
			return currentPosition;
		}
		robot.addCommandLog(`Report: Position: (${currentPosition.x_position},${currentPosition.y_position}) facing ${app_settings.orientations[currentPosition.orientation].name}`,null);

		return currentPosition;
	};

	const resetFunction = function(currentPosition){
		currentPosition.x_position = null;
		currentPosition.y_position = null;
		currentPosition.orientation = null;
		currentPosition.isPlaced = false;
		return currentPosition;
	};

	return {
		place:place,
		move:move,
		turn:turn,
		report:report,
		reset:reset,
	};
}());