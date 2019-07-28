<template>
    <div class="container">
        <amplify-sign-in v-if="!forgotPassword" v-bind:signInConfig="signInConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-sign-in>
        <amplify-forgot-password v-if="forgotPassword" v-bind:forgotPasswordConfig="forgotPasswordConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-forgot-password>
    </div>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'SignIn',
  data () {
    return {
      usernameAttributes: 'Correo Electronico',
      signInConfig: {
        header: 'Ingresa a tu cuenta'
      },
      forgotPasswordConfig: {
        header: 'Reinicia tu contraseña'
      },
      forgotPassword: false

    }
  },
  mounted () {
    AmplifyEventBus.$on('localUser', info => {
      console.log(info)
    })

    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.$router.replace('promesas')
      } else if (info === 'signUp') {
        this.$router.replace('registrar')
      } else if (info === 'forgotPassword') {
        this.forgotPassword = true
      } else if (info === 'signIn') {
        this.forgotPassword = false
      }
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
