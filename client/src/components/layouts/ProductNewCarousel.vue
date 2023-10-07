<template>
    <div class="product">
        <h3 class="product-title">Latest Arrivals</h3>

        <div class="product-content">
            <div class="product-elements">
                <div class="product-element" v-for="product in products" :key="product._id">
                    
                    <a class="product-element__image-container" :href="`/collections/product/${product._id}`">
                        <img class="product-element__image" :src="product.images[0]" :alt="product.slug">
                    </a>

                    <a :href="`/collections/product/${product._id}`" class="product-element-text">
                        <span class="product-element-text__name"> {{ product.title }} </span>

                        <span class="product-element-text__price"> ${{ product.price }} </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import api from '@/config/api.js';

    const products = ref([]);

    onMounted(async () => {
        products.value = await api.getAllProductCarousel();
    });

</script>

<style lang="scss"> 
    .product {
        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 24px 16px;
        }

        &-title {
            margin-bottom: 32px;
            font-size: 34px;

            @media screen and (max-width: 924px) {
                font-size: 26px;
                margin-bottom: 16px;
            }
        }

        &-content {

        }

        &-elements {
            grid-template-columns: repeat(4, 1fr);
            display: grid;
            gap: 32px;

            @media screen and (max-width: 768px) {
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
            }
        }

        &-element {
            display: grid;
            row-gap: 12px;

            &__image-container {
                width: 100%;

                @media screen and (max-width: 768px) {
                    overflow: hidden;
                }
            }

            &__image {
                height: 100%;
                width: 100%;
                object-fit: cover;
                transition: all 0.2s; 
                transform: scale(1);

                &:hover {
                    transform: scale(1.04);
                }
            }

            &-text {
                display: grid;
                row-gap: 5px;

                &__name {
                    font-size: 16px;
                    letter-spacing: -0.4px;
                }
                
                &__price {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                }

                &__discount {
                    margin-left: 12px;
                    color: var(--light-gray);
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    text-decoration: line-through;
                }
            }

        }
    }
</style>
