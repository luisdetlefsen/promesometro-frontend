<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Candidato</h1>
      </div>

      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Id</span>
            <input class="form-control" type="number" v-model="candidate.CANDIDATE_ID">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Nombre</span>
            <input class="form-control" v-model="candidate.NAME">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url foto</span>
            <input class="form-control" type="url" v-model="candidate.PIC_URL">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Partido</span>
            <select v-model="candidate.PARTY_ID" class="form-control">
              <option v-for="p in parties" v-bind:key="p.PARTY_ID" :value="p.PARTY_ID">{{p.PARTY}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Tipo Candidato</span>
            <select v-model="candidate.POSITION_ID" class="form-control">
              <option v-for="c in candidateRoles" v-bind:key="c.POSITION_ID" :value="c.POSITION_ID">{{c.POSITION}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Descripcion</span>
            <input class="form-control" v-model="candidate.DESCRIPTION">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url sitio</span>
            <input class="form-control" type="url" v-model="candidate.PIC_URL">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Twitter</span>
            <input class="form-control" type="url" v-model="candidate.TWITTER">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Facebook</span>
            <input class="form-control" type="url" v-model="candidate.FACEBOOK">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Casilla</span>
            <input class="form-control" type="number" v-model="candidate.STALL">
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
        CANDIDATE_ID: candidate.CANDIDATE_ID,
        NAME: candidate.NAME,
        PIC_URL: candidate.PIC_URL,
        PARTY_ID: candidate.PARTY_ID,
        PARTY: candidate.PARTY,
        POSITION_ID: candidate.POSITION_ID,
        POSITION: candidate.POSITION,
        DESCRIPTION: candidate.DESCRIPTION
      }
    },
    startCreate () {
      this.editing = false
      this.candidate = {}
    },
    save () {
      var index = this.parties.findIndex(p => p.PARTY_ID === this.candidate.PARTY_ID)
      this.candidate.PARTY = this.parties[index].PARTY
      var index2 = this.candidateRoles.findIndex(
        p => p.POSITION_ID === this.candidate.POSITION_ID
      )
      this.candidate.POSITION = this.candidateRoles[index2].POSITION

      this.eventBus.$emit('completeCandidate', this.candidate)
      this.startCreate()
    },
    cancel () {
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
