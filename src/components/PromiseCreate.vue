<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-9 mx-auto">
        <h1 class="mb-5">Ingresa la promesa de un candidato</h1>
      </div>
      <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
        <form>
          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <carousel-3d
                :controls-visible="true"
                :clickable="false"
                :count="parties.length"
                ref="partyCarousel"
                v-on:after-slide-change="updateAvailableCandidates"
              >
                <slide v-for="(party, i) in parties" :index="i" v-bind:key="party.id">
                  <h1>{{party.name}}</h1>
                </slide>
              </carousel-3d>
            </div>
          </div>

          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <carousel-3d
                :controls-visible="true"
                :count="candidates.length"
                ref="candidatesCarousel"
              >
                <slide v-for="(candidate, i) in candidates" :index="i" v-bind:key="candidate.id">
                  <h1>{{candidate.name}}</h1>
                  <h3>{{candidate.candidateRoleName}}</h3>
                </slide>
              </carousel-3d>
            </div>
          </div>

          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Promesa</span>
                </div>
                <!-- v-model="candidatePromise.enteredText" -->
                <textarea class="form-control" aria-label="With textarea"></textarea>
              </div>
            </div>
          </div>
        </form>
        <div id="dropzone" class="form-row">
          <div class="col-12 col-md-12 mb-2 mb-md-0">
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              :awss3="awss3"
              v-on:vdropzone-s3-upload-error="s3UploadError"
              v-on:vdropzone-s3-upload-success="s3UploadSuccess"
            ></vue-dropzone>
          </div>
        </div>

        <div class="form-row">
          <div class="col-12 col-md-12 mb-2 mb-md-0">
            <!-- v-on:click.prevent="addCandidatePromise" -->
            <button type="submit" class="btn btn-block btn-lg btn-primary">Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import vue2Dropzone from 'vue2-dropzone'
import { Carousel3d, Slide } from 'vue-carousel-3d'

// import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'PromiseCreate',
  props: {},
  components: {
    vueDropzone: vue2Dropzone,
    Carousel3d,
    Slide
  },
  inject: ['eventBus', 'restDataSource'],
  methods: {
    showSuccess (file) {
      this.$toaster.success(File + ' : File uploaded')
    },
    getAllParties (newParties) {
      this.parties.splice(0)
      this.parties.push(...newParties)
    },
    getAllCandidates (newCandidates) {
      this.allCandidates.splice(0)
      this.allCandidates.push(...newCandidates)
    },
    updateAvailableCandidates (currIndex) {
      // let currIndex = this.$refs.partyCarousel.currentIndex
      let currPartyId = this.parties[currIndex].id
      let newArr = this.allCandidates.filter(function (e) { return e.partyId === currPartyId })
      this.candidates.splice(0)
      this.candidates.push(...newArr)
      this.$refs.candidatesCarousel.goSlide(0)
    },
    s3UploadError (errorMessage) {
      alert('error' + errorMessage)
    },
    s3UploadSuccess (s3ObjectLocation) {
      alert('stored ' + s3ObjectLocation)
    }
  },

  data: function () {
    return {
      parties: [],
      candidates: [],
      allCandidates: [],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i class='fa fa-cloud-upload'></i> Sube fotos, videos, grabaciones, o archivos",
        headers: { 'My-Awesome-Header': 'header value' }
      },
      awss3: {
        signingURL: (f) => {
          // The server REST endpoint we setup earlier

          // signingURL: (f) => {return 'http://aws-direct-s3.dev/' + f.name }
          // Save this for later use
          // this.images[f.name] = f
          return `http://localhost:3000/signed-url?filename=${f.name}`
        },
        headers: {},
        params: {},
        withCredentials: false,
        sendFileToServer: true
      }
    }
  },
  async created () {

  },

  async mounted () {
    this.getAllParties(await this.restDataSource.getParties())
    this.getAllCandidates(await this.restDataSource.getAllCandidates())
  }
}
</script>

<style scoped lang="scss">
h5 {
  background: #fff;
  color: #3498db;
  font-size: 36px;
  line-height: 100px;
  margin: 10px;
  padding: 2%;
  position: relative;
  text-align: center;
}

.modal-header {
  display: block;
}

.form-row {
  margin-bottom: 15px;
}

.input-group-text {
  width: 6rem;
}

// .dropzone {
//   border-style: dashed;
// }

.login {
  margin-right: 1rem;
  margin-left: auto;
}
</style>
