// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robot.js | Purpose:
// Define the robot and all functions related to its orientation and movement.
// The public functions defined here will be called from either the command input
// on the GUI or from the console.
// ===============================================================================

var robotMoves = (function(){

	// orientations: All possible robot orientations, and how movement in that
	// orientation translates into change on the X or Y axis.
	const orientations = [
		{name:"north", xAxisChange:0,yAxisChange:1},
		{name:"east", xAxisChange:1,yAxisChange:0},
		{name:"south", xAxisChange:0,yAxisChange:-1},
		{name:"west", xAxisChange:-1,yAxisChange:0}
	];

	// relativeOrientation: All possible robot orientation changes, and how that change
	// will affect the robots current orientation index.
	const relativeOrientation = [
		{name:"left", orientationChange:-1},
		{name:"right", orientationChange:1},
		{name:"uturn", orientationChange:+2}
	];

	// movementRelativeToOrientation: All valid movements, and the direction of travel
	// relative to the direction the robot is facing.
	const movementRelativeToOrientation = [
		{name:"forward",movementOrientationAdjustment:0},
		{name:"forwards",movementOrientationAdjustment:0},
		{name:"ahead",movementOrientationAdjustment:0},
		{name:"backward",movementOrientationAdjustment:+2},
		{name:"backwards",movementOrientationAdjustment:+2},
		{name:"slide-right",movementOrientationAdjustment:+1},
		{name:"slide-left",movementOrientationAdjustment:-1}
	];



	// ================================================================================
	// Function: robot.adjustToValidOrientation
	// Parameters :
	// 	orientationIndex : The orientation index to be adjusted
	// --------------------------------------------------------------------------------
	// Purpose:
	// Adjust the robots orintation index so that it remains a valid pointer to the
	// orientations array. 
	// --------------------------------------------------------------------------------
	// Notes:
	// Because we are keeping track of the robots orientation with an index to an array
	// it can step outside the bounds of the array. This function ensures that in this
	// situation the index will loop around on itself instead.

	// e.g. if the robot keeps turning right, the orientation index will keep
	// increasing and it can exceed the size of the orientations array.
	// This function is only used by the robot object so has not been made public
	// ================================================================================
	const adjustToValidOrientation = function(orientationIndex){

		while (orientationIndex <0){
			orientationIndex = orientationIndex + orientations.length;
		}
		while (orientationIndex >= orientations.length){
			orientationIndex = orientationIndex - orientations.length;
		}
		return orientationIndex;
	}; // End Function: robot.adjustToValidOrientation


	// ================================================================================
	// Function: robot.setOrientation
	// Parameters :
	// 	direction : A string containing the name of a direction. eg. "west"
	// --------------------------------------------------------------------------------
	// Purpose:
	// Validate and set the robots orientation index
	// --------------------------------------------------------------------------------
	// Notes: 
	// The orientation is stored as an index of the orientations array.
	// This function is only used by the robot object so has not been made public
	// ================================================================================
	const setOrientation = function(direction){

		// match against known valid orientations
		var index = orientations.findIndex(orientations => orientations.name==direction);

		if (index == -1){
			// Unknown orientation 
			return false;
		}
		robot.orientation = index;
		return true;
	}; // End Function: robot.setOrientation


	// ================================================================================
	// Function: robot.setRelativeOrientation
	// Parameters :
	// 	turnName : A string containing the name of a direction change. eg. "left"
	// --------------------------------------------------------------------------------
	// Purpose:
	// Change the direction the robot is facing relative to its current direction.
	// --------------------------------------------------------------------------------
	// Notes: 
	// This function is only used by the robot object so has not been made public
	// ================================================================================
	const setRelativeOrientation = function(turnName){
		console.info(`FUNCTION: ${turnName}`);
		//check if robot is placed
		if (!robot.isPlaced){
			console.warn("Robot needs to be placed before any actions are taken");
			return {
				"success":false,
				"message":"Robot cannot turn until it has been placed on the grid."
			};
		}
		
		// match against known valid relative orientations
		var index = relativeOrientation.findIndex(relativeOrientation => relativeOrientation.name==turnName);

		//return without action if invalid
		// we shouldn't be able to hit this error as it is a private function and we make the calls to it
		if (index == -1){
			return {
				"success":false,
				"message":`Robot cannot turn ${turnName}.`
			};
		}
		else {
			// change the orientation of the robot by the number indicated in the orientationChange field for that move
			robot.orientation = robot.orientation + relativeOrientation[index].orientationChange;
			robot.orientation = adjustToValidOrientation(robot.orientation);

			//draw the robot on the GUI
			robot.draw();

			return {
				"success":true,
				"message":""
			};
		}
	}; // End Function: robot.setRelativeOrientation


	// ================================================================================
	// Functions: robot.left || robot.right || robot.uturn
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Make calls to setRelativeOrientation with the appropriate parameter 
	// --------------------------------------------------------------------------------
	// Notes: 
	// These need to be public functions so they can be called by the command
	// interpreter.
	// ================================================================================
	const left 	= function(){ return setRelativeOrientation("left");};
	const right = function(){ return setRelativeOrientation("right");};
	const uturn = function(){ return setRelativeOrientation("uturn");};


	// public functions/variables
	return {
		place:place,
		move:move,
		left:left,
		right:right,
		uturn:uturn,
		report:report,
		wander:wander,
		reset:reset,
		test:test,
		interpretCommand:interpretCommand,
		draw:draw
	};
}());
