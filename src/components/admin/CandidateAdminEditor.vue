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
            <input class="form-control" v-model="candidate.id">
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
            <span class="input-group-text">Partido</span>
            <select name id></select>
          </div>
        </div>
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
      candidate: {}
    }
  },
  methods: {
    startEdit (candidate) {
      this.editing = true
      this.candidate = {
        id: candidate.id,
        name: candidate.name,
        imgUrl: candidate.imgUrl
      }
    },
    startCreate () {
      this.editing = false
      this.candidate = {}
    },
    save () {
      this.eventBus.$emit('completeCandidate', this.candidate)
      this.startCreate()
    },
    cancel () {
      this.candidate = {}
      this.editing = false
    }
  },
  inject: ['eventBus'],
  created () {
    this.eventBus.$on('createCandidate', this.startCreate)
    this.eventBus.$on('editCandidate', this.startEdit)
  }
}
</script>

<style scoped>
.input-group-text {
  width: 10rem;
}
.btn{
    margin-left: 1rem;
}
</style>
