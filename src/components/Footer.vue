<template>
  <footer class="footer">
    <div class="container">
      <div class="row justify-content-center">
        <img style="display:none;" src="../assets/img/logo_oes.png" alt>
        <img style="display:none;" src="../assets/img/logo_rti.png" alt>
        <img src="../assets/img/logo_code.png" alt>
        <img src="../assets/img/logo_datum.png" alt>
        <img src="../assets/img/logo_gv.png" alt>
      </div>
      <div class="clear-fix"></div>
      <div class="row justify-content-center social-media">
        <ul class="list-inline mb-0">
          <li class="list-inline-item mr-3">
            <a href="https://www.facebook.com/GuatemalaVisible/" target="_blank">
              <i class="fa fa-facebook fa-2x fa-fw"></i>
            </a>
          </li>
          <li class="list-inline-item mr-3">
            <a href="#">
              <i class="fa fa-twitter-square fa-2x fa-fw"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="#">
              <i class="fa fa-instagram fa-2x fa-fw"></i>
            </a>
          </li>
        </ul>
      </div>

      <div class="row justify-content-center text-copyright">
        <span
          class="small mb-4 mb-lg-0"
        >&copy; Todos los derechos reservados Guatemala Visible | 2019</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  params: {}
}
</script>

<style scoped>
.footer {
  margin-top: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #4d4d4d !important;
}
img {
  margin-left: 1rem;
  margin-right: 1rem;
}

.social-media{
    margin-top:4rem;
}

.text-copyright{
    margin-top:1rem;
}
</style>
