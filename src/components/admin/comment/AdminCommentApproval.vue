<template>
    <div class="container">
        <div class="col-xl-12 mx-auto">
            <h1 class="mb-5 section-title">Comentarios</h1>
        </div>

        <table class="table table-sm table-striped table-bordered">
            <tr>
                <th>Id</th>
                <th>Id promesa</th>
                <th>Usuario</th>
                <th>Comentario</th>
                <th>Status</th>
                <th></th>
            </tr>
            <tbody>
                <tr v-for="c in comments" v-bind:key="c.idComment">
                    <td>{{c.idComment}}</td>
                    <td><a :href="`${c.promiseLink}`" target="_blank" style="color:purple;">{{c._embedded.promise.id}}</a></td>
                    <td>{{c.userEmail}}</td>
                    <td>{{c.text}}</td>
                    <td><span v-if="c.approved">Aprobado</span><span v-if="!c.approved">No aprobado</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary" v-on:click="updateCommentStatus(c.idComment,true)">Aprobar</button>
                        <button class="btn btn-sm btn-danger" v-on:click="updateCommentStatus(c.idComment,false)">Quitar aprobación</button>
                    </td>
                </tr>
                <tr v-if="comments.length===0">
                    <td colspan="4" class="text-center">No hay comentarios registrados</td>
                </tr>
                <tr id="spinnerComments">
                    <td colspan="4" class="text-center">
                        <div class="sub-section-title spinner-border" role="status">
                            <span class="sr-only">Cargando...</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="display:flex;flex-wrap:wrap;margin:auto;align-items: center;justify-content: center;">
            <pagination :records="paginatorData.totalCommentsCount" v-model="paginatorData.currentPage" :per-page="paginatorData.itemsPerPage" @paginate="callbackPagination" :options="paginatorOptions">
            </pagination>
        </div>
    </div>
</template>

<script>
import Pagination from 'vue-pagination-2'
import $ from 'jquery'
export default {
  components: {
    Pagination
  },
  data: function () {
    return {
      comments: [],
      paginatorOptions: {
        texts: { count: 'Mostrando de {from} a {to} de {count} comenatrios|{count} comentarios|Un comentario' },
        first: 'Primera',
        last: 'Última'
      },
      paginatorData: {
        currentPage: 0,
        totalCommentsCount: 0,
        itemsPerPage: 20
      }
    }
  },
  methods: {
    async getPagedComments (page) {
      return this.restDataSource.getPagedComments(page - 1)
    },
    async callbackPagination (page) {
      let pagedComments = await this.getPagedComments(page)
      this.comments.splice(0)
      for (let i = 0; i < pagedComments.length; i++) {
        pagedComments[i].idComment = pagedComments[i].id
        pagedComments[i].promiseLink = '/#/promesas/' + pagedComments[i]._embedded.promise.id
      }
      this.comments.push(...pagedComments)
    },
    getAllComments (newComments) {
      this.comments.splice(0)
      for (let i = 0; i < newComments.length; i++) {
        newComments[i].idComment = newComments[i].id
        newComments[i].promiseLink = '/#/promesas/' + newComments[i]._embedded.promise.id
      }
      this.comments.push(...newComments)
      $('#spinnerComments').hide()
    },
    async updateCommentStatus (commentId, approved) {
      let theComment = {
        idComment: commentId,
        approved: approved
      }
      await this.restDataSource.updateComment(theComment)
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].idComment === commentId) {
          this.comments[i].approved = approved
          break
        }
      }
    }
  },
  inject: ['eventBus', 'restDataSource'],
  async created () {
    let commentsResponse = await this.restDataSource.getAllComments()
    this.paginatorData = {
      currentPage: 1,
      totalCommentsCount: commentsResponse.page.totalElements,
      itemsPerPage: 20
    }
    this.getAllComments(commentsResponse._embedded.comments)
  }
}
</script>
