// ================================================================================
// Author: David Wilson
// Date: November: 2018
// Project: IOOF Code Challenge
// --------------------------------------------------------------------------------
// vueComponents.js | Purpose:
// Define vue display elements
// ================================================================================
(function () {
   'use strict';

	Vue.component('grid-cell', {
		props: ['grid_x','grid_y'],
		methods: {
			hasRobot: function(){

				if (this.$root.robotPosition != null){
					return ((this.grid_x == this.$root.robotPosition.x_position)&&(this.grid_y == this.$root.robotPosition.y_position));
				}
				return false;
			}
		},
		computed: {
			cellStyle: function() {
				var cellDimension = 500/this.$root.gridSize;
				return { height: `${cellDimension}px`,
						 width:  `${cellDimension}px`
				}
			}
		},
		template: `	<span class="cell" v-bind:style="cellStyle" v-bind:class="['col_'+grid_x,'row_'+grid_y]">
						<span class="coordinates">({{ grid_x }},{{ grid_y }})</span>
						<robot v-if="hasRobot()"></vrobot>
					</span>`
	});

	Vue.component('robot', {
		computed: {
			robotStyle () {
				var imgRotateAngle = app_settings.orientations[this.$root.robotPosition.orientation].imgRotateAngle;
				return { transform: `rotate( ${imgRotateAngle}deg)`,
						 height	: "inherit"
				}
			}
		},
		template:`<img id="robot" 
					src="styles/images/robot.png" 
					v-bind:style="robotStyle">`
	});

	Vue.component('menu-button', {
		props: ['name','click'],
		template: `<input class="btn btn-secondary"
						type="button"
						v-bind:value=name
						v-bind:onclick=click>`
	});
}());