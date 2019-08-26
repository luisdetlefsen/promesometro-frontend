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
import ConfirmSignUp from '../components/auth/ConfirmSignUp.vue'
import AdminPromiseApproval from '../components/admin/promise/AdminPromiseApproval.vue'
import AdminCommentApproval from '../components/admin/comment/AdminCommentApproval.vue'
import Login from '../components/auth/Login.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: LandingPage, meta: { requiresAuth: false } },
    { path: '/login', component: Login },
    { path: '/confirmar', name: 'confirmSignUp', component: Login, props: true, meta: { requiresAuth: false } },
    { path: '/promesas/agregar', component: PromiseCreate, meta: { requiresAuth: false } },
    { path: '/promesas', component: Promises, meta: { requiresAuth: false } },
    { path: '/promesas/:id', component: PromiseDetail, meta: { requiresAuth: false } },
    { path: '/admin', component: AdminMenu, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/admin/partidos', component: AdminPartiesList, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/admin/candidatos', component: AdminCandidatesList, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/admin/candidatos/roles', component: AdminCandidateRolesList, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/admin/promesas', component: AdminPromiseApproval, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/admin/comentarios', component: AdminCommentApproval, meta: { requiresAuth: true, adminOnly: true } },
    { path: '*', redirect: '/' }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      if (to.matched.some(record => record.meta.adminOnly)) {
        let c = await Vue.prototype.$Amplify.Auth.currentSession()
        let d = c.idToken.payload['cognito:roles']
        if (!d || (d && d.length > 0 && !d[0].includes('webadmins'))) {
          throw Error('Admin only')
        }
      }
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
