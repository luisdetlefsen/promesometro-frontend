<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12">
        Comentario: {{commentText}}
        Fecha: {{datePosted}}
        Usuario: {{userName}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  props: {
    datePosted: String,
    commentText: String,
    userName: String
  }
}
</script>
