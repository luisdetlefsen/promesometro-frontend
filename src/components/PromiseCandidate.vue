<template>
  <div class="card" style="min-width: 18rem;">
    <div class="row">
      <div class="col-lg-6">
        <img
          :src="candidateImgUrl"
          style="min-width:128px;min-height:128px;max-width:128px;max-height:128px;margin:5px;border-radius:10px;"
          alt
        >
      </div>
      <div class="col-lg-6">
        <p class="text-left">Tiempo transcurrido</p>
        <br>
        <p class="text-left">{{daysPassed}} días</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <p class="text-left" style="font-weight:bold;text-size:large;">{{candidateName}}</p>
        <br>
        <p class="text-left">Partido {{party}}</p>
        <br>
        <p class="text-left">{{promise}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromiseCandidate',
  props: {
    party: String,
    candidateName: String,
    candidateImgUrl: String,
    candidatePromise: String,
    promise: String,
    daysPassed: String
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
}

img {
  box-shadow: inset 0 0 0 1000px rgba(178, 18, 178, 0.2) !important;
  opacity: 0.5 !important;
}

li {
  list-style: none;
  list-style-type: none;
}
</style>
