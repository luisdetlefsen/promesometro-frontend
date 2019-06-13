<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p>Candidato</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Id</span>
            <input class="form-control" type="number" v-model="candidate.id">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Nombre</span>
            <input class="form-control" v-model="candidate.name">
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
            <select v-model="candidate.partyId" class="form-control">
              <option v-for="p in parties" v-bind:key="p.id" :value="p.id">{{p.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Tipo Candidato</span>
            <select v-model="candidate.candidateRoleId" class="form-control">
              <option v-for="c in candidateRoles" v-bind:key="c.id" :value="c.id">{{c.name}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Descripcion</span>
            <input class="form-control" v-model="candidate.description">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url sitio</span>
            <input class="form-control" type="url" v-model="candidate.siteUrl">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Twitter</span>
            <input class="form-control" type="url" v-model="candidate.twitter">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Facebook</span>
            <input class="form-control" type="url" v-model="candidate.facebook">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Casilla</span>
            <input class="form-control" type="number" v-model="candidate.stall">
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
        id: candidate.id,
        name: candidate.name,
        imgUrl: candidate.imgUrl,
        partyId: candidate.partyId,
        partyName: candidate.partyName,
        candidateRoleId: candidate.candidateRoleId,
        candidateRoleName: candidate.candidateRoleName,
        description: candidate.description
      }
    },
    startCreate () {
      this.editing = false
      this.candidate = {}
    },
    save () {
      var index = this.parties.findIndex(p => p.id === this.candidate.partyId)
      this.candidate.partyName = this.parties[index].name
      var index2 = this.candidateRoles.findIndex(
        p => p.id === this.candidate.candidateRoleId
      )
      this.candidate.candidateRoleName = this.candidateRoles[index2].name

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
