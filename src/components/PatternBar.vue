<template>
  <div>
    <div class="row">
      <hr>
      <div class="col s1" style="margin-top: 50px">
        <h6>txt</h6>
      </div>
      <div class="col s11">
        <div class="bar">
          <table class="striped">
            <tr>
              <td v-for="index in pattern.length" :key="index-1">{{index-1}}</td>
            </tr>
          </table>
        </div>
        <div class="bar grey" style="position:relative;">
          <table class="boxTable striped">
            <tr>
              <td v-for="(char, index) in listPat" :key="index">{{char}}</td>
            </tr>
          </table>
          <div
            class="patternbar bar"
            style="background-color:rgb(114, 114, 114);"
            :style="{width: patLen + '%'}"
          ></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s1">
        <h6>z-box</h6>
      </div>
      <div class="col s11">
        <div class="bar grey" style="position:relative;">
          <div
            class="patternbar bar absolute"
            style="background-color:rgb(41, 41, 41);"
            :style="{width: zBoxPos.boxLength + '%'}"
          ></div>
          <div
            class="patternbar bar absolute"
            style="background-color:rgb(83, 83, 83);"
            :style="{width: zBoxPos.boxLength + '%', 'margin-left': zBoxPos.leftPad + '%'}"
          ></div>
          <template v-if="zBoxPos.leftPad < zBoxPos.boxLength">
            <div
              class="patternbar bar front absolute"
              style="background-color:rgb(41, 41, 41);height:25px;z-index:1;"
              :style="{width: zBoxPos.boxLength + '%'}"
            ></div>
          </template>
          <table class="boxTable absolute striped" style="z-index:2;">
            <tr>
              <td v-for="(char, index) in listPat" :key="index">{{char}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s1">
        <h6>z[i]</h6>
      </div>
      <div class="col s11">
        <div class="bar">
          <table class="striped">
            <tr>
              <td v-for="(val, index) in zVals" :key="index">{{val}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listPat: {
      type: Array
    },
    pattern: String,
    patLen: Number,
    zBoxPos: {
      leftPad: Number,
      boxLength: Number
    },
    zVals: {
      type: Array
    }
  }
};
</script>