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
                <div class="account-container-right-elements">
                    <div class="account-container-right-element" v-for="(user, index) in addressUser" :key="index">
                        <div class="account-container-right-element-top">
                            <span>Shipping address</span>
                        </div>
                        <div class="account-container-right-element-content">
                            <span> <span>Street:</span> {{ user.address.street }} </span>
                            <span> <span>Country:</span> {{ user.address.country }} </span>
                            <span> <span>City:</span> {{ user.address.city }} </span>
                            <span> <span>State:</span> {{ user.address.state }} </span>
                            <span> <span>Zip:</span> {{ user.address.zip }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '@/config/api';

    const router = useRouter();

    const addressUser = ref([]);

    const localName = localStorage.getItem("currentUser");
    const user = localName ? JSON.parse(localName) : null;

    const getAvatar = user ? user.avatar : "";

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

    onMounted(async () => {
        addressUser.value = await api.getAllUser();
    });

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

            @media screen and (max-width: 768px) {
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

                width: 80%;

                @media screen and (max-width: 768px) {
                    width: 100%;
                }

                &-elements {
                    display: grid;
                    width: 100%;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 32px;

                    @media screen and (max-width: 768px) {
                        grid-template-columns: repeat(1, 1fr);
                    }
                }

                &-element {
                    padding: 32px;
                    border-radius: 6px;
                    display: flex;
                    flex-direction: column;
                    row-gap: 12px;
                    width: 100%;
                    border: 1px solid var(--gray);
                    background: var(--white);

                    &-top {
                        
                        span {
                            font-family: 'Inter', sans-serif;
                            font-weight: 600;
                        }
                    }

                    &-content {
                        display: grid;
                        row-gap: 8px;

                        span {
                            font-family: 'Inter', sans-serif;
                            font-weight: 400;

                            span {
                                font-weight: 500;
                            }
                        }
                    }
                }
            }
        }
    }
</style>