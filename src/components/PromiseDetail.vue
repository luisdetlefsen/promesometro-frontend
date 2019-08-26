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
          :party="promise.party"
          :candidateName="promise.candidateName"
          :promise="promise.promise"
          :candidateImgUrl="promise.picUrl"
          :upvotes="promise.upvotes"
          :downvotes="promise.downvotes"
          :displayPromiseLink="false"
          :daysPassed="promise.daysPassedSinceCreation"
          :commentsCount="promise.approvedCommentsCount"
        />
      </div>
      <div class="col-lg-4"></div>
    </div>

    <div style="margin-top:15px;">
      <ul>
        <li v-for="pmc in promise.mediaLinks" v-bind:key="pmc.id">
          <a :href="`${pmc.contentUrl}`" target="_blank" download style="color:purple;">Ver archivo</a>
        </li>
      </ul>
    </div>

      <comment
        v-for="c in comments"
        v-bind:key="c.idComment"
        :datePosted="c.formattedDate"
        :commentText="c.text"
        :userName="c.maskedEmail"
      />

    <div class="row">
      <div class="col-lg-6 offset-md-3 offset-lg-3">
        <div class="panel panel-info">
          <div class="panel-body">
            <textarea placeholder="Escribe tu comentario aquí" v-model="userComment"  class="pb-cmnt-textarea"></textarea>
            <button v-on:click="postComment" class="btn btn-primary pull-right" type="button">
              <i class="fa fa-commenting-o"></i> Agregar comentario
            </button>
          </div>
        </div>
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
      if (this.userComment.length === 0 || !this.userComment.trim()) {
        this.$swal('Error', 'Debes de ingresar un comentario', 'error')
        return
      }
      let userEmail = await this.getUserEmail()
      if (userEmail === undefined) { return }
      let comment = {
        text: this.userComment,
        userEmail: userEmail,
        promise: this.promise.promiseLink
      }
      let commentResult = await this.restDataSource.saveComment(comment)
      comment.maskedEmail = commentResult.maskedEmail
      comment.formattedDate = commentResult.formattedDate
      this.$swal('Comentario agregado', 'Gracias por tu comentario. Tu comentario estará visible después de que sea aprobado.', 'success')
      this.comments.push(comment)
      this.userComment = ''
    },
    async getUserEmail () {
      try {
        let c = await this.$Amplify.Auth.currentSession()
        return c.idToken.payload.email
      } catch (err) {
        this.$swal('Error', 'Debes de iniciar sesión para poder ingresar un comentario', 'error')
      }
    }
  },
  data: function () {
    return {
      promise: {
        idPromise: 0,
        party: '',
        candidateName: '',
        promise: '',
        picUrl: '',
        upvotes: 0,
        downvotes: 0,
        daysPassedSinceCreation: 0,
        promiseLink: '',
        formattedDate: '',
        maskedEmail: '',
        mediaLinks: []
      },
      userComment: '',
      comments: []
    }
  },
  async mounted () {
    let promisetmp = await this.restDataSource.getPromise(this.$route.params.id)
    this.promise.party = promisetmp._embedded.party.party
    this.promise.candidateName = promisetmp._embedded.candidate.candidateName
    this.promise.idPromise = promisetmp.id
    this.promise.promise = promisetmp.promiseText
    this.promise.picUrl = promisetmp._embedded.candidate.imgUrl
    this.promise.upvotes = promisetmp.upvotes
    this.promise.downvotes = promisetmp.downvotes
    this.promise.maskedEmail = promisetmp.maskedEmail
    this.promise.daysPassedSinceCreation = promisetmp.daysPassedSinceCreation
    this.promise.formattedDate = promisetmp.formattedDate
    this.promise.approvedCommentsCount = promisetmp.approvedCommentsCount
    let comments = await this.restDataSource.getPromiseComments(this.$route.params.id)
    comments = comments._embedded.comments
    for (let i = 0; i < comments.length; i++) { // ugly fix for spring
      comments[i].idComment = comments[i].id
      comments[i].id = undefined
    }
    this.comments.push(...comments)

    let promiseLink = await this.restDataSource.getPromise(this.promise.idPromise)
    this.promise.promiseLink = promiseLink._links.self.href

    let mediaLinks = await this.restDataSource.getAllPromiseMediaForPromise(this.promise.idPromise)
    this.promise.mediaLinks = mediaLinks._embedded.promiseMedia
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
