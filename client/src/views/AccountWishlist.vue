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
                <div class="account-container-right-elements" v-if="wishlistEmpty > 0">
                    <div class="account-container-right-element" v-for="wishlist in productWishlist.wishlist" :key="wishlist._id">
                        <div class="account-container-right-element-left"> 
                            <div class="account-container-right-element-content">
                                <router-link :to="`/collections/product/${wishlist._id}`" class="account-container-right-element-content-image__container">
                                    <img class="account-container-right-element-content-image" :src="wishlist.images[0]" :alt="wishlist.slug">
                                </router-link>
                            
                                <div class="account-container-right-element-content-left">
                                    <h4> {{ wishlist.title }} </h4>

                                    <div class="account-container-right-element-content-left-select">
                                        <span>Size: {{ wishlist.size }},</span>
                                        <span>Color: {{ wishlist.color }}</span>
                                    </div>

                                    <span class="account-container-right-element-content-left-price">${{ wishlist.price }}.00</span>

                                    <div class="account-container-right-element-content-left-remove">
                                        <span @click="removeToWishlist(wishlist._id)"> <img src="/svg/trash.svg" alt="trash"> Remove </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="account-container-right-element-left">
                            <div class="account-container-right-element-left__price">
                                <span>${{ wishlist.price }}.00</span>
                            </div>

                            <div class="account-container-right-element-left__btn">
                                <router-link class="account-container-right-element-left__btn-link" :to="`/collections/product/${wishlist._id}`">Select option</router-link>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="account-container-right-empty" v-else>
                    <span>No products were added to the wishlist page. <router-link class="account-container-right-empty__link" to="/collections">Back to shopping</router-link> </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '@/config/api';

    const productWishlist = ref({
        wishlist: []
    });

    const router = useRouter();

    const localName = localStorage.getItem("currentUser");
    const user = localName ? JSON.parse(localName) : null;

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

    const removeToWishlist = async (itemId) => {
        api.removeFromWishlistApi(itemId);
        productWishlist.value.wishlist = productWishlist.value.wishlist.filter(wishlist => wishlist._id !== itemId);
    };

    const wishlistEmpty = computed(() => {
        return productWishlist.value.wishlist.length;
    });

    onMounted(async () => {
        productWishlist.value = await api.getWishlist();
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

                width: 100%;

                &-empty {
                    
                    &__link {
                        text-decoration: underline;
                    }

                }

                &-elements {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    row-gap: 10px;   
                }

                &-element {
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--gray);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    @media screen and (max-width: 768px) {
                        display: grid;
                        justify-content: inherit;
                        row-gap: 16px;
                    }

                    &-left {
                        display: flex;
                        align-items: center;
                        gap: 100px;

                        &__price {
                            font-family: 'Inter', sans-serif;

                            @media screen and (max-width: 768px) {
                                display: none;
                            }
                        }

                        &__btn {
                            
                            width: 100%;

                            &-link {
                                border-radius: 6px;
                                width: 174px;
                                height: 52px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                border: 2px solid var(--black-gray);
                                background: var(--white);

                                &:hover {
                                    background-color: #f9f9f9;
                                }

                                @media screen and (max-width: 768px) {
                                    width: 100%;
                                }
                            }
                        }
                    }

                    &-content {

                        display: flex;
                        align-items: center;
                        gap: 24px;

                        &-left {
                            display: grid;
                            row-gap: 8px;

                            h4 {
                                font-family: 'Inter', sans-serif;
                                font-weight: 600;
                            }

                            &-price {
                                font-family: 'Inter', sans-serif;
                                font-size: 16px;
                            }

                            &-select {
                                display: flex;
                                align-items: center;
                                gap: 8px;

                                span {
                                    color: var(--black-gray);
                                    font-family: 'Inter', sans-serif;
                                    font-size: 14px;
                                    font-weight: 400;
                                }
                            }

                            &-remove {
                                color: var(--black-gray);
                                font-size: 14px;
                                
                                span {
                                    gap: 4px;
                                    display: flex;
                                    cursor: pointer;
                                    align-items: center;
                                }
                            }
                        }

                        &-image__container {
                            width: 128px;
                            height: 170px;
                            overflow: hidden;
                        }

                        &-image {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transform: scale(1);
                            transition: all 0.2s;

                            &:hover {
                                transform: scale(1.1);
                            }
                        }
                    }
                }
            }
        }
    }
</style>