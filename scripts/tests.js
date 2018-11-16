// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// tests.js | Purpose:
// The tests described below are part of an automated testing system triggered by
// the user. Results of the test are added to the log. Detailed results will be
// displayed in a table on the console.
// ================================================================================
"use strict"
var test = (function(){

	const run = function(){

		var result;
		var failedTests;

		// ensure we are at an expected state by resetting everything
		robot.reset();

		// run all tests
		for (var i = 0; i < tests.length; i++) {
			tests[i].actualResult = robot.interpretCommand(tests[i].command);

			//check if result of the test matched expectations
			if (tests[i].expectedSuccess==tests[i].actualResult){
				tests[i].testSuccess = true;
			} else {
				tests[i].testSuccess = false;
			}
			
		}

		// find tests that failed
		failedTests = jQuery.grep(tests, function( n, i ) {
			return !n.testSuccess;
		});

		command_history.addEntry(`<strong>${tests.length} tests run. ${failedTests.length} failed</strong><br>see console (F12) for details`);

		//display results
		console.table(tests);

	};

	// public functions/variables
	return {
		run:run
	};
}());

var tests = [

// Unknown function (invalid function call)
	{ 
		"function" : "unknown",			// function being tested
		"command" : "dance",			// command being sent in test
		"expectedSuccess" : false,		// do we expect this test to succeed?
		"actualResult" : null,			// result of test
		"testSuccess" : null			// did the actual result match the expected result
	},
// Move function tests
	{"function" : "move",	"command" : "move",				"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 2,2,north",	"expectedSuccess" : true},
	{"function" : "move",	"command" : "move",				"expectedSuccess" : true},
	{"function" : "move",	"command" : "move backwards",	"expectedSuccess" : false},
	{"function" : "move",	"command" : "move backwards,2",	"expectedSuccess" : true},
	{"function" : "move",	"command" : "move 6",			"expectedSuccess" : false},
	{"function" : "move",	"command" : "move over",		"expectedSuccess" : false},
	{"function" : "move",	"command" : "move 2,slide-left","expectedSuccess" : false},
	{"function" : "move",	"command" : "move slide-left,2","expectedSuccess" : true},
	{"function" : "move",	"command" : "move 2,2,2,2,2",	"expectedSuccess" : false},
// Place function tests
	{"function" : "place",	"command" : "place 0,0,north",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place 0,0,south",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place 0,0,east",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place 0,0,west",	"expectedSuccess" : true},
// place edge cases
	{"function" : "place",	"command" : "place 0,0,north",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place -1,0,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0,-1,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place -1,-1,north","expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0,4,north",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place -1,4,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0,5,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place -1,5,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 4,0,north",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place 5,0,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 4,-1,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 5,-1,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 4,4,north",	"expectedSuccess" : true},
	{"function" : "place",	"command" : "place 4,5,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 5,4,north",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 5,5,north",	"expectedSuccess" : false},
// place parameter tests
	{"function" : "place",	"command" : "place",			"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0",			"expectedSuccess" : false},
	{"function" : "place",	"command" : "place there",		"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0,0",		"expectedSuccess" : false},
	{"function" : "place",	"command" : "place over,there",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place over there",	"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0,here",		"expectedSuccess" : false},
	{"function" : "place",	"command" : "place here,0",		"expectedSuccess" : false},
	{"function" : "place",	"command" : "place false",		"expectedSuccess" : false},
	{"function" : "place",	"command" : "place 0,0,thatWay","expectedSuccess" : false},
	{"function" : "place",	"command" : "place one,0,north","expectedSuccess" : false},
// Turn function tests	
	{"function" : "turn",	"command" : "left",				"expectedSuccess" : true},
	{"function" : "turn",	"command" : "right",			"expectedSuccess" : true},
	{"function" : "turn",	"command" : "uturn",			"expectedSuccess" : true},
	{"function" : "turn",	"command" : "left 4",			"expectedSuccess" : true},
// Report function tests
	{"function" : "report",	"command" : "report",			"expectedSuccess" : true}

];