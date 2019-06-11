<template>
    <div class="container">
        <a href="" class="card" v-on:click.prevent="goPartyAdmin">
            <div class="card-body">
                <h5>Partidos</h5>
            </div>
        </a>

        <a href="" class="card" v-on:click.prevent="goCandidateAdmin">
            <div class="card-body">
                <h5>Candidatos</h5>
            </div>
        </a>

        <a  href="" class="card" v-on:click.prevent="goCandidateRoleAdmin">
            <div class="card-body">
                <h5>Tipos de candidato</h5>
            </div>
        </a>
    </div>
</template>

<script>
export default {
  methods: {
    goPartyAdmin () {
      this.$router.push('/admin/partidos')
    },
    goCandidateAdmin () {
      this.$router.push('/admin/candidatos')
    },
    goCandidateRoleAdmin () {
      this.$router.push('/admin/candidatos/roles')
    }
  }
}
</script>

<style scoped>
a.card{
    text-decoration: none;
    opacity: 0.6;
}

a.card:hover{
    opacity: 1;
}
</style>
