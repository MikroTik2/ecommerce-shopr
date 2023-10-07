<template>
    <div class="products">

        <h3 class="products-title">You’re browsing Dresses In Clothing</h3>

        <div class="products-elements">
            <div class="products-element" v-for="product in products" :key="product._id">
                
                <router-link class="products-element__image-container" :to="`/collections/product/${product._id}`">
                    <img class="products-element__image" :src="product.images[0]" :alt="product.slug">
                </router-link>

                <router-link to="/" class="products-element-text">
                    <span class="products-element-text__name"> {{ product.title }} </span>
                    <span class="products-element-text__price"> ${{ product.price }} </span>
                </router-link>
            </div>
        </div>

        <div class="products-btns">
            <router-link to="/collections" class="products-btn">See collections</router-link>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import api from '@/config/api.js';

    const products = ref([]);

    onMounted(async () => {
        products.value = await api.getAllProduct();
    })
</script>

<style lang="scss" scoped>
    .products {

        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 24px 16px;
        }

        &-title {
            text-align: center;
            font-size: 26px;
            margin-bottom: 50px;
        }

        &-btns {
            display: flex;
            margin-top: 55px;
            align-items: center;
            justify-content: center;
        }

        &-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--black);
            border: none;
            color: var(--white);
            width: 170px;
            height: 56px;
            border-radius: 6px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 18px;
            font-weight: 500;
            letter-spacing: -0.4px;
            cursor: pointer;
            transition: all 0.2s;
            transform: scale(1);

            &:hover {
                transform: scale(1.04);
            }
        }

        &-elements {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 56px 32px;

            @media screen and (max-width: 768px) {
                grid-template-columns: repeat(2, 1fr);
                gap: 32px 16px;
            }
        }

        &-element {

            display: grid;
            row-gap: 12px;

            &__image-container {
                overflow: hidden;
                width: 100%;
            }

            &__image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.3s;
                transform: scale(1);

                &:hover {
                    transform: scale(1.1);
                }
            }

            &-text {

                text-align: center;
                display: grid;
                gap: 5px;
                
                &__name {
                    font-size: 16px;
                }

                &__price {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                }
            }
        }
    }
</style>  