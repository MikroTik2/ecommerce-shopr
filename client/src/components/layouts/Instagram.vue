<template>
    <div class="instagram">
        <div class="instagram-top">
            <h3>On Instagram</h3>
            <span>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</span>
        </div>
        <div class="instagram-bottom">
            <div class="instagram-bottom-items">
                <div class="instagram-bottom-item" v-for="(element, index) in card" :key="index">
                    <img :src="element.img" alt="photo">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const card = ref([
        { img: "/img/instagram/instagram-1.jpg" },
        { img: "/img/instagram/instagram-2.png" },
        { img: "/img/instagram/instagram-3.png" },
        { img: "/img/instagram/instagram-4.png" },
    ])
</script>

<style lang="scss" scoped>
    .instagram {
        padding: 50px;
        display: grid;
        row-gap: 32px;

        @media screen and (max-width: 924px) {
            padding: 16px;
        }

        @media screen and (max-width: 768px) {
            row-gap: 16px;
        }

        &-top {

            display: grid;
            text-align: center;
            row-gap: 16px;

            h3 {
                font-size: 40px;

                @media screen and (max-width: 768px) {
                    font-size: 20px;
                }
            }

            span {
                color: var(--text-blue);
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-weight: 400;
                
                @media screen and (max-width: 768px) {
                    display: none;
                }
            }
        }

        &-bottom {
            
            
            &-items {
                display: grid;
                gap: 32px;
                grid-template-columns: repeat(4, 1fr);

                @media screen and (max-width: 924px) {
                    grid-template-columns: repeat(2, 1fr);
                }

                @media screen and (max-width: 768px) {
                    grid-template-columns: repeat(1, 1fr);
                }
            }

            &-item {

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
</style>
