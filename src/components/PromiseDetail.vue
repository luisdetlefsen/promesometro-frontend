<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Promesa</h1>
      </div>
    </div>

    <div class="row">
        Promesa: {{this.promise.id}}
        <promise-candidate
            :party="promise.PARTY"
        :candidateName="promise.NAME"
        :promise="promise.PROMISE"
        :candidateImgUrl="promise.PIC_URL"
        />
    </div>
  </div>
</template>

<script>

import PromiseCandidate from './PromiseCandidate'

export default {
  props: {},
  components: {
    PromiseCandidate
  },
  inject: ['eventBus', 'restDataSource'],
  methods: {

  },
  data: function () {
    return {
      promise: {
        id: 0,
        PARTY: '',
        NAME: '',
        PROMISE: '',
        PIC_URL: ''
      }
    }
  },
  async mounted () {
    let promise = await this.restDataSource.getPagedPromises(this.$route.params.id, 1)
    this.promise = promise[0]
  }
}
</script>
