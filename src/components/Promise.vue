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
              <div class="slickcarrousel">
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
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-12 col-md-12 mb-2 mb-md-0">
              <div class="slickcarrousel">
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
              </div>
            </div>
          </div>

          <!-- <div class="form-row">
              <div class="col-12 col-md-12 mb-2 mb-md-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Partido</label>
                  </div>
                  <select class="custom-select" id="inputGroupSelect01">
                    <option selected>Elegir un partido</option>
                    <option value="1">UNE</option>
                    <option value="2">CREO</option>
                    <option value="3">VAMOS</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="col-12 col-md-12 mb-2 mb-md-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect02">Candidato</label>
                  </div>
                  <select class="custom-select" id="inputGroupSelect02">
                    <option selected>Elegir un candidato</option>
                    <option value="1">Sandra Towers</option>
                    <option value="2">Zury Rivers</option>
                    <option value="3">Thelma Aldana</option>
                  </select>
                </div>
              </div>
          </div>-->

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
            <form action="/file-upload" class="dropzone" id="my-awesome-dropzone"></form>
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
export default {
  name: 'Promise',
  props: {},

  mounted () {
    console.log('mounted')
    Dropzone.options.myAwesomeDropzone = {
      paramName: 'file', // The name that will be used to transfer the file
      maxFilesize: 2, // MB
      dictDefaultMessage: 'Sube fotos, grabaciones, videos, o documentos ',
      accept: function (file, done) {
        if (file.name == 'justinbieber.jpg') {
          done("Naha, you don't.")
        } else {
          done()
        }
      }
    }

    $('.slickcarrousel').slick({
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
    })
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

.dropzone {

  border-style: dashed;
}

.login {
  margin-right: 1rem;
  margin-left: auto;
}
</style>
