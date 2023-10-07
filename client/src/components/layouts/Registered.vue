<template>
    <div class="registered">
        <div class="registered-title">
            <div class="registered-content">
                <h2 class="registered-content-title">{{ isSign ? 'Sign in' : 'Sign up' }}</h2>
                <img @click="closeSignUp" class="registered-content-close" src="/svg/close.svg" alt="close">
            </div>

            <span class="registered-account"> {{ isSign ? "Don’t have an account yet?" : "Already have an account? " }} 
                <span class="registered-link" @click="toggleForm">{{ isSign ? 'Sign up' : 'Sign in' }}</span>
            </span>
        </div>

        <form class="registered-form" v-if="!isSign" @submit.prevent="registeredForm">
            <input autocomplete="username" maxlength="20" :class="{ 'registered-form__input': !v$?.registered.firstname?.$error, 'registered-form__error': v$?.registered.firstname?.$error }" type="text" :placeholder="v$?.registered.firstname?.$error ? 'Name is required' : 'First name'" v-model.trim="registered.firstname">
            <input autocomplete="username" maxlength="20" :class="{ 'registered-form__input': !v$?.registered.username?.$error, 'registered-form__error': v$?.registered.username?.$error }" type="text" :placeholder="v$.registered.username?.$error ? 'User name is required' : 'User name'" v-model.trim="registered.username">
            <input autocomplete="username" maxlength="30" :class="{ 'registered-form__input': !v$?.registered.email?.$error, 'registered-form__error': v$?.registered.email?.$error }" type="email" :placeholder="v$.registered.email?.$error ? 'Email is required' : 'Email address'" v-model.trim="registered.email">
            
            <div class="registered-form-block">
                <input autocomplete="current-password" maxlength="30" :class="{ 'registered-form__input': !v$?.registered.password?.$error, 'registered-form__error': v$?.registered.password?.$error }" :type="isVisiblePassword ? 'text' : 'password'" :placeholder="v$.registered.password?.$error ? 'Password is required' : 'Password'" v-model.trim="registered.password">
                <img @click="handlePassword" src="/svg/view-password.svg" alt="check-password">
            </div>
            
            <button class="registered-form__btn" type="submit">Sign Up</button>
        </form>

        <form class="registered-form" v-else @submit.prevent="loginForm">
            <input autocomplete="username" maxlength="30" :class="{ 'registered-form__input': !v$?.login.email?.$error, 'registered-form__error': v$?.login.email?.$error }" type="email" :placeholder="v$.login.email?.$error ? 'Email is required' : 'Email address' " v-model.trim="login.email">
            <div class="registered-form-block">
                <input autocomplete="current-password" maxlength="30" :class="{ 'registered-form__input': !v$?.login.password?.$error, 'registered-form__error': v$?.login.password?.$error }" :type="isVisiblePassword ? 'text' : 'password'" :placeholder="v$.registered.login?.$error ? 'Password is required' : 'Password'" v-model.trim="login.password">
                <img @click="handlePassword" src="/svg/view-password.svg" alt="check-password">
            </div>

            <button class="registered-form__btn" @click="handleSignClick" type="submit">Sign In</button>
        </form>
    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { required, email, maxLength } from '@vuelidate/validators';
    import useVuelidate from '@vuelidate/core';
    import api from '@/config/api';
    
    const isSign = ref(false);
    const isVisiblePassword = ref(false);
    const emit = defineEmits();

    const registered = ref({
        firstname: "",
        username: "",
        email: "",
        password: "",
    });

    const login = ref({
        email: '',
        password: '',
    });

    // VALIDATION RULES FOR FORMS
    const rules = {
        registered: {
            firstname: { required, maxLength: maxLength(20)},
            username: { required, maxLength: maxLength(20) },
            email: { required, email, maxLength: maxLength(30) },
            password: { required, maxLength: maxLength(30) },
        },

        login: {
            email: { required, email, maxLength: maxLength(30) },
            password: { required, maxLength: maxLength(30) },
        },
    };

    // INITIALIZATION OF VALIDATION
    const v$ = useVuelidate(rules, { registered, login });

    // HANDLER FOR SUBMITTING THE REGISTRATION FORM
    const registeredForm = async () => {

        try {

            if (v$?.value) {
                await v$.value.$validate();

                if (v$.value.firstname?.$error || v$.value.username?.$error || v$.value.email?.$error || v$.value.password?.$error) {
                    return;
                };
            };

            const user = {
                firstname: registered.value.firstname,
                username: registered.value.username,
                email: registered.value.email,
                password: registered.value.password,
            };

            const response = await api.registeredForm(user);

        } catch (error) {
            console.log("Error", error);
        };
    };

    // HANDLER FOR SUBMITTING THE LOGIN FORM
    const loginForm = async () => {

        try {

            if (v$?.value) {
                await v$.value.$validate();

                if (v$.value.email?.$error || v$.value.password?.$error) {
                    return;
                };
            };

            const user = {
                email: login.value.email,
                password: login.value.password,
            };

            console.log(user);

            const response = await api.loginForm(user);

        } catch (error) {
            console.log("Error", error);
        };

    };

    // HANDLER FOR PASSWORD VISIBILITY SWITCH
    const handlePassword = () => {
        isVisiblePassword.value = !isVisiblePassword.value;
    };
    
    // HANDLER FOR SWITCHING BETWEEN REGISTRATION AND LOGIN
    const toggleForm = () => {
        isSign.value = !isSign.value;
    };

    // HANDLER FOR CLOSING A FORM
    const closeSignUp = () => {
        emit("close-signup")
    };
    
