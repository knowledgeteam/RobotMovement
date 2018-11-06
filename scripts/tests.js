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
	{
		"function" : "move",
		"command" : "move",
		"expectedSuccess" : false, // since robot has not been placed
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "place",
		"command" : "place 2,2,north",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move backwards",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move backwards,2",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move 6",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move over",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move 2,slide-left",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "move",
		"command" : "move 2,2,2,2,2",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},
// Place function tests
	{
		"function" : "place",
		"command" : "place 0,0,north",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,0,south",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,0,east",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,0,west",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},
// place edge cases
	{
		"function" : "place",
		"command" : "place 0,0,north",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "place",
		"command" : "place -1,0,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,-1,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place -1,-1,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,4,north",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "place",
		"command" : "place -1,4,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,5,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place -1,5,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 4,0,north",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "place",
		"command" : "place 5,0,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 4,-1,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 5,-1,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 4,4,north",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null
	},{
		"function" : "place",
		"command" : "place 4,5,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 5,4,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 5,5,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},
// place parameter tests
	{
		"function" : "place",
		"command" : "place",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place there",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,0",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place over,there",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place over there",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,here",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place here,0",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place false",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place 0,0,thatWay",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place one,0,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "place",
		"command" : "place one,0,north",
		"expectedSuccess" : false,
		"actualResult" : null,
		"testSuccess" : null	
	},
// Turn function tests
	{
		"function" : "turn",
		"command" : "left",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "turn",
		"command" : "right",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "turn",
		"command" : "uturn",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},{
		"function" : "turn",
		"command" : "left 4",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	},
// Report function tests
	{
		"function" : "report",
		"command" : "report",
		"expectedSuccess" : true,
		"actualResult" : null,
		"testSuccess" : null	
	}
	
];