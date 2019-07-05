<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Ingresa la promesa de un candidato</h1>
      </div>
      <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
        <form>
          <div class="row justify-content-center">
            <span class="sub-section-title">Seleccione el partido político&nbsp;</span>
            <div class="sub-section-title spinner-border" role="status" id="spinnerParty">
              <span class="sr-only">Loading...</span>
            </div>
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
                  <div>
                    <h1 class="text-center">{{party.PARTY}}</h1>
                  </div>
                </slide>
              </carousel-3d>
            </div>
          </div>

          <div class="row justify-content-center">
            <span class="sub-section-title">Seleccione el candidato&nbsp;</span>
            <div class="sub-section-title spinner-border" role="status" id="spinnerCandidate">
              <span class="sr-only">Loading...</span>
            </div>
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
                  <h1 class="text-center">{{candidate.NAME}}</h1>
                  <h3 class="text-center">{{candidate.POSITION}}</h3>
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
                <textarea class="form-control" v-model="promise.PROMISE" aria-label="With textarea"></textarea>
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
            <!-- v-on:vdropzone-sending="sendingEvent" -->
          </div>
        </div>

        <div class="form-row">
          <div class="col-12 col-md-12 mb-2 mb-md-0">
            <!-- v-on:click.prevent="addCandidatePromise" -->
            <button
              type="button"
              v-on:click="savePromise"
              id="btnSavePromise"
              class="btn btn-purple btn-lg btn-huge"
            >
              Subir promesa
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
                id="spinnerSubmit"
              >&nbsp;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
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
    determineCurrentPosition () {
      navigator.geolocation.getCurrentPosition(
        this.setCurrenPosition,
        this.setDefaultPosition
      )
    },
    setCurrenPosition (position) {
      this.promise.LATITUDE = position.coords.latitude
      this.promise.LONGITUDE = position.coords.longitude
    },
    setDefaultPosition () {
      this.promise.LATITUDE = 0
      this.promise.LONGITUDE = 0
    },
    getUserAgent () {
      return navigator.userAgent
    },
    showSuccess (file) {
      this.$toaster.success(File + ' : File uploaded')
    },
    savePromise () {
      $('#btnSavePromise').attr('disabled', true)
      $('#spinnerSubmit').show()
      try {
        this.save()
      } catch (err) {
      } finally {
        $('#spinnerSubmit').hide()
        $('#btnSavePromise').removeAttr('disabled')
      }
    },
    async save () {
      if (
        this.$refs.partyCarousel.currentIndex === undefined ||
        this.$refs.partyCarousel.currentIndex < 0
      ) {
        this.$swal('Error', 'Debes de seleccionar un partido.', 'error')
        await Promise.reject(new Error('Missing data.'))
      }
      if (
        this.$refs.candidatesCarousel.currentIndex === undefined ||
        this.$refs.candidatesCarousel.currentIndex < 0
      ) {
        this.$swal('Error', 'Debes de seleccionar un candidato.', 'error')
        await Promise.reject(new Error('Missing data.'))
      }

      if (this.promise.PROMISE === undefined) {
        this.$swal('Error', 'Debes de ingresar una promesa.', 'error')
        await Promise.reject(new Error('Missing data.'))
      }
      try {
        this.promise.PARTY_ID = this.parties[this.$refs.partyCarousel.currentIndex].PARTY_ID
        this.promise.PARTY = this.parties[this.$refs.partyCarousel.currentIndex].PARTY
        this.promise.CANDIDATE_ID = this.candidates[this.$refs.candidatesCarousel.currentIndex].CANDIDATE_ID
        // this.promise.LATITUDE = 1.2; //TODO:
        // this.promise.LONGITUDE = 1.2;
        this.promise.DEVICE = this.getUserAgent()
        this.promise.USER_ID = 1
        await this.restDataSource.savePromise(this.promise)
        this.$swal(
          'Promesa agregada',
          'La promesa fue agregada. Gracias por contribuir!',
          'success'
        ).then(val => {
          this.$router.go()
        })
      } catch (err) {
        this.$swal(
          'Error',
          'No se pudo agregar la promesa. Por favor vuelva a intentarlo. Código de error: ' +
            err.errorMessage,
          'error'
        )
      }
    },
    getAllParties (newParties) {
      this.parties.splice(0)
      this.parties.push(...newParties)
      $('#spinnerParty').hide()
    },
    getAllCandidates (newCandidates) {
      this.allCandidates.splice(0)
      this.allCandidates.push(...newCandidates)
      $('#spinnerCandidate').hide()
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
      this.$swal('Archivo subido', 'Ubicacion ' + s3ObjectLocation, 'success')
      this.promise.filesUploaded.push(s3ObjectLocation)
    }
    // sendingEvent: function (file, xhr, formData) {
    //   const idx = file.name.lastIndexOf('.')
    //   var fileExtension = '.png'
    //   if (idx > 0) {
    //     fileExtension = file.name.substring(idx)
    //   }
    //   // formData.set('Key', formData.get('Key') + fileExtension)
    // }
  },
  computed: {
    awss3 () {
      return {
        signingURL: (f) => {
          const key = `https://uhwvsjvsme.execute-api.us-east-1.amazonaws.com/dev/s3signedurl3/?originalfilename=${f.name}`
          return key
        },
        headers: {},
        params: {},
        sendFileToServer: false,
        withCredentials: false
      }
    },
    dropzoneOptions () {
      return {
        // The URL will be changed for each new file being processing
        url: '/',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> Agregar foto, video, grabación, o archivo",
        // method: 'PUT',
        parallelUploads: 1,
        uploadMultiple: false,
        maxFiles: 5,
        preventDuplicates: true
        // header: ''
      }
    }
  },
  data: function () {
    return {
      parties: [],
      candidates: [],
      allCandidates: [],
      promise: {
        filesUploaded: []
      }
    }
  },
  async created () {
    window.scrollTo(0, 0)
  },

  async mounted () {
    // this.determineCurrentPosition();
    this.getAllParties(await this.restDataSource.getParties())
    this.getAllCandidates(await this.restDataSource.getAllCandidates())
    $('#spinnerSubmit').hide()
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
