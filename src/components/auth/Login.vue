<template>
  <div class="login-page">
    <div class="form">
      <form class="register-form" v-if="!displayConfimSignup">
        <amplify-sign-up v-bind:signUpConfig="signUpConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-sign-up>
        <!-- <input type="text" placeholder="nombre de usuario" />
        <input type="password" placeholder="contraseña" />
        <input type="password" placeholder="confirmar contraseña" />
        <input type="email" placeholder="dirección de correo" />
        <button>Crear cuenta</button>
        <p class="message">
          Ya tienes cuenta?
          <a href="#" @click="toggleCreateAccount">Iniciar sesión</a>
        </p> -->
      </form>
      <form class="login-form" v-if="!displayConfimSignup">
        <amplify-sign-in v-if="!forgotPassword" v-bind:signInConfig="signInConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-sign-in>
        <amplify-forgot-password v-if="forgotPassword" v-bind:forgotPasswordConfig="forgotPasswordConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-forgot-password>

        <!-- <input type="text" placeholder="nombre de usuario" />
        <input type="password" placeholder="contraseña" />
        <button>iniciar sesión</button>
        <p class="message">
          Not registered?
          <a href="#" @click="toggleCreateAccount">Crear cuenta</a>
        </p> -->
      </form>
      <form class="confirm-signup" v-if="displayConfimSignup">
        <amplify-confirm-sign-up v-bind:confirmSignUpConfig="confirmSignUpConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-confirm-sign-up>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { AmplifyEventBus } from 'aws-amplify-vue'
export default {
  data () {
    return {
      confirmSignUpConfig: {
        header: 'Confirma tu cuenta'
      },
      usernameAttributes: 'Correo Electronico',
      signInConfig: {
        header: 'Ingresa a tu cuenta'
      },
      forgotPasswordConfig: {
        header: 'Reinicia tu contraseÃ±a'
      },
      forgotPassword: false,
      displayConfimSignup: false,
      username: null,
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
  methods: {
    toggleCreateAccount () {
      $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow')
    }
  },
  mounted () {
    AmplifyEventBus.$on('localUser', info => {
      if (info.username) {
        this.username = info.username
      }
    })

    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.$router.replace('promesas')
        this.displayConfimSignup = false
      } else if (info === 'signUp') {
        this.displayConfimSignup = false
        this.toggleCreateAccount()
      } else if (info === 'forgotPassword') {
        this.forgotPassword = true
        this.displayConfimSignup = false
      } else if (info === 'signIn') {
        this.forgotPassword = false
        this.displayConfimSignup = false
        this.toggleCreateAccount()
      } else if (info === 'confirmSignUp') {
        this.displayConfimSignup = true
        this.confirmSignUpConfig.username = this.username
        // this.$router.replace({ name: 'confirmSignUp', params: { username: this.username } })
      }
    })
  },
  beforeDestroy () {
    AmplifyEventBus.$off('localUser')
    AmplifyEventBus.$off('authState')
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: rgb(217, 76, 196);
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: rgb(66, 2, 54);
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
