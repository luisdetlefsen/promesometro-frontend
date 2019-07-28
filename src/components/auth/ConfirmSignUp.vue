<template>
    <amplify-confirm-sign-up v-bind:confirmSignUpConfig="confirmSignUpConfig"></amplify-confirm-sign-up>
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
    }
}
</script>
<style lang="scss" scoped>

</style>

