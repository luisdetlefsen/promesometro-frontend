import Vue from 'vue'
import App from './App.vue'
import { RestDataSource } from './restDataSource'
import VueSwal from 'vue-swal'
import router from './router'

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from '../aws-exports'

const dict = {
  'en': {
    'Have an account? ': 'Ya tienes cuenta? ',
    'Sign in': 'Inicia sesión',
    'Create Account': 'Crear cuenta',
    'Invalid email address format.': 'Correo Inválido',
    'Confirmation Code': 'Codigo de confirmación',
    'Lost your code? ': 'Perdiste el código? ',
    'Resend Code': 'Reenviar código',
    'Back to Sign In': 'Iniciar Sesión',
    'Confirm': 'Confirmar',
    'Enter your Correo Electronico': 'Correo electrónico',
    'Enter your password': 'Contraseña del sitio',
    'Password': 'Contraseña',
    'Forget your password? ': 'Olvidaste tu contraseña? ',
    'Reset password': 'Reiniciar contraseña',
    'Sign In': 'Iniciar sesión',
    'No account? ': 'Aun no tienes cuenta? ',
    'Create account': 'Crear cuenta',
    'Send Code': 'Enviar código',
    'Code': 'Código',
    'New Password': 'Nueva Contraseña',
    'Submit': 'Enviar'
  }
}

AmplifyModules.I18n.putVocabularies(dict)

Amplify.configure(awsconfig)

Vue.config.productionTip = false
Vue.use(VueSwal)
Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  render: function (h) { return h(App) },
  data: {
    eventBus: new Vue()
  },
  router,
  provide: function () {
    return { eventBus: this.eventBus,
      restDataSource: new RestDataSource(this.eventBus)
    }
  }
}).$mount('#app')
