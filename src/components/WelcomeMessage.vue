<template>
  <div>
    <!-- <p class="lead"> -->
    <div class="row justify-content-center">
      <img src="../assets/img/bg-landing1.svg" alt class="landing-1">
    </div>
    <div class="row justify-content-center">
      <div class="landing-2 justify-content-center">
        <h1>¿Cómo surgió esta iniciativa?</h1>

            <p
              class="short-description justify-content-center"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      </div>
    </div>
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-4 mx-auto">
        <div class="card">
          <div class="card-body">
            <img src="../assets/img/promesa1.svg" class="btn-logo-huge" alt>
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
            <img src="../assets/img/promesas1.svg" class="btn-logo-huge" alt>
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="ml-2 btn btn-purple btn-lg btn-huge"
              style="font-weight:bold;"
              v-on:click="goViewPromises"
            >Ver Promesas</button>
          </div>
        </div>
      </div>

      <div class="col-lg-2"></div>
    </div>

    <!-- </p> -->
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

.btn-logo-huge{
  min-height: 244px;
}
.landing-1 {
  min-width: 100%;
  max-width: 100%;
  height:auto;
  // max-height:50px;
}
.landing-2 > h1 {
  color: blue;
  font-weight: bold;
}
.landing-2 {
  background: url(../assets/img/bg-landing2.svg) no-repeat;
  background-position: center;
  min-width: 100%;
  max-width: 100%;
  min-height: 354px;
  max-height: auto;

  // min-width: 100%;
  // max-width: 100%;
  // background-image: url('../assets/img/promesa1.svg') no-repeat;
}
h1 {
  padding-top: 1px;
}

.card {
  border-radius: 10px;
  border: 1px solid purple;
  font-weight: normal;
}
.short-description {
  max-width: 50%;
}

@media only screen and (max-width: 768px) {
  .card{
    margin-top:15px;
  }

  .landing-1 {
    max-width: 100%;
    max-height: (40vw);
  }
}
</style>
