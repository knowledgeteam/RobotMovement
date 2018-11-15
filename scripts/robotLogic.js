// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robotCommands.js | Purpose:
// Define the robot and all functions related to its orientation and movement.
// The public functions defined here will be called from either the command input
// on the GUI or from the console.
// ================================================================================

var robotLogic = (function(){

	const orientations = [
		{name:"north", xAxisChange: 0,yAxisChange: 1,imgRotateAngle:0},
		{name:"east",  xAxisChange: 1,yAxisChange: 0,imgRotateAngle:90},
		{name:"south", xAxisChange: 0,yAxisChange:-1,imgRotateAngle:180},
		{name:"west",  xAxisChange:-1,yAxisChange: 0,imgRotateAngle:270}
	];

	// relativeOrientation: All possible robot orientation changes, and how that change
	// will affect the robots current orientation index.
	const relativeOrientation = [
		{name:"left",  orientationChange:-1},
		{name:"right", orientationChange:+1},
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

	// public functions/variables
	return {
		orientations:orientations,
		relativeOrientation:relativeOrientation,
		movementRelativeToOrientation:movementRelativeToOrientation
	};
}());
