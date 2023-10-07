<template>
    <div class="hero">

        <!-- HERO LEFT WITH IMAGE -->
        <div class="hero-left">
            <img class="hero-left-image" src="/img/hero.jpg" alt="hero">
        </div>

        <!-- HERO LEFT WITH CONTENT -->
        <div class="hero-right">
            <div class="hero-right-content">
                
                <div class="hero-right-content-text">
                    <span class="hero-right-content-text-arrivals">New Arrivals</span>

                    <h2 class="hero-right-content-text__title">Your dream shop is a click away.</h2>

                    <span class="hero-right-content-text__description">Keep your everyday style chic and on-trend with our selection 20+ styles to choose from.</span>
                </div>

                <router-link to="/collections" class="hero-right-content-btn">See Collection</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .hero {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        @media screen and (max-width: 924px) {
            grid-template-columns: repeat(1, 1fr);
        }

        &-left {
            
            &-image {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &-right {
            background: var(--pink-700);
            color: var(--white);
            display: flex;
            align-items: center;
            padding: 0 80px;

            @media screen and (max-width: 924px) {
                background: var(--red-light);
                padding: 24px 16px;
            }

            &-content {

                row-gap: 30px;
                display: grid;

                &-text {
                    
                    display: grid;
                    max-width: 455px;
                    row-gap: 8px;

                    &-arrivals {
                        font-family: 'Inter', sans-serif;
                        font-size: 1rem;
                        font-weight: 600;

                        @media screen and (max-width: 924px) {
                            font-size: 14px;
                        }
                    }

                    &__title {
                        font-size: 54px;
                        font-weight: 500;
                        letter-spacing: -1px;
                        line-height: 1.2;

                        @media screen and (max-width: 924px) {
                            font-size: 34px;
                        }
                    }

                    &__description {
                        font-size: 18px;
                        font-weight: 400;

                        @media screen and (max-width: 924px) {
                            font-size: 16px;
                        }
                    }
                }

                &-btn {
                    width: 180px;
                    height: 45px;
                    font-size: 16px;
                    font-weight: 500;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    background: var(--white);
                    font-family: 'Space Grotesk', sans-serif;
                    transition: all 0.2s;
                    transform: scale(1);

                    &:hover {
                        transform: scale(1.02);
                    }
                }
            }
        }
    }
</style>