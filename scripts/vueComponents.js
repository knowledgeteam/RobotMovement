"use strict"
Vue.component('vrobot', {
	computed: {
		robotStyle () {
			return { transform: `rotate( ${this.$root.robot_imgRotateAngle}deg)`,
					 height	: "inherit"
			}
		}
	},
	template:`<img id="robot" 
				src="images/robot.png" 
				v-bind:style="robotStyle">`

});

Vue.component('menu-button', {
	props: ['name','click'],
	template: `<input class="btn btn-primary"
					type="button"
					v-bind:value=name
					v-bind:onclick=click>`
});

Vue.component('grid-cell', {
	props: ['grid_x','grid_y'],
	methods: {
		hasRobot: function(){
			return ((this.grid_x == this.$root.robot_x)&&(this.grid_y == this.$root.robot_y));
		}
	},
	template: `	<span class="cell" v-bind:class="['col_'+grid_x,'row_'+grid_y]">
					<span class="coordinates">({{ grid_x }},{{ grid_y }})</span>
					<vrobot v-if="hasRobot()"></vrobot>
				</span>`
});
