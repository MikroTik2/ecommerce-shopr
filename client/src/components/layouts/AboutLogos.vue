<template>
    <div class="about-logos">

        <!-- CONTAINER FOR GROUPING BRAND LOGOS -->
        <div class="about-logos-container">

            <!-- THE V-FOR DIRECTIVE IS USED TO DISPLAY BRAND LOGOS -->
            <div class="about-logos-container__image" v-for="(element, index) of brands" :key="index">
                
                <!-- BRAND LOGO -->
                <img class="about-logos-container__brand" :src="element.img" :alt="element.alt">
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const brands = ref([
        { img: "/svg/brands/nike.svg", alt: "nike" },
        { img: "/svg/brands/hush.svg", alt: "hush" },
        { img: "/svg/brands/puma.svg", alt: "puma" },
        { img: "/svg/brands/shoei.svg", alt: "shoei" },
        { img: "/svg/brands/warc.svg", alt: "warc" },
        { img: "/svg/brands/supreme.svg", alt: "supreme" },
    ]);
</script>

<style lang="scss" scoped>
    .about-logos {
        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 32px 16px 0px 16px;
        }

        &-container {
            padding: 50px 0;
            border-top: 1px solid var(--gray);
            border-bottom: 1px solid var(--gray);
            display: flex;
            gap: 15px;
            align-items: center;
            justify-content: space-between;

            @media screen and (max-width: 1124px) {
                display: grid;
                justify-content: center;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px 20px;
            }

            @media screen and (max-width: 1024px) {
                padding: 0;
            }

            @media screen and (max-width: 924px) {
                border-top: none;
                grid-template-columns: repeat(2, 1fr);
            }

            &__image {
                display: flex;
                justify-content: center;
            }

            &__brand {
                transform: scale(1);
                transition: all 0.4s;


                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
</style>