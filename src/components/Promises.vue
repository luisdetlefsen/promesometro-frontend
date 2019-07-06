<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Promesas</h1>
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;margin:auto;">
      <div class="sub-section-title spinner-border" role="status" id="spinnerPromises">
        <span class="sr-only">Loading...</span>
      </div>
      <promise-candidate
        v-for="p in promises"
        v-bind:key="p.PROMISE_ID"
        :party="p.PARTY"
        :candidateName="p.NAME"
        :promise="p.PROMISE"
        :candidateImgUrl="p.PIC_URL"
      />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
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
      $('#spinnerPromises').hide()
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllPromises(await this.restDataSource.getAllPromises())
    // this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
    window.scrollTo(0, 0)
  }
}
</script>
