<template>
    <div class="container">
      <div class="col-xl-12 mx-auto">
        <h1 class="mb-5 section-title">Administración</h1>
      </div>
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
h5{
  color:inherit;
  font-weight: bold;
}

a>div{
  color:purple;
}
a>div:hover{
  background-color:darkmagenta;
  color:white!important;
}
h5:hover{
  color:white;
}

a.card{
    text-decoration: none;
    opacity: 0.6;
}

a.card:hover{
    opacity: 1;
}
</style>
