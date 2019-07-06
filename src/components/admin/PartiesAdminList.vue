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
        <th>Url imagen partido</th>
        <th></th>
      </tr>
      <tbody>
        <tr v-for="p in parties" v-bind:key="p.PARTY_ID">
          <td>{{p.PARTY}}</td>
          <td>{{p.LOGO_URL}}</td>

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
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

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
            <party-admin-editor/>
          </div>
          <div class="modal-footer">

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import 'bootstrap'
import PartyAdminEditor from './PartyAdminEditor.vue'

export default {
  props: {},
  components: {
    PartyAdminEditor
  },
  data: function () {
    return {
      parties: []
    }
  },
  methods: {
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
        text: 'Seguro que deseas eliminar el partido ' + party.PARTY,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteParty(party)
          let index = this.parties.findIndex(
            p => p.PARTY_ID === party.PARTY_ID
          )
          this.parties.splice(index, 1)
          this.$swal('Partido eliminiado: ' + party.PARTY, {
            icon: 'success'
          })
        }
      })
    },
    getAllParties (newParties) {
      this.parties.splice(0)
      this.parties.push(...newParties)
      $('#spinnerParties').hide()
    },
    async processCompleteParty (party) {
      let index = this.parties.findIndex(p => p.PARTY_ID === party.PARTY_ID)
      if (index === -1) {
        await this.restDataSource.saveParty(party)
        this.parties.push(party)
        this.$swal('Partido agregado', party.PARTY, 'success')
      } else {
        await this.restDataSource.updateParty(party)
        Vue.set(this.parties, index, party)
        this.$swal('Partido actualizado', party.PARTY, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllParties(await this.restDataSource.getParties())
    this.eventBus.$on('completeParty', this.processCompleteParty)
    this.eventBus.$on('dissmissPartyEditor', this.dissmissPartyEditor)
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}

#btnAdd {
  margin-right: 2%;
  margin-left: auto;
}
</style>
