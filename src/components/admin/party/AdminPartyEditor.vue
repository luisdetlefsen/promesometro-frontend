<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="col-xl-12 mx-auto">
        <h1>Partido</h1>
      </div>

      </div>
      <div class="card-body">
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Nombre partido</span>
            <input class="form-control" v-model="party.party">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Siglas partido</span>
            <input class="form-control" v-model="party.shortName">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Url logo partido</span>
            <input class="form-control" type="url" v-model="party.logoUrl">
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
          >{{ editing ? "Guardar cambios" : "Crear" }}
          </button>
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
      if (party.idParty === undefined) {
        this.startCreate()
        return
      }
      this.editing = true
      this.party = {
        idParty: party.idParty,
        shortName: party.shortName,
        party: party.party,
        logoUrl: party.logoUrl,
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
      this.eventBus.$emit('dissmissPartyEditor')
      this.startCreate()
    },
    cancel () {
      this.eventBus.$emit('dissmissPartyEditor')
      this.party = {}
      this.editing = false
    }
  },
  inject: ['eventBus'],
  created () {
    this.eventBus.$on('createParty', this.startCreate)
    this.eventBus.$on('editParty', this.startEdit)
  },
  beforeDestroy () {
    this.eventBus.$off('createParty')
    this.eventBus.$off('editParty')
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
