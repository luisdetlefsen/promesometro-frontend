<template>
  <div class="container">
    <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Partidos</h1>
      </div>
    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Url imagen partido</th>
        <th></th>
      </tr>
      <tbody>
        <tr v-for="p in parties" v-bind:key="p.PARTY_ID">
          <td>{{p.PARTY_ID}}</td>
          <td>{{p.PARTY}}</td>
          <td>{{p.LOGO_URL}}</td>

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
      this.$swal({
        title: 'Eliminar partido',
        text: 'Seguro que deseas eliminar el partido ' + party.PARTY,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteParty(party)
          let index = this.parties.findIndex(p => p.PARTY_ID === party.PARTY_ID)
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
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}
</style>
