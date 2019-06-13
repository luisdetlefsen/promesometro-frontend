<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p>Partido</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Id</span>
            <input class="form-control" type="number" v-model="party.id">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Nombre partido</span>
            <input class="form-control" v-model="party.name">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url logo partido</span>
            <input class="form-control" type="url" v-model="party.imgUrl">
          </div>
        </div>

        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Secretario</span>
            <input class="form-control" v-model="party.secretary">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Fecha fundacion</span>
            <input class="form-control" type="date" v-model="party.founded">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Fundador</span>
            <input class="form-control" v-model="party.founder">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url sitio</span>
            <input class="form-control" type="url" v-model="party.siteUrl">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Descripción</span>
            <input class="form-control" v-model="party.description">
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="text-center">
          <button
            class="btn btn-primary"
            v-on:click="save"
          >{{ editing ? "Guardar cambios" : "Crear" }}</button>
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
      party: {}
    }
  },
  methods: {
    startEdit (party) {
      this.editing = true
      this.party = {
        id: party.id,
        name: party.name,
        imgUrl: party.imgUrl,
        secretary: party.secretary,
        foundation: party.foundation,
        founder: party.founder,
        siteUrl: party.siteUrl,
        description: party.description
      }
    },
    startCreate () {
      this.editing = false
      this.party = {}
    },
    save () {
      this.eventBus.$emit('completeParty', this.party)
      this.startCreate()
    },
    cancel () {
      this.party = {}
      this.editing = false
    }
  },
  inject: ['eventBus'],
  created () {
    this.eventBus.$on('createParty', this.startCreate)
    this.eventBus.$on('editParty', this.startEdit)
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
