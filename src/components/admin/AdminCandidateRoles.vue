<template>
    <div class="container">
        <candidate-roles-admin-list/>
        <!-- <candidate-role-admin-editor/> -->
    </div>
</template>

<script>
import CandidateRolesAdminList from './CandidateRolesAdminList.vue'
// import CandidateRoleAdminEditor from './CandidateRoleAdminEditor.vue'
export default {
  components: {
    CandidateRolesAdminList
    // CandidateRoleAdminEditor
  }
}
</script>
