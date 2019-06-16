<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand-text" href="#" v-on:click="goHome">
        <!-- <div class="logo"></div> -->
        <img class="logo" src="../assets/img/promesometro1.svg" alt="Promesometro">

        <!-- <img class="navbar-brand" src="../assets/gt.png" /> -->
      </a>
      <!-- <p class="text-right">Inicia sesión si eres parte de un partido</p> -->
      <!-- <a v-on:click.stop="login" class="btn btn-primary login" href="#">Iniciar sesión</a> -->
      <a class="btn btn-primary login" href="#">Ingresar</a>
    </div>
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
  margin-bottom: 5rem;
}
</style>
