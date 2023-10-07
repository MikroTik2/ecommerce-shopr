<template>
    <div class="cart">
        <div class="cart-header">
            <h2 class="cart-header-title">Cart</h2>
            <span class="cart-header-enjoy">Shop for ${{ remainingAmount }} more to enjoy <span class="cart-header-free">FREE Shipping</span> </span>

            <div class="cart-header-range">
                <input class="cart-header-range__input" type="range" max="200" v-model="cartTotal">
            </div>
        </div>

        <div class="cart-element">
            <div class="cart-element-product">
                <div class="cart-element-product-top">
                    <div class="cart-element-product-left">
                        <span>Product</span>
                    </div>
                    <div class="cart-element-product-right">
                        <span>Quantity</span>
                        <span>Price</span>
                    </div>
                </div>

                <div class="cart-element-content" v-if="cartProductLength > 0">
                    <div class="cart-element-content-product" v-for="item in cartProduct.cart" :key="item._id">

                        <div class="cart-element-content-product-container">
                            <div class="cart-element-content-product-image__container">
                                <img class="cart-element-content-product__image" :src="item.images[0]" :alt="item.slug">
                            </div>

                            <div class="cart-element-content-product-text">
                                    <h4>{{ item.title }}</h4>

                                    <div class="cart-element-content-product-text-select">
                                        <span>Size: {{ item.sizechose }},</span>
                                        <span>Color: {{ item.colorchose }}</span>
                                    </div>

                                    <div class="cart-element-content-product-text-remove__content">
                                        <span class="cart-element-content-product-text-remove" @click="removeProduct(item._id)"><img src="/svg/trash.svg" alt="trash"> Remove</span>
                                    </div>

                            </div>

                            <div class="cart-element-content-product-text-mobile">
                                <div class="cart-element-content-product-text-mobile__left">
                                    <h4>{{ item.title }}</h4>

                                    <div class="cart-element-content-product-text-select">
                                        <span>Size: {{ item.sizechose }},</span>
                                        <span>Color: {{ item.colorchose }}</span>
                                    </div>

                                    <div class="cart-element-content-product-quantity">
                                        <div class="cart-element-content-product-quantity-symbol">
                                            <button class="cart-element-content-product-quantity-btn" @click="changeQuantity('minus', item)">-</button>
                                            <span class="cart-element-content-product-quantitity">{{ item.quantity }}</span>
                                            <button class="cart-element-content-product-quantity-btn" @click="changeQuantity('plus', item)">+</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="cart-element-content-product-text-mobile__right">
                                    <div>${{ item.price }}.00</div>

                                    <div class="cart-element-content-product-text-remove__content">
                                        <span class="cart-element-content-product-text-remove" :style="{ justifyContent: 'end' }" @click="removeProduct(item._id)">
                                            <img src="/svg/trash.svg" alt="trash">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cart-element-content-product-right">
                            <div class="cart-element-content-product-quantity">
                                <div class="cart-element-content-product-quantity-symbol">
                                    <button class="cart-element-content-product-quantity-btn" @click="changeQuantity('minus', item)">-</button>
                                    <span class="cart-element-content-product-quantitity">{{ item.quantity }}</span>
                                    <button class="cart-element-content-product-quantity-btn" @click="changeQuantity('plus', item)">+</button>
                                </div>
                            </div>

                            <div>${{ item.price }}.00</div>
                        </div>

                    </div>
                </div>

                <div class="cart-element-empty" v-else>
                    <span>Your cart is currently empty.</span>
                </div>
            </div>
        </div>

        <div class="cart-summary">
            <div class="cart-summary-content">
                <h4 class="cart-summary-title">Cart summary</h4>

                <div class="cart-summary-subtotal">
                    <span>Subtoal</span>
                    <span class="cart-summary-subtotal-price"> ${{ subtotal }}.00 </span>
                </div>

                <button class="cart-summary-btn">Checkout</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, computed } from 'vue';
    import api from '@/config/api';

    const cartProduct = ref({
        cart: [],
    });

    const cartProductLength = computed(() => {
        return cartProduct.value.cart.length;
    });

    const changeQuantity = (type, item) => {
        if (type === 'minus') {
            item.quantity === 1 ? (item.quantity = 1) : item.quantity--;
        };

        if (type === 'plus') {
            item.quantity === 15 ? (item.quantity = 15) : item.quantity++;
        };

        api.updateCartItemQuantity(item._id, item.quantity);
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

    const cartTotal = computed(() => {
        let total = 0;

        if (Array.isArray(cartProduct.value.cart)) {
            for (const item of cartProduct.value.cart) {
                total += item.price * item.quantity;
            };
        };

        return total;
    });

    const remainingAmount = computed(() => {
        return Math.max(0, 200 - cartTotal.value);
    })

    const removeProduct = (itemId) => {
        api.removeFromCartApi(itemId);
        cartProduct.value.cart = cartProduct.value.cart.filter(item => item._id !== itemId);
    };

    onMounted(async () => {
        cartProduct.value = await api.getCart();
        
        const rangeInput = document.querySelector('input[type="range"]');

        watch(cartTotal, (newTotal) => {
            if (rangeInput) {
                rangeInput.value = Math.min(200, newTotal);
            };
        });
    });
</script>

<style lang="scss" scoped>
    .cart {

        &-header {

            text-align: center;

            &-range {

                margin-top: 20px;

                &__input {
                    width: 500px;
                    height: 20px;
                    appearance: none;
                    outline: none;
                    border: none;
                    cursor: pointer;
                    position: relative;

                    @media screen and (max-width: 768px) {
                        margin: 0 16px;
                        width: 250px;
                    }

                    &::-webkit-slider-thumb {
                        appearance: none;
                        background: var(--white);
                        border: 1px solid var(--gray);
                        border-radius: 50%;
                        position: relative;
                        transform: translateY(-40%);
                        width: 45px;
                        height: 45px;
                        background-image: url('/svg/delivery-range.svg');
                        background-repeat: no-repeat;
                        background-size: 70%;
                        background-position: center;
                    }

                    &::-webkit-slider-runnable-track {
                        height: 7px;
                        background: var(--green-light);
                        position: absolute;
                        top: 50%;
                        border-radius: 5px;
                        left: 0;
                        right: 0;
                        transform: translateY(-50%);
                    }

                }
            }

            &-title {

                padding: 52px 0px;
                font-size: 54px;
                font-weight: 500;

                
                @media screen and (max-width: 768px) {
                    padding: 16px 32px;
                    font-size: 40px;
                }
            }

            &-enjoy {
                font-family: 'Inter', sans-serif;
                font-weight: 400;

                @media screen and (max-width: 768px) {
                    font-size: 16px;
                }
            }

            &-free {
                font-family: 'Inter', sans-serif;
                font-weight: 600;

                @media screen and (max-width: 768px) {
                    font-size: 16px;
                }
            }
        }

        &-element {
            padding: 50px;

            @media screen and (max-width: 768px) {
                padding: 16px;
            }

            &-empty {
                text-align: center;
                padding: 50px 0;
            }

            &-product {

                &-top {

                    display: grid;
                    padding-bottom: 20px;
                    grid-template-columns: repeat(2, 1fr);
                    border-bottom: 1px solid var(--gray);

                    @media screen and (max-width: 768px) {
                        padding-bottom: 12px;
                        grid-template-columns: repeat(1, 1fr);
                    }
                    
                }

                &-right {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    @media screen and (max-width: 768px) {
                        display: none;
                    }
                }
            }

            &-content {

                &-product {
                    padding: 24px 0;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    border-bottom: 1px solid var(--gray);

                    @media screen and (max-width: 768px) {
                        padding: 16px 0;
                        display: flex;
                    }

                    &-quantity {
                        font-family: 'Inter', sans-serif;
                        font-size: 12px;
                        font-weight: 600;
                    }

                    &-quantity {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        &-symbol {
                            border-radius: 4px;
                            border: 1px solid var(--black-300, #CBCBCB);
                            background: var(--White, #FFF);
                            display: flex;
                            align-items: center;
                            width: 80px;
                            height: 32px;
                            padding: 0 8px;
                            justify-content: space-between;
                        }

                        &-btn {
                            background: transparent;
                            border: none;
                        }
                    }

                    &-container {
                        display: flex;
                        width: 100%;
                        gap: 16px;
                    }

                    &-image__container {
                        width: 75px;
                        height: 100px;

                        @media screen and (max-width: 768px) {
                            height: 100%;
                        }
                    }

                    &-text {

                        display: flex;
                        flex-direction: column;
                        row-gap: 8px;

                        @media screen and (max-width: 768px) {
                            display: none;
                        }

                        &-select {
                            color: var(--black-gray);
                            display: flex;
                            gap: 8px;
                            font-family: 'Inter', sans-serif;
                            font-size: 12px;
                            font-weight: 400;
                        }

                        &-remove {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            cursor: pointer;
                            color: var(--black-gray);
                            font-family: 'Space Grotesk', sans-serif;
                            font-size: 14px;
                            font-weight: 500;
                        }
                    }

                    &-text-mobile {

                        display: none;
                        
                        @media screen and (max-width: 768px) {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                        }

                        &__right {
                            display: flex;
                            flex-direction: column;
                            row-gap: 8px;
                        }

                        &__left {
                            display: flex;
                            flex-direction: column;
                            row-gap: 8px;
                        }
                    }

                    &-right {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        @media screen and (max-width: 768px) {
                            display: none;
                        }
                    }
                }

            }
        }

        &-summary {
            padding: 50px;
            display: flex;
            justify-content: flex-end;

            @media screen and (max-width: 768px) {
                padding: 16px;
            }

            &-subtotal {
                padding: 13px 0 13px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid var(--gray);

                &-price {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                }
            }

            &-title {
                font-size: 22px;
                margin-bottom: 16px;
            }

            &-options {

                display: grid;
                row-gap: 12px;
                padding-bottom: 16px;

                &-field {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px;
                    border: 1px solid var(--gray);
                    border-radius: 6px;
                    cursor: pointer;
                }
            }

            &-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 52px;
                background: var(--black);
                color: var(--white);
                font-family: 'Space Grotesk', sans-serif;
                font-size: 18px;
                font-weight: 500;
                margin-top: 32px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }

            &-content {
                width: 535px;
                padding: 25px;
                border-radius: 6px;
                border: 1px solid var(--gray);
                background: var(--white);

                @media screen and (max-width: 768px) {
                    width: 100%;
                }
            }
        }
    }
</style>