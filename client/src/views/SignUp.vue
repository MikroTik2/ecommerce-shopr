<template>
    <div class="registered">
        <div class="registered-title">
            <div class="registered-content">
                <h2 class="registered-content-title">Sign up</h2>
            </div>

            <span class="registered-account"> Already have an account? 
                <router-link to="/login" class="registered-link">Sign in</router-link>
            </span>
        </div>

        <form class="registered-form" @submit.prevent="registeredForm">
            <input :class="{ 'registered-form__error': v$?.registered.firstname?.$error, 'registered-form__input': !v$?.registered.firstname?.$error }" maxlength="20" type="text" :placeholder="v$?.registered.firstname?.$error ? 'Name is required' : 'First name'" v-model.trim="registered.firstname">
            <input :class="{ 'registered-form__error': v$?.registered.username?.$error, 'registered-form__input': !v$?.registered.username?.$error }" maxlength="20" type="text" :placeholder="v$?.registered.firstname?.$error ? 'User name is required' : 'User name'" v-model.trim="registered.username">
            <input :class="{ 'registered-form__error': v$?.registered.email?.$error, 'registered-form__input': !v$?.registered.email?.$error }" maxlength="30" type="email" :placeholder="v$?.registered.firstname?.$error ? 'Email is required' : 'Email address'" v-model.trim="registered.email">
            <input :class="{ 'registered-form__error': v$?.registered.password?.$error, 'registered-form__input': !v$?.registered.password?.$error }" autocomplete="current-password"  maxlength="30" type="password" :placeholder="v$?.registered.firstname?.$error ? 'Password is required' : 'Password'" v-model.trim="registered.password">

            <button class="registered-form__btn" type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { required, email, maxLength } from '@vuelidate/validators';
    import { useRouter } from 'vue-router';
    import useVuelidate from '@vuelidate/core';
    import axios from 'axios';


    const router = useRouter();

    const registered = ref({
        firstname: "",
        username: "",
        email: "",
        password: "",
    });

    const rules = {
        registered: {
            firstname: { required, maxLength: maxLength(20) },
            username: { required, maxLength: maxLength(20) },
            email: { required, email, maxLength: maxLength(30) },
            password: { required, maxLength: maxLength(30) },
        },
    }

    const v$ = useVuelidate(rules, { registered });

    const registeredForm = async () => {
        try {

            if (v$?.value) {
                await v$.value.$validate();

                if (v$.value.firstname?.$error || v$.value.username?.$error || v$.value.email?.$error || v$.value.password?.$error) {
                    return;
                };
            };

            const response = await axios.post("http://localhost:4000/api/user/register", {
                firstname: registered.value.firstname,
                username: registered.value.username,
                email: registered.value.email,
                password: registered.value.password,
            });

            const currentUserData = {
                _id: response.data._id,
                firstname: response.data.firstname,
                username: response.data.username,
                avatar: response.data.avatar,
                token: response.data.token,
                refreshToken: response.data.refreshToken,
            };

            localStorage.setItem("currentUser", JSON.stringify(currentUserData));

            router.push('/');

        } catch (error) {
            console.log("Error", error);
        };
    };
    
</script>

<style lang="scss" scoped>
    .registered {
        width: 550px;
        height: auto;
        z-index: 20;
        padding: 87px 16px;
        margin: auto;

        @media screen and (max-width: 768px) {
            padding: 87px 16px;
            width: 100%;
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
                border: 1px solid red;
                border-radius: 6px;
                padding: 0 16px;
                outline: none;
                color: red;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-weight: 400;
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
                border: 1px solid var(--gray);
                border-radius: 6px;
                padding: 0 16px;
                outline: none;
                color: #A7A7A7;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-weight: 400;
                transition: all 0.2s;

                @media screen and (max-width: 768px) {
                    font-size: 14px;
                    height: 46px;
                }

                &:focus {
                    border: 1px solid var(--black);
                    color: var(--black);
                }
            }
        }
    }
</style>