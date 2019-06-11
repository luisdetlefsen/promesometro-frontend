<template>
  <div class="container">
    <candidates-admin-list/>
    <candidate-admin-editor/>
  </div>
</template>

<script>
import CandidatesAdminList from './CandidatesAdminList.vue'
import CandidateAdminEditor from './CandidateAdminEditor.vue'
export default {
  components: {
    CandidatesAdminList,
    CandidateAdminEditor
  }
}
</script>
