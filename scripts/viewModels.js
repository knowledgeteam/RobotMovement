"use strict"
var gridViewModel = new Vue({
	el: '#grid',
	data: {
		gridSize: app_settings.gridSize,
		robot_x: null,
		robot_y: null,
		robot_imgRotateAngle: null
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
	},
	mounted: function() {
		this.$forceUpdate();
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
		command_history: command_history.logArray
	}
});