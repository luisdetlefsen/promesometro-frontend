<template>
  <div class="container">
    <h3>Partidos</h3>
    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Url imagen partido</th>
        <th></th>
      </tr>
      <tbody>
        <tr v-for="p in parties" v-bind:key="p.id">
          <td>{{p.id}}</td>
          <td>{{p.name}}</td>
          <td>{{p.imgUrl}}</td>

          <td>
            <button class="btn btn-sm btn-primary" v-on:click="editParty(p)">Editar</button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteParty(p)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="parties.length===0">
          <td colspan="5" class="text-center">No hay partidos registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  // name: "CandidatesAdminList",
  props: {},
  data: function () {
    return {
      parties: []
    }
  },
  methods: {
    createParty () {
      this.eventBus.$emit('createParty')
    },
    editParty (party) {
      this.eventBus.$emit('editParty', party)
    },
    async deleteParty (party) {
      await this.restDataSource.deleteParty(party)
      let index = this.parties.findIndex(p => p.id === party.id)
      this.parties.splice(index, 1)
    },
    getAllParties (newParties) {
      this.parties.splice(0)
      this.parties.push(...newParties)
    },
    async processCompleteParty (party) {
      let index = this.parties.findIndex(p => p.id === party.id)
      if (index === -1) {
        await this.restDataSource.saveParty(party)
        this.parties.push(party)
      } else {
        await this.restDataSource.updateParty(party)
        Vue.set(this.parties, index, party)
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllParties(await this.restDataSource.getParties())
    this.eventBus.$on('completeParty', this.processCompleteParty)
  }
}
</script>
