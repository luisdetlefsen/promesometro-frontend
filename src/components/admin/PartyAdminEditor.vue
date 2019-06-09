<template>
  <div class="container">
    <div class="card">
      <div class="form-group">
        <label>ID</label>
        <input class="form-control" v-model="party.id" >
      </div>
      <div class="form-group">
        <label>Nombre partido</label>
        <input class="form-control" v-model="party.name">
      </div>
      <div class="form-group">
        <label>Url logo partido</label>
        <input class="form-control" v-model="party.imgUrl">
      </div>

      <div class="text-center">
        <button
          class="btn btn-primary"
          v-on:click="save"
        >{{ editing ? "Guardar cambios" : "Crear" }}</button>
        <button class="btn btn-secondary" v-on:click="cancel">Cancelar</button>
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
        imgUrl: party.imgUrl
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
</style>
