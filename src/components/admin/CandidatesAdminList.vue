<template>
  <div class="container">
    <h3>Candidatos</h3>
    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Partido</th>
        <th>Foto</th>
      </tr>
      <tbody>
        <tr v-for="c in candidates" v-bind:key="c.id">
          <td>{{c.id}}</td>
          <td>{{c.name}}</td>
          <td>{{c.partyName}}</td>
          <td>{{c.imgUrl}}</td>

          <td>
            <button class="btn btn-sm btn-primary" v-on:click="editCandidate(c)">Editar</button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteCandidate(c)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="candidates.length===0">
          <td colspan="5" class="text-center">No hay candidatos registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {},
  data: function () {
    return {
      candidates: []
    }
  },
  methods: {
    createCandidate () {
      this.eventBus.$emit('createCandidate')
    },
    editCandidate (candidate) {
      this.eventBus.$emit('editCandidate', candidate)
    },
    async deleteCandidate (candidate) {
      this.$swal({
        title: 'Eliminar candidato',
        text: 'Seguro que deseas eliminar el candidato ' + candidate.name + '?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteCandidate(candidate)
          var index = this.candidates.findIndex(c => c.id === candidate.id)
          this.candidates.splice(index, 1)
          this.$swal('Candidato eliminado: ' + candidate.name, {
            icon: 'success'
          })
        }
      })
    },
    getAllCandidates (newCandidates) {
      this.candidates.splice(0)
      this.candidates.push(...newCandidates)
    },
    async processCompleteCandidate (candidate) {
      let index = this.candidates.findIndex(c => c.id === candidate.id)
      if (index === -1) {
        await this.restDataSource.saveCandidate(candidate)
        this.candidates.push(candidate)
        this.$swal('Candidato agregado', candidate.name, 'success')
      } else {
        await this.restDataSource.updateCandidate(candidate)
        Vue.set(this.candidates, index, candidate)
        this.$swal('Candidato actualizado', candidate.name, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllCandidates(await this.restDataSource.getAllCandidates())
    this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}
</style>
