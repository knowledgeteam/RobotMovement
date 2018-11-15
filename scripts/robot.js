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

	var x_pos,y_pos;
	var orientation = null;	// The robots current orientation is an index on the orientations array.
	var isPlaced = false;

	const place = function(x,y,direction){

		var newPosition = validate.coordinates(x,y);
		var newDirection = validate.checkRobotLogic(direction,"orientations");

		if (!newPosition.valid){return {"message":newPosition.message};}
		if (!newDirection.found){return {"message":newDirection.message};}

		robot.x_pos = parseInt(x);
		robot.y_pos = parseInt(y);
		robot.orientation = newDirection.index;
		robot.isPlaced = true;
	};


	const move = function(){

		var new_x, new_y;
		var newPosition;
		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.onGrid){ return {"message":robotPlaced.message};}

		new_x = robot.x_pos + (robotLogic.orientations[robot.orientation].xAxisChange);
		new_y = robot.y_pos + (robotLogic.orientations[robot.orientation].yAxisChange);

		newPosition = validate.coordinates(new_x,new_y);

		if (newPosition.valid){
			robot.x_pos = new_x;
			robot.y_pos = new_y;
		} else {
			return {"message":newPosition.message};
		}
	};

	const left 	= function(){ return setRelativeOrientation("left");};
	const right = function(){ return setRelativeOrientation("right");};
	const uturn = function(){ return setRelativeOrientation("uturn");};

	const report = function(){

		if (robot.isPlaced){
			log.addEntry(`Report: Position: (${robot.x_pos},${robot.y_pos}) facing ${robotLogic.orientations[robot.orientation].name}`);
		} else {
			log.addEntry("Report: Robot has not been placed on the grid");
		}
	};


	const go = function(moveType,distance){

		var new_x, new_y;
		var relativeMovementIndex;
		var robotPlaced = validate.robotIsPlaced();
		var moveTypeIndex = validate.checkRobotLogic(moveType,"movementRelativeToOrientation");

		if (!robotPlaced.onGrid){	return {"message":robotPlaced.message};}
		if (!moveTypeIndex.found){	return {"message":moveTypeIndex.message};}

		//relative movement is the direction of travel - not neccessarily the direction the robot is facing
		relativeMovementIndex = robot.orientation + robotLogic.movementRelativeToOrientation[moveTypeIndex.index].movementOrientationAdjustment;
		relativeMovementIndex = adjustToValidOrientation(relativeMovementIndex);

		new_x = robot.x_pos + (robotLogic.orientations[relativeMovementIndex].xAxisChange*distance);
		new_y = robot.y_pos + (robotLogic.orientations[relativeMovementIndex].yAxisChange*distance);

		var newPosition = validate.coordinates(new_x,new_y);

		if (newPosition.valid){
			robot.x_pos = new_x;
			robot.y_pos = new_y;
		} else {
			return {"message":newPosition.message};
		}
	};


	const adjustToValidOrientation = function(orientationIndex){

		while (orientationIndex <0){
			orientationIndex = orientationIndex + robotLogic.orientations.length;
		}
		while (orientationIndex >= robotLogic.orientations.length){
			orientationIndex = orientationIndex - robotLogic.orientations.length;
		}
		return orientationIndex;
	};

	const setRelativeOrientation = function(turnName){

		var robotPlaced = validate.robotIsPlaced();
		if (!robotPlaced.onGrid){ return {"message":robotPlaced.message};}
		
		var relativeOrientation = validate.checkRobotLogic(turnName,"relativeOrientation");

		if (relativeOrientation.found){
			
			// change the orientation of the robot by the number indicated in the orientationChange field for that move
			robot.orientation = robot.orientation + robotLogic.relativeOrientation[relativeOrientation.index].orientationChange;
			robot.orientation = adjustToValidOrientation(robot.orientation);

		} else {
			return {"message":`Robot cannot turn ${turnName}.`};
		}
	};

	const reset = function(){
		// clear robot variables
		robot.x_pos = null;
		robot.y_pos = null;
		robot.orientation = null;
		robot.isPlaced = false;
	};

	const interpretCommand = function(input){

		var checkInput = validate.userInput(input);
		var executeCommand;
		var message;
		var success = true;

		if (checkInput.isValid){
			// Assume there are multiple parameters
			executeCommand = robot[checkInput.command].apply(null,checkInput.parameters);

			// if there was an error message then log it.
			if (!jQuery.isEmptyObject(executeCommand)){
				console.warn(`Execution error: ${executeCommand.message}`);
				message = executeCommand.message;
				success = false;
			}

		} else {
			// command validation failed
			console.warn(`Validation error: ${checkInput.message}`);
			message = checkInput.message;
			success = false;
		}

		//temp update the viewmodel here
		vm.robot_x = robot.x_pos;
		vm.robot_y = robot.y_pos;

		if (robot.isPlaced){
			vm.robot_imgRotateAngle = robotLogic.orientations[robot.orientation].imgRotateAngle;
		}

 		log.addEntry(input,message);
 		return success;
	};

	// public functions/variables
	return {
		place:place,
		move:move,
		go:go,
		left:left,
		right:right,
		uturn:uturn,
		report:report,
		reset:reset,
		interpretCommand:interpretCommand,
		isPlaced:isPlaced
	};
}());
