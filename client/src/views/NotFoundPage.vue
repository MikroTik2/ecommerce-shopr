<template>
    <div class="page">
        <div class="page-container">
            <div class="page-top">
                <img src="/svg/not-found.svg" alt="not-found">
            </div>

            <div class="page-content">
                <div class="page-content-text">
                    <h2 class="page-content-text__title">404 – Page not found</h2>
                    <span class="page-content-text__description">The page you're looking for isn't available.Try to search again <br> or use the go back button below.</span>
                </div>
            </div>

            <div class="page-btns">
                <router-link to="/" class="page-btn">Go back home</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .page {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 228px 280px;

        @media screen and (max-width: 1024px) {
            padding: 120px 16px;
        }

        &-top {
            display: flex;
            justify-content: center;
        }

        &-container {
            display: grid;
            justify-content: center;
            row-gap: 32px;
        }

        &-btns {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &-btn {
            width: 170px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            border: none;
            color: var(--white);
            font-family: 'Space Grotesk', sans-serif;
            font-size: 18px;
            font-weight: 500;
            background: var(--black);
            cursor: pointer;
            transition: all 0.2s;
            transform: scale(1);

            &:hover {
                transform: scale(1.03);
            }
        }

        &-content {

            &-text {

                text-align: center;

                &__title {
                    font-size: 54px;

                    @media screen and (max-width: 768px) {
                        font-size: 34px;
                    }
                }

                &__description {
                    color: var(--text-blue);
                    margin-top: 16px;
                    display: block;
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 400;

                    @media screen and (max-width: 768px) {
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>