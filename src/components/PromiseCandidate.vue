<template>
  <div class="card" style="min-width: 18rem;">
    <div class="row">
      <div class="col-lg-6">
        <img
          :src="candidateImgUrl"
          style="min-width:128px;min-height:128px;max-width:128px;max-height:128px;margin:5px;border-radius:10px;"
          alt
        >
        <div class="layer">
    </div>
      </div>
      <div class="col-lg-6">

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
  cursor: pointer;
}

img {
  // box-shadow: inset 0 0 0 1000px rgba(178, 18, 178, 0.2) !important;
  // opacity: 0.5 !important;
   background: rgba(21, 201, 45, 0.3) !important;
}

li {
  list-style: none;
  list-style-type: none;
}

.layer {
  z-index: 100;
    background-color: rgba(230, 117, 205, 0.25) !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 88%;
    height: 100%;

    margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
}

</style>
