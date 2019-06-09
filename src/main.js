import Vue from 'vue'
import App from './App.vue'
import { RestDataSource } from './restDataSource'

Vue.config.productionTip = false

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
