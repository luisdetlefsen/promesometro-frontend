<template>
  <div class="container">
    <div class="col-xl-12 mx-auto">
      <h1 class="mb-5 section-title">Tipos de candidatos</h1>
    </div>
    <div class="row">
      <button
        type="button"
        id="btnAdd"
        class="btn btn-primary"
        data-toggle="modal"
        v-on:click="editCandidateRole"
        data-target="#exampleModal"
      >Agregar</button>
    </div>
    <table class="table table-sm table-striped table-bordered">
      <col width="70%" />
      <col width="30%" />
      <tr>
        <th>Tipo de candidato</th>
        <th></th>
      </tr>
      <tbody>
        <tr v-for="t in candidateRoles" v-bind:key="t.POSITION_ID">
          <td>{{t.POSITION}}</td>
          <td>
            <button class="btn btn-sm btn-primary" v-on:click="editCandidateRole(t)">Editar</button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteCandidateRole(t)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="candidateRoles.length===0">
          <td colspan="3" class="text-center">No hay tipo de candidatos registrados</td>
        </tr>
        <tr id="spinnerRoles">
          <td colspan="3" class="text-center">
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
            <h5 class="modal-title" id="exampleModalLabel">Crear/Editar tipo de candidato</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <admin-candidate-role-editor />
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
import AdminCandidateRoleEditor from './AdminCandidateRoleEditor.vue'

export default {
  props: {},
  components: { AdminCandidateRoleEditor },
  data: function () {
    return {
      candidateRoles: []
    }
  },
  methods: {
    dissmissEditDialog () {
      $('#exampleModal').modal('hide')
    },
    editCandidateRole (candidateRole) {
      $('#exampleModal').modal('show')
      this.eventBus.$emit('editCandidateRole', candidateRole)
    },
    async deleteCandidateRole (candidateRole) {
      this.$swal({
        title: 'Eliminar tipo candidato',
        text:
          'Seguro que deseas eliminar el tipo ' + candidateRole.POSITION + '?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteCandidateRole(candidateRole)
          var index = this.candidateRoles.findIndex(
            c => c.POSITION_ID === candidateRole.POSITION_ID
          )
          this.candidateRoles.splice(index, 1)
          this.$swal('Tipo candidato eliminado: ' + candidateRole.POSITION, {
            icon: 'success'
          })
        }
      })
    },
    getAllCandidateRoles (newCandidateRoles) {
      this.candidateRoles.splice(0)
      this.candidateRoles.push(...newCandidateRoles)
      $('#spinnerRoles').hide()
    },
    async processCompleteCandidateRole (candidateRole) {
      let index = this.candidateRoles.findIndex(
        c => c.POSITION_ID === candidateRole.POSITION_ID
      )
      if (index === -1) {
        await this.restDataSource.saveCandidateRole(candidateRole)
        this.candidateRoles.push(candidateRole)
        this.$swal('Tipo candidato agregado', candidateRole.POSITION, 'success')
      } else {
        await this.restDataSource.updateCandidateRole(candidateRole)
        Vue.set(this.candidateRoles, index, candidateRole)
        this.$swal('Tipo candidato actualizado', candidateRole.POSITION, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllCandidateRoles(await this.restDataSource.getAllCandidateRoles())
    this.eventBus.$on('completeCandidateRole', this.processCompleteCandidateRole)
    this.eventBus.$on('dissmissCandidateRoleEditor', this.dissmissEditDialog)
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}

table {
  width: 50%;
  margin: auto;
}

#btnAdd {
  margin-right: 2%;
  margin-left: auto;
}
</style>
