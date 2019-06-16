<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Ingresa la promesa de un candidato</h1>
      </div>
      <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
        <form>
          <div class="row justify-content-center">
            <span class="sub-section-title">Seleccione el partido político</span>
          </div>
          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <carousel-3d
                :controls-visible="true"
                :clickable="false"
                :count="parties.length"
                ref="partyCarousel"
                v-on:after-slide-change="updateAvailableCandidates"
              >
                <slide v-for="(party, i) in parties" :index="i" v-bind:key="party.PARTY_ID">
                  <h1>{{party.PARTY}}</h1>
                </slide>
              </carousel-3d>
            </div>
          </div>

          <div class="row justify-content-center">
            <span class="sub-section-title">Seleccione el candidato</span>
          </div>
          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <carousel-3d
                :controls-visible="true"
                :count="candidates.length"
                ref="candidatesCarousel"
              >
                <slide
                  v-for="(candidate, i) in candidates"
                  :index="i"
                  v-bind:key="candidate.CANDIDATE_ID"
                >
                  <h1>{{candidate.NAME}}</h1>
                  <h3>{{candidate.POSITION}}</h3>
                </slide>
              </carousel-3d>
            </div>
          </div>

          <div class="row justify-content-center">
            <span class="sub-section-title">Ingrese la promesa</span>
          </div>
          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <div class="input-group">
                <!-- v-model="candidatePromise.enteredText" -->
                <textarea class="form-control" v-model="promise.promise" aria-label="With textarea"></textarea>
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
            <button
              type="button"
              v-on:click="save"
              class="btn btn-purple btn-lg btn-huge"
            >Subir promesa</button>
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
    async save () {
      if (this.$refs.candidatesCarousel.currentIndex) {
        this.$swal('Error', 'Debes de seleccionar un partido.', 'error')
        throw TypeError('Texto de promesa no ingresado')
      }
      if (this.promise.promise === undefined) {
        this.$swal('Error', 'Debes de ingresar una promesa.', 'error')
        throw TypeError('Texto de promesa no ingresado')
      }
      this.promise.PARTY_ID = this.parties[this.$refs.candidatesCarousel.currentIndex].PARTY_ID
      await this.restDataSource.savePromise(this.promise)
      this.$swal('Promesa agregada', 'asdfasdf', 'success')
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
      let currPartyId = this.parties[currIndex].PARTY_ID
      let newArr = this.allCandidates.filter(function (e) {
        return e.PARTY_ID === currPartyId
      })
      this.candidates.splice(0)
      this.candidates.push(...newArr)
      this.$refs.candidatesCarousel.goSlide(0)
    },
    s3UploadError (errorMessage) {
      this.$swal('Error', errorMessage, 'error')
    },
    s3UploadSuccess (s3ObjectLocation) {
      this.promise.filesUploaded.push(s3ObjectLocation)
    }
  },

  data: function () {
    return {
      parties: [],
      candidates: [],
      allCandidates: [],
      promise: {
        filesUploaded: []
      },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i class='fa fa-cloud-upload'></i> Agregar foto, video, grabación, o archivo",
        headers: { 'My-Awesome-Header': 'header value' }
      },
      awss3: {
        signingURL: f => {
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
    window.scrollTo(0, 0)
  },

  async mounted () {
    this.getAllParties(await this.restDataSource.getParties())
    this.getAllCandidates(await this.restDataSource.getAllCandidates())
  }
}
</script>

<style scoped lang="scss">
.modal-header {
  display: block;
}

.form-row {
  margin-bottom: 15px;
}

.input-group-text {
  width: 6rem;
}

.dropzone {
  border-style: dashed;
  border-color: purple;
}

.login {
  margin-right: 1rem;
  margin-left: auto;
}

.carousel-3d-slide {
  box-shadow: inset 0 0 0 1000px rgba(178, 18, 178, 0.2) !important;
  opacity: 0.5 !important;
}
.carousel-3d-slide.current {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0) !important;
  opacity: 1 !important;
}
</style>
