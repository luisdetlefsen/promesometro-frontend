<template>
  <div id="app">
    <LogoLogin/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import LogoLogin from './components/LogoLogin.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    LogoLogin,
    Footer
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
  margin-top: 60px;
}
</style>
