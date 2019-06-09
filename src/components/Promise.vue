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
              <slick :options="slickOptions">
                <div>
                  <h5>UNE</h5>
                </div>
                <div>
                  <h5>CREO</h5>
                </div>
                <div>
                  <h5>VAMOS</h5>
                </div>
                <div>
                  <h5>SEMILLA</h5>
                </div>
                <div>
                  <h5>PAN</h5>
                </div>
                <div>
                  <h5>UCN</h5>
                </div>
                <div>
                  <h5>FRG</h5>
                </div>
              </slick>
            </div>
          </div>

          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <slick :options="slickOptions">
                <div>
                  <h5>SANDRA</h5>
                </div>
                <div>
                  <h5>MANUEL</h5>
                </div>
                <div>
                  <h5>ALVARO</h5>
                </div>
                <div>
                  <h5>JIMMY</h5>
                </div>
                <div>
                  <h5>BORIS</h5>
                </div>
                <div>
                  <h5>FIDEL</h5>
                </div>
                <div>
                  <h5>MICHAEL</h5>
                </div>
              </slick>
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
            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
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
import Slick from 'vue-slick'

// import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'Promise',
  props: {},
  components: {
    vueDropzone: vue2Dropzone,
    Slick
  },
  methods: {
    showSuccess (file) {
      this.$toaster.success(File + ' : File uploaded')
    }

  },
  data: function () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> Sube fotos, videos, grabaciones, o archivos",
        headers: { 'My-Awesome-Header': 'header value' }
      },
      slickOptions: {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },

  mounted () {
    console.log('mounted')
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

.slick-active {
  opacity: 0.3;
}

.slick-slide {
  opacity: 0.3;
}

.slick-current {
  opacity: 1;
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
