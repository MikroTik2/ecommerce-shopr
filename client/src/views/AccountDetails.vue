<template>
    <div class="account">
        <h2 class="account-title">My account</h2>

        <div class="account-container">
            <div class="account-container-left">
                <div class="account-container-left-content">
                    <div class="account-container-left-avatar">
                        <img class="account-container-left-avatar__image" :src="getAvatar" alt="avatar">
                    </div>

                    <div class="account-container-left-logout">
                        <span @click="submitLogout" class="account-container-left-logout__text"> <img src="/svg/logout.svg" alt="logout"> Logout</span>
                    </div>
                </div>
                
                <div class="account-container-link">
                    <router-link to="/account" class="account-container-link__link">Dashboard</router-link>
                    <router-link to="/account/address" class="account-container-link__link">Address</router-link>
                    <router-link to="/account/details" class="account-container-link__link">Account details</router-link>
                    <router-link to="/account/wishlist" class="account-container-link__link">Wishlist</router-link>
                    <span class="account-container-link__link" @click="submitLogout">Logout</span>
                </div>
            </div>

            <div class="account-container-right">
                <form class="account-container-right-fields" @submit.prevent="updateUserName">
                    <div class="account-container-right-fields-block">
                        <label class="account-container-right-fields-block__label" for="firstname">First name</label>
                        <input :class="{ 'account-container-right-fields-block__error': v$?.name.firstname?.$error, 'account-container-right-fields-block__input': !v$?.name.firstname?.$error }" v-model.trim="name.firstname" type="text" :placeholder="vt$?.name.firstname?.$error ? 'First name is required' : 'First name'">
                    </div>
                    <div class="account-container-right-fields-block">
                        <label class="account-container-right-fields-block__label" for="username">User name</label>
                        <input :class="{ 'account-container-right-fields-block__error': v$?.name.username?.$error, 'account-container-right-fields-block__input': !v$?.name.username?.$error }" v-model.trim="name.username" type="text" :placeholder="vt$?.name.username?.$error ? 'User name is required' : 'User name'">
                    </div>

                    <button class="account-container-right-fields-btn" type="submit">Edit</button>
                </form>

                <form class="account-container-right-password" @submit.prevent="updatePassword">

                    <h3>Password change</h3>

                    <div class="account-container-right-password-form">
                        <div class="account-container-right-fields-block">
                            <label class="account-container-right-fields-block__label" for="">Old password</label>
                            <input :class="{ 'account-container-right-fields-block__error': vt$?.password.oldPassword?.$error, 'account-container-right-fields-block__input': !vt$?.password.oldPassword?.$error }" v-model.trim="password.oldPassword" type="text" :placeholder="vt$?.password.oldPassword?.$error ? 'Old password is required' : 'Old password'">
                        </div>
                        <div class="account-container-right-fields-block">
                            <label class="account-container-right-fields-block__label" for="">New password</label>
                            <input :class="{ 'account-container-right-fields-block__error': vt$?.password.newPassword?.$error, 'account-container-right-fields-block__input': !vt$?.password.newPassword?.$error }" v-model.trim="password.newPassword" type="text" :placeholder="vt$?.password.newPassword?.$error ? 'New password is required' : 'New password'">
                        </div>
                        <div class="account-container-right-fields-block">
                            <label class="account-container-right-fields-block__label" for="">Repeat new password</label>
                            <input :class="{ 'account-container-right-fields-block__error': vt$?.password.repeatNewPassword?.$error, 'account-container-right-fields-block__input': !vt$?.password.repeatNewPassword?.$error }" v-model.trim="password.repeatNewPassword" type="text" :placeholder="vt$?.password.repeatNewPassword?.$error ? 'Repeat new password is required' : 'Repeat new password'">
                        </div>
                    </div>

                    <button class="account-container-right-fields-btn" type="submit">Edit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { required, maxLength } from '@vuelidate/validators';
    import { useRouter } from 'vue-router';
    import useVuelidate from '@vuelidate/core';
    import api from '@/config/api';

    const router = useRouter();

    const localName = localStorage.getItem("currentUser");
    const user = localName ? JSON.parse(localName) : null;

    const getAvatar = user ? user.avatar : "";

    const name = ref({
        firstname: "",
        username: "",
    });

    const password = ref({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    });

    const rules = {
        name: {
            firstname: { required, maxLength: maxLength(20) },
            username: { required, maxLength: maxLength(20) },
        },

        password: {
            oldPassword: { required, maxLength: maxLength(20) },
            newPassword: { required, maxLength: maxLength(20) },
            repeatNewPassword: { required, maxLength: maxLength(20) },
        },
    };

    const v$ = useVuelidate(rules, { name });
    const vt$ = useVuelidate(rules, { password });

    const updatePassword = async () =>  {
        try {

            if (vt$?.value) {
                await vt$.value.$validate();

                if (vt$.value.oldPassword?.$error || vt$.value.newPassword?.$error || vt$.value.repeatNewPassword?.$error) {
                    return;
                };
            };

            const updateUserPassword = {
                oldPassword: password.value.oldPassword,
                newPassword: password.value.newPassword,
                repeatNewPassword: password.value.repeatNewPassword,
            };

            const response = await api.updatePasswordUser(updateUserPassword);

            password.value.oldPassword = '';
            password.value.newPassword = '';
            password.value.repeatNewPassword = '';

            const updatePassword = {
                ...user,
                password: response.password,
            };

            localStorage.setItem("currentUser", JSON.stringify(updatePassword));
            
            router.push('/account');

        } catch (error) {
            console.log(error);
        };
    };

    const updateUserName = async () => {
        try {

            if (v$?.value) {
                await v$.value.$validate();

                if (v$.value.firstname?.$error || v$.value.username?.$error) {
                    return;
                };
                
            };

            const userName = {
                ...user,
                firstname: name.value.firstname,
                username: name.value.username,
            };

            if (!userName.firstname && !userName.username) {
                return;
            }

            const response = await api.updateUser(userName);

            const updatedUser = {
                ...user,
                firstname: response.firstname,
                username: response.username,
            };

            localStorage.setItem("currentUser", JSON.stringify(updatedUser));

            router.push("/account");

        } catch (error) {
            console.log(error);
        }
    };

    const submitLogout = async () => {
        try {

            localStorage.removeItem("currentUser");
            router.push({ path: "/" });

            setTimeout(() => {
                window.location.reload();
            }, 100); 

        } catch (error) {
            console.log("Error: ", error);
        };
    };

