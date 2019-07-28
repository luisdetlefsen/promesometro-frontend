<template>
    <amplify-sign-up v-bind:signUpConfig="signUpConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-sign-up>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'SignUp',
  data () {
    return {
      username: null,
      usernameAttributes: 'Correo Electronico',
      signUpConfig: {
        header: 'Crea tu cuenta',
        defaultCountryCode: '502',
        hideAllDefaults: true,
        signUpFields: [
          {
            label: 'Correo Electronico',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'email',
            signUpWith: true
          },
          {
            label: 'Contraseña',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
          },
          {
            label: 'Nombre',
            key: 'name',
            required: true,
            displayOrder: 3,
            type: 'text'
          }
        ]
      }
    }
  },
  mounted () {
    AmplifyEventBus.$on('localUser', info => {
      console.log(info)
      this.username = info.username
    })

    AmplifyEventBus.$on('authState', info => {
      if (info === 'confirmSignUp') {
        console.log('Username ' + this.username)
        this.$router.replace({ name: 'confirmSignUp', params: { username: this.username } })
      } else if (info === 'signIn') {
        this.$router.replace('ingresar')
      }
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
