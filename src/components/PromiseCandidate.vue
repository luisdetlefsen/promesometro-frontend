<template>
  <div class="card" style="min-width: 18rem;max-width: 18rem;min-height:28rem;">
    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <!-- <img
            :src="candidateImgUrl"
            style="min-width:128px;min-height:128px;max-width:128px;max-height:128px;margin:5px;border-radius:10px;"
            alt
          /> -->
          <div class="candidateLayer" :style="{backgroundImage:`url(${candidateImgUrl})`}" ></div>
          <!-- <div class="layer"></div> -->
        </div>
        <div class="col-lg-6">
          <p class="text-left" style="margin-bottom:0;padding-top:25px;padding-left:10px;"><strong>Tiempo transcurrido</strong></p>
          <p class="text-left" style="margin-top:0;padding-left:10px;">{{daysPassed}} días</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <p class="text-left no-margin" style="font-weight:bold;text-size:large;"><strong> {{candidateName}}</strong></p>

          <p class="text-left no-margin">Partido {{party}}</p>
          <br />
          <p class="text-left">{{promise}}</p>

          <h4 class="no-margin">
            <span class="badge badge-thumbs-up"> <a href="#" class="link-no-decoration">{{upvotes}} <i class="fa fa-thumbs-up" style="color:white;"></i></a> </span>
            &nbsp;
            <span class="badge badge-thumbs-down"> <a href="#" class="link-no-decoration"> {{upvotes}} <i class="fa fa-thumbs-down" style="color:white;"></i> </a></span>
          </h4>
        </div>
      </div>
    </div>

    <div class="card-footer" v-if="displayPromiseLink===true" v-on:click="goToPromise(`${promiseId}`)" >  <strong>Ver promesa</strong>   </div>
  </div>
</template>

<script>
export default {
  name: 'PromiseCandidate',
  props: {
    promiseId: Number,
    party: String,
    candidateName: String,
    candidateImgUrl: String,
    candidatePromise: String,
    promise: String,
    daysPassed: Number,
    upvotes: Number,
    displayPromiseLink: Boolean
  },
  inject: ['eventBus', 'restDataSource'],
  methods: {
    goToPromise (id) {
      this.$router.push('/promesas/' + id)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-left: 15px;
  margin-right: 15px;
  // padding: 5px;
  border-radius: 30px !important;
}

.card-footer {
  cursor: pointer;
  background-color: rgb(160, 52, 160);
  color: white;
  border-bottom-left-radius: 25px !important;
  border-bottom-right-radius: 25px !important;
}

.no-margin {
  margin-bottom: 0;
  margin-left: 0px;
  text-align: left;
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

.candidateLayer{
  min-width:128px;min-height:128px;max-width:128px;max-height:128px;margin:5px;border-radius:10px;
  background-repeat: no-repeat;
  background-color: rgb(116, 29, 167);
  background-blend-mode: luminosity;
}

.link-no-decoration{
  color:white;
  text-decoration: none;
}

.badge-thumbs-up{
  background-color:rgb(160, 52, 160);
  color:white;
}

.badge-thumbs-down{
  background-color:rgb(47, 12, 143);
  color:white;
}

</style>