</script> 

<style lang="scss" scoped>
    .account {

        &-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 54px;
            font-weight: 500;
            padding: 50px 0;
            text-align: center;

            @media screen and (max-width: 768px) {
                font-size: 40px;
                padding: 32px 16px;
            }
        }

        &-container {
            padding: 50px 16px;
            max-width: 1110px;
            margin: 0 auto;
            display: flex;
            gap: 32px;

            @media screen and (max-width: 924px) {
                display: grid;
            }

            &-left {

                display: flex;
                flex-direction: column;
                gap: 32px;
                width: 195px;

                @media screen and (max-width: 768px) {
                    width: 100%;
                }

                &-logout {

                    display: none;

                    @media screen and (max-width: 768px) {
                        display: block;
                    }
                    
                    span {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        font-size: 16px;
                    }
                }

                &-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                    
                &-avatar {
                    width: 82px;
                    height: 82px;

                    @media screen and (max-width: 768px) {
                        width: 68px;
                        height: 68px;
                    }
                    
                    &__image {
                        width: 100%;
                        height: 100%;
                        border-radius: 100px;
                    }
                }
            }

            &-link {
                display: flex;
                flex-direction: column;
                gap: 16px;

                &__link {
                    padding-bottom: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border-bottom: 1px solid var(--white);

                    
                    &:hover {
                        border-bottom: 1px solid var(--black);
                    }

                    @media screen and (max-width: 768px) {
                        font-size: 16px;
                    }
                }
            }

            &-right {

                width: 650px;
                display: grid;
                row-gap: 32px;

                @media screen and (max-width: 768px) {
                    width: 100%;
                }

                &-fields {
                    display: grid;
                    row-gap: 24px;

                    &-block {
                        display: grid;
                        row-gap: 8px;

                        &__label {
                            color: var(--text-blue);
                            font-family: 'Inter', sans-serif;
                            font-size: 16px;
                            font-weight: 600;
                        }
                        
                        &__error {
                            padding: 0px 16px;
                            color: red;
                            border: 1px solid red;
                            outline: none;
                            height: 52px;
                            border-radius: 6px;
                            font-family: 'Inter', sans-serif;
                            font-size: 16px;
                            font-weight: 400;
                            transition: all 0.2s;  

                            @media screen and (max-width: 768px) {
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
                            padding: 0px 16px;
                            color: var(--light-gray);
                            border: 1px solid var(--gray);
                            outline: none;
                            height: 52px;
                            border-radius: 6px;
                            font-family: 'Inter', sans-serif;
                            font-size: 16px;
                            font-weight: 400;
                            transition: all 0.2s;

                            &:focus {
                                border: 1px solid var(--black);
                                color: var(--black);
                            }

                            @media screen and (max-width: 768px) {
                                height: 46px;
                                font-size: 14px;
                            }
                        }
                    }

                    &-btn {
                        width: 95px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 6px;
                        border: none;
                        color: var(--white);
                        font-size: 16px;
                        font-family: 'Space Grotesk', sans-serif;
                        font-weight: 500;
                        background: var(--black);
                        cursor: pointer;
                        transform: scale(1);
                        transition: all 0.2s;

                        &:hover {
                            transform: scale(1.04);
                        }
                    }
                }

                &-password {

                    display: grid;
                    row-gap: 32px;

                    &-form {
                        display: grid;
                        row-gap: 24px;
                    }
                }
            }
        }
    }
</style>