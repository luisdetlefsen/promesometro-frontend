<template>

  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-8 mx-auto">
        <div class="card flex-row flex-wrap">

          <div class="card-body">
            <blockquote>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              <br>sed diam nonumy eirmod tempor invidunt ut
              <span class="author">
                <i>{{candidateName}} - {{party}}</i>
              </span>
            </blockquote>
          </div>
           <img
            class="card-img-left"
            src="data:image/jpeg;base64,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"
            alt="Card image cap"
          >
          <!-- <div class="party" ><p>{{party}}</p></div> -->
        </div>
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
    candidatePromise: String
  }
}
</script>

<style scoped lang="scss">

img{
    border-radius: 50%;
    max-width: 150px;
    max-height: 150px;
    margin-top:auto;
    margin-bottom:auto;
    margin-left:-100px;
    margin-right: auto;
}
.container {
  border: solid line black;
}

* {
  box-sizing: border-box;
}

.party{
        margin-top:auto;
    margin-bottom:auto;
    margin-right: 1rem;
    margin-left: 0.5rem;
}

.row{
    margin-top: 1rem;
}

</style>
