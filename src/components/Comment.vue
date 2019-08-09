<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="media comment-box">
          <div class="media-left">
            <img
              class="img-responsive user-photo"
              src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
            />
          </div>
          <div class="media-body text-left">
            <h4 class="media-heading">{{userName}} {{datePosted}}</h4>
            <p>{{commentText}}</p>
          </div>
        </div>
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

<style lang="scss" scoped>
.comment-box {
  margin-top: 30px !important;
}
/* CSS Test end */

.comment-box img {
  width: 50px;
  height: 50px;
}
.comment-box .media-left {
  padding-right: 10px;
  width: 65px;
}
.comment-box .media-body p {
  border: 1px solid #ddd;
  padding: 10px;
}
.comment-box .media-body .media p {
  margin-bottom: 0;
}
.comment-box .media-heading {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 7px 10px;
  position: relative;
  margin-bottom: -1px;
}
.comment-box .media-heading:before {
  content: "";
  width: 12px;
  height: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  position: absolute;
  top: 10px;
  left: -6px;
}
</style>
