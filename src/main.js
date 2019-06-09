import Vue from 'vue'
import App from './App.vue'
import { RestDataSource } from './restDataSource'
import VueSwal from 'vue-swal'

Vue.config.productionTip = false
Vue.use(VueSwal)
new Vue({
  render: function (h) { return h(App) },
  data: {
    eventBus: new Vue()
  },
  provide: function () {
    return { eventBus: this.eventBus,
      restDataSource: new RestDataSource(this.eventBus)
    }
  }
}).$mount('#app')
