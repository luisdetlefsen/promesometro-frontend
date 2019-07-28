<template>
    <amplify-sign-in v-bind:signInConfig="signInConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-sign-in>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
    name: 'SignIn',
    data () {
        return {
            usernameAttributes: "Correo Electronico",
            signInConfig: {
                header: "Ingresa a tu cuenta"
            }
        }
    },
    async mounted() {
        AmplifyEventBus.$on('localUser', info => {
            console.log(info)
        });

        AmplifyEventBus.$on('authState', info => {
            if (info === 'signedIn') {
                this.$router.replace('promesas')
            } else if (info === 'signUp') {
                this.$router.replace('registrar')
            }
        });
    }
}
</script>
<style lang="scss" scoped>

</style>

