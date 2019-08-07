<template>
  <div class="card" style="min-width: 18rem;max-width: 18rem;min-height:28rem;">
    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <img
            :src="candidateImgUrl"
            style="min-width:128px;min-height:128px;max-width:128px;max-height:128px;margin:5px;border-radius:10px;"
            alt
          />
          <div class="layer"></div>
        </div>
        <div class="col-lg-6"></div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <p class="text-left no-margin" style="font-weight:bold;text-size:large;">{{candidateName}}</p>

          <p class="text-left no-margin">Partido {{party}}</p>
          <br />
          <p class="text-left">{{promise}}</p>

          <p class=" no-margin" style="background-color:rgb(160, 52, 160);max-width:4rem;min-width:2rem;color:white;"> {{upvotes}} <i class="fa fa-thumbs-up" style="color:white;"></i></p>
        </div>
      </div>
    </div>

    <div class="card-footer">  <strong>Ver promesa</strong>   </div>
  </div>
</template>

<script>
export default {
  name: "PromiseCandidate",
  props: {
    party: String,
    candidateName: String,
    candidateImgUrl: String,
    candidatePromise: String,
    promise: String,
    daysPassed: String,
    upvotes: Number
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-left: 15px;
  margin-right: 15px;
  // padding: 5px;
  cursor: pointer;
}

.card-footer {
  background-color: rgb(160, 52, 160);
  color: white;
}

.no-margin {
  margin-bottom: 0;
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
  width: 100%;
  height: 100%;

  margin-left: 15px;
  margin-right: 15px;
}
</style>
