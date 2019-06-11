import Vue from 'vue'
import App from './App.vue'
import { RestDataSource } from './restDataSource'
import VueSwal from 'vue-swal'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

import aws_exports from '../aws-exports'
import router from './router'
Amplify.configure(aws_exports)

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
