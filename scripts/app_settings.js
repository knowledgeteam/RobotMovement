"use strict"
var app_settings = (function(){

	const gridSize = 5;		// number of cells in each row/col of the grid
	const logLength = 10;	// Number of entries to display in the command history

	const menuButtons = [{
			"buttonName":"Commands",
			"click":"$('#commandsModal').modal('show');"
		},{
			"buttonName":"Test",
			"click":"test.run();"
		},{
			"buttonName":"Reset",
			"click":`robot.invokeCommand("reset");`
		}];

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

	return {
		gridSize:gridSize,
		logLength:logLength,
		menuButtons:menuButtons,
		orientations:orientations,
		relativeOrientation:relativeOrientation,
		movementRelativeToOrientation:movementRelativeToOrientation
	};
}());
