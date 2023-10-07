<template>
    <div class="icon-box">
        <div class="icon-box-content">
            <div class="icon-box-card" v-for="(element, i) of cards" :key="i">
                
                <div class="icon-box-card__images">
                    <img :src="element.img" :alt="element.name">
                </div>

                <div class="icon-box-card-bottom">
                    <span class="icon-box-card-bottom__title"> {{ element.name }} </span>
                    <span class="icon-box-card-bottom__description"> {{ element.description }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const cards = ref([
        { name: "Free Shipping", description: "Orders above $200", img: "/svg/delivery.svg" },
        { name: "Money-back", description: "30 day Guarantee ", img: "/svg/money.svg" },
        { name: "Premium Support", description: "Phone and email support", img: "/svg/iphone.svg" },
        { name: "Secure Payments", description: "Secured by Stripe", img: "/svg/secure.svg" },
    ]);
</script>

<style lang="scss" scoped>
    .icon-box {
        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 32px 16px;
        }

        &-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media screen and (max-width: 768px) {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 30px;
            }

            @media screen and (max-width: 324px) {
                grid-template-columns: repeat(1, 1fr);
            }
        }

        &-card {
            display: flex;
            gap: 12px;

            @media screen and (max-width: 924px) {
                display: grid;
                justify-content: center;
                row-gap: 8px;
            }

            &__images {
                display: flex;
                justify-content: center;
            }

            &-bottom {
                display: grid;
                
                @media screen and (max-width: 924px) {
                    text-align: center;
                }

                &__title {
                    font-size: 18px;
                    line-height: 32px;

                    @media screen and (max-width: 768px) {
                        font-size: 16px;
                    }
                }

                &__description {
                    color: var(--light-gray-secondary);
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 400;

                    @media screen and (max-width: 768px) {
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>