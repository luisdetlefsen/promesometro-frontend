<template>
    <amplify-confirm-sign-up v-bind:confirmSignUpConfig="confirmSignUpConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-confirm-sign-up>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
    name: 'ConfirmSignUp',
    props: ['username'],
    data () {
        return {
            usernameAttributes: "Correo Electronico",
            confirmSignUpConfig: {
                header: "Confirma tu cuenta",
                username: this.username
            }
        }
    },
    async mounted() {
        AmplifyEventBus.$on('authState', info => {
            if (info === 'signIn') {
                this.$router.replace('iniciarSesion')
            }
        });
    }
}
</script>
<style lang="scss" scoped>

</style>

