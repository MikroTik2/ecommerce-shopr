<template>

    <!-- HEADER PAGE -->
    <header class="header">
        <div class="header-top">

            <!-- LEFT SIDE OF THE UPPER PART OF THE HEADER -->
            <router-link to="/" class="header-top-left-logo"> 
                <img src="/svg/branding.svg" alt="logo"> 
            </router-link>

            <!-- CENTER SIDE OF THE UPPER PART OF THE HEADER -->
            <div class="header-top-center">
                <div class="header-top-center-content" v-for="(element, i) of menu" :key="i">
                    <router-link class="header-top-center__link" :to="element.path"> {{ element.name }} </router-link>
                </div>
            </div>

            <!-- RIGHT SIDE OF THE UPPER PART OF THE HEADER -->
            <div class="header-top-right">

                <!-- ICONS FOR SEARCH, CART AND PROFILE-->
                <img @click="toggleSearch" class="header-top-right__icon" src="/svg/search.svg" alt="search">
                <img v-if="isUser" @click="redirectToAccount" class="header-top-right__icon" src="/svg/user-profile.svg" alt="user">
                <img v-else @click="toggleSignUp" class="header-top-right__icon" src="/svg/user-profile.svg" alt="user">
                <img @click="toggleCart" class="header-top-right__icon" src="/svg/cart.svg" alt="cart">
            </div>

            <!-- MOBILE ICONS -->
            <div class="header-top-right-mobile">

                <!-- ICONS FOR SEARCH, CART AND MENU (MOBILE VERSION) -->
                <img class="header-top-right__icon" @click="toggleSearch" src="/svg/search.svg" alt="search">
                <img class="header-top-right-mobile__icon" @click="toggleCart" src="/svg/cart.svg" alt="cart">
                <img class="header-top-right-mobile__icon" @click="toggleMenu" src="/svg/menu.svg" alt="menu">
            </div>
            
        </div>

        <!-- COMPONENT SIDEBAR FOR CART -->
        <SidebarCart :isVisibleCart="isVisibleCart" @close-cart="toggleCart"/>
        <div :class="{ 'show': isVisibleCart }" class="sidebar-overlay" @click="closeSidebarCart"></div>

        <!-- COMPONENT SIDEBAR FOR SEARCH -->
        <SidebarSearch :isVisibleSearch="isVisibleSearch" @close-search="toggleSearch"/>
        <div :class="{ 'show': isVisibleSearch }" class="sidebar-overlay" @click="closeSearch"></div>
        
        <!-- COMPONENT SIDEBAR FOR MENU (MOBILE VERSION) -->
        <SidebarMenu :isVisibleCart="isVisibleMenu" @close-menu="toggleMenu"/>
        <div :class="{ 'show': isVisibleMenu }" class="sidebar-overlay" @click="closeMenu"></div>

        <!-- COMPONENT FOR REGISTERED AMD LOGIN A USER -->
        <Registered v-if="isVisibleRegistered" @close-signup="toggleSignUp"/>
        <div :class="{ 'show': isVisibleRegistered }" class="sidebar-overlay" @click="closeSignUp"></div>
 
    </header>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import SidebarSearch from '@/components/layouts//SidebarSearch.vue';
    import Registered from '@/components/layouts/Registered.vue'
    import SidebarCart from '@/components/layouts/SidebarCart.vue';
    import SidebarMenu from '@/components/layouts/SidebarMenu.vue';

    const router = useRouter();

    const isVisibleSearch = ref(false);
    const isVisibleCart = ref(false);
    const isVisibleMenu = ref(false);
    const isVisibleRegistered = ref(false);

    const userInLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
    const isUser = computed(() => !!userInLocalStorage);

    const redirectToAccount = () => {
        router.push('/account');
    };

    const toggleMenu = () => {
        isVisibleMenu.value = !isVisibleMenu.value;

        if (isVisibleMenu.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };

    const closeMenu = () => {
        isVisibleMenu.value = false;
        document.body.style.overflow = '';
    };

    const toggleSearch = () => {
        isVisibleSearch.value = !isVisibleSearch.value;

        if (isVisibleSearch.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };

    const closeSearch = () => {
        isVisibleSearch.value = false;
        document.body.style.overflow = '';
    };

    const toggleSignUp = () => {
        isVisibleRegistered.value = !isVisibleRegistered.value;

        if (isVisibleRegistered.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };

    const closeSignUp = () => {
        isVisibleRegistered.value = false;
        document.body.style.overflow = '';
    };

    const toggleCart = () => {
        isVisibleCart.value = !isVisibleCart.value;

        if (isVisibleCart.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };

    const closeSidebarCart = () => {
        isVisibleCart.value = false;
        document.body.style.overflow = '';
    };

    const menu = ref([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" },
    ]);

    onMounted(() => {
        const overflow = document.querySelector('.sidebar-overlay');
        overflow.addEventListener('click', closeSidebarCart);
    });

</script>

<style lang="scss">
    .header {
        
        margin: 0 25px;

        @media screen and (max-width: 1024px) {
            margin: 0 16px;
        }

        &-top {

            height: 70px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: center;

            @media screen and (max-width: 1024px) {
                height: 46px;
                grid-template-columns: repeat(2, 1fr);
            }

            &-left-logo {
                display: flex;
                align-items: center;

                img {

                    @media screen and (max-width: 1024px) {
                        width: 114px;
                        height: 22px;
                    }
                }
            }

            &-center {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 40px;

                @media screen and (max-width: 1024px) {
                    display: none;
                }

                &__link {
                    font-size: 16px;
                }
            } 

            &-right {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 20px;

                @media screen and (max-width: 1024px) {
                    display: none;
                }

                &__icon {
                    cursor: pointer;
                }
            }

            &-right-mobile {
                display: none;
                align-items: center;
                justify-content: flex-end;
                gap: 16px;

                @media screen and (max-width: 1024px) {
                    display: flex;
                }

                &__icon {
                    cursor: pointer;
                }
            }
            
        }
    }

    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        overflow-y: auto;
        display: none;
    }

    .sidebar-overlay.show {
        display: block;
    }

    .hidden {
        display: none;
    }
</style>