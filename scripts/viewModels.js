// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// viewModels.js | Purpose:
// Use vue to bind app data to the display. 
// ================================================================================
(function () {
   'use strict';
   
	var gridViewModel = new Vue({
		el: '#grid',
		data: {
			gridSize: app_settings.gridSize,
			robotPosition : robot.currentPosition
		},
		computed: { // define order so that origin will be in southwest corner
			columnOrder: function(){
				var columnOrder = [];
				for (var i = 0; i < this.gridSize; i++) { columnOrder.push(i);}
				return columnOrder; // returns [0,1,2,3,4];
			},
			rowOrder: function(){
				return this.columnOrder.slice(0).reverse(); // returns [4,3,2,1,0]
			}
		}
	});

	var menuViewModel = new Vue({
		el: '#menu',
		data: {
		  buttons: app_settings.menuButtons
		}
	});

	var commandHistoryViewModel = new Vue({
		el: '#commandHistory',
		data: {
			command_history : robot.commandLog
		}
	});
}());


