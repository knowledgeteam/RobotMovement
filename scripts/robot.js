// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// robot.js | Purpose:
// Define the robot and all functions related to its orientation and movement.
// The public functions defined here will be called from either the command input
// on the GUI or from the console.
// ================================================================================

var robot = (function(){
	console.log("Robot powering up");
	
	var x_pos = null;
	var y_pos = null;
	var orientation = null;	// The robots current orientation is an index on the orientations array.
	var isPlaced = false;

	// orientations: All possible robot orientations, and how movement in that
	// orientation translates into change on the X or Y axis.
	const orientations = [
		{name:"north", xAxisChange:0,yAxisChange:1},
		{name:"east", xAxisChange:1,yAxisChange:0},
		{name:"south", xAxisChange:0,yAxisChange:-1},
		{name:"west", xAxisChange:-1,yAxisChange:0}
	];

	// relativeOrientation: All possible robot orientation changes, and how that change
	// will affect the robots current orientation index.
	const relativeOrientation = [
		{name:"left", orientationChange:-1},
		{name:"right", orientationChange:1},
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

	// ================================================================================
	// Function: robot.place
	// Parameters :
	// 	x : The x co-ordinate of the cell the robot is to be placed in.
	// 	y : The y co-ordinate of the cell the robot is to be placed in
	//	f : The direction the robot is to be placed facing. eg. North
	// --------------------------------------------------------------------------------
	// Purpose:
	// Place the robot on the grid.
	// ================================================================================
	const place = function(x,y,f){
		console.info(`FUNCTION: place(${x},${y},${f})`);

		// validate number of parameters
		if (arguments.length!=3){
			return {
				"success":false,
				"message":"'Place' command expects 3 parameters."
			};
		}

		// Clean input
		x = parseInt(x);
		y = parseInt(y);
		f = f.toLowerCase();
		f = f.trim();

		// Validate input
		if (isNaN(x) || isNaN(y)){
			return {
				"success":false,
				"message":"Co-ordinates supplied to 'Place' command are not numbers."
			};
		}

		var position = grid.validPosition(x,y);
		var direction = setOrientation(f);

		// Check if position and direction are valid
		if (position && direction){
			robot.x_pos = x;
			robot.y_pos = y;
			robot.isPlaced = true;

			robot.draw();

			return {
				"success":true,
				"message":""
			};

		} else {

			// Return appropriate error message 
			if (!position){
				return {
					"success":false,
					"message":"Co-ordinates supplied to 'Place' command are outside the grid."
				};
			}

			if (!direction){
				return {
					"success":false,
					"message":"Direction supplied to 'Place' command is not recognised."
				};
			}
		}

	}; // End Function: robot.place


	// ================================================================================
	// Function: robot.move
	// Parameters :
	// 	param1 : Optional parameter containing either the distance or the move type
	// 	param2 : Optional parameter containing either the distance or the move type
	// --------------------------------------------------------------------------------
	// Purpose:
	// Move the robot on the grid.
	// --------------------------------------------------------------------------------
	// Notes:
	// Defaults to 1 space forwards when sent no parameters
	// 
	// The parameters for this are not explicitly named because it means we can accept
	// commands with a variety of parameters by deducing what each parameter is.
	// 
	// This means we can accept moves such as  move('slide-left') as well as 
	// move('backwards',2) or move(4,'forwards') or just plain move().
	// ================================================================================
	const move = function(param1,param2){
		console.info(`FUNCTION: move ${param1},${param2}`);

		var typeIndex = null;//movementRelativeToOrientation[0]; //forward
		var distance = null;
		var checkIndex;
		var checkNumber;


		var new_x;
		var new_y;

		//check if robot is placed
		if (!robot.isPlaced){
			console.warn("Robot needs to be placed before any actions are taken");
			return {
				"success":false,
				"message":"Robot cannot move until it has been placed on the grid."
			};
		}

		//check each param to determine if its the type or distance
		for (var i = 0; i < arguments.length; i++) {

			// check if this parameter the movement type
			checkIndex = movementRelativeToOrientation.findIndex(movementRelativeToOrientation => movementRelativeToOrientation.name==arguments[i]);
			if (checkIndex == -1){/*this is not the movement type.*/}
			else {
				// warn if we already found a value
				if (!typeIndex){
					typeIndex = checkIndex;
				} else {
					console.warn("A value for movement type was already found - subsequent values will be ignored");
				}
			}

			// check if this parameter the distance
			checkNumber = parseInt(arguments[i]);

			if (isNaN(checkNumber)){/*this is not the distance*/}
			else {
				// warn if we already found a value
				if (!distance){
					distance = checkNumber;
				} else {
					console.warn("A value for distance was already found - subsequent values will be ignored");
				}
			}
		}

		// if no parameters matched then use default movements
		if (!typeIndex){ typeIndex = 0;} //forward
		if (distance==null){ distance = 1;}	//cannot use !distance since move 0 will be interpreted as false

		var relativeMovementIndex;

		//relative movement is the direction of travel - not neccessarily the direction the robot is facing
		relativeMovementIndex = robot.orientation + movementRelativeToOrientation[typeIndex].movementOrientationAdjustment;
		relativeMovementIndex = adjustToValidOrientation(relativeMovementIndex);

		new_x = robot.x_pos + (orientations[relativeMovementIndex].xAxisChange*distance);
		new_y = robot.y_pos + (orientations[relativeMovementIndex].yAxisChange*distance);

		// check if this is a valid position
		if (grid.validPosition(new_x,new_y)){
			robot.x_pos = new_x;
			robot.y_pos = new_y;

			robot.draw();

			return {
				"success":true,
				"message":""
			};

		} else {

			console.warn("Thats not a valid move - no move was taken");
			return {
				"success":false,
				"message":"Robot cannot move outside the grid."
			};
		}
	}; // End Function: robot.move


	// ================================================================================
	// Function: robot.adjustToValidOrientation
	// Parameters :
	// 	orientationIndex : The orientation index to be adjusted
	// --------------------------------------------------------------------------------
	// Purpose:
	// Adjust the robots orintation index so that it remains a valid pointer to the
	// orientations array. 
	// --------------------------------------------------------------------------------
	// Notes:
	// Because we are keeping track of the robots orientation with an index to an array
	// it can step outside the bounds of the array. This function ensures that in this
	// situation the index will loop around on itself instead.

	// e.g. if the robot keeps turning right, the orientation index will keep
	// increasing and it can exceed the size of the orientations array.
	// This function is only used by the robot object so has not been made public
	// ================================================================================
	const adjustToValidOrientation = function(orientationIndex){

		while (orientationIndex <0){
			orientationIndex = orientationIndex + orientations.length;
		}
		while (orientationIndex >= orientations.length){
			orientationIndex = orientationIndex - orientations.length;
		}
		return orientationIndex;
	}; // End Function: robot.adjustToValidOrientation


	// ================================================================================
	// Function: robot.setOrientation
	// Parameters :
	// 	direction : A string containing the name of a direction. eg. "west"
	// --------------------------------------------------------------------------------
	// Purpose:
	// Validate and set the robots orientation index
	// --------------------------------------------------------------------------------
	// Notes: 
	// The orientation is stored as an index of the orientations array.
	// This function is only used by the robot object so has not been made public
	// ================================================================================
	const setOrientation = function(direction){

		// match against known valid orientations
		var index = orientations.findIndex(orientations => orientations.name==direction);

		if (index == -1){
			// Unknown orientation 
			return false;
		}
		robot.orientation = index;
		return true;
	}; // End Function: robot.setOrientation


	// ================================================================================
	// Function: robot.setRelativeOrientation
	// Parameters :
	// 	turnName : A string containing the name of a direction change. eg. "left"
	// --------------------------------------------------------------------------------
	// Purpose:
	// Change the direction the robot is facing relative to its current direction.
	// --------------------------------------------------------------------------------
	// Notes: 
	// This function is only used by the robot object so has not been made public
	// ================================================================================
	const setRelativeOrientation = function(turnName){
		console.info(`FUNCTION: ${turnName}`);
		//check if robot is placed
		if (!robot.isPlaced){
			console.warn("Robot needs to be placed before any actions are taken");
			return {
				"success":false,
				"message":"Robot cannot turn until it has been placed on the grid."
			};
		}
		
		// match against known valid relative orientations
		var index = relativeOrientation.findIndex(relativeOrientation => relativeOrientation.name==turnName);

		//return without action if invalid
		// we shouldn't be able to hit this error as it is a private function and we make the calls to it
		if (index == -1){
			return {
				"success":false,
				"message":`Robot cannot turn ${turnName}.`
			};
		}
		else {
			// change the orientation of the robot by the number indicated in the orientationChange field for that move
			robot.orientation = robot.orientation + relativeOrientation[index].orientationChange;
			robot.orientation = adjustToValidOrientation(robot.orientation);

			//draw the robot on the GUI
			robot.draw();

			return {
				"success":true,
				"message":""
			};
		}
	}; // End Function: robot.setRelativeOrientation


	// ================================================================================
	// Functions: robot.left || robot.right || robot.uturn
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Make calls to setRelativeOrientation with the appropriate parameter 
	// --------------------------------------------------------------------------------
	// Notes: 
	// These need to be public functions so they can be called by the command
	// interpreter.
	// ================================================================================
	const left 	= function(){ return setRelativeOrientation("left");};
	const right = function(){ return setRelativeOrientation("right");};
	const uturn = function(){ return setRelativeOrientation("uturn");};


	// ================================================================================
	// Function: robot.report
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Send output to the console and the log about the robot's current status
	// ================================================================================
	const report = function(){

		var report = "<strong>Robot Status Report</strong></br>";
		console.group(["Robot Status Report"]);
		
		if (this.isPlaced){
			console.log("X position: "+this.x_pos);
			console.log("Y position: "+this.y_pos);
			console.log("Facing: "+orientations[this.orientation].name);

			report += `X position: ${this.x_pos}</br>
						Y position: ${this.y_pos}</br>
						Facing: ${orientations[this.orientation].name}`;

		} else {
			console.log("Robot has not been placed on the grid.");
			report += "Robot has not been placed on the grid";
		}
		console.groupEnd();
		log.addEntry(report,true);

		return {
			"success":true,
			"message":""
		};
	}; // End Function: robot.report


	// ================================================================================
	// Function: robot.wander
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Send robot a random command every second while 'wander' button is toggled
	// ================================================================================
	const wander = function(){

		var wanderBtn = jQuery("#wanderBtn");
		wanderBtn.toggleClass("active");

		//place the robot if it hasn't been already
		if (!robot.isPlaced){
			robot.interpretCommand("place 0,0,north");
		}

		var wanderActive = wanderBtn.hasClass("active");
		var wander = setInterval(makeAMove,1000);


		// send the robot a random command
		function makeAMove(){

			var distance;
			var moveOrTurn;
			var moveType;
			var turnDirection;
			var moveResult;

			// know when to stop
			wanderActive = wanderBtn.hasClass("active");

			if (!wanderActive){clearInterval(wander);}

			moveOrTurn = Math.round(Math.random());		

			if (moveOrTurn==0){ // turn!

				turnDirection  	= Math.floor(Math.random() * 3);

				setRelativeOrientation(relativeOrientation[turnDirection].name);
				log.addEntry(relativeOrientation[turnDirection].name);

			} else { // move!

				distance = (Math.floor(Math.random() * grid.size-1))+1;
				moveType = Math.floor(Math.random() * (movementRelativeToOrientation.length-1));

				moveResult = robot.move(movementRelativeToOrientation[moveType].name,distance);
				log.addEntry(
					`move ${movementRelativeToOrientation[moveType].name},${distance}`, //command
					moveResult.success,
					moveResult.message
				);
			}
		}
	}; // End Function: robot.wander


	// ================================================================================
	// Function: robot.reset
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Remove the robot from the grid and unset all its variables
	// ================================================================================
	const reset = function(){

		// clear robot variables
		this.x_pos = null;
		this.y_pos = null;
		this.orientation = null;
		this.isPlaced = false;

		// remove the robot from the GUI
		robot.draw();
	}; // End Function: robot.reset


	// ================================================================================
	// Function: robot.test
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Run the test cases contained in tests.js and report on the outcome.
	// ================================================================================
	const test = function(){

		//test core funcitonality only
		var result;
		var failedTests;

		// ensure we are at an expected state by resetting everything
		robot.reset();
		log.clear();

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

		log.addEntry(`<strong>${tests.length} tests run. ${failedTests.length} failed</strong><br>see console (F12) for details`);

		//display results
		console.table(tests);

	}; // End Function: robot.test


	// ================================================================================
	// Function: robot.interpretCommand
	// Parameters : 
	// 	command : String input from the user containing the command and parameters
	// --------------------------------------------------------------------------------
	// Purpose:
	// Parse the input and call the requested function.
	// ================================================================================
	const interpretCommand = function(command){

		var commandArray;
		var parameterString;
		var result;

		// ensure no capitalisation or leading/trailing spaces issues
		command = command.toLowerCase();
		command = command.trim();

		// set default results
			result =  {
				"success":false,
				"message":`Robot does not know how to ${command}.`
			};

			// check if the command has parameters
			if (command.indexOf(" ")==-1){

				// command with no parameters
				try {
					result = robot[command]();
				} catch(e){}

			} else {

				// command has one or more parameters 

				// split command from parameters (any spaces also removed by array.split)
				commandArray = command.split(" ");

				// reassemble parameters now with any extra white space removed
				parameterString = commandArray.slice(1).join("");

				// check if there are multiple parameters
				if (parameterString.indexOf(",")==-1){

					// single parameter command
					try {
						result = robot[commandArray[0]](parameterString);
					} catch(e){}

				} else {
					// Command has more than one parameter
					try {
						// split the parameters into their own array and pass to the desired function
						result = robot[commandArray[0]].apply(null, parameterString.split(','));
					} catch(e){}
				}
			}

			// command complete - update log and clear command input
			log.addEntry(command,result.success,result.message);

			// return outcome for testing function
			return result.success;
	}; // End Function: robot.interpretCommand


	// ================================================================================
	// Function: robot.draw
	// Parameters : none
	// --------------------------------------------------------------------------------
	// Purpose:
	// Add the robot to the GUI using its current position and orientation
	// ================================================================================
	var draw = function(){

		//rotate robot image to suit orientation
		var angle;

		switch (robot.orientation) {
			case 0:				
				angle = 0;
				break;
			case 1:
				angle = 90;
				break;
			case 2:
				angle = 180;
				break;
			case 3:
				angle = 270;
				break;
		}
		var robotImg = `<img id="robot" 
									class ="img-responsive"
									src="images/robot.png" 
									alt="Robot" 
									style="
										transform : rotate(${angle}deg);

										height    : inherit;">`;

		// remove the robot
		jQuery("#robot").remove();

		// add the robot
		jQuery(".col_"+robot.x_pos+".row_"+robot.y_pos).append(robotImg);

	}; // End Function: robot.draw

	// public functions/variables
	return {
		place:place,
		move:move,
		left:left,
		right:right,
		uturn:uturn,
		report:report,
		wander:wander,
		reset:reset,
		test:test,
		interpretCommand:interpretCommand,
		draw:draw
	};
}());
