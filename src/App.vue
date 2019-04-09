<template>
  <div>
    <main>
		<div class="container">
			<h3 class="title">Z-Algorithm Visualised</h3>
			<hr>
			<div v-html="text">{{text}}</div>
			
			<transition name="fade">
				<pattern-bar v-if="startState" :listPat='listPat' :pattern='pattern' :patLen='patLen' :zBoxPos='zBoxPos' :zVals='zVals'></pattern-bar>
			</transition>

			<transition name="fade">
				<information-bar v-if="startState" :i="i" :pattern="pattern" :returnValues="returnValues" @leftClicked="left()" @rightClicked="right()"></information-bar>
			</transition>
			
			<hr>
			<app-input :pattern="pattern" :startState="startState" @setStartState="start()" @patternChanged="pattern = $event"></app-input>
		</div>
    </main>
	<app-footer></app-footer>
</div>
</template>

<script>
import {zalg, linearSearch} from "./zalg.js"

export default {
	data: function(){
		return {
			pattern: "abcbabbabcbabc",
			listPat: [],
			startState: false,
			patBoxes: 0,
			i: 0,
			text: "<p>Gusfield's Z-algorithm is a linear run-time algorithm that produces z[i] values, the length of the longest possible substring pat[i..i+z[i]-1] that matches the prefix, pat[0..z[i]-1]. It may be used for pattern matching. By prepending the pattern to the start of the text delimited by an unused character, we may traverse the resultant array for any z[i] values == length of pattern. Note that z[0] is obviously uninteresting, so we ignore its computation. <br><br> The Z-algorithm is also used as a pre-processing step on the pattern as input to KMP and Boyer-Moore.</p>",
			returnValues: undefined
    	}
	},
	computed: {
        zVals: function(){
            return this.returnValues[this.i].z_array;
        },
        patLen: function(){
            let value = (this.i+1) * this.patBoxes
            if (value >= 100){
                return 100;
            }else if (value <= 0){
                return 0;
            }
            return value
        },
        zBoxPos: function(){
            let l = this.returnValues[this.i].l;
            let r = this.returnValues[this.i].r;
            return {
                leftPad: l * this.patBoxes,
                boxLength: (r-l+1) * this.patBoxes
            }
        }
    },
    methods: {
        start: function(){
            if (this.pattern.length < 1){
                alert("Peekaboo!");
                return;
            }
            if (this.startState == false){
                this.startState = true;
                this.calculatePatBox();
                this.listPat = this.pattern.split('');
                this.returnValues = zalg(this.pattern);
            }else{
                this.startState = false;
                this.i = 0;
            }
        },
        calculatePatBox: function(){
            this.patBoxes = 100/this.pattern.length;
        },
        left: function(){
            this.i -= 1
        },
        right: function(){
            this.i += 1
        }
    }
}
</script>


<style>
body {
  background-color: white;
  color: black;
  display: flex !important;
  min-height: 100vh !important;
  flex-direction: column !important;
}

main {
  flex: 1 0 auto !important;
}

p {
  vertical-align: middle;
  font-size: 1em;
}

h6{
  font-size: 1.2em;
}

table {
	table-layout: fixed;
	align-self: center;
}

tr{
  height: 50px;
}

td{
  text-align: center;
  font-size: 1em;
}

.title {
  text-align: center;
}

.boxTable{
  color: white;
  position:absolute; top:0; left:0;
}

.absolute{
  position:absolute; 
  top:0; 
  left:0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bar{
  height: 50px;
  margin: auto;
  transition: width 500ms;
}

.patternbar{
  background-color: transparent;
  width: 100%;
  margin-left: 0%;
}

[type=text]{
  font-size: 1em !important;
}

/* label underline focus color */
.input-field input[type=text]:focus {
  border-bottom: 1px solid transparent !important;
  box-shadow: 0 1px 0 0 gray !important;
}
/* valid color */
.input-field input[type=text].valid {
  border-bottom: 1px solid transparent !important;
  box-shadow: 0 1px 0 0 gray !important;
}
/* invalid color */
.input-field input[type=text].invalid {
  border-bottom: 1px solid transparent !important;
  box-shadow: 0 1px 0 0 gray;
}
/* icon prefix focus color */
.input-field .prefix.active {
  color: gray;
}
</style>
