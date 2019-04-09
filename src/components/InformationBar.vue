<template>
	<div>
		<div class="row">
			<div class="col s2">
				<h6>Iteration: {{i}}</h6>
			</div>
			<div class="col s8">
				<p v-html="cases(false)">{{cases(false)}}</p>
			</div>
			<div class="col s2 right-align">
				<span>
					<a class="waves-effect waves-gray btn-flat" style="font-size:2.5em" @click="leftClick()" :disabled="i==0">&#8592;</a>
					<a class="waves-effect waves-gray btn-flat" style="font-size:2.5em" @click="rightClick()" :disabled="i===pattern.length-1">&#8594;</a>
				</span>
			</div>
		</div>

		<div class="row" v-if="pattern.length-1 > i">
			<div class="col s2">
				<h6>Next: {{i >= pattern.length - 1? undefined : i+1}}</h6>
			</div>
			<div class="col s8">
				<div>
					<p v-html="cases(true)">{{cases(true)}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		i: {type: Number},
		pattern: {type: String},
		returnValues: {type: Array}
	},
	methods: {
		leftClick(){
			this.$emit('leftClicked');
		},
		rightClick(){
			this.$emit('rightClicked');
		}
	},
	computed: {
		cases(){
            return nextIteration => {
                let i = this.i
                if (nextIteration){
                    if (this.i >= this.pattern.length-1){
                        return undefined
                    }
                    i = this.i + 1
                }
                
                let currentValues = this.returnValues[i]
                let l = currentValues.l;
                let r = currentValues.r;
                let prevL = undefined;
                let prevR = undefined;
                if (i > 1){
                    prevL = this.returnValues[i-1].l;
                    prevR = this.returnValues[i-1].r;
				}
                switch(currentValues.branch){
                    case undefined:
                        return `Computation of z-values begins at first iteration.`
                    case -1:
                        return `<b>Case 1: i (${i}) extends past previously found z-box.</b><br> No match at txt[${i}] against txt[0].`;
                    case -2:
                        return `<b>Case 1: i (${i}) extends past previously found z-box.</b><br> Match at txt[${i}..${r}] against prefix txt[0..${r-l}]. z-box extended.`
                    case -3:
                        return `<b>Case 2a: i (${i}) is within z-box.</b> <br> Length of complement z-box to i, z[${i-prevL}], is less than the inclusive range, i (${i}) and end of z-box (${prevR}). There is no greater value of z[${i}] than z[${i-prevL}].`
                    case -4:
                        return `<b>Case 2b: i (${i}) is within z-box.</b><br> Length of complement z-box to i, z[${i-prevL}], is greater than difference between end of z-box (${prevR}) and i (${i}). Next character txt[${prevR+1}] must be a mismatch to character after complement z-box, txt[${prevR-prevL+1}].`
                    case -5:
                        return `<b>Case 2c: i (${i}) is within z-box.</b><br> Length of complement z-box to i, z[${i-prevL}], is equal to difference between end of z-box (${prevR}) and i (${i}). <br> Continued search from txt[${prevR+1}] found no match.`
                    case -6:
                        return `<b>Case 2c: i (${i}) is within z-box.</b><br> Length of complement z-box to i, z[${i-prevL}], is equal to difference between end of z-box (${prevR}) and i (${i}). <br> Continued search from txt[${prevR+1}] found match for txt[${prevR+1}..${r}] to txt[${prevR-prevL+1}..${r-prevL}]. z-box extended.`
                }
                return "not found"
            }
        }
	},
}
</script>

<style scoped>
	
</style>
