<template>
  <div class="container">
    <div class="col-xl-12 mx-auto">
      <h1 class="mb-5 section-title">Promesas</h1>
    </div>

    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>Id</th>
        <th>Partido</th>
        <th>Candidato</th>
        <th>Promesa</th>
        <th>Status</th>
        <th></th>
      </tr>
      <tbody>
        <tr v-for="p in promises" v-bind:key="p.idPromise">
          <td>
            <a :href="`${p.promiseLink}`" target="_blank" style="color:purple;">{{p.idPromise}}</a>
          </td>
          <td>{{p._embedded.party.party}}</td>
          <td>{{p._embedded.candidate.candidateName}}</td>
          <td>{{p.promiseText}}</td>
          <td>
            <span v-if="p.approved">Aprobado</span>
            <span v-if="!p.approved">No aprobado</span>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" v-on:click="updatePromiseStatus(p.idPromise,true)">Aprobar</button>
            <button class="btn btn-sm btn-danger" v-on:click="updatePromiseStatus(p.idPromise,false)">Quitar aprobación</button>
          </td>
        </tr>
        <tr v-if="promises.length===0">
          <td colspan="4" class="text-center">No hay promesas registradas</td>
        </tr>
        <tr id="spinnerPromises">
          <td colspan="4" class="text-center">
            <div class="sub-section-title spinner-border" role="status">
              <span class="sr-only">Cargando...</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="display:flex;flex-wrap:wrap;margin:auto;align-items: center;justify-content: center;">
      <pagination
        :records="paginatorData.totalPromisesCount"
        v-model="paginatorData.currentPage"
        :per-page="paginatorData.itemsPerPage"
        @paginate="callbackPagination"
        :options="paginatorOptions"
      ></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2'
import $ from 'jquery'
export default {
  components: {
    Pagination
  },
  data: function () {
    return {
      promises: [],
      paginatorOptions: {
        texts: {
          count:
            'Mostrando de {from} a {to} de {count} promesas|{count} promesas|Una promesa'
        },
        first: 'Primera',
        last: 'Última'
      },
      paginatorData: {
        currentPage: 0,
        totalPromisesCount: 0,
        itemsPerPage: 20
      }
    }
  },
  methods: {
    async getPagedPromises (page) {
      return this.restDataSource.getPagedPromises(page - 1)
    },
    async callbackPagination (page) {
      let pagedPromises = await this.getPagedPromises(page)
      this.promises.splice(0)
      for (let i = 0; i < pagedPromises.length; i++) {
        // ugly fix for spring
        pagedPromises[i].idPromise = pagedPromises[i].id
        pagedPromises[i].promiseLink = '/#/promesas/' + pagedPromises[i].idPromise
      }
      this.promises.push(...pagedPromises)
    },
    getAllPromises (newPromises) {
      this.promises.splice(0)
      for (let i = 0; i < newPromises.length; i++) {
        newPromises[i].idPromise = newPromises[i].id
        newPromises[i].promiseLink = '/#/promesas/' + newPromises[i].idPromise
      }
      this.promises.push(...newPromises)
      $('#spinnerPromises').hide()
    },
    async updatePromiseStatus (promiseId, approved) {
      let thePromise = {
        idPromise: promiseId,
        approved: approved
      }
      await this.restDataSource.updatePromise(thePromise)
      for (let i = 0; i < this.promises.length; i++) {
        if (this.promises[i].idPromise === promiseId) {
          this.promises[i].approved = approved
          break
        }
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    let promisesResponse = await this.restDataSource.getAllPromises()
    this.paginatorData = {
      currentPage: 1,
      totalPromisesCount: promisesResponse.page.totalElements,
      itemsPerPage: 20
    }
    this.getAllPromises(promisesResponse._embedded.promises)
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}
</style>
