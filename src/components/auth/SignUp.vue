<template>
    <amplify-sign-up v-bind:signUpConfig="signUpConfig" v-bind:usernameAttributes="usernameAttributes"></amplify-sign-up>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue';

AmplifyEventBus.$on('authState', info => {
    if (info === 'confirmSignUp') {
        this.$router.replace('')
    }
});

export default {
    name: 'SignUp',
    data () {
        return {
            usernameAttributes: "Correo Electronico",
            signUpConfig: {
                header: "Crea tu cuenta",
                defaultCountryCode: '502',
                hideAllDefaults: true,
                signUpFields: [
                    {
                        label: "Correo Electronico",
                        key: "email",
                        required: true,
                        displayOrder: 1,
                        type: "email",
                        signUpWith: true
                    },
                    {
                        label: 'Contraseña',
                        key: 'password',
                        required: true,
                        displayOrder: 2,
                        type: 'password'
                    },
                    {
                        label: 'Nombre',
                        key: 'name',
                        required: true,
                        displayOrder: 3,
                        type: 'text'
                    },
                ]
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

