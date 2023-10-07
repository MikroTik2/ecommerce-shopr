<template>
    <div class="menu" :style="{ transform: isVisibleCart ? 'translateX(0)' : 'translateX(100%)' }">
        <div class="menu-content">
            <div class="menu-content-header">
                
                <div class="menu-content-top">
                    <a href="/">
                        <img class="menu-content-top__image" src="/svg/branding.svg" alt="brand">
                    </a>

                    <img @click="closeMenu" class="menu-content-top__close" src="/svg/close.svg" alt="close">
                </div>

                <div class="menu-content-bottom">
                    <a class="menu-content-bottom__link" href="/">Home</a>
                    <a class="menu-content-bottom__link" href="/about">About</a>
                    <a class="menu-content-bottom__link" href="/contact">Contact</a>
                    <a class="menu-content-bottom__link" href="/blog">Blog</a>
                </div>

            </div>

            <div class="menu-content-footer">
                
                <div class="menu-content-footer-element">
                    <div class="menu-content-footer-element__block">
                        <div class="menu-content-footer-element__block-link">
                            <span>Cart</span>
                            
                            <a href="/cart">
                                <img src="/svg/cart.svg" alt="cart">
                            </a>
                        </div>
                        <div class="menu-content-footer-element__block-link">
                            <span>Wishlist</span>
                            
                            <router-link to="/wishlist">
                                <img src="/svg/wishlist-menu.svg" alt="wishlist">
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="menu-content-footer-element__block-link" v-if="isLoggedIn">
                    <span>My account</span>
                    
                    <a href="/account">
                        <div class="menu-content-footer-element__block-link-account">
                            <img src="/svg/user-profile.svg" alt="wishlist">
                            <span> {{ getName }} </span>
                        </div>
                    </a>
                </div>

                <div class="menu-content-footer-element" style="border-bottom: none;">
                    <div v-if="!isLoggedIn" class="menu-content-footer-element-btns">
                        <a href="/login" class="menu-content-footer-element-btn">Sign In</a>
                        <a href="/registered" class="menu-content-footer-element-btn">Sign Up</a>
                    </div>
                    
                    <div v-else class="menu-content-footer-element-btns">
                        <span @click="submitLogout" href="/" class="menu-content-footer-element-btn">Log Out</span>
                    </div>

                </div>
                <div class="menu-content-footer-element" style="border-bottom: none;">
                    <div class="menu-content-footer-element-icons">

                        <img class="menu-content-footer-element-icon" src="/svg/social/facebook.svg" alt="icon">
                        <img class="menu-content-footer-element-icon" src="/svg/social/instagram.svg" alt="icon">
                        <img class="menu-content-footer-element-icon" src="/svg/social/twitter.svg" alt="icon">
                        <img class="menu-content-footer-element-icon" src="/svg/social/letter.svg" alt="icon">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const emit = defineEmits();

    const isLoggedIn = ref(false);

    const props = defineProps({
        isVisibleCart: Boolean,
    });

    const closeMenu = () => {
        emit("close-menu");
    };

    const localName = localStorage.getItem("currentUser");
    const user = localName ? JSON.parse(localName) : null;

    const getName = user ? user.firstname : "";

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
        const userData = localStorage.getItem("currentUser");

        if (userData) {
            isLoggedIn.value = true;
        };
    })
</script>

<style lang="scss" scoped>
    .menu {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 335px;
        transition: 0.5s all;
        background: var(--white);
        z-index: 70;

        @media screen and (max-width: 520px) {
            width: 100%;
        }

        &-content {

            padding: 16px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &-header {
                display: grid;
                row-gap: 16px;
            }

            &-footer {

                display: grid;
                row-gap: 16px;

                &-element {
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--gray);

                    &-btns {
                        display: grid;
                        row-gap: 16px;
                    }

                    &-icons {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                    }

                    &-icon {
                        display: flex;
                        padding: 9px;
                        border-radius: 50px;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transform: scale(1);
                        transition: all 0.2s;
                        background: var(--gray-secondary);

                        &:hover {
                            transform: scale(1.1);
                        }
                    }

                    &-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 40px;
                        color: var(--white);
                        background: var(--black);
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 14px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                    }

                    &__block {
                        display: grid;
                        row-gap: 16px;

                        &-link {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            &-account {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            }
                        }
                    }
                }
            }

            &-top {

                display: flex;
                align-items: center;
                justify-content: space-between;

                &__image {
                    width: 114px;
                    height: 22px;
                }

                &__close {
                    cursor: pointer;
                }
            }

            &-bottom {
                display: grid;
                
                &__link {
                    padding: 16px 0;
                    border-bottom: 1px solid var(--gray);
                }
            }
        }
    }
</style>