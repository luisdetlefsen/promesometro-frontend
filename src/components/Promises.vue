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
        v-bind:key="p.PROMISE_ID"
        :promiseId="p.PROMISE_ID"
        :party="p.SHORT_NAME"
        :candidateName="p.NAME"
        :promise="p.PROMISE"
        :candidateImgUrl="p.PIC_URL"
        :upvotes="p.FEEL_SUM"
        :daysPassed="0"
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
        currentPage: 1,
        promiseMinId: 0,
        totalPromisesCount: 0,
        itemsPerPage: 20

      }
    }
  },
  methods: {
    async getAndSetMinPromiseId () {
      // let minPromiseId = await this.restDataSource.getMinPromiseId()
      let minPromiseId = await this.restDataSource.getPagedPromises(-1, 1)
      let realValue = minPromiseId[0].PROMISE_ID
      if (realValue >= 0) {
        this.paginatorData.promiseMinId = realValue
      } else {
        // todo: handle error
      }
    },
    async getAndSetTotalPromisesCount () {
      let totalPromisesCount = await this.restDataSource.getTotalPromisesCount()
      let realValue = totalPromisesCount.count
      if (realValue >= 0) {
        this.paginatorData.totalPromisesCount = realValue
      } else {
        // todo: handle error
      }
    },
    async getPagedPromises (page, count) {
      let minId = this.paginatorData.promiseMinId + ((page - 1) * count)
      return this.restDataSource.getPagedPromises(minId, this.paginatorData.itemsPerPage)
    },
    getAllPromises (newPromises) {
      this.promises.splice(0)
      this.promises.push(...newPromises)
      $('#spinnerPromises').hide()
    },
    async callbackPagination (page) {
      let pagedPromises = await this.getPagedPromises(page, this.paginatorData.itemsPerPage)
      this.promises.splice(0)
      this.promises.push(...pagedPromises)
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    // this.getAllPromises(await this.restDataSource.getAllPromises())
    // this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
    window.scrollTo(0, 0)
    await this.getAndSetMinPromiseId()
    await this.getAndSetTotalPromisesCount()
    this.getAllPromises(await this.getPagedPromises(1, this.paginatorData.itemsPerPage))
  }
}
</script>
