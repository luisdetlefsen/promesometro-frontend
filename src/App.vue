<template>
  <div id="app">
    <LogoLogin/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Promise/>
    <promise-candidate/>
    <Footer/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LogoLogin from './components/LogoLogin.vue'
import Promise from './components/Promise.vue'
import Footer from './components/Footer.vue'
import PromiseCandidate from './components/PromiseCandidate.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    LogoLogin,
    Promise,
    PromiseCandidate,
    Footer
  }
}
</script>

<style lang="scss">
@import './assets/styles/custom-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './assets/styles/custom-slick.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
