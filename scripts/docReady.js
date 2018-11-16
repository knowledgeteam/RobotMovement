// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// main.js | Purpose:

// ================================================================================
"use strict"
jQuery(document).ready(function(){

	var commandSelector = jQuery("#commandInput");

	// Set focus on the command input
	commandSelector.focus();

	// listen for commands (fire on 'enter' keyup)
	commandSelector.on('keyup', function (e) {
		if (e.keyCode == 13) {
			robot.interpretCommand(commandSelector.val());
			commandSelector.val("");
		}
	});
});