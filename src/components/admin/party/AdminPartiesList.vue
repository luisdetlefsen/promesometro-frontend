<template>
  <div class="container">
    <div class="col-xl-12 mx-auto">
      <h1 class="mb-5 section-title">Partidos</h1>
    </div>
    <div class="row">
      <button
        type="button"
        id="btnAdd"
        class="btn btn-primary"
        data-toggle="modal"
        v-on:click="editParty"
        data-target="#exampleModal"
      >Agregar</button>
    </div>

    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>Nombre</th>
        <th>Logo</th>
        <th></th>
      </tr>
      <tbody>
        <tr v-for="p in parties" v-bind:key="p.idParty">
          <td>{{p.party}}</td>
          <td>
            <img :src="p.logoUrl" alt class="partySmall" />
          </td>

          <td>
            <button class="btn btn-sm btn-primary" v-on:click="editParty(p)">Editar</button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteParty(p)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="parties.length===0">
          <td colspan="4" class="text-center">No hay partidos registrados</td>
        </tr>
        <tr id="spinnerParties">
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
        :records="paginatorData.totalPartiesCount"
        v-model="paginatorData.currentPage"
        :per-page="paginatorData.itemsPerPage"
        @paginate="callbackPagination"
        :options="paginatorOptions"
      ></pagination>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear/Editar partido</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <admin-party-editor />
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import 'bootstrap'
import AdminPartyEditor from './AdminPartyEditor.vue'
import Pagination from 'vue-pagination-2'

export default {
  props: {},
  components: {
    AdminPartyEditor,
    Pagination
  },
  data: function () {
    return {
      parties: [],
      paginatorOptions: {
        texts: {
          count:
            'Mostrando de {from} a {to} de {count} partidos|{count} partidos|Un partido'
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
    async getPagedParties (page) {
      return this.restDataSource.getPagedParties(page - 1)
    },
    async callbackPagination (page) {
      let pagedParties = await this.getPagedParties(page)
      this.parties.splice(0)
      for (let i = 0; i < pagedParties.length; i++) {
        // ugly fix for spring
        pagedParties[i].idParty = pagedParties[i].id
      }
      this.parties.push(...pagedParties)
    },
    dissmissPartyEditor () {
      $('#exampleModal').modal('hide')
    },
    createParty () {
      this.eventBus.$emit('createParty')
    },
    editParty (party) {
      this.eventBus.$emit('editParty', party)
      $('#exampleModal').modal('show')
    },
    async deleteParty (party) {
      this.$swal({
        title: 'Eliminar partido',
        text: 'Seguro que deseas eliminar el partido ' + party.party,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteParty(party)
          let index = this.parties.findIndex(p => p.idParty === party.idParty)
          this.parties.splice(index, 1)
          this.$swal('Partido eliminiado: ' + party.party, {
            icon: 'success'
          })
        }
      })
    },
    getAllParties (newParties) {
      this.parties.splice(0)
      for (let i = 0; i < newParties.length; i++) {
        // ugly fix for spring
        newParties[i].idParty = newParties[i].id
        newParties[i].id = undefined
      }
      this.parties.push(...newParties)
      $('#spinnerParties').hide()
    },
    async processCompleteParty (party) {
      let index = this.parties.findIndex(p => p.idParty === party.idParty)
      if (index === -1) {
        let result = await this.restDataSource.saveParty(party)
        party.idParty = result.id
        party.id = result.id
        this.parties.push(party)
        this.party = {}
        this.$swal('Partido agregado', party.party, 'success')
      } else {
        await this.restDataSource.updateParty(party)
        Vue.set(this.parties, index, party)
        this.$swal('Partido actualizado', party.party, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    let partiesResponse = await this.restDataSource.getAllParties()
    this.getAllParties(partiesResponse._embedded.parties)

    this.paginatorData = {
      currentPage: 1,
      totalPartiesCount: partiesResponse.page.totalElements,
      itemsPerPage: 20
    }
    this.eventBus.$on('completeParty', this.processCompleteParty)
    this.eventBus.$on('dissmissPartyEditor', this.dissmissPartyEditor)
  },
  beforeDestroy () {
    this.eventBus.$off('completeParty')
    this.eventBus.$off('dissmissPartyEditor')
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}

.partySmall {
  max-width: 64px;
  max-height: 64px;
}

#btnAdd {
  margin-right: 2%;
  margin-left: auto;
}
</style>
