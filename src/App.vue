<template>
  <div id="app" class="container d-flex flex-column" v-if="this.l">
    <Header/>
    <router-view class="flex-grow-1"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { components } from 'aws-amplify-vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    components
  },
  props: {
    l: Boolean
  },
  methods: {
    hashCode (s) {
      return s.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
    }
  },
  mounted () {
    // this.l = this.hashCode(prompt('Codigo')) === -1335479917
    this.l = true
  }
}
</script>

<style lang="scss">
@import './assets/styles/custom-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './assets/styles/custom-slick.scss';
@import './assets/styles/custom-blockquote.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  padding-top: 15px;
  padding-bottom: 15px;

  :root {

  /* Colors */
  --amazonOrange: #009900; /* Redefined to dark green */
  --lightAmazonOrange: #FFAC31;
  --darkAmazonOrange: #E88B01;
  --squidInk: #232F3E;
  --lightSquidInk: #31465F;
  --deepSquidInk: #152939;
  --grey: #828282;
  --lightGrey: #C4C4C4;
  --silver: #E1E4EA;
  --darkBlue: #31465F;
  --red: #DD3F5B;
  --white: #FFFFFF;
  --light-blue: #00a1c9;
  }
}
</style>
