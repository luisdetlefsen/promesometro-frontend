<template>
  <div class="container">
    <h3>Tipos de candidatos</h3>
    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>ID</th>
        <th>Tipo de candidato</th>
      </tr>
      <tbody>
        <tr v-for="t in candidateRoles" v-bind:key="t.id">
          <td>{{t.id}}</td>
          <td>{{t.name}}</td>
          <td>
            <button class="btn btn-sm btn-primary" v-on:click="editCandidateRole(t)">Editar</button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteCandidateRole(t)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="candidateRoles.length===0">
          <td colspan="5" class="text-center">No hay tipo de candidatos registrados</td>
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
      candidateRoles: []
    }
  },
  methods: {
    editCandidateRole (candidateRole) {
      this.eventBus.$emit('editCandidateRole', candidateRole)
    },
    async deleteCandidateRole (candidateRole) {
      this.$swal({
        title: 'Eliminar tipo candidato',
        text: 'Seguro que deseas eliminar el tipo ' + candidateRole.name + '?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteCandidateRole(candidateRole)
          var index = this.candidateRoles.findIndex(
            c => c.id === candidateRole.id
          )
          this.candidateRoles.splice(index, 1)
          this.$swal('Tipo candidato eliminado: ' + candidateRole.name, {
            icon: 'success'
          })
        }
      })
    },
    getAllCandidateRoles (newCandidateRoles) {
      this.candidateRoles.splice(0)
      this.candidateRoles.push(...newCandidateRoles)
    },
    async processCompleteCandidateRole (candidateRole) {
      let index = this.candidateRoles.findIndex(c => c.id === candidateRole.id)
      if (index === -1) {
        await this.restDataSource.saveCandidateRole(candidateRole)
        this.candidateRoles.push(candidateRole)
        this.$swal('Tipo candidato agregado', candidateRole.name, 'success')
      } else {
        await this.restDataSource.updateCandidateRole(candidateRole)
        Vue.set(this.candidateRoles, index, candidateRole)
        this.$swal('Tipo candidato actualizado', candidateRole.name, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    console.log('what')
    this.getAllCandidateRoles(await this.restDataSource.getAllCandidateRoles())
    this.eventBus.$on(
      'completeCandidateRole',
      this.processCompleteCandidateRole
    )
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}
</style>
