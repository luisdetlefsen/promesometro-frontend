<template>
    <amplify-confirm-sign-up v-bind:confirmSignUpConfig="confirmSignUpConfig"></amplify-confirm-sign-up>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
    name: 'ConfirmSignUp',
    data () {
        return {
            usernameAttributes: "Correo Electronico",
            confirmSignUpConfig: {
                header: "Confirma tu cuenta",
                username: this.username
            }
        }
    },
    computed: {
        username () {
            return this.$route.query.username
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

