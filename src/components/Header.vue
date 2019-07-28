<template>
  <nav class="navbar navbar-light">
    <a class="navbar-brand-text" href="#" v-on:click="goHome">
      <img class="logo" src="../assets/img/promesometro1.svg" alt="Promesometro">
    </a>
    <router-link v-if="!signedIn" class="btn btn-primary login" to="/ingresar">Ingresar</router-link>
    <router-link v-if="!signedIn" class="btn btn-primary signup" to="/registrar">Registrarse</router-link>
    <amplify-sign-out v-if="signedIn" v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
  </nav>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  props: {},
  data () {
    return {
      signedIn: false,
      signOutConfig: {
        signOutButton: 'Cerrar sesion'
      }
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  },
  async beforeCreate () {
    try {
      await this.$Amplify.Auth.currentAuthenticatedUser()
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      this.signedIn = info === 'signedIn'
    })
  },
  mounted () {
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedOut') {
        this.signedIn = false
        this.$router.replace('/')
      } else if (info === 'signedIn') {
        this.signedIn = true
      }
    })
  }
}
</script>

<style scoped lang="scss">
.signup {
  margin-left: 16px;
}
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
