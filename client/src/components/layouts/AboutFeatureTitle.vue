<template>

    <!-- CONTAINER FOR THE ENTIRE SECTION FEATURES -->
    <div class="about-featureTitle">

        <!-- INTERNAL CONTAINER FOR DIVIDING INTO LEFT AND RIGHT PARTS -->
        <div class="about-featureTitle-content">  
            
            <!-- LEFT SIDE OF SECTION -->
            <div class="about-featureTitle-content-left">
                <div class="about-featureTitle-content-left-container">
                    <div class="about-featureTitle-content-left-top">
                        <h3>Feature Title</h3>
                        <span>Phosfluor escently engage worldwide with web-enabled process-centric technology.</span>
                    </div>
                    <div class="about-featureTitle-content-left-bottom">
                        <router-link class="about-featureTitle-content-left-bottom__link" to="/collections"> See collection <img src="/svg/arrow-right.svg" alt="arrow"> </router-link>
                    </div>
                </div>
            </div>

            <!-- RIGHT SIDE OF SECTION WITH IMAGE -->
            <div class="about-featureTitle-content-right">
                <img class="about-featureTitle-content-right__image" src="/img/feature-title.jpg" alt="feature-title">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .about-featureTitle {
        padding: 50px; 

        @media screen and (max-width: 924px) {
            padding: 16px;
        }

        &-content {

            display: flex;

            @media screen and (max-width: 1124px) {
                display: grid;
            }

            &-left {

                background: var(--black-gray-secondary);
                display: grid;
                row-gap: 24px;
                padding: 50px;
                width: 43%;

                @media screen and (max-width: 1124px) {
                    width: 100%;
                }

                @media screen and (max-width: 924px) {
                    padding: 16px 16px 40px 16px;
                }

                &-container {
                    display: flex;
                    align-self: center;
                    flex-direction: column;
                    gap: 24px;
                }

                &-top {
                    display: grid;
                    row-gap: 12px;

                    h3 {
                        font-size: 40px;
                        letter-spacing: -0.4px;

                        @media screen and (max-width: 768px) {
                            font-size: 28px;
                        }
                    }

                    span {
                        font-family: 'Inter', sans-serif;
                        font-weight: 400;
                    }
                }

                &-bottom {

                    &__link {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                }

            }

            &-right {

                height: 500px;

                @media screen and (max-width: 768px) {
                    height: 375px;
                }

                &__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
</style>