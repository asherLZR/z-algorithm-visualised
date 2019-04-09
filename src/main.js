import Vue from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.css'
import Footer from './components/Footer.vue'
import PatternBar from './components/PatternBar.vue'
import Input from './components/Input.vue'
import InformationBar from './components/InformationBar.vue'

Vue.component('app-footer', Footer)
Vue.component('pattern-bar', PatternBar)
Vue.component('app-input', Input)
Vue.component('information-bar', InformationBar)

new Vue({
  el: '#app',
  render: h => h(App)
})
