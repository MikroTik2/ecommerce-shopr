<template>
    <div class="tab" v-if="product">
        <div class="tab-content">
            <div class="tab-content-top">
                <span class="tab-content-top__link" @click="activateTab('Description')" :class="{ active: activeTab === 'Description' }">Description</span>
                <span class="tab-content-top__link" @click="activateTab('Additional-info')" :class="{ active: activeTab === 'Additional-info' }">Additional Info</span>
                <span class="tab-content-top__link" @click="activateTab('Reviews')" :class="{ active: activeTab === 'Reviews' }">Reviews</span>
            </div>

            <!-- PRODUCT DESCRIPTION -->
            <div class="tab-content-element" v-if="activeTab === 'Description'">
                <span>{{ product.description }}</span>
            </div>

            <!-- ADDITIONAL INFO -->
            <div class="tab-content-element" v-if="activeTab === 'Additional-info'">
                <div class="tab-content-element-container">
                    <div class="tab-content-element-items">
                        <span class="tab-content-element-item">SIZE</span>
                        <span class="tab-content-element-text">S, M, L, XL</span>
                    </div>

                    <div class="tab-content-element-items">
                        <span class="tab-content-element-item">COLOR</span>
                        <span class="tab-content-element-text">Red, Green, Red, Black</span>
                    </div>
                </div>
            </div>

            <!-- REVIEWS -->
            <div class="tab-content-element" v-if="activeTab === 'Reviews'">
                <div class="tab-content-element-flex">
                    <h2 class="tab-content-element-flex-title">Customer reviews</h2>
                    <button class="tab-content-element-flex-btn" @click="toggleReview">Write review</button>
                </div>

                <!-- ADD COMMENT AND RATING -->
                <form class="tab-content-element-form" @submit.prevent="submitReview" v-if="isVisible">
                    <textarea class="tab-content-element-message" placeholder="Write your review" v-model="newReview.comment"></textarea>

                    <label>Rate this product:</label>

                    <select class="tab-content-element-form-select" placeholder="Rating" v-model="newReview.star">
                        <option selected value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>

                    <button class="tab-content-element-form-btn" type="submit">Comment</button>
                </form>

                <!-- USER COMMENT -->
                <div class="tab-content-element-comment" v-for="rating in product.ratings">
                    <div class="tab-content-element-comment-top">
                        <div class="tab-content-element-comment-top-user">

                            <div class="tab-content-element-comment-top-user-avatar"></div>

                            <div class="tab-content-element-comment-top-user-content">
                                
                                <div class="tab-content-element-comment-top-user-info">

                                    <!-- USER COMMENT NAME -->
                                    <h3 class="tab-content-element-comment-top-user-info__name"> {{ rating.postedby.username }} </h3>

                                    <!-- USER COMMENT CREATED -->
                                    <span class="tab-content-element-comment-top-user-info__created"> {{ formData(rating.postedby.createdAt) }} </span>
                                </div>

                                <div>

                                    <!-- USER STAR RATING -->
                                    <img v-for="item in rating.star" src="/svg/star.svg" alt="star">
                                </div>
                            </div>
                        </div>

                        <span class="tab-content-element-comment-top-name"> {{ rating.comment }}  </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import api from '@/config/api';

    const route = useRoute();

    const product = ref(null);
    const productId = ref(null);

    const isVisible = ref(false);

    // CREATING A REACTIVE VARIABLE FOR A NEW RECALL
    const newReview = ref({
        star: 1,
        comment: '',
    });

    const activeTab = ref('Description');

    const activateTab = (tab) => {
        activeTab.value = tab;
    };

    const toggleReview = () => {
        isVisible.value = !isVisible.value;
    };

    // FUNCTION FOR FORMATTING THE DATE
    const formData = (createdAt) => {
        const dataObj = new Date(createdAt);
        const year = dataObj.getFullYear();
        const month = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dataObj.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    // FUNCTION FOR SUBMITTING FEEDBACK
    const submitReview = async () => {
        try {

            const response = await api.reviewRating(productId.value, newReview.value.star, newReview.value.comment);

            // RESETTING FORM FIELDS
            newReview.value.star = 1;
            newReview.value.comment = '';

        } catch (error) {
            console.log(error);
        };
    };

    onMounted(async () => {
        productId.value = route.params.productId;
        product.value = await api.getProductId(productId.value);
    });
    
</script>

<style lang="scss" scoped>
    .tab {
        padding: 50px;
        max-width: 1200px;
        margin: 0 auto;

        @media screen and (max-width: 924px) {
            padding: 16px;
        }
        &-content {
            
            &-element {
                margin-top: 32px;

                &-message {
                    width: 100%;
                    height: 150px;
                    margin-top: 30px;
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 5px;
                    resize: vertical; 
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 1.5; 
                }

                &-comment {

                    padding-bottom: 32px;
                    padding-top: 32px;
                    border-bottom: 1px solid var(--gray);

                    &-top {

                        display: grid;
                        row-gap: 12px;

                        &-name {
                            color: var(--text-blue);
                            font-family: 'Inter', sans-serif;
                            font-size: 18px;
                            font-weight: 400;
                        }

                        &-user {

                            display: flex;
                            gap: 16px;

                            &-avatar {
                                width: 76px;
                                height: 76px;
                                background: var(--gray);
                                border-radius: 50px;
                            }

                            &-info {
                                display: flex;
                                align-items: baseline;
                                gap: 12px;

                                &__name {
                                    font-family: 'Inter', sans-serif;
                                    font-weight: 600;
                                }

                                &__created {
                                    color: var(--light-gray-secondary);
                                    font-family: 'Inter', sans-serif;
                                    font-size: 16px;
                                    font-weight: 400;
                                }
                            }

                            &-content {
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                            }
                        }
                    }
                }

                &-form {
                    display: grid;
                    row-gap: 16px;
                    padding-bottom: 32px;
                    border-bottom: 1px solid var(--gray);

                    &-select {
                        width: 240px;
                        outline: none;
                        border-radius: 6px;
                        height: 45px;
                        font-size: 16px;
                        font-family: 'Inter', sans-serif;
                    }

                    &-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 140px;
                        height: 45px;
                        background: var(--black);
                        color: var(--white);
                        font-size: 18px;
                        font-family: 'Space Grotesk', sans-serif;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                    }
                }

                &-flex {

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 32px;
                    border-bottom: 1px solid var(--gray);

                    &-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 140px;
                        height: 45px;
                        border: 2px solid var(--black);
                        background: transparent;
                        cursor: pointer;
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 18px;
                        font-weight: 500;
                    }
                }

                &-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 34px;
                }

                &-container {
                    display: grid;
                    row-gap: 32px;
                }

                &-items {
                    display: flex;
                    align-items: center;
                    gap: 50px;
                }

                &-item {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                }

                &-text {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-weight: 400;
                }
            }

            &-top {
                display: flex;
                align-items: center;
                gap: 80px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--gray);
                
                @media screen and (max-width: 768px) {
                    display: grid;
                    gap: 24px;
                }

                &__link {
                    color: var(--light-gray-secondary);
                    font-size: 20px;
                    transition: all 0.2s;
                    cursor: pointer;

                    &:hover {
                        color: var(--black);
                    }

                    &.active {
                        color: var(--black);
                    }
                }
            }
        }
    }
</style> 