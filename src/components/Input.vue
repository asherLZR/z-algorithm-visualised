<template>
	<section class="row">
		<div class="col s10">
			<div class="row">
				<div class="col s3">
					<h6 style="margin-top:25px">Enter your pattern</h6>
				</div>
				<div class="input-field col s9">
					<input v-model="inputPattern" id="targetPat" type="text" class="validate" :disabled="startState"
					maxlength="20">
				</div>
			</div>
		</div>
		<div class="col s2 right-align" style="margin-top:20px">
			<a class="btn-floating btn-medium waves-effect waves-light #757575 grey darken-1" @click="start()">
				<i class="material-icons" ref="fab">check_circle_outline</i>
			</a>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		pattern: String,
		startState: Boolean
	},
	data: function(){
		return {
			inputPattern: this.pattern,
			inputStartState: this.startState
		}
	},
	methods: {
		start(){
			this.$emit('setStartState')
		}
	},
	watch: {
		inputPattern(value) {
			this.$emit('patternChanged', value)
		},
		startState(value){
            this.$refs.fab.innerHTML = value == false ? "check_circle_outline" : "refresh"
        }
	}
}
</script>

