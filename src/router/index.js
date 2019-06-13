import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomeMessage from '../components/WelcomeMessage.vue'
import PromiseCreate from '../components/PromiseCreate.vue'
import PromiseCandidate from '../components/PromiseCandidate.vue'
import AdminMenu from '../components/admin/AdminMenu.vue'
import AdminParties from '../components/admin/AdminParties.vue'
import AdminCandidates from '../components/admin/AdminCandidates.vue'
import AdminCandidateRoles from '../components/admin/AdminCandidateRoles.vue'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/', component: WelcomeMessage },
    { path: '/promesas/agregar', component: PromiseCreate },
    { path: '/promesas', component: PromiseCandidate },
    { path: '/admin', component: AdminMenu },
    { path: '/admin/partidos', component: AdminParties },
    { path: '/admin/candidatos', component: AdminCandidates },
    { path: '/admin/candidatos/roles', component: AdminCandidateRoles },
    { path: '*', redirect: '/' }
  ]
})
