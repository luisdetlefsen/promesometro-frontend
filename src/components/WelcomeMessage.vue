<template>
  <div class="hello">
    <div class="jumbotron">
      <h1 class="display-4">Votaciones 2019</h1>
      <p class="lead">ABC</p>
      <hr class="my-4">
      <p>ABC</p>
      <!-- <p class="lead"> -->
        <div class="row">
<div class="col-lg-4 mx-auto">
        <div class="card">
          <div class="card-body">
            <img src="../assets/img/promesa1.svg" alt="">
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-purple btn-lg btn-huge"
              v-on:click="goCreatePromise"
            >Ingresar Promesa</button>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mx-auto">
        <div class="card">
          <div class="card-body">
            <img src="../assets/img/promesas1.svg" alt="">
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="ml-2 btn btn-purple btn-lg btn-huge"
              v-on:click="goViewPromises"
            >Ver Promesas</button>
          </div>
        </div>
      </div>

        </div>

      <!-- </p> -->
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

.logoPromesa{
  margin-left: 0px;
  background-image: url("../assets/img/promesa1.svg") no-repeat;
  // min-width: 500px;
  // min-height: 200px;
  max-width: 300px;
  max-height: auto;
}
</style>
