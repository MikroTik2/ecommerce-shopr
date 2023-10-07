<template>
    <footer class="footer">

        <!-- FOOTER TOP -->
        <div class="footer-top">
            <div class="footer-top-left">

                <!-- COMPANY LOGO AND DESCRIPTION -->
                <div class="footer-top-left-text">
                    <a href="/">
                        <img class="footer-top-left-text__image" src="/svg/branding-footer.svg" alt="branding-footer">
                    </a>

                    <span class="footer-top-left-text__description">Experience the future of e-commerce <br> design with SHOPR</span>
                </div>

                <!-- SOCIAL ICONS -->
                <div class="footer-top-left-icons">
                    <div class="footer-top-left-icon" v-for="(element, i) of icons" :key="i">
                        <img :src="element.icon" alt="icon">
                    </div>
                </div>
            </div>
            <div class="footer-top-right">

                <!-- COLUMN "SHOP" -->
                <div class="footer-top-right-column">
                    <h5 class="footer-top-right-column__title">Shop</h5>

                    <div class="footer-top-right-column-content">
                        <a v-if="isUser" class="footer-top-right-column-content__link" href="/account">My account</a>
                        <a v-else class="footer-top-right-column-content__link" href="/login">My account</a>
                        <router-link class="footer-top-right-column-content__link" to="/login">Login</router-link>
                        <a v-if="isUser" class="footer-top-right-column-content__link" href="/account/wishlist">Wishlist</a>
                        <a v-else class="footer-top-right-column-content__link" href="/login">Wishlist</a>
                        <router-link class="footer-top-right-column-content__link" to="/cart">Cart</router-link>
                    </div>
                </div>

                <!-- COLUMN "INFORMATION" -->
                <div class="footer-top-right-column">
                    <h5 class="footer-top-right-column__title">Information</h5>

                    <div class="footer-top-right-column-content">
                        <router-link class="footer-top-right-column-content__link" to="/shipping-policy">Shipping Policy</router-link>
                        <router-link class="footer-top-right-column-content__link" to="/returns-refunds">Returns & Refunds</router-link>
                        <router-link class="footer-top-right-column-content__link" to="/cookies-policy">Cookies Policy</router-link>
                        <router-link class="footer-top-right-column-content__link" to="/frequently-asked">Frequently asked</router-link>
                    </div>
                </div>

                <!-- COLUMN "COMPANY" -->
                <div class="footer-top-right-column">
                    <h5 class="footer-top-right-column__title">Company</h5>

                    <div class="footer-top-right-column-content">
                        <router-link class="footer-top-right-column-content__link" to="/about">About us</router-link>
                        <router-link class="footer-top-right-column-content__link" to="/privacy-police">Privacy Policy</router-link>
                        <router-link class="footer-top-right-column-content__link" to="/terms-conditions">Terms & Conditions</router-link>
                        <router-link class="footer-top-right-column-content__link" to="/contact">Contact Us</router-link>
                    </div>
                </div>
            </div>

            <!-- MOBILE VERSION -->
            <div class="footer-top-right-mobile">
                <div class="footer-top-right-mobile-column">
                    <div class="footer-top-right-mobile-column-block">
                        
                        <div class="footer-top-right-mobile-column-block-title" @click="toggleList(0)">
                            <span class="footer-top-right-mobile-column__name">Shop</span>
                            <img :style="{ transform: `rotate(${isVisibleList[0] ? '180deg' : '0deg'})` }" src="/svg/arrow-down.svg" alt="arrow">
                        </div>

                        <div class="footer-top-right-mobile-column-block-list" :style="{ maxHeight: isVisibleList[0] ? '200px' : '0px' }">
                            <a v-if="isUser" class="footer-top-right-mobile-column-block-list__link" href="/account">My account</a>
                            <a v-else class="footer-top-right-mobile-column-block-list__link" href="/login">My account</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/login">Login</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/account/wishlist">Wishlist</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/cart">Cart</a>
                        </div>
                    </div>

                </div>

                <div class="footer-top-right-mobile-column">
                    <div class="footer-top-right-mobile-column-block">
                        
                        <div class="footer-top-right-mobile-column-block-title" @click="toggleList(1)">
                            <span class="footer-top-right-mobile-column__name">Information</span>
                            <img :style="{ transform: `rotate(${isVisibleList[1] ? '180deg' : '0deg'})` }" src="/svg/arrow-down.svg" alt="arrow">
                        </div>

                        <div class="footer-top-right-mobile-column-block-list" :style="{ maxHeight: isVisibleList[1] ? '200px' : '0px' }">
                            <a class="footer-top-right-mobile-column-block-list__link" href="/">Shipping Policy</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/">Returns & Refunds</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/">Cookies Policy</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/">Frequently asked</a>
                        </div>
                    </div>

                </div>

                <div class="footer-top-right-mobile-column">
                    <div class="footer-top-right-mobile-column-block">
                        
                        <div class="footer-top-right-mobile-column-block-title" @click="toggleList(2)">
                            <span class="footer-top-right-mobile-column__name">Company</span>
                            <img :style="{ transform: `rotate(${isVisibleList[2] ? '180deg' : '0deg'})` }" src="/svg/arrow-down.svg" alt="arrow">
                        </div>

                        <div class="footer-top-right-mobile-column-block-list" :style="{ maxHeight: isVisibleList[2] ? '200px' : '0px' }">
                            <a class="footer-top-right-mobile-column-block-list__link" href="/about">About us</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/">Privacy Policy</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/">Terms & Conditions</a>
                            <a class="footer-top-right-mobile-column-block-list__link" href="/contact">Contact Us</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- BOTTOM OF THE FOOTER -->
        <div class="footer-bottom">

            <!-- ICONS AND COPYRIGHT -->
            <div class="footer-bottom-icon">
                <div class="footer-top-left-icon footer-bottom-none" v-for="(element, i) of icons" :key="i">
                    <img :src="element.icon" alt="icon">
                </div>
            </div>
            <span class="footer-bottom-logo">© 2023 SHOPR</span>
        </div>
    </footer>
