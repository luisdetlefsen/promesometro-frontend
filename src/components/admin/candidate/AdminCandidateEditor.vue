<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="col-xl-12 mx-auto">
        <h1>Candidato</h1>
      </div>

      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Nombre</span>
            <input class="form-control" v-model="candidate.candidateName">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url foto</span>
            <input class="form-control" type="url" v-model="candidate.imgUrl">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Partido</span>
            <select v-model="candidate.idParty" class="form-control">
              <option v-for="p in parties" v-bind:key="p.id" :value="p.id">{{p.party}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Tipo Candidato</span>
            <select v-model="candidate.idCandidateType" class="form-control">
              <option v-for="c in candidateRoles" v-bind:key="c.id" :value="c.id">{{c.position}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Descripción</span>
            <input class="form-control" v-model="candidate.description">
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="text-center">
          <button class="btn btn-primary" v-on:click="save">{{editing?"Guardar cambios": "Crear"}}</button>
          <button class="btn btn-secondary" v-on:click="cancel">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      editing: false,
      candidate: {},
      parties: [],
      candidateRoles: []
    }
  },
  methods: {
    startEdit (candidate) {
      this.editing = true
      this.candidate = {
        idCandidate: candidate.idCandidate,
        candidateName: candidate.candidateName,
        imgUrl: candidate.imgUrl,
        idParty: candidate._embedded.party.id,
        party: candidate._embedded.party.party,
        idCandidateType: candidate._embedded.candidateType.id,
        idPosition: candidate._embedded.candidateType.id,
        position: candidate._embedded.candidateType.position,
        description: candidate.description
      }
    },
    startCreate () {
      this.editing = false
      this.candidate = {}
    },
    save () {
      var index = this.parties.findIndex(p => p.id === this.candidate.idParty)
      this.candidate.party = this.parties[index]._links.self.href
      var index2 = this.candidateRoles.findIndex(
        p => p.id === this.candidate.idCandidateType
      )
      this.candidate.candidateType = this.candidateRoles[index2]._links.self.href
      this.eventBus.$emit('completeCandidate', this.candidate)
      this.startCreate()
      this.eventBus.$emit('dismissCandidateEditor')
    },
    cancel () {
      this.eventBus.$emit('dismissCandidateEditor')
      this.candidate = {}
      this.editing = false
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    this.eventBus.$on('createCandidate', this.startCreate)
    this.eventBus.$on('editCandidate', this.startEdit)
    this.parties = await this.restDataSource.getParties()
    this.candidateRoles = await this.restDataSource.getAllCandidateRoles()
  },
  beforeDestroy () {
    this.eventBus.$off('createCandidate')
    this.eventBus.$off('editCandidate')
  }
}
</script>

<style scoped>
.input-group-text {
  width: 10rem;
}
.btn {
  margin-left: 1rem;
}
</style>
