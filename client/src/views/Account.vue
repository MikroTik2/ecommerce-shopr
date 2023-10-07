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
                    <span class="account-container-link__link account-container-link__logout" @click="submitLogout">Logout</span>
                </div>
            </div>

            <div class="account-container-right">
                <div class="account-container-right-text">
                    <span class="account-container-right-text__top">Hello {{ getName }} (not Bruce? Log out)</span>

                    <span class="account-container-right-text__bottom">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const localName = localStorage.getItem("currentUser");
    const user = localName ? JSON.parse(localName) : null;

    const getName = user ? user.firstname : "";
    const getAvatar = user ? user.avatar : "";

    const submitLogout = async () => {
        try {``

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

            @media screen and (max-width: 768px) {
                padding: 50px 16px;
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

                &__logout {
                    @media screen and (max-width: 768px) {
                        display: none;
                    }
                }
            }

            &-right {

                width: 100%;

                &-text {

                    display: grid;
                    row-gap: 32px;

                    &__top {
                        
                    } 
                }
            }
        }
    }
</style>