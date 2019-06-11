<template>
    <div class="container">
        <parties-admin-list/>
        <party-admin-editor/>
    </div>
</template>

<script>
import PartiesAdminList from './PartiesAdminList.vue'
import PartyAdminEditor from './PartyAdminEditor.vue'
export default {
  components: {
    PartiesAdminList,
    PartyAdminEditor
  }
}
</script>
