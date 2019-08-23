<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Promesas</h1>
      </div>
    </div>

  <div style="display:flex;flex-wrap:wrap;margin:auto;align-items: center;justify-content: center;">
    <pagination :records="paginatorData.totalPromisesCount" v-model="paginatorData.currentPage" :per-page="paginatorData.itemsPerPage" @paginate="callbackPagination" :options="paginatorOptions">
  </pagination>
    </div>
    <div style="display:flex;flex-wrap:wrap;margin:auto;align-items: center;justify-content: center;">

      <div class="sub-section-title spinner-border" role="status" id="spinnerPromises">
        <span class="sr-only">Loading...</span>
      </div>
      <promise-candidate
        v-for="p in promises"
        v-bind:key="p.idPromise"
        :promiseId="p.idPromise"
        :party="p._embedded.party.shortName"
        :candidateName="p._embedded.candidate.candidateName"
        :promise="p.promiseText"
        :candidateImgUrl="p._embedded.candidate.imgUrl"
        :upvotes="p.FEEL_SUM"
        :daysPassed="p.daysPassedSinceCreation"
        :displayPromiseLink="true"
      />
    </div>
    <div style="display:flex;flex-wrap:wrap;margin:auto;align-items: center;justify-content: center;margin-top:35px;">
    <pagination :records="paginatorData.totalPromisesCount" v-model="paginatorData.currentPage" :per-page="paginatorData.itemsPerPage" @paginate="callbackPagination" :options="paginatorOptions">
  </pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import PromiseCandidate from './PromiseCandidate'
import Pagination from 'vue-pagination-2'

export default {
  components: {
    PromiseCandidate,
    Pagination
  },
  data: function () {
    return {
      promises: [],
      paginatorOptions: {
        texts: { count: 'Mostrando de {from} a {to} de {count} promesas|{count} promesas|Una promesa' },
        first: 'Primera',
        last: 'Última'
      },
      paginatorData: {
        currentPage: 0,
        promiseMinId: 0,
        totalPromisesCount: 0,
        itemsPerPage: 20

      }
    }
  },
  methods: {
    async getPagedPromises (page) {
      return this.restDataSource.getPagedPromises(page)
    },
    getAllPromises (newPromises) {
      this.paginatorData.itemsPerPage = newPromises.page.size
      this.paginatorData.currentPage = newPromises.page.number
      this.paginatorData.totalPromisesCount = newPromises.page.totalElements
      this.promises.splice(0)
      for (let i = 0; i < newPromises._embedded.promises.length; i++) { // ugly fix for spring
        newPromises._embedded.promises[i].idPromise = newPromises._embedded.promises[i].id
        newPromises._embedded.promises[i].id = undefined
      }

      this.promises.push(...newPromises._embedded.promises)
      $('#spinnerPromises').hide()
    },
    async callbackPagination (page) {
      let pagedPromises = await this.getPagedPromises(page)
      this.promises.splice(0)
      for (let i = 0; i < pagedPromises.length; i++) { // ugly fix for spring
        pagedPromises[i].idPromise = pagedPromises[i].id
        pagedPromises[i].id = undefined
      }
      this.promises.push(...pagedPromises)
    },
    async isAdmin () {
      let c = await this.$Amplify.Auth.currentSession()
      let d = c.idToken.payload['cognito:roles']
      if (d && d.length > 0) {
        if (d[0].includes('webadmins')) { return true }
      }
      return false
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    // this.getAllPromises(await this.restDataSource.getAllPromises())
    // this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
    window.scrollTo(0, 0)
    this.getAllPromises(await this.restDataSource.getAllPromises())

    console.log(await this.isAdmin())
  }
}
</script>
