<template>
  <div class="container">

      <promise-candidate v-for="p in promises" v-bind:key="p.id"
      :party='p.partyName'
       />

  </div>
</template>

<script>
import PromiseCandidate from './PromiseCandidate'
export default {
  components: {
    PromiseCandidate
  },
  data: function () {
    return {
      promises: []
    }
  },
  methods: {
    getAllPromises (newPromises) {
      this.promises.splice(0)
      this.promises.push(...newPromises)
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllPromises(await this.restDataSource.getAllPromises())
    // this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
  }
}
</script>
