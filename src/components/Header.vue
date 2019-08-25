<template>
  <nav class="navbar navbar-light">
    <a class="navbar-brand-text" href="#" v-on:click="goHome">
      <img class="logo" src="../assets/img/promesometro1.svg" alt="Promesometro">
    </a>
    <router-link v-if="!signedIn" class="btn btn-primary login" to="/ingresar">Ingresar</router-link>
    <router-link v-if="!signedIn" class="btn btn-primary signup" to="/registrar">Registrarse</router-link>

    <router-link v-if="isAdmin" class="btn btn-primary login" to="/admin">Admin</router-link>
    <amplify-sign-out class="btn btn-primary login" v-if="signedIn" v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
  </nav>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  props: {},
  data () {
    return {
      signedIn: false,
      isAdmin: false,
      signOutConfig: {
        signOutButton: 'Cerrar sesión'
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
      let c = await this.$Amplify.Auth.currentSession()
      let d = c.idToken.payload['cognito:roles']
      if (d && d.length > 0) {
        if (d[0].includes('webadmins')) {
          this.isAdmin = true
          // console.log(this.isAdmin)
        }
      }
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