</script>

<style lang="scss" scoped>
    .registered {
        width: 650px;
        height: auto;
        z-index: 20;
        padding: 32px;
        margin-left: 16px;
        margin-right: 16px;
        background: var(--white);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media screen and (max-width: 768px) {
            width: 90%;
            padding: 24px 16px;
            margin-left: 0;
            margin-right: 0;
            height: auto;
        }

        &-title {
            display: grid;
            row-gap: 25px;

            @media screen and (max-width: 768px) {
                row-gap: 12px;
            }
        }

        &-link {
            font-size: 16px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            cursor: pointer;
        }

        &-account {
            font-family: 'Inter', sans-serif;
            font-size: 16px;

            @media screen and (max-width: 768px) {
                font-size: 14px;
            }
        }

        &-content {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-title {
                font-size: 40px;

                @media screen and (max-width: 768px) {
                    font-size: 26px;
                }
            }

            &-close {
                cursor: pointer;
            }
        }

        &-form {
            margin-top: 32px;
            row-gap: 32px;
            display: grid;

            @media screen and (max-width: 768px) {
                row-gap: 24px;
                margin-top: 24px;
            }

            &-block {
                position: relative;
                max-width: 100%;

                img {
                    position: absolute;
                    top: 12px;
                    cursor: pointer;
                    z-index: 100;
                    right: 0;
                }
            }

            &__btn {
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--black);
                color: var(--white);
                height: 72px;
                width: 100%;
                border: none;
                border-radius: 6px;
                font-family: 'Space Grotesk', sans-serif;
                font-size: 22px;
                transform: scale(1);
                transition: all 0.2s;
                cursor: pointer;

                &:hover {
                    transform: scale(1.02);
                }

                @media screen and (max-width: 768px) {
                    height: 46px;
                    font-size: 16px;
                }
            }

            &__error {

                width: 100%;
                height: 52px;
                border: none;
                outline: none;
                font-size: 16px;
                font-family: 'Inter', sans-serif;
                font-weight: 400;
                border-bottom: 1px solid red;
                transition: all 0.2s;

                @media screen and (max-width: 768px) {
                    font-size: 14px;
                    height: 46px;
                }

                &::placeholder {
                    color: red;
                    font-size: 16px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 400;

                    @media screen and (max-width: 768px) {
                        font-size: 14px;
                    }
                }
            }
                
            &__input {
                width: 100%;
                height: 52px;
                border: none;
                outline: none;
                border-bottom: 1px solid var(--gray);
                color: #A7A7A7;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-weight: 400;
                transition: all 0.2s;

                @media screen and (max-width: 768px) {
                    font-size: 14px;
                }

                &:focus {
                    border-bottom: 1px solid var(--black);
                    color: var(--black); 
                }

                @media screen and (max-width: 768px ){
                    font-size: 14px;
                    height: 46px;
                }
            }
        }
    }
</style>