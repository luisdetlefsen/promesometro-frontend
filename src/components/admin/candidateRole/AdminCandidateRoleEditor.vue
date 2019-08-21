<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="col-xl-12 mx-auto">
        <h1>Tipo de candidato</h1>
      </div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Tipo candidato</span>
            <input type="text" class="form-control" v-model="candidateRole.position">
          </div>
        </div>
      </div>
      <div class="card-footer">
          <div class="text-center">
            <button class="btn btn-primary" v-on:click="save">{{this.editing?"Guardar cambios": "Crear"}}</button>
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
      candidateRole: {}
    }
  },
  methods: {
    startEdit (candidateRole) {
      this.editing = true
      this.candidateRole = {
        idCandidateType: candidateRole.idCandidateType,
        position: candidateRole.position
      }
    },
    startCreate () {
      this.editing = false
      this.candidateRole = {}
    },
    save () {
      this.eventBus.$emit('completeCandidateRole', this.candidateRole)
      this.eventBus.$emit('dissmissCandidateRoleEditor')
      this.startCreate()
    },
    cancel () {
      this.eventBus.$emit('dissmissCandidateRoleEditor')
      this.candidateRole = {}
      this.editing = false
    }
  },
  inject: ['eventBus'],
  created () {
    this.eventBus.$on('createCandidateRole', this.startCreate)
    this.eventBus.$on('editCandidateRole', this.startEdit)
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
