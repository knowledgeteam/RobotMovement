// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// main.js | Purpose:
// Define initial parameters for the objects requiring them and listen for events
// from the user
// ================================================================================

jQuery(document).ready(function(){

	// Initial settings
	var gridSize = 5;	// Can run with various grid sizes (may be some styling issues)
	var logLength = 10;

	var gridSelector = jQuery("#grid");
	var logSelector = jQuery("#log");
	var commandSelector = jQuery("#commandInput");

	// Set focus on the command input
	commandSelector.focus();

	// Set up the grid and th log
	grid.init(gridSize,gridSelector);
	log.init(logLength,logSelector);

	// Adjust cell width to fit in available space (in case of grid size changes)
	var cells = document.querySelectorAll('.cell');
	var cellSize = (gridSelector.width() /gridSize)-4;

	for (var i=0; i<cells.length; i++){
		cells[i].style.width = cellSize + "px";
		cells[i].style.height = cellSize + "px";
	}

	// listen for commands (fire on 'enter' keyup)
	commandSelector.on('keyup', function (e) {
		if (e.keyCode == 13) {
			// process command
			robot.interpretCommand(commandSelector.val());
			// clear command input
			commandSelector.val("");
		}
	});
});