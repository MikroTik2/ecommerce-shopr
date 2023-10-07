<template>
    <div class="search" :style="{ transform: isVisibleSearch ? 'translateY(0)' : 'translateY(-100%)' }">
        <div class="search-top">
            <router-link to="/">
                <img src="/svg/branding.svg" alt="logo">
            </router-link>

            <img @click="closeSearch" class="search-top-close" src="/svg/close.svg" alt="close">
        </div>

        <div class="search-bottom">
            <form class="search-bottom-content">
                <input v-model.trim="searchText" class="search-bottom__input" type="text" max="50" placeholder="Search products">
                <img class="search-bottom-search" src="/svg/search.svg" alt="search">
            </form>

            <span v-if="!filteredProducts.length > 0">No result for: "{{ searchText }}"</span>
            <span v-if="filteredProducts.length > 0">Results for: "{{ searchText }}"</span>
        </div>

        <div class="search-product" v-if="searchText.trim() !== ''"> 
            <div class="search-elements">
                <div class="search-element" v-for="product in filteredProducts">
                    <a class="search-element-container__image" :href="`/collections/product/${product._id}`">
                        <img class="search-element-image" :src="product.images[0]" :alt="product.slug">
                    </a>

                    <a :href="`/collections/product/${product._id}`" class="search-element-text">
                        <span class="search-element-text__name">{{ product.title }}</span>
                        <span class="search-element-text__price">${{ product.price }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed, ref } from 'vue';
    import api from '@/config/api';

    const products = ref([]);
    const searchText = ref("");

    const emit = defineEmits();

    const props = defineProps({
        isVisibleSearch: Boolean,
    });
    
    const filteredProducts = computed(() => {
        return products.value.filter(product => {
            return product.title.toLowerCase().includes(searchText.value.toLowerCase());
        });
    });

    const closeSearch = () => {
        emit("close-search");
    };

    onMounted(async () => {
        products.value = await api.getSearchLimit();
    });

</script>

<style lang="scss" scoped>
    .search {
        position: fixed;
        background: var(--white);
        z-index: 20;
        top: 0;
        left: 0;
        right: 0;
        padding: 0 52px 78px;
        max-height: 100%;
        overflow-y: auto;
        transition: 0.5s all;

        @media screen and (max-width: 924px) {
            padding: 0 16px 78px;
        }

        &-top {
            max-width: 1440px;
            margin: 0 auto;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-close {
                cursor: pointer;
            }
        }

        &-bottom {
            max-width: 650px;
            margin: auto;
            height: 140px;
            text-align: center;
            display: grid;
            align-items: center;

            &-content {
                width: 100%;
                position: relative;
            }

            &__input {
                border-radius: 6px;
                outline: none;
                padding: 0 16px;
                width: 100%;
                height: 52px;
                border: 1px solid var(--black);
                background: var(--white);
                color: var(--light-gray);
                font-family: 'Inter', sans-serif;
                font-size: 16px;
            }

            &-search {
                position: absolute;
                cursor: pointer;
                z-index: 100;
                top: 16px;
                right: 16px;
            }
        }

        &-elements {
            padding: 16px 0;
            max-width: 1440px;
            margin: auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 56px 32px;

            @media screen and (max-width: 924px) {
                grid-template-columns: repeat(3, 1fr);
            }

            @media screen and (max-width: 768px) {
                grid-template-columns: repeat(2, 1fr);
                gap: 56px 16px;
            }
        }

        &-element {
        
            height: 100%;
            width: 100%;

            &-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            &-text {
                display: grid;
                row-gap: 4px;

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