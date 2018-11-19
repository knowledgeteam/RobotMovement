// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robotCommands_test.js | Purpose:
// Run a sequence of tests. Output will be displayed in the console.
// ================================================================================
var robotCommands_test = (function(){
	"use strict";
	const run = function(){

		var failedTests;

		// ensure we know the current state of the robot
		robot.invokeCommand("reset");

		// run all tests
		for (var i = 0; i < tests.length; i++) {
			tests[i].actualResult = robot.invokeCommand(tests[i].command);

			//check if result of the test matched expectations
			if (tests[i].expectedSuccess==tests[i].actualResult){
				tests[i].testSuccess = true;
			} else {
				tests[i].testSuccess = false;
			}
		}

		// find tests that failed
		failedTests = jQuery.grep(tests, function(test,index) {
			return !test.testSuccess;
		});

		robot.addCommandLog(`${tests.length} tests run. ${failedTests.length} failed. See console (F12) for details`,null);
		
		//display results
		console.table(tests);
	};

	// Note - tests currently assume a 5x5 grid
	var tests = [

	// Unknown function (invalid function call)
		{ 
			"function": "unknown",    // function being tested
			"command": "dance",       // command being sent in test
			"expectedSuccess": false, // do we expect this test to succeed?
			"actualResult": null,     // result of test
			"testSuccess": null       // did the actual result match the expected result
		},
	// Move function tests
		{"function": "move",	"command": "move",					"expectedSuccess": false},
		{"function": "place",	"command": "place 2,0,north",		"expectedSuccess": true},
		{"function": "move",	"command": "move",					"expectedSuccess": true},
		{"function": "move",	"command": "move  ",				"expectedSuccess": true},
		{"function": "move",	"command": " move ",				"expectedSuccess": true},
		{"function": "move",	"command": "  move",				"expectedSuccess": true},
		{"function": "move",	"command": "move  backwards , 3",	"expectedSuccess": true},

		{"function": "move",	"command": "move backwards",		"expectedSuccess": false},
		{"function": "move",	"command": "move forwards,2",		"expectedSuccess": true},
		{"function": "move",	"command": "move 6",				"expectedSuccess": false},
		{"function": "move",	"command": "move over",				"expectedSuccess": false},
		{"function": "move",	"command": "move 2,slide-left",		"expectedSuccess": false},
		{"function": "move",	"command": "move slide-left,2",		"expectedSuccess": true},
		{"function": "move",	"command": "move 2,2,2,2,2",		"expectedSuccess": false},
	// Reset function tests
		{"function": "reset",	"command": "reset",					"expectedSuccess": true},
	// Place function tests
		{"function": "place",	"command": "place 0,0,north",		"expectedSuccess": true},
		{"function": "place",	"command": "place 0,0,south",		"expectedSuccess": true},
		{"function": "place",	"command": "place 0,0,east",		"expectedSuccess": true},
		{"function": "place",	"command": "place 0,0,west",		"expectedSuccess": true},
	// place edge cases
		{"function": "place",	"command": "place 0,0,north",		"expectedSuccess": true},
		{"function": "place",	"command": "place -1,0,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 0,-1,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place -1,-1,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 0,4,north",		"expectedSuccess": true},
		{"function": "place",	"command": "place -1,4,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 0,5,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place -1,5,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 4,0,north",		"expectedSuccess": true},
		{"function": "place",	"command": "place 5,0,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 4,-1,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 5,-1,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 4,4,north",		"expectedSuccess": true},
		{"function": "place",	"command": "place 4,5,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 5,4,north",		"expectedSuccess": false},
		{"function": "place",	"command": "place 5,5,north",		"expectedSuccess": false},
	// place parameter tests
		{"function": "place",	"command": "place",					"expectedSuccess": false},
		{"function": "place",	"command": "place 0",				"expectedSuccess": false},
		{"function": "place",	"command": "place there",			"expectedSuccess": false},
		{"function": "place",	"command": "place 0,0",				"expectedSuccess": false},
		{"function": "place",	"command": "place it,over,here",	"expectedSuccess": false},
		{"function": "place",	"command": "place 0,here,now",		"expectedSuccess": false},
		{"function": "place",	"command": "place here,0,what",		"expectedSuccess": false},
		{"function": "place",	"command": "place false",			"expectedSuccess": false},
		{"function": "place",	"command": "place 0,0,thatWay",		"expectedSuccess": false},
		{"function": "place",	"command": "place one,0,north",		"expectedSuccess": false},
	// Turn function tests	
		{"function": "turn",	"command": "left",					"expectedSuccess": true},
		{"function": "turn",	"command": "right",					"expectedSuccess": true},
		{"function": "turn",	"command": "uturn",					"expectedSuccess": true},
	// Report function tests
		{"function": "report",	"command": "report",				"expectedSuccess": true}
	];

	return {
		run:run
	};
}());