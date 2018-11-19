// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// command_listener.js | Purpose:
// Send entered user commands to be interpreted.
// ================================================================================
jQuery(document).ready(function(){
	"use strict";
	var commandSelector = jQuery("#commandInput");

	// Set focus on the command input
	commandSelector.focus();

	// listen for commands (invoke on 'enter' keyup)
	commandSelector.on('keyup', function (e) {
		if (e.keyCode == 13) {
			robot.invokeCommand(commandSelector.val());
			commandSelector.val("");
		}
	});
});