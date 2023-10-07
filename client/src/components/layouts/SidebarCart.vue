<template>
    <div class="cart" :style="{ transform: isVisibleCart ? 'translate(0px)' : 'translate(100%)' }">
        <div class="cart-content">
            <div class="cart-top">
                <h3 class="cart-top-title">Cart</h3>
                <img @click="closeCart" class="cart-top-icon" src="/svg/close.svg" alt="close">
            </div>

            <div class="cart-product" v-if="emptyCart > 0">
                <div class="cart-product-element" v-for="item in cartProduct.cart" :key="item._id">
                    <div class="cart-product-left">
                        <img class="cart-product-left__image" :src="item.images[0]" :alt="item.slug">
                    </div>
                    <div class="cart-product-right">
                        <h4 class="cart-product-right-title"> {{ item.title }} </h4>
                        
                        <div class="cart-product-right-text">
                            <span>Size: {{ item.sizechose }}</span>
                            <span>Color: {{ item.colorchose }}</span>
                        </div>

                        <div  class="cart-product-right-bottom">
                            <div class="cart-product-right-bottom-quantity">
                                <span class="cart-">Quantity: ({{ item.quantity }})</span>
                            </div>

                            <div class="cart-product-right-bottom-clear">
                                <span class="cart-product-right-bottom-price">${{ item.price }}.00</span>
                                <img @click="removeProduct(item._id)" src="/svg/trash.svg" alt="trash">
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="cart-empty" v-else>
                <span>Your cart is currently empty.</span>
            </div>

        </div>

        <div class="cart-bottom">
            <div class="cart-bottom-content">
                <div class="cart-bottom-content-element" style="border-bottom: 1px solid #EAEAEA">
                    <span class="cart-bottom-content-element__subtotal">Subtotal</span>
                    <span class="cart-bottom-content-element__price"> ${{ subtotal }}.00 </span>
                </div>

                <div class="cart-bottom-content-element">
                    <button class="cart-bottom-content-element-btn">Checkout</button>
                </div>
            </div>

            <a href="/cart" class="cart-bottom-view">View cart</a>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import api from "@/config/api";

    const cartProduct = ref({
        cart: [],
    });

    const props = defineProps({
        isVisibleCart: Boolean,
    });

    const emit = defineEmits();

    const closeCart = () => {
        emit("close-cart");
    };

    const removeProduct = (itemId) => {
        api.removeFromCartApi(itemId);
        cartProduct.value.cart = cartProduct.value.cart.filter(item => item._id !== itemId);
    };

    const subtotal = computed(() => {
        let total = 0;

        if (Array.isArray(cartProduct.value.cart)) {
            for (const item of cartProduct.value.cart) {
                total += item.price;
            };
        };

        return total;
    });

    const emptyCart = computed(() => {
        return cartProduct.value.cart.length;
    });

    onMounted(async () => {
        try {
            const data = await api.getCart();

            cartProduct.value.cart = data.cart; 
            console.log(data.cart);

        } catch (error) {
            console.log("Error:", error);
        };
    });

</script>

<style lang="scss" scoped>
    .cart {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        width: 460px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 70;
        transition: all 0.5s;
        background: var(--white);

        @media screen and (max-width: 520px) {
            width: 100%;
        }

        &-content {
            padding: 25px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &-empty {

            padding-top: 16px;

            &-text {
                font-size: 16px;
            }
        }

        &-top {

            display: flex;
            align-items: center;
            justify-content: space-between;

            &-title {
                font-size: 34px;
            }

            &-icon {
                cursor: pointer;
            } 
        }

        &-product {

            &-element {
                padding: 16px 0 16px 0;
                display: flex;
                gap: 16px;
            }

            &-left {

                width: 120px;
                height: 100px;

                &__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &-right {
                display: flex;
                flex-direction: column;
                row-gap: 8px;
                width: 100%;

                &-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    &-clear {
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        img {
                            cursor: pointer;
                        }
                    }

                    &-price {
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 600;
                    }
                }

                &-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                }

                &-text {
                    color: var(--black-gray);
                    display: flex;
                    gap: 8px;
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                }
            }
        }

        &-bottom {
            padding: 25px;
            display: grid;
            row-gap: 16px;

            &-view {
                text-align: center;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }

            &-content {
                border-radius: 6px;
                padding: 16px;
                border: 1px solid var(--gray);

                &-element {

                    padding: 13px 0px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    &__subtotal {
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                    }

                    &__price {
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 600;
                    }

                    &-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 6px;
                        border: none;
                        color: var(--white);
                        background: var(--black);
                        width: 100%;
                        height: 52px;
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 18px;
                        font-weight: 500;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>