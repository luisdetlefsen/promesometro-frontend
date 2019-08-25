<template>
  <nav class="navbar navbar-light">
    <a class="navbar-brand-text" href="#" v-on:click="goHome">
      <img class="logo" src="../assets/img/promesometro1.svg" alt="Promesometro">
    </a>
    <router-link v-if="!signedIn" class="btn btn-primary login" to="/ingresar">Ingresar</router-link>
    <router-link v-if="!signedIn" class="btn btn-primary signup" to="/registrar">Registrarse</router-link>
    <router-link v-if="isAdmin" class="btn btn-primary login" to="/admin">Admin</router-link>
    <amplify-sign-out class="wtf-amplify" v-if="signedIn" v-bind:signOutConfig="signOutConfig"></amplify-sign-out>    
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
    },
    async validateAdmin() {
      let c = await this.$Amplify.Auth.currentSession()
      let d = c.idToken.payload['cognito:roles']
      if (d && d.length > 0) {
        if (d[0].includes('webadmins')) {
          this.isAdmin = true
        }
      }
    }
  },
  async beforeCreate () {
    try {
      await this.$Amplify.Auth.currentAuthenticatedUser()
      await validateAdmin()
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      this.signedIn = info === 'signedIn'
    })
  },
  async mounted () {
    AmplifyEventBus.$on('authState', async  info => {
      if (info === 'signedOut') {
        this.signedIn = false
        this.isAdmin = false
        this.$router.replace('/')
      } else if (info === 'signedIn') {
        this.signedIn = true
        await this.validateAdmin()
      }
    })
  }
}
</script>

<style  lang="scss">
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
//redefine the rules. Customizing UI is not supported ATM.
.wtf-amplify>div{
  margin-bottom:0!important;
}

.wtf-amplify>div>div{
  color: white;
  margin-bottom:0!important;
}

.wtf-amplify button{
  margin-left: 5px!important;
  border-radius: 10px !important;
  color: #f2dd3d;
  background-color: #b212b2;
  border-color: #b212b2;
  letter-spacing: unset;
  text-transform: unset;
  padding: 0.375rem 0.75rem;
  border: unset;
  min-width: unset;
  line-height: unset;
  font-size: unset;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.wtf-amplify button:hover{
  color: #212529;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

background-color: #f0d719;

border-color: #ecd310;
}

@media only screen and (max-width: 768px) {
  .navbar-brand-text {
    width: 70%;
  }
}
</style>
