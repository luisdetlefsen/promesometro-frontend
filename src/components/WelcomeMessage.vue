<template>
  <div class="hello">
    <div class="jumbotron">
      <h1 class="display-4">Votaciones 2019</h1>
      <p class="lead">ABC</p>
      <hr class="my-4">
      <p>ABC</p>
      <p class="lead">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-huge"
          v-on:click="goCreatePromise"
        >Ingresar Promesa</button>
        <button
          type="button"
          class="ml-2 btn btn-secondary btn-lg btn-huge"
          v-on:click="goViewPromises"
        >Ver Promesas</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeMessage',
  props: {
    msg: String
  },
  methods: {
    goCreatePromise () {
      this.$router.push('/promesas/agregar')
    },
    goViewPromises () {
      this.$router.push('/promesas/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

</style>
