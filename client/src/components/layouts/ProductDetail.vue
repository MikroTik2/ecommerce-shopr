<template>
    <div class="productus" v-if="product">

        <!-- PRODUCT LEFT WITH IMAGE PRODUCT -->
        <div class="productus-left">
            <img class="productus-left__image" :src="product.images[0]" :alt="product.slug">
        </div>

        <!-- PRODUCT RIGHT WITH CONTENT  -->
        <div class="productus-right">

            <!-- PRODUCT RIGHT - TITLE, PRICE, DESCRIPTION, NUM VIEWS -->
            <div class="productus-right-element" style="border-bottom: 1px solid #EAEAEA;">
                <div class="productus-right-element-top">

                    <!-- PRODUCT RIGHT LINK -->
                    <span class="productus-right-element__link"> 
                        <router-link to="/" class="product-right-element__link">Home > </router-link> 
                        <router-link to="/collections" class="product-right-element__link">Products </router-link> > {{ product.title }} 
                    </span>
                </div>

                <!-- PRODUCT TITLE, DESCRIPTION -->
                <div class="productus-right-element-text">
                    <h2 class="productus-right-element-text-title"> {{ product.title }} </h2>
                    <span class="productus-right-element-text-description"> {{ product.description }} </span>
                </div>

                <!-- PRODUCT PRICE -->
                <div class="productus-right-element-prices">
                    <span class="productus-right-element-price"> ${{ product.price }}.00 </span>
                </div>

                <!-- PRODUCT VIEW -->
                <div class="productus-right-element-view">
                    <img src="/svg/view.svg" alt="view">
                    <span>{{ product.numViews }} people are looking at this product</span>
                </div>
            </div>

            <!-- PRODUCT RIGHT SELECT COLOR -->
            <div class="productus-right-element">
                <h4 class="productus-right-element-color">Color: {{ selectedColor }}</h4>

                <div class="productus-right-element-select">
                    <div class="productus-right-element-circle" @click="toggleActive('green')" :style="{ 'border': selectedColor === 'green' ? '1px solid #121212' : '1px solid #CBCBCB' }"></div>
                    <div class="productus-right-element-circle" @click="toggleActive('purple')" :style="{ 'border': selectedColor === 'purple' ? '1px solid #121212' : '1px solid #CBCBCB' }"></div>
                    <div class="productus-right-element-circle" @click="toggleActive('red')" :style="{ 'border': selectedColor === 'red' ? '1px solid #121212' : '1px solid #CBCBCB' }"></div>
                    <div class="productus-right-element-circle" @click="toggleActive('black')" :style="{ 'border': selectedColor === 'black' ? '1px solid #121212' : '1px solid #CBCBCB' }"></div>
                </div> 
            </div>

            <!-- PRODUCT RIGHT SELECT SIZE -->
            <div class="productus-right-element">
                <h4 class="productus-right-element-color">Size: {{ selectedSize }}</h4>

                <div class="productus-right-element-select">
                    <div class="productus-right-element-size" @click="toggleActiveSize('S')" :style="{ 'border': selectedSize === 'S' ? '1px solid #121212' : '1px solid #CBCBCB' }">S</div>
                    <div class="productus-right-element-size" @click="toggleActiveSize('M')" :style="{ 'border': selectedSize === 'M' ? '1px solid #121212' : '1px solid #CBCBCB' }">M</div>
                    <div class="productus-right-element-size" @click="toggleActiveSize('L')" :style="{ 'border': selectedSize === 'L' ? '1px solid #121212' : '1px solid #CBCBCB' }">L</div>
                    <div class="productus-right-element-size" @click="toggleActiveSize('XL')" :style="{ 'border': selectedSize === 'XL' ? '1px solid #121212' : '1px solid #CBCBCB' }">XL</div>
                </div> 
            </div>

            <!-- PRODUCT RIGHT QUANTITY -->
            <div class="productus-right-element">
                <div class="productus-right-element-btn">
                    <div class="productus-right-element-symbol">

                        <button class="productus-right-element-symbol-btn" @click="changeQuantity('minus', product)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4.03687 10H15.7035" stroke="#121212" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>

                        <span class="productus-right-element-symbol-quantity"> {{ product.quantity }} </span>

                        <button class="productus-right-element-symbol-btn" @click="changeQuantity('plus', product)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4689 4.16699C10.4689 3.90811 10.259 3.69824 10.0001 3.69824C9.74124 3.69824 9.53137 3.90811 9.53137 4.16699V9.53158H4.16699C3.90811 9.53158 3.69824 9.74144 3.69824 10.0003C3.69824 10.2592 3.90811 10.4691 4.16699 10.4691H9.53137V15.8337C9.53137 16.0925 9.74124 16.3024 10.0001 16.3024C10.259 16.3024 10.4689 16.0925 10.4689 15.8337V10.4691H15.8337C16.0925 10.4691 16.3024 10.2592 16.3024 10.0003C16.3024 9.74144 16.0925 9.53158 15.8337 9.53158H10.4689V4.16699Z" fill="#121212"/>
                            </svg>
                        </button>
                    </div>

                    <button class="productus-right-element-addCart" @click="handleAddToCart">Add to Cart</button>
                </div>
            </div>

            <!-- PRODUCT RIGHT - WISHLIST, ASK-QUESTION, SHARE -->
            <div class="productus-right-element">
                <div class="productus-right-element-items">
                    <div class="productus-right-element-item" @click="handleAddToWishlist">
                        <img src="/svg/wishlist.svg" alt="wishlist">
                        <span>Wishlist</span>
                    </div>
                    <div class="productus-right-element-item" @click="toggleQuestion">
                        <img src="/svg/question.svg" alt="question">
                        <span>Ask question</span>
                    </div>
                    <div class="productus-right-element-item" @click="toggleLink">
                        <img src="/svg/share.svg" alt="share">
                        <span>Share</span>
                    </div>
                </div>
            </div>

            <!-- MODAL SHARE -->
            <div class="productus-right-element-modal" v-if="isVisibleLink">
                <div class="productus-right-element-modal-content">
                    <button class="productus-right-element-modal-content-close" @click="closeLink">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                
                    <div class="productus-right-element-modal-content-text">
                        <label class="productus-right-element-modal-content-text__link">Copy link</label>
                        <input @click="copyLink" class="productus-right-element-modal-content-text__input" :value="`http://localhost:5173${route.path}`" />
                    </div>

                    <div class="productus-right-element-modal-content-link">
                        <label class="productus-right-element-modal-content-text__link">Share: </label>
                        
                        <div class="productus-right-element-modal-content-link-flex">
                            <img class="productus-right-element-modal-content-link-flex__icon" src="/svg/facebook.svg" alt="facebook">
                            <img class="productus-right-element-modal-content-link-flex__icon" src="/svg/pinterest.svg" alt="facebook">
                            <img class="productus-right-element-modal-content-link-flex__icon" src="/svg/twitter.svg" alt="facebook">
                        </div>
                    </div>
                </div>
            </div>

            <div :class="{ 'productus-right-element-show': isVisibleLink }" class="productus-right-element-sidebar-overlay" @click="closeLink"></div>

            <!-- MODAL ASK-QUESTION -->
            <div class="productus-right-element-question" v-if="isVisibleQuestion">
                <div class="productus-right-element-question-content">
                    <button class="productus-right-element-question-content-close" @click="toggleQuestion">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                
                    <div class="productus-right-element-question-content-text">
                        <h3>Ask a Question</h3>
                    </div>

                    <form class="productus-right-element-question-content-form" @submit.prevent="handleSubmit">
                        <input required v-model.trim="formData.firstname" class="productus-right-element-question-content-form__input" placeholder="Your Name*" type="text">
                        <input required v-model.trim="formData.numberPhone" class="productus-right-element-question-content-form__input" placeholder="Your Phone Numbe" type="text">
                        <input required v-model.trim="formData.emailaddress" class="productus-right-element-question-content-form__input" placeholder="Your Email*" type="email">
                        
                        <textarea required v-model.trim="formData.message" class="productus-right-element-question-content-form__message" placeholder="Your Message"></textarea>

                        <span class="productus-right-element-question-content-form__required">* Required fields</span>

                        <button class="productus-right-element-question-content-form__submit" type="submit">Submit now</button>
                    </form>
                </div>
            </div>

            <div :class="{ 'productus-right-element-show': isVisibleQuestion }" class="productus-right-element-sidebar-overlay" @click="closeQuestion"></div>

        </div>
    </div>

    <div v-else>Loading</div>