</template>

<script setup>
    import { ref, computed } from 'vue';

    const isVisibleList = ref([false, false, false]);

    // CHECKING IF THE USER IS LOGGED IN
    const userInLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
    const isUser = computed(() => !!userInLocalStorage);
    
    // FUNCTION FOR SWITCHING THE VISIBILITY OF LISTS
    const toggleList = (itemNumber) => {
        isVisibleList.value[itemNumber] = !isVisibleList.value[itemNumber];
    };

    const icons = ref([
        { icon: "/svg/social/facebook.svg" },
        { icon: "/svg/social/instagram.svg" },
        { icon: "/svg/social/twitter.svg" },
        { icon: "/svg/social/letter.svg" },
    ])
</script>

<style lang="scss" scoped>
    .footer {

        padding: 72px 52px 32px 52px;
        display: flex;
        flex-direction: column;
        gap: 70px;
        background: var(--black-gray-secondary);

        @media screen and (max-width: 1024px) {
            padding: 48px 16px 24px 16px;
            gap: 29px;
        }

        &-top {

            display: flex;
            justify-content: space-between;

            @media screen and (max-width: 924px) {
                display: grid;
                justify-content: inherit;
                gap: 24px;
            }

            &-left {

                display: grid;
                row-gap: 25px;
                
                &-icons {
                    display: flex;
                    align-items: center;
                    gap: 16px;

                    @media screen and (max-width: 1024px) {
                        display: none;
                    }
                }

                &-icon {
                    border-radius: 100px;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--white);
                    cursor: pointer;
                    transform: scale(1);
                    transition: all 0.2s;

                    &:hover {
                        transform: scale(1.1);
                    }
                }

                &-text {

                    display: grid;
                    row-gap: 16px;

                    &__description {
                        color: var(--black-gray);
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 26px;
                    }
                }

            }

            &-right {
                display: flex;
                gap: 120px;

                @media screen and (max-width: 1024px) {
                    gap: 70px;
                } 

                @media screen and (max-width: 612px) {
                    display: none;
                }

                &-column {

                    display: flex;
                    flex-direction: column;
                    row-gap: 16px;

                    &-content {

                        display: grid;
                        row-gap: 12px;

                        &__link {
                            color: var(--text-blue);
                            font-family: 'Inter', sans-serif;
                            font-size: 14px;
                            font-weight: 400;
                        }
                    }
                }
            }

            &-right-mobile {
                display: none;

                @media screen and (max-width: 612px) {
                    display: block;
                }

                &-column {

                    display: grid;
                    padding: 10px 0;
                    row-gap: 20px;

                    &-block {
                        display: grid;
                        row-gap: 10px;
                        border-bottom: 1px solid var(--gray);
                        

                        &-title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            
                            img {
                                transition: all 0.3s;
                            }
                        }

                        &-list {
                            display: grid;
                            max-height: 0;
                            overflow: hidden;
                            transition: max-height 0.5s ease-in-out;
                            
                            &__link {
                                color: var(--text-blue);
                                font-family: 'Inter', sans-serif;
                                font-size: 14px;
                                font-weight: 400;
                                padding-bottom: 10px;
                            }
                        }
                    }

                    &__name {
                        color: var(--text-blue);
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 14px;
                    }
                }
            }
        }

        &-bottom {
            padding: 25px 0;
            border-top: 1px solid var(--gray);
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media screen and (max-width: 612px) {
                border-top: none;
                display: grid;
                justify-content: center;
                gap: 16px;
            }

            &-icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &-none {

                display: none;

                @media screen and (max-width: 612px) {
                    display: flex;
                }
            }

            &-logo {
                color: var(--text-blue);
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                text-align: center;
                font-weight: 400;
            }

        }
    }
</style>