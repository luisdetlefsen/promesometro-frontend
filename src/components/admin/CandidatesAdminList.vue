<template>
  <div class="container">
    <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Candidatos</h1>
      </div>

      <div class="row">
      <button
        type="button"
        id="btnAdd"
        class="btn btn-primary"
        data-toggle="modal"
        v-on:click="editCandidate"
        data-target="#exampleModal"
      >Agregar</button>
    </div>
    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>Nombre</th>
        <th>Partido</th>
        <th>Puesto</th>
        <th>Foto</th>
      </tr>
      <tbody>
        <tr v-for="c in candidates" v-bind:key="c.CANDIDATE_ID">
          <td>{{c.NAME}}</td>
          <td>{{c.PARTY}}</td>
          <td>{{c.POSITION}}</td>
          <td> <img :src=c.PIC_URL alt="" class="candidateSmall"> </td>

          <td>
            <button class="btn btn-sm btn-primary" v-on:click="editCandidate(c)">Editar</button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteCandidate(c)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="candidates.length===0">
          <td colspan="5" class="text-center">No hay candidatos registrados</td>
        </tr>
        <tr id="spinnerCandidates">
          <td colspan="5" class="text-center">
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
            <candidate-admin-editor/>
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
import CandidateAdminEditor from './CandidateAdminEditor.vue'
export default {
  props: {},
  components: {
    CandidateAdminEditor
  },
  data: function () {
    return {
      candidates: []
    }
  },
  methods: {
    dismissCandidateEditor () {
      $('#exampleModal').modal('hide')
    },
    createCandidate () {
      this.eventBus.$emit('createCandidate')
    },
    editCandidate (candidate) {
      $('#exampleModal').modal('show')
      this.eventBus.$emit('editCandidate', candidate)
    },
    async deleteCandidate (candidate) {
      this.$swal({
        title: 'Eliminar candidato',
        text: 'Seguro que deseas eliminar el candidato ' + candidate.NAME + '?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteCandidate(candidate)
          var index = this.candidates.findIndex(c => c.CANDIDATE_ID === candidate.CANDIDATE_ID)
          this.candidates.splice(index, 1)
          this.$swal('Candidato eliminado: ' + candidate.NAME, {
            icon: 'success'
          })
        }
      })
    },
    getAllCandidates (newCandidates) {
      this.candidates.splice(0)
      this.candidates.push(...newCandidates)
      $('#spinnerCandidates').hide()
    },
    async processCompleteCandidate (candidate) {
      let index = this.candidates.findIndex(c => c.CANDIDATE_ID === candidate.CANDIDATE_ID)
      if (index === -1) {
        await this.restDataSource.saveCandidate(candidate)
        this.candidates.push(candidate)
        this.$swal('Candidato agregado', candidate.NAME, 'success')
      } else {
        await this.restDataSource.updateCandidate(candidate)
        Vue.set(this.candidates, index, candidate)
        this.$swal('Candidato actualizado', candidate.NAME, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.getAllCandidates(await this.restDataSource.getAllCandidates())
    this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
    this.eventBus.$on('dismissCandidateEditor', this.dismissCandidateEditor)
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}

.candidateSmall{
  max-width: 64px;
  max-height: 64px;
}
#btnAdd {
  margin-right: 2%;
  margin-left: auto;
}
</style>
