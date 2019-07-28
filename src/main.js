import Vue from 'vue'
import App from './App.vue'
import { RestDataSource } from './restDataSource'
import VueSwal from 'vue-swal'
import router from './router'

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from '../aws-exports'

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
