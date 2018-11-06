// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// grid.js | Purpose:
// Define the grid and all functions related to it.
// The public functions defined here will be initialised from main.js then called
// from robot.js
// ================================================================================

var grid = (function(){

	var size;

	// ================================================================================
	// Function: grid.init
	// Parameters :
	// 	size 	 : The grid will always be a square with dimensions (size) by (size) 
	// 	selector : The jQuery selector used to access the grid element on the DOM
	// --------------------------------------------------------------------------------
	// Purpose:
	// Initialise the grid object with the supplied values.
	// ================================================================================
	var init = function(size,selector){

		this.size = size;

		// loop through creating the grid
		// give rows and columns numbered classes so we can identify individual cells
		for (var y = 0; y < size; y++) {
			selector.prepend("<div id='row_"+y+"'></div>");

			for (var x = 0; x < size; x++) {
				jQuery("#row_"+y).append(`<div class="cell row_${y} col_${x}"><span class="coordinates">(${x},${y})</span></div>`);
			}
		}
	}; // End Function: grid.init

	// ================================================================================
	// Function: grid.validPosition
	// Parameters :
	// 	x : The x co-ordinate of the cell to be checked.
	// 	y : The y co-ordinate of the cell to be checked.
	// --------------------------------------------------------------------------------
	// Purpose:
	// Check if the supplied cell is contined within the grid.
	// ================================================================================
	var validPosition = function(x,y){
		
		var valid = true;

		// Check if the coordinates are outside the grid
		if (x>=this.size){ valid = false;}
		if (y>=this.size){ valid = false;}
		if (x<0){ valid = false;}
		if (y<0){ valid = false;}


		return valid;
	}; // End Function: grid.validPosition

	// public functions/variables
	return {
		size:size,
		validPosition:validPosition,
		init:init
	};
})();