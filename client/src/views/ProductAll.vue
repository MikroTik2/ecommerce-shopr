<template>
    <div class="products">
        <div class="products-top">
            <div class="products-top-content">
                <div class="products-top-content-header">
                    <span class="products-top-content__link"><router-link class="product-top-content__link" to="/">Home </router-link> >  Shop</span>
                    <h2 class="products-top-content__title">Shop</h2>

                    <span class="products-top-content__description">At vero eos et accusamus et iusto odio dignissimos ducimus qui <br> blanditiis voluptatum deleniti.</span>
                </div>
            </div>
        </div> 

        <div class="products-content">
            <div class="products-content-filter" v-if="!isVisibleFilter">
                <div class="products-content-filter-top">
                    <div class="products-content-filter-header">
                        <h3 class="products-content-filter-header-title">Filter</h3>
                        <img src="/svg/close.svg" alt="close" @click="toggleFilter">
                    </div>

                    <div class="products-content-filter-items">

                        <div class="products-content-filter-element">
                            <h4 class="products-content-filter-element-title">CATEGORIES</h4>

                            <div class="products-content-filter-element-item">
                                <span class="products-content-filter-element__link" @click="selectCategory(null)" :class="{ 'active': selectedCategory === null }">All</span>
                                <span class="products-content-filter-element__link" @click="selectCategory('clothing')" :class="{ 'active': selectedCategory === 'clothing' }">Clothing</span>
                                <span class="products-content-filter-element__link" @click="selectCategory('dresses')" :class="{ 'active': selectedCategory === 'dresses' }">Dresses</span>
                            </div>
                        </div>

                        <div class="products-content-filter-element">
                            <h4 class="products-content-filter-element-title">COLOR</h4>

                            <div class="products-content-filter-element-grid">
                                <div class="products-content-filter-element-circle" @click="selectColor('green')" :class="{ 'products-content-filter-element-active': selectedColor === 'green' }"></div>
                                <div class="products-content-filter-element-circle" @click="selectColor('purple')" :class="{ 'products-content-filter-element-active': selectedColor === 'purple' }"></div>
                                <div class="products-content-filter-element-circle" @click="selectColor('red')" :class="{ 'products-content-filter-element-active': selectedColor === 'red' }"></div>
                                <div class="products-content-filter-element-circle" @click="selectColor('black')" :class="{ 'products-content-filter-element-active': selectedColor === 'black' }"></div>
                            </div> 
                        </div>

                        <div class="products-content-filter-element">
                            <h4 class="products-content-filter-element-title">SIZE</h4>

                            <div class="products-content-filter-element-grid">
                                <div class="products-content-filter-element-size" @click="selectSize('S')" :class="{ 'products-content-filter-element-size-active': selectedSize === 'S' }">S</div>
                                <div class="products-content-filter-element-size" @click="selectSize('M')" :class="{ 'products-content-filter-element-size-active': selectedSize === 'M' }">M</div> 
                                <div class="products-content-filter-element-size" @click="selectSize('L')" :class="{ 'products-content-filter-element-size-active': selectedSize === 'L' }">L</div>
                                <div class="products-content-filter-element-size" @click="selectSize('XL')" :class="{ 'products-content-filter-element-size-active': selectedSize === 'XL' }">XL</div>
                            </div> 
                        </div>

                        <div class="products-content-filter-element">
                            <h4 class="products-content-filter-element-title">PRICE</h4>

                            <div class="products-content-filter-element-grid">
                                <input
                                    type="range"
                                    class="products-content-filter-element-range-input"
                                    min="0"
                                    max="400"
                                    step="1"
                                    v-model="priceRange"
                                />
                            </div> 

                            <span class="products-content-filter-element-price"> ${{ priceRange }} - 400$</span>
                        </div>

                        <div class="products-content-filter-element">
                            <h4 class="products-content-filter-element-title">STYLE</h4>

                            <div class="products-content-filter-element-item">
                                <span class="products-content-filter-element__link" @click="selectStyle(null)" :class="{ 'active': selectedStyle === null }">All</span>
                                <span class="products-content-filter-element__link" @click="selectStyle('Modern')" :class="{ 'active': selectedStyle === 'Modern' }">Modern</span>
                                <span class="products-content-filter-element__link" @click="selectStyle('Bohemian')" :class="{ 'active': selectedStyle === 'Bohemian' }">Bohemian</span>
                                <span class="products-content-filter-element__link" @click="selectStyle('Vintage')" :class="{ 'active': selectedStyle === 'Vintage' }">Vintage</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="products-content-grid">
                <div class="products-content-grid-toolbar">
                    <span class="products-content-grid-toolbar-length" v-if="filteredProducts.length"> {{ filteredProducts.length }} products </span>
                    <span v-else>  Not found products </span>
 
                    <div class="products-content-grid-column">
                        <span class="products-content-grid-filters" @click="toggleFilter">Filter <img src="/svg/settings.svg" alt="setting"></span>
                    </div>
                </div>

                <div class="products-content-grid-elements">
                    <div class="products-content-grid-element" v-for="product in filteredProducts">

                        <router-link :to="`/collections/product/${product._id}`">
                            <img class="products-content-grid-element__image" :src="product.images[0]" :alt="product.slug">
                        </router-link>

                        <router-link :to="`/collections/product/${product._id}`" class="products-content-grid-element-text">

                            <div class="products-content-grid-element-text__star">
                                <img v-for="item in product.totalrating" src="/svg/star.svg" alt="star">
                            </div>

                            <span class="products-content-grid-element__name"> {{ product.title }} </span>
                            <span class="products-content-grid-element__price"> ${{ product.price }} </span>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import api from '@/config/api';

    const isVisibleFilter = ref(true);
    const priceRange = ref(1);

    const products = ref([]);
    const selectedCategory = ref(null);
    const selectedStyle = ref(null);
    const selectedColor = ref(null);
    const selectedSize = ref(null);

    const toggleFilter = () => {
        isVisibleFilter.value = !isVisibleFilter.value;
    };

    const selectCategory = (category) => {
        selectedCategory.value = category;
    };

    const selectStyle = (style) => {
        selectedStyle.value = style;
    };

    const selectColor = (color) => {
        selectedColor.value = color;
    };

    const selectSize = (size) => {
        selectedSize.value = size;
    };

    const filteredProducts = computed(() => {
        return products.value.filter((product) => {
            return (
                ( selectedCategory.value === null || product.category === selectedCategory.value ) &&
                ( selectedStyle.value === null || product.style === selectedStyle.value ) &&
                ( selectedColor.value === null || product.color.includes(selectedColor.value)) &&
                ( selectedSize.value === null|| product.size.includes(selectedSize.value)) &&
                
                product.price >= priceRange.value
            );
        });
    });

    onMounted(async () => {
        products.value = await api.getCollections();
    });
</script>

<style lang="scss" scoped>
    .products {

        &-top {
            padding: 50px;
            margin: 50px;
            height: 400px;
            display: flex;
            align-self: center;
            justify-content: center;
            background-size: cover;
            background-image: url('/img/shop-hero.jpg');

            @media screen and (max-width: 1024px) {
                margin: 16px;
                padding: 16px;
            }

            @media screen and (max-width: 768px) {
                height: 250px;
            }

            &-content {
                display: flex;
                align-items: center;
                justify-content: center;

                &-header {
                    text-align: center;
                }

                &__link {
                    color: var(--black-gray);
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                }

                &__title {
                    color: var(--black);
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 54px;
                    font-weight: 500;

                    @media screen and (max-width: 768px) {
                        font-size: 34px;
                    }
                }

                &__description {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 400;

                    @media screen and (max-width: 768px) {
                        font-size: 14px;
                    }
                }
            }
        }

        &-content {
            display: flex;
            gap: 32px;
            padding: 0 50px;

            @media screen and (max-width: 1024px) {
                padding: 0 16px;
            }

            &-filter {
                width: 30%;
                padding: 24px;

                @media screen and (max-width: 1024px) {
                    position: fixed;
                    width: 335px;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 70;
                    background: var(--white);
                }

                @media screen and (max-width: 512px) {
                    width: 100%;
                }

                &-top {

                }

                &-items {
                    display: grid;
                    row-gap: 40px;
                }

                &-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 30px;

                    &-title {
                        font-family: 'Inter', sans-serif;
                        font-size: 22px;
                        font-weight: 600;
                    }
                }

                &-element {

                    display: grid;
                    row-gap: 16px;

                    &-price {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                    }

                    &-range-input {
                        width: 100%;
                        height: 1px;
                        background: var(--light-gray-secondary);
                        border: none;
                        outline: none;
                        border-radius: 5px;
                        margin: 10px 0;
                        -webkit-appearance: none; 

                        &::-webkit-slider-runnable-track {
                            width: 100%;
                            height: 1px; 
                            cursor: pointer;
                            background: var(--light-gray-secondary);
                            border-radius: 2px; 
                        }

                        &::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            width: 16px;
                            height: 16px;
                            background: var(--black);
                            border-radius: 50%;
                            cursor: pointer;
                            transition: background 0.2s;
                            transform: translateY(-6px);
                        }

                        &:hover::-webkit-slider-thumb {
                            background: var(--text-blue);
                        }
                    }

                    &-range-label {
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        text-align: center;
                        margin-top: 8px;
                        color: var(--black);
                    }


                    &-circle {
                        width: 38px;
                        height: 38px;
                        border-radius: 100px;
                        background: var(--light-gray-secondary);
                        transition: all 0.2s;
                        border: 1px solid var(--gray);
                        cursor: pointer;

                        &:hover {
                            border: 1px solid var(--black);
                        }

                        &:nth-child(1) {
                            background-color: #20C997; 
                        }

                        &:nth-child(2) {
                            background-color: #AF83F8; 
                        }

                        &:nth-child(3) {
                            background-color: #E25563; 
                        }

                        &:nth-child(4) {
                            background-color: #121212; 
                        }
                    }

                    &-active {
                        border: 1px solid var(--black);
                    }

                    &-title {
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 600;
                    }

                    &-size {
                        height: 38px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        cursor: pointer;
                        font-weight: 400;
                        transition: all 0.2s;
                        border: 1px solid var(--gray);

                        &-active {
                            border: 1px solid var(--black);
                        }
                    }

                    &-grid {
                        display: flex;
                        gap: 12px;
                    }

                    &-item {
                        display: grid;
                        row-gap: 12px;
                    }

                    &__link {
                        color: var(--light-gray-secondary);
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;

                        &:hover {
                            color: var(--black);
                            text-decoration: underline;
                        }
                    }
                }
            }
            
            &-grid {

                width: 100%;
                padding: 18px 0;

                &-filters {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 16px;
                    cursor: pointer;
                }

                &-toolbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 32px;

                    &-length {
                        color: var(--black-gray);
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                    }
                }

                &-column {
                    display: flex;
                    align-items: center;
                    gap: 32px;

                }

                &-columns {
                    display: flex;
                    gap: 10px;
                    align-items: center;

                    &-block {
                        width: 46px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid var(--white-gray);
                        background: var(--white);
                        cursor: pointer;
                        transition: all 0.2s;
                        
                        &:hover {
                            border: 1px solid var(--black);
                            background: #f9f9f9;
                        }

                        
                        @media screen and (max-width: 924px) {
                            display: none;
                        }
                    }
                }

                &-elements {
                    display: grid;
                    gap: 56px 32px;
                    grid-template-columns: repeat(4, 1fr);

                    @media screen and (max-width: 1124px) {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    
                    @media screen and (max-width: 768px) {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 32px 16px;
                    }
                }

                &-element {
                    display: grid;
                    row-gap: 12px;

                    &__image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    &-text {
                        display: flex;
                        flex-direction: column;
                        row-gap: 4px;
                    }

                    &__star {
                        display: flex;
                        align-items: center;
                    }

                    &__name {
                        font-size: 16px;

                        @media screen and (max-width: 768px) {
                            font-size: 14px;
                        }
                    }

                    &__price {
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 600;

                        @media screen and (max-width: 768px) {
                            font-size: 12px;
                        }
                    }
                }

            }

        }
    }

    

</style>