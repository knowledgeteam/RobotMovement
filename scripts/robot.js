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

var robot = (function(){

	var x_position = null;
	var y_position = null;
	var orientation = null;				// index on the orientations array in app_settings
	var isPlaced = false;

	const place = function(new_x_position,new_y_position,direction){

		var newCoordinates = validate.coordinates(new_x_position,new_y_position);
		var newDirection = validate.orientationType(direction,"orientations");

		if (!newCoordinates.valid){ return {"message":newCoordinates.message};}
		if (!newDirection.found){ return {"message":newDirection.message};}

		robot.x_position = parseInt(new_x_position);
		robot.y_position = parseInt(new_y_position);
		robot.orientation = newDirection.index;
		robot.isPlaced = true;
	};

	const move = function(moveType,moveDistance){

		var new_x_position, new_y_position;
		var newCoordinates;
		var relativeMovementIndex;
		var robotPlaced = validate.robotIsPlaced();
		var moveTypeIndex = validate.orientationType(moveType,"movementRelativeToOrientation");

		if (!robotPlaced.onGrid){ return {"message":robotPlaced.message};}
		if (!moveTypeIndex.found){ return {"message":moveTypeIndex.message};}

		//relative movement is the direction of travel - not neccessarily the direction the robot is facing
		relativeMovementIndex = robot.orientation + app_settings.movementRelativeToOrientation[moveTypeIndex.index].movementOrientationAdjustment;
		relativeMovementIndex = adjustToValidOrientation(relativeMovementIndex);

		new_x_position = robot.x_position + (app_settings.orientations[relativeMovementIndex].xAxisChange*moveDistance);
		new_y_position = robot.y_position + (app_settings.orientations[relativeMovementIndex].yAxisChange*moveDistance);

		newCoordinates = validate.coordinates(new_x_position,new_y_position);

		if (newCoordinates.valid){
			robot.x_position = new_x_position;
			robot.y_position = new_y_position;
		} else {
			return {"message":newCoordinates.message};
		}
	};

	const turn = function(turnName){

		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.onGrid){ return {"message":robotPlaced.message};}
		
		var relativeOrientation = validate.orientationType(turnName,"relativeOrientation");

		if (relativeOrientation.found){
			// change the orientation of the robot by the number indicated in the orientationChange field for that move
			robot.orientation = robot.orientation + app_settings.relativeOrientation[relativeOrientation.index].orientationChange;
			robot.orientation = adjustToValidOrientation(robot.orientation);
		}
	};

	const report = function(){

		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.onGrid){ return {"message":robotPlaced.message};}

		command_history.addEntry(`Report: Position: (${robot.x_position},${robot.y_position}) facing ${app_settings.orientations[robot.orientation].name}`);
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

	const reset = function(){
		robot.x_position = null;
		robot.y_position = null;
		robot.orientation = null;
		robot.isPlaced = false;
	};

	const interpretCommand = function(rawUserCommand){

		var checkInput = validate.userInput(rawUserCommand);
		var commandResult;
		var message;
		var success = true;

		if (checkInput.isValid){
			// Assume there are multiple parameters
			commandResult = robot[checkInput.command].apply(null,checkInput.parameters);

			// if there was an error message then log it.
			if (!jQuery.isEmptyObject(commandResult)){
				console.warn(`Execution error: ${commandResult.message}`);
				message = commandResult.message;
				success = false;
			}

		} else {
			// command validation failed
			console.warn(`Validation error: ${checkInput.message}`);
			message = checkInput.message;
			success = false;
		}

		//temp update the viewmodel here
		gridViewModel.robot_x = robot.x_position;
		gridViewModel.robot_y = robot.y_position;

		if (robot.isPlaced){
			gridViewModel.robot_imgRotateAngle = app_settings.orientations[robot.orientation].imgRotateAngle;
		}

 		command_history.addEntry(rawUserCommand,message);
 		return success;
	};

	return {
		place:place,
		move:move,
		turn:turn,
		report:report,
		reset:reset,
		interpretCommand:interpretCommand
	};
}());