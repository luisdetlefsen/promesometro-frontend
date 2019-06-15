<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p>Tipo de candidato</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Id</span>
            <input type="text" class="form-control" v-model="candidateRole.POSITION_ID">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Tipo candidato</span>
            <input type="text" class="form-control" v-model="candidateRole.POSITION">
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
      candidateRole: {}
    }
  },
  methods: {
    startEdit (candidateRole) {
      this.editing = true
      this.candidateRole = {
        POSITION_ID: candidateRole.POSITION_ID,
        POSITION: candidateRole.POSITION
      }
    },
    startCreate () {
      this.editing = false
      this.candidateRole = {}
    },
    save () {
      this.eventBus.$emit('completeCandidateRole', this.candidateRole)
      this.startCreate()
    },
    cancel () {
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
