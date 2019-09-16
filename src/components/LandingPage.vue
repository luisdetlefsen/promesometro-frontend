<template>
  <div>
    <!-- <p class="lead"> -->
    <div class="row justify-content-center">
      <img src="../assets/img/bg-landing1.svg" alt class="landing-1">
    </div>
    <div class="row justify-content-center">
      <!-- <div class="landing-2"> -->
      <div class="landing-2">
        <img
          src="../assets/img/bg-landing2.svg"
          alt
          style="display:block;position:absolute;max-width:100%;max-height:auto;z-index:-1;"
        >
        <h1>¿Cómo surgió esta iniciativa?</h1>

        <p
          class="short-description justify-content-center"
        >Surge como una idea de sistematizar las promesas que los candidatos realizan en campaña. De esta forma cuando queden electos, verificar el cumplimiento o incumplimiento de las mismas, y así exigir que cumplan con lo prometido. Esta plataforma es un esfuerzo por parte de Guatemala Visible y el Observatorio Económico Sostenible -OES- para que cualquier ciudadano pueda ingresar y revisar el avance del cumplimiento de las promesas.</p>
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

.landing-1 {
  min-width: 100%;
  max-width: 100%;
  height: auto;
  // max-height:50px;
}
.landing-2 > h1 {
  color: blue;
  font-weight: bold;
}
.landing-2 {
  display:contents;
  background: url(../assets/img/bg-landing2.svg) no-repeat;
  background-position: center;
  min-width: 100%;
  max-width: 100%;
  min-height: 354px;
  max-height: auto;
  z-index: -1;
}

.short-description {
  max-width: 80%;
}

@media only screen and (max-width: 768px) {
  .landing-1 {
    max-width: 100%;
    max-height: (29vw);
  }

  .landing-2 {
    display: contents;
    max-width: 100%;
    max-height: 300px;
    // margin-top:-10px;
  }
}
</style>
