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
        <th></th>
      </tr>
      <tbody>
        <tr v-for="c in candidates" v-bind:key="c.idCandidate">
          <td>{{c.candidateName}}</td>
          <td>{{c._embedded.party.shortName}}</td>
          <td>{{c._embedded.candidateType.position}}</td>
          <td>
            <img :src="c.imgUrl" alt class="candidateSmall" />
          </td>

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

    <div style="display:flex;flex-wrap:wrap;margin:auto;align-items: center;justify-content: center;">
      <pagination
        :records="paginatorData.totalCandidatesCount"
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
            <h5 class="modal-title" id="exampleModalLabel">Crear/Editar tipo de candidato</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <admin-candidate-editor />
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
import AdminCandidateEditor from './AdminCandidateEditor.vue'
import Pagination from 'vue-pagination-2'
export default {
  props: {},
  components: {
    AdminCandidateEditor,
    Pagination
  },
  data: function () {
    return {
      candidates: [],
      paginatorOptions: {
        texts: {
          count:
            'Mostrando de {from} a {to} de {count} candidatos|{count} candidatos|Un candidato'
        },
        first: 'Primera',
        last: 'Última'
      },
      paginatorData: {
        currentPage: 0,
        totalCandidatesCount: 0,
        itemsPerPage: 20
      }
    }
  },
  methods: {
    async getPagedCandidates (page) {
      return this.restDataSource.getPagedCandidates(page - 1)
    },
    async callbackPagination (page) {
      let pagedCandidates = await this.getPagedCandidates(page)
      this.candidates.splice(0)
      for (let i = 0; i < pagedCandidates.length; i++) {
        // ugly fix for spring
        pagedCandidates[i].idPromise = pagedCandidates[i].id
      }
      this.candidates.push(...pagedCandidates)
    },
    dismissCandidateEditor () {
      $('#exampleModal').modal('hide')
    },
    createCandidate () {
      this.eventBus.$emit('createCandidate')
    },
    editCandidate (candidate) {
      $('#exampleModal').modal('show')
      if (candidate.idCandidate) {
        this.eventBus.$emit('editCandidate', candidate)
      } else {
        this.eventBus.$emit('createCandidate', candidate)
      }
    },
    async deleteCandidate (candidate) {
      this.$swal({
        title: 'Eliminar candidato',
        text:
          'Seguro que deseas eliminar el candidato ' +
          candidate.candidateName +
          '?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.restDataSource.deleteCandidate(candidate)
          var index = this.candidates.findIndex(
            c => c.idCandidate === candidate.idCandidate
          )
          this.candidates.splice(index, 1)
          this.$swal('Candidato eliminado: ' + candidate.candidateName, {
            icon: 'success'
          })
        }
      })
    },
    getAllCandidates (newCandidates) {
      this.candidates.splice(0)
      for (let i = 0; i < newCandidates.length; i++) {
        // ugly fix for spring
        newCandidates[i].idCandidate = newCandidates[i].id
        newCandidates[i].id = undefined
      }
      this.candidates.push(...newCandidates)
      $('#spinnerCandidates').hide()
    },
    async processCompleteCandidate (candidate) {
      let index = this.candidates.findIndex(
        c => c.idCandidate === candidate.idCandidate
      )
      if (index === -1) {
        let result = await this.restDataSource.saveCandidate(candidate)
        candidate._embedded = result.data._embedded
        candidate.idCandidate = result.data.id
        this.candidates.push(candidate)
        this.$swal('Candidato agregado', candidate.candidateName, 'success')
      } else {
        let updateResult = await this.restDataSource.updateCandidate(candidate)
        candidate._embedded = updateResult.data._embedded
        Vue.set(this.candidates, index, candidate)
        this.$swal('Candidato actualizado', candidate.candidateName, 'success')
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    let responseCandidates = await this.restDataSource.getAllCandidates2()

    this.getAllCandidates(responseCandidates._embedded.candidates)
    this.paginatorData = {
      currentPage: 1,
      totalCandidatesCount: responseCandidates.page.totalElements,
      itemsPerPage: 20
    }
    this.eventBus.$on('completeCandidate', this.processCompleteCandidate)
    this.eventBus.$on('dismissCandidateEditor', this.dismissCandidateEditor)
  },
  beforeDestroy () {
    this.eventBus.$off('completeCandidate')
    this.eventBus.$off('dismissCandidateEditor')
  }
}
</script>

<style scoped>
.btn {
  margin-left: 1rem;
}

.candidateSmall {
  max-width: 64px;
  max-height: 64px;
}
#btnAdd {
  margin-right: 2%;
  margin-left: auto;
}
</style>
