<template>
  <div id="app">
    <LogoLogin/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Promise/>
    <promise-candidate candidateName="Sandra Torres" party="WINAQ"/>
    <promise-candidate candidateName="PEDRO Torres" party="TODOS"/>
    <promise-candidate candidateName="JUAN Torres" party="PODEMOS"/>
    <promise-candidate candidateName="LUIS Torres" party="WINAQ"/>
    <parties-admin-list/>
    <party-admin-editor/>
    <candidates-admin-list/>
    <candidate-admin-editor/>
    <candidate-roles-admin-list/>
    <candidate-role-admin-editor/>
    <Footer/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LogoLogin from './components/LogoLogin.vue'
import Promise from './components/Promise.vue'
import Footer from './components/Footer.vue'
import PromiseCandidate from './components/PromiseCandidate.vue'
import PartiesAdminList from './components/admin/PartiesAdminList.vue'
import PartyAdminEditor from './components/admin/PartyAdminEditor.vue'
import CandidatesAdminList from './components/admin/CandidatesAdminList.vue'
import CandidateAdminEditor from './components/admin/CandidateAdminEditor.vue'
import CandidateRolesAdminList from './components/admin/CandidateRolesAdminList.vue'
import CandidateRoleAdminEditor from './components/admin/CandidateRoleAdminEditor.vue'
export default {
  name: 'app',
  components: {
    HelloWorld,
    LogoLogin,
    Promise,
    PromiseCandidate,
    Footer,
    PartiesAdminList,
    PartyAdminEditor,
    CandidatesAdminList,
    CandidateAdminEditor,
    CandidateRolesAdminList,
    CandidateRoleAdminEditor
  }
}
</script>

<style lang="scss">
@import './assets/styles/custom-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './assets/styles/custom-slick.scss';
@import './assets/styles/custom-blockquote.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
