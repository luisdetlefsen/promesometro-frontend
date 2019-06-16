<template>
  <nav class="navbar navbar-light">
      <a class="navbar-brand-text" href="#" v-on:click="goHome">
        <img class="logo" src="../assets/img/promesometro1.svg" alt="Promesometro">
      </a>
      <a class="btn btn-primary login" href="#">Ingresar</a>
  </nav>
</template>

<script>
export default {
  name: 'LogoLogin',
  props: {},
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  margin-left: auto;
  margin-right: 0px;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: bold;
  z-index: 42;
}

.navbar-brand {
  max-width: 64px;
  max-height: 64px;
}

.navbar-brand-text {
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
}

.logo {
  margin-left: 0px;
  background-image: url("../assets/img/promesometro1.svg") no-repeat;
  max-height: auto;
  max-width: 90%;
}
nav {
  margin-bottom: 10px;
}

@media only screen and (max-width: 768px) {
  .navbar-brand-text {
    width: 70%;
  }
}
</style>
