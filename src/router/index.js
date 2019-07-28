import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import PromiseCreate from '../components/PromiseCreate.vue'
import Promises from '../components/Promises.vue'
import AdminMenu from '../components/admin/AdminMenu.vue'
import AdminPartiesList from '../components/admin/party/AdminPartiesList.vue'
import AdminCandidateRolesList from '../components/admin/candidateRole/AdminCandidateRolesList.vue'
import AdminCandidatesList from '../components/admin/candidate/AdminCandidatesList.vue'

import SignUp from '../components/auth/SignUp.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/', component: LandingPage },
    { path: '/signup', component: SignUp},
    { path: '/promesas/agregar', component: PromiseCreate },
    { path: '/promesas', component: Promises },
    { path: '/admin', component: AdminMenu },
    { path: '/admin/partidos', component: AdminPartiesList },
    { path: '/admin/candidatos', component: AdminCandidatesList },
    { path: '/admin/candidatos/roles', component: AdminCandidateRolesList },
    { path: '*', redirect: '/' }
  ]
})
