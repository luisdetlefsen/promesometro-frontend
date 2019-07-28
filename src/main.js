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
        'Have an account? ': "Ya tienes cuenta? ",
        'Sign in': "Inicia sesion",
        'Create Account': "Crear cuenta",
        'Invalid email address format.': "Correo Invalido",
        'Confirmation Code': "Codigo de confirmacion",
        'Lost your code? ': "Perdiste el codigo? ",
        'Resend Code': "Reenviar codigo",
        'Back to Sign In': "Iniciar Sesion",
        'Confirm': "Confirmar",
        'Enter your Correo Electronico': "Ingresa tu correo electronico",
        'Enter your password': "Ingresa tu contraseña",
        'Password': "Contraseña",
        'Forget your password? ': "Olvidaste tu contraseña? ",
        'Reset password': "Reiniciar contraseña",
        'Sign In': "Iniciar sesion",
        'No account? ': "Aun no tienes cuenta? ",
        'Create account': "Crear cuenta"
    }
};

AmplifyModules.I18n.putVocabularies(dict);

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
