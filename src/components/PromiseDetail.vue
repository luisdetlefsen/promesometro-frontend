<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Promesa</h1>
      </div>
    </div>

    <div class="row">
      Promesa: {{this.promise.id}}
      <promise-candidate
        :party="promise.PARTY"
        :candidateName="promise.NAME"
        :promise="promise.PROMISE"
        :candidateImgUrl="promise.PIC_URL"
      />
    </div>
    <div class="row">
      <comment
        v-for="c in comments"
        v-bind:key="c.COMMENT_ID"
        :datePosted="c.COMMENT_DATE"
        :commentText="c.COMMENT"
        :userName="c.USER"
      />
    </div>
    <div class="row">
        <div class="col-lg-12">
            <input type="text" placeholder="Comentario..."/>
            <button v-on:click="postComment">Agregar</button>
        </div>
    </div>
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
        DATE_V: '2019-07-28',
        LAT_V: '',
        LONG_V: '',
        COMMENT_V: 'comment from test api'
      }
      await this.restDataSource.saveComment(payload)
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
    let promise = await this.restDataSource.getPagedPromises(this.$route.params.id, 1)
    let comments = await this.restDataSource.getPromiseComments(this.$route.params.id)
    this.promise = promise[0]
    this.comments.push(...comments)
  }
}
</script>
