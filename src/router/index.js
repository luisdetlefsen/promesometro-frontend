import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import PromiseCreate from '../components/PromiseCreate.vue'
import Promises from '../components/Promises.vue'
import AdminMenu from '../components/admin/AdminMenu.vue'
import AdminPartiesList from '../components/admin/party/AdminPartiesList.vue'
import AdminCandidateRolesList from '../components/admin/candidateRole/AdminCandidateRolesList.vue'
import AdminCandidatesList from '../components/admin/candidate/AdminCandidatesList.vue'
import PromiseDetail from '../components/PromiseDetail.vue'
import SignUp from '../components/auth/SignUp.vue'
import ConfirmSignUp from '../components/auth/ConfirmSignUp.vue'
import SignIn from '../components/auth/SignIn.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: LandingPage, meta: { requiresAuth: false } },
    { path: '/registrar', component: SignUp, meta: { requiresAuth: false } },
    { path: '/confirmar', name: 'confirmSignUp', component: ConfirmSignUp, props: true, meta: { requiresAuth: false } },
    { path: '/ingresar', component: SignIn, meta: { requiresAuth: false } },
    { path: '/promesas/agregar', component: PromiseCreate, meta: { requiresAuth: false } },
    { path: '/promesas', component: Promises, meta: { requiresAuth: false } },
    { path: '/promesas/:id', component: PromiseDetail, meta: { requiresAuth: false } },
    { path: '/admin', component: AdminMenu, meta: { requiresAuth: false } },
    { path: '/admin/partidos', component: AdminPartiesList, meta: { requiresAuth: false } },
    { path: '/admin/candidatos', component: AdminCandidatesList, meta: { requiresAuth: false } },
    { path: '/admin/candidatos/roles', component: AdminCandidateRolesList, meta: { requiresAuth: false } },
    { path: '*', redirect: '/' }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      next()
    } catch (e) {
      next({
        path: '/ingresar',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next()
})

export default router
