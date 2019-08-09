<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Promesa</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 center-block" align="center">
        <promise-candidate
          :party="promise.PARTY"
          :candidateName="promise.NAME"
          :promise="promise.PROMISE"
          :candidateImgUrl="promise.PIC_URL"
          :upvotes="promise.FEEL_SUM"
          :displayPromiseLink="false"
        />
      </div>
      <div class="col-lg-4"></div>
    </div>

      <comment
        v-for="c in comments"
        v-bind:key="c.COMMENT_ID"
        :datePosted="c.COMMENT_DATE"
        :commentText="c.COMMENT"
        :userName="c.USER"
      />

    <div class="row">
      <div class="col-lg-6 offset-md-3 offset-lg-3">
        <div class="panel panel-info">
          <div class="panel-body">
            <textarea placeholder="Escribe tu comentario aquí" class="pb-cmnt-textarea"></textarea>

            <button v-on:click="postComment" class="btn btn-primary pull-right" type="button">
              <i class="fa fa-commenting-o"></i> Agregar comentario
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row">
        <div class="col-lg-12">
            <input type="text" placeholder="Comentario..."/>
            <button v-on:click="postComment">Agregar</button>
        </div>
    </div>-->
  </div>
</template>

<script>
import PromiseCandidate from './PromiseCandidate'
import Comment from './Comment'

export default {
  props: {},
  components: {
    PromiseCandidate,
    Comment
  },
  inject: ['eventBus', 'restDataSource'],
  methods: {
    async postComment () {
      let payload = {
        PROMISE_ID_V: this.$route.params.id,
        USER_ID_V: '2',
        DATE_V: '2019-07-04',
        LAT_V: '',
        LONG_V: '',
        COMMENT_V: 'comment from test api'
      }
      await this.restDataSource.saveComment(payload)
      let comment = {
        COMMENT_DATE: 'now',
        COMMENT: payload.COMMENT_V,
        USER: 'test user'
      }
      this.comments.push(comment)
    }
  },
  data: function () {
    return {
      promise: {
        id: 0,
        PARTY: '',
        NAME: '',
        PROMISE: '',
        PIC_URL: ''
      },
      comments: []
    }
  },
  async mounted () {
    let promise = await this.restDataSource.getPagedPromises(
      this.$route.params.id,
      1
    )
    let comments = await this.restDataSource.getPromiseComments(
      this.$route.params.id
    )
    this.promise = promise[0]
    this.comments.push(...comments)
  },
  async created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped lang="scss">
.pb-cmnt-container {
  font-family: Lato;
  margin-top: 100px;
}

.pb-cmnt-textarea {
  resize: none;
  padding: 20px;
  height: 130px;
  width: 100%;
  border: 1px solid #f2f2f2;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>