</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import api from '@/config/api.js';

    const route = useRoute();

    const selectedColor = ref(null);
    const selectedSize = ref(null);
    const productId = ref(null);
    const product = ref(null);

    const isVisibleLink = ref(false);
    const isVisibleQuestion = ref(false);

    const formData = ref({
        firstname: "",
        numberPhone: "",
        emailaddress: "",
        message: "",
    });

    const toggleQuestion = () => {
        isVisibleQuestion.value = !isVisibleQuestion.value;

        if (isVisibleQuestion.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };

    const closeQuestion = () => {
        isVisibleQuestion.value = false;
        document.body.style = '';
    };

    const toggleLink = () => {
        isVisibleLink.value = !isVisibleLink.value;

        if (isVisibleLink.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };

    const closeLink = () => {
        isVisibleLink.value = false;
        document.body.style.overflow = '';
    }

    const copyLink = async () => {
        const inputElement = document.querySelector(".productus-right-element-modal-content-text__input");
        
        if (inputElement) {
            try {
                
                inputElement.select();

                await navigator.clipboard.writeText(inputElement.value);

                inputElement.setSelectionRange(0, 0);
                alert("Link copied to clipboard");

            } catch (error) {
                console.log("Error: ", error);
            };
        };
    };

    const toggleActive = (colorchose) => {
        selectedColor.value = colorchose;
    };

    const toggleActiveSize = (sizechose) => {
        selectedSize.value = sizechose;
    };

    const handleAddToCart = async () => {
        try {

            await api.selectColorAndSize(productId.value, selectedColor.value, selectedSize.value)

            const response = await api.addToCart(productId.value);
            
            window.location.reload();

        } catch (error) {
            console.log(error);
        };
    };

    const handleAddToWishlist = async () => {
        try {

            await api.selectColorAndSize(productId.value, selectedColor.value, selectedSize.value);

            const response = await api.addToWishlist(productId.value);
        

        } catch (error) {
            console.log(error);
        };
    };

    const handleSubmit = async () => {
        try {

            const formDataToQuestion = {
                firstname: formData.value.firstname,
                numberPhone: formData.value.numberPhone,
                emailaddress: formData.value.emailaddress,
                message: formData.value.message,
            };
            
            window.location.reload();
            const response = await api.userQuestion(formDataToQuestion);

        } catch (error) {
            console.log(error);
        };
    };

    const changeQuantity = (type, product) => {
        if (type === 'minus') {
            product.quantity === 1 ? (product.quantity = 1) : product.quantity--;
        };

        if (type === 'plus') {
            product.quantity === 15 ? (product.quantity = 15) : product.quantity++;
        };

        api.updateCartItemQuantity(productId.value, product.quantity);
    };

    onMounted(async () => {
        productId.value = route.params.productId;
        product.value = await api.getProductId(productId.value);

        const overflow = document.querySelector('.productus-right-element-sidebar-overlay');
        if (overflow) {
            overflow.addEventListener('click', closeLink);
        };
    });

</script>

<style lang="scss" scoped>
    .productus {

        padding: 50px;
        display: grid;
        gap: 82px;
        grid-template-columns: repeat(2, 1fr);

        @media screen and (max-width: 1024px) {
            grid-template-columns: repeat(1, 1fr);
            gap: 0px;
        }

        @media screen and (max-width: 924px) {
            padding: 16px;
        }

        &-left {

            max-width: 100%;
            height: 760px;

            @media screen and (max-width: 1024px) {
                height: 100%;
            }

            &__image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &-right {

            &-element {

                padding: 24px 0;

                &-sidebar-overlay {
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

                &-sidebar-overlay &-show {
                    display: block;
                }

                &-show {
                    display: block;
                }

                &-modal {
                    position: fixed;
                    top: 50%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                    width: 380px;
                    height: 205px;
                    z-index: 100;

                    @media screen and (max-width: 768px) {
                        width: 90%;
                        margin-left: 0;
                        margin-right: 0;
                    }

                    &-content {
                        background: var(--white);
                        height: 100%;
                        border-radius: 6px;
                        padding: 30px 15px;

                        &-text {
                            display: grid;
                            row-gap: 20px;

                            &__link {
                                font-size: 16px;
                                font-weight: 600;
                            }

                            &__input {
                                border-radius: 4px;
                                background: var(--color-field-background);
                                border: 0.5px solid var(--gray);
                                outline: var(--black);
                                color: var(--text-blue);
                                cursor: pointer;
                                height: 46px;
                                width: 100%;
                                font-size: 16px;
                                font-weight: 500;
                                font-family: 'Inter', sans-serif;
                                padding: 15px;
                            }
                        }

                        &-link {
                            margin-top: 16px;

                            &-flex {
                                display: flex;
                                align-items: center;
                                gap: 16px;
                                margin-top: 16px;

                                &__icon {
                                    width: 18px;
                                    height: 18px;
                                    cursor: pointer;
                                }
                            }
                        }

                        &-close {
                            position: absolute;
                            padding: 15px;
                            top: 0;
                            right: 0;
                            cursor: pointer;
                            background: transparent;
                            border: none;
                        }
                    }
                }

                &-question {
                    position: fixed;
                    top: 50%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                    width: 500px;
                    height: 558px;
                    z-index: 100;

                    @media screen and (max-width: 768px) {
                        width: 90%;
                        height: fit-content;
                        margin-left: 0;
                        margin-right: 0;
                    }

                    &-content {
                        background: var(--white);
                        height: 100%;
                        border-radius: 6px;
                        padding: 30px 16px;

                        &-form {
                            display: grid;
                            row-gap: 16px;
                            margin-top: 20px;

                            &__input {
                                width: 100%;
                                height: 46px;
                                padding: 0 16px;
                                border-radius: 6px;
                                font-size: 16px;
                                font-weight: 500;
                                outline: none;
                                font-family: 'Space Grotesk', sans-serif;
                                border: 1px solid var(--gray);
                                background: var(--gray-secondary-two);
                                color: var(--gray);
                                transition: all 0.4s;

                                &:focus {
                                    border: 1px solid var(--black);
                                    color: var(--black);
                                }
                            }

                            &__message {
                                width: 100%;
                                height: 150px;
                                outline: none;
                                padding: 10px 16px; 
                                border: 1px solid var(--gray); 
                                border-radius: 5px;
                                resize: vertical; 
                                font-family: 'Space Grotesk', sans-serif;
                                font-size: 16px;
                                font-weight: 500;
                                line-height: 1.5; 
                                transition: all 0.4s;
                                color: var(--gray);

                                &:focus {
                                    border: 1px solid var(--black);
                                    color: var(--black);
                                }
                            }

                            &__required {
                                font-size: 14px;
                            }

                            &__submit {

                                background: var(--black);
                                color: var(--white);
                                font-size: 16px;
                                height: 46px;
                                width: 100%;
                                border-radius: 6px;
                                border: none;
                                font-family: 'Space Grotesk', sans-serif;
                                cursor: pointer;

                            }
                        }

                        &-text {
                            display: grid;
                            row-gap: 20px;

                            h3 {
                                text-align: center;
                                font-size: 36px;

                                @media screen and (max-width: 768px) {
                                    font-size: 28px;
                                }
                            }

                            &__link {
                                font-style: 16px;
                                font-weight: 600;
                            }

                            &__input {
                                border-radius: 4px;
                                background: var(--color-field-background);
                                border: 0.5px solid var(--gray);
                                color: var(--text-blue);
                                outline: #121212;
                                height: 46px;
                                width: 100%;
                                font-size: 16px;
                                font-weight: 500;
                                font-family: 'Inter', sans-serif;
                                padding: 15px;
                            }
                        }

                        &-link {
                            margin-top: 16px;

                            &-flex {
                                display: flex;
                                align-items: center;
                                gap: 16px;
                                margin-top: 16px;

                                &__icon {
                                    width: 18px;
                                    height: 18px;
                                    cursor: pointer;
                                }
                            }
                        }

                        &-close {
                            position: absolute;
                            padding: 15px;
                            top: 0;
                            right: 0;
                            cursor: pointer;
                            background: transparent;
                            border: none;
                        }
                    }
                }

                &-items {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    border-bottom: 1px solid var(--gray);
                    padding-bottom: 12px;

                    @media screen and (max-width: 768px) {
                        display: grid;
                        gap: 16px;
                    }
                }

                &-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline
                    }
                }

                &-btn {
                    display: grid;
                    row-gap: 16px;
                }

                &-symbol {
                    width: 100%;
                    padding: 12px 16px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--gray-secondary);
                    color: var(--black);

                    &-btn {
                        border: none;
                        cursor: pointer;
                        color: var(--black);
                        background: transparent;
                    }

                    &-quantity {
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 600;
                    }
                    
                }

                &-addCart {
                    width: 100%;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--black);
                    color: var(--white);
                    border: none;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    cursor: pointer;
                }

                &-active {
                    background: var(--black);
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
                }

                &-view {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    span {
                        font-size: 16px;
                    }
                }

                &-top {
                    margin-bottom: 8px;
                    display: block;
                }

                &__link {
                    color: var(--black-gray);
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                }

                &-prices {
                    margin: 16px 0 16px 0;
                }

                &-price {
                    font-family: 'Inter', sans-serif;
                    font-size: 26px;
                    font-weight: 600;

                    @media screen and (max-width: 768px) {
                        font-size: 22px;
                    }
                }

                &-text {
                    display: grid;
                    row-gap: 12px;

                    &-title {
                        font-size: 34px;

                        @media screen and (max-width: 768px) {
                            font-size: 26px;
                        }
                    }

                    &-description {
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                    }
                }

                &-select {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 12px;
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
            }
        }
    }
</style>

