// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// app_settings.js | Purpose:
// configurable settings for the project
// ================================================================================
var app_settings = (function(){
	"use strict";

	const gridSize = 5;   // number of cells in each row/col of the grid (some display issues when >10)
	const logLength = 10; // Number of entries to display in the command history

	const menuButtons = [{
			"buttonName":"Help",
			"click":"$('#commandsModal').modal('show');"
		},{
			"buttonName":"Run Tests",
			"click":"robotCommands_test.run();"
		},{
			"buttonName":"Reset Robot",
			"click":`robot.invokeCommand("reset");`
		}];

	var orientations = [
		{name: "north", xAxisChange: 0,yAxisChange: 1,imgRotateAngle:   0},
		{name: "east",  xAxisChange: 1,yAxisChange: 0,imgRotateAngle:  90},
		{name: "south", xAxisChange: 0,yAxisChange:-1,imgRotateAngle: 180},
		{name: "west",  xAxisChange:-1,yAxisChange: 0,imgRotateAngle: 270}
	];

	// relativeOrientation: All possible robot orientation changes, and how that change
	// will affect the robots current orientation index.
	var relativeOrientation = [
		{name: "left",  orientationChange:-1},
		{name: "right", orientationChange:+1},
		{name: "uturn", orientationChange:+2}
	];

	// movementRelativeToOrientation: All valid movements, and the direction of travel
	// relative to the direction the robot is facing.
	var movementRelativeToOrientation = [
		{name:"forward",     movementOrientationAdjustment: 0},
		{name:"forwards",    movementOrientationAdjustment: 0},
		{name:"ahead",       movementOrientationAdjustment: 0},
		{name:"backward",    movementOrientationAdjustment:+2},
		{name:"backwards",   movementOrientationAdjustment:+2},
		{name:"slide-right", movementOrientationAdjustment:+1},
		{name:"slide-left",  movementOrientationAdjustment:-1}
	];

	var allowDiagonals = false; // added to show how the behaviour can be changed

	if (allowDiagonals){

		orientations = [
			{name:"north",     xAxisChange: 0,yAxisChange: 1,imgRotateAngle:   0},
			{name:"northeast", xAxisChange: 1,yAxisChange: 1,imgRotateAngle:  45},
			{name:"east",      xAxisChange: 1,yAxisChange: 0,imgRotateAngle:  90},
			{name:"southeast", xAxisChange: 1,yAxisChange:-1,imgRotateAngle: 135},
			{name:"south",     xAxisChange: 0,yAxisChange:-1,imgRotateAngle: 180},
			{name:"southwest", xAxisChange:-1,yAxisChange:-1,imgRotateAngle: 225},
			{name:"west",      xAxisChange:-1,yAxisChange: 0,imgRotateAngle: 270},
			{name:"northwest", xAxisChange:-1,yAxisChange: 1,imgRotateAngle: 305},
		];

		relativeOrientation = [
			{name:"left",  orientationChange:-1},
			{name:"right", orientationChange:+1},
			{name:"uturn", orientationChange:+4}
		];

		movementRelativeToOrientation = [
			{name:"forward",     movementOrientationAdjustment: 0},
			{name:"forwards",    movementOrientationAdjustment: 0},
			{name:"ahead",       movementOrientationAdjustment: 0},
			{name:"backward",    movementOrientationAdjustment:+4},
			{name:"backwards",   movementOrientationAdjustment:+4},
			{name:"slide-right", movementOrientationAdjustment:+2},
			{name:"slide-left",  movementOrientationAdjustment:-2}
		];
	}
	return {
		gridSize:gridSize,
		logLength:logLength,
		menuButtons:menuButtons,
		orientations:orientations,
		relativeOrientation:relativeOrientation,
		movementRelativeToOrientation:movementRelativeToOrientation
	};
}());