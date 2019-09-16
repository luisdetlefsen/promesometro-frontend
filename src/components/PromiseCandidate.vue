<template>
  <div class="card" style="min-width: 18rem;max-width: 18rem;min-height:28rem;">
    <div class="card-body">
      <div class="row" style="margin-bottom:25px;">
        <div class="col-lg-6">
          <!-- <img
            :src="candidateImgUrl"
            style="min-width:128px;min-height:128px;max-width:128px;max-height:128px;margin:5px;border-radius:10px;"
            alt
          />-->
          <div class="candidateLayer partyLogo" :style="{backgroundImage:`url(${candidateImgUrl})`}"></div>
          <!-- <div class="layer"></div> -->
        </div>
        <div class="col-lg-6">
          <p class="text-left" style="margin-bottom:0;padding-top:25px;padding-left:10px;">
            <strong>Tiempo transcurrido</strong>
          </p>
          <p class="text-left" style="margin-top:0;padding-left:10px;">{{daysPassed}} días</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <p class="text-left no-margin" style="font-weight:bold;text-size:large;">
            <strong>{{candidateName}}</strong>
          </p>

          <p class="text-left no-margin">Partido {{party}}</p>
          <br />
          <p class="text-left">{{promise}}</p>

          <h4 class="no-margin" v-if="displayPromiseLink===true">
            <span class="badge badge-thumbs-up">
              <a @click="processSavePromiseReaction(upvoteTypeLink,1)" class="link-no-decoration">
                {{upvotes}}
                <i class="fa fa-thumbs-up" style="color:white;"></i>
              </a>
            </span>
            &nbsp;
            <span class="badge badge-thumbs-down">
              <a @click="processSavePromiseReaction(downvoteTypeLink,-1)" class="link-no-decoration">
                {{downvotes}}
                <i class="fa fa-thumbs-down" style="color:white;"></i>
              </a>
            </span>
          </h4>
          <h4 class="no-margin" v-if="displayPromiseLink===false">
            <span class="badge badge-thumbs-up">
              <a class="link-no-decoration">
                {{upvotes}}
                <i class="fa fa-thumbs-up" style="color:white;"></i>
              </a>
            </span>
            &nbsp;
            <span class="badge badge-thumbs-down">
              <a class="link-no-decoration">
                {{downvotes}}
                <i class="fa fa-thumbs-down" style="color:white;"></i>
              </a>
            </span>
          </h4>
        </div>
      </div>
      <div class="row" style="margin-top:10px;color:gray;">
        <div class="col-lg-12">
          <span v-if="approvedCommentsCount>0" class="pull-left"><a v-on:click="goToPromise(`${promiseId}`)" style="color:gray;cursor:pointer;font-size:14px;">{{approvedCommentsCount}} comentarios</a></span>
          <span v-if="attachmentsCount>0" class="pull-right"><a v-on:click="goToPromise(`${promiseId}`)" style="color:gray;cursor:pointer;font-size:14px;">{{attachmentsCount}} archivos</a></span>
        </div>
      </div>
    </div>

    <div
      class="card-footer"
      v-if="displayPromiseLink===true"
      v-on:click="goToPromise(`${promiseId}`)"
    >
      <strong>Ver promesa</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromiseCandidate',
  props: {
    promiseId: Number,
    promiseLink: String,
    userEmail: String,
    party: String,
    candidateName: String,
    candidateImgUrl: String,
    candidatePromise: String,
    promise: String,
    daysPassed: Number,
    upvotes: Number,
    downvotes: Number,
    upvoteTypeLink: String,
    downvoteTypeLink: String,
    displayPromiseLink: Boolean,
    approvedCommentsCount: Number,
    attachmentsCount: Number
  },
  inject: ['eventBus', 'restDataSource'],
  methods: {
    goToPromise (id) {
      this.$router.push('/promesas/' + id)
    },
    async getUserEmail () {
      try {
        let c = await this.$Amplify.Auth.currentSession()
        return c.idToken.payload.email
      } catch (err) {
        return null
      }
    },
    async processSavePromiseReaction (reactionTypeLink, vote) {
      let reaction = {
        reactionType: reactionTypeLink,
        promise: this.promiseLink,
        userEmail: this.userEmail
      }
      this.saveReaction(reaction, reactionTypeLink, vote, this.userEmail, this.promiseId)
    },
    async saveReaction (reaction, reactionTypeLink, vote, userEmail, promiseId) {
      if (userEmail === undefined) {
        userEmail = await this.getUserEmail()
        if (!userEmail) {
          return
        }
      }
      let rrr = await this.restDataSource.findReaction(userEmail, promiseId)
      if (rrr) {
        reaction.idReaction = rrr.data.id
        let oldReactionLink = rrr.data._links.reactionType.href
        let oldReactionTypeData = await this.restDataSource.sendRequest('GET', oldReactionLink)
        let oldReactionType = oldReactionTypeData.data.reactionType
        await this.restDataSource.deleteReaction(reaction)
        if (oldReactionType === 'like') {
          if (vote > 0) {
            // await this.restDataSource.deleteReaction(reaction)
            this.$set(this, 'upvotes', this.upvotes - 1)
          } else if (vote < 0) {
            reaction.reactionType = this.downvoteTypeLink
            await this.restDataSource.saveReaction(reaction)
            this.$set(this, 'upvotes', this.upvotes - 1)
            this.$set(this, 'downvotes', this.downvotes + 1)
          }
        } else if (oldReactionType === 'dislike') {
          if (vote > 0) {
            reaction.reactionType = this.upvoteTypeLink
            await this.restDataSource.saveReaction(reaction)
            this.$set(this, 'upvotes', this.upvotes + 1)
            this.$set(this, 'downvotes', this.downvotes - 1)
          } else if (vote < 0) {
            // await this.restDataSource.deleteReaction(reaction)
            this.$set(this, 'downvotes', this.downvotes - 1)
          }
        }
      } else {
        let res = await this.restDataSource.saveReaction(reaction)
        if (vote > 0) {
          this.$set(this, 'upvotes', this.upvotes + 1)
        } else if (vote < 0) {
          this.$set(this, 'downvotes', this.downvotes + 1)
        }
      }
    }
  },
  async created () {
    this.eventBus.$on('savePromiseReaction', this.processSavePromiseReaction)
    if (this.upvoteTypeLink === undefined) {
      let newReactionTypes = await this.restDataSource.getAllReactionTypes()
      for (let i = 0; i < newReactionTypes.length; i++) { // ugly fix for spring
        newReactionTypes[i].idReactionType = newReactionTypes[i].id
        newReactionTypes[i].id = undefined
        if (newReactionTypes[i].reactionType === 'like') {
          this.upvoteTypeLink = newReactionTypes[i]._links.self.href
        } else if (newReactionTypes[i].reactionType === 'dislike') {
          this.downvoteTypeLink = newReactionTypes[i]._links.self.href
        }
      }
    }
  },
  async mounted () {
  },
  beforeDestroy () {
    this.eventBus.$off('savePromiseReaction')
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-left: 15px;
  margin-right: 15px;
  // padding: 5px;
  border-radius: 30px !important;
}

.card-footer {
  cursor: pointer;
  background-color: rgb(160, 52, 160);
  color: white;
  border-bottom-left-radius: 25px !important;
  border-bottom-right-radius: 25px !important;
}

.no-margin {
  margin-bottom: 0;
  margin-left: 0px;
  text-align: left;
}

img {
  // box-shadow: inset 0 0 0 1000px rgba(178, 18, 178, 0.2) !important;
  // opacity: 0.5 !important;
  background: rgba(21, 201, 45, 0.3) !important;
}

li {
  list-style: none;
  list-style-type: none;
}

.layer {
  z-index: 100;
  background-color: rgba(230, 117, 205, 0.25) !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  margin-left: 15px;
  margin-right: 15px;
}

.candidateLayer {
  min-width: 128px;
  min-height: 128px;
  max-width: 128px;
  max-height: 128px;
  margin: 5px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-color: rgb(160, 128, 179);
  background-blend-mode: luminosity;
}

.link-no-decoration {
  color: white;
  text-decoration: none;
}

.badge-thumbs-up {
  cursor: pointer;
  background-color: rgb(160, 52, 160);
  color: white;
}

.badge-thumbs-down {
  cursor: pointer;
  background-color: rgb(47, 12, 143);
  color: white;
}

.partyLogo{
  //  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  /* Maintain aspect ratio */
  max-height: 128px; //Ideal size of picture
  max-width: 128px;
  background-size: contain;
  // filter: grayscale(100%);
}
</style>
