<template>
    <div class="feature">
        <div class="feature-content">

            <!-- FEATURE LEFT -->
            <div class="feature-left">
                <div class="feature-left-content">
                    <div class="feature-left-content-text">
                        <span class="feature-left-content-text-trending">trending</span>

                        <h2 class="feature-left-content-text-title">Made from the finest materials</h2>

                        <span class="feature-left-content-text-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.</span>
                    </div>

                    <div>
                        <router-link to="/collections" class="feature-left-content-btn">See collection <img class="feature-left-content-arrow" src="/svg/arrow-right.svg" alt="arrow-right"> </router-link>
                    </div>
                </div>
            </div>

            <!-- FEATURE RIGHT WITH IMAGE -->
            <div class="feature-right">
                <img class="feature-right__image" src="/img/feature.jpg" alt="feature">
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
    .feature {
        padding: 50px;
        

        @media screen and (max-width: 924px) {
            padding: 24px 16px;
        }

        &-content {

            display: flex;
            gap: 115px;

            @media screen and (max-width: 924px) {
                display: grid;
                gap: 32px;
            }

        }

        &-left {

            max-width: 455px;
            display: flex;
            align-items: center;

            @media screen and (max-width: 924px) {
                max-width: 100%;
            }

            &-content {

                &-btn {
                    display: flex;
                    align-items: center;
                    border: none;
                    font-size: 22px;
                    background: transparent;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 22px;
                    cursor: pointer;
                    font-weight: 500;
                    gap: 5px;
                    transition: all 0.2s;

                    &:hover {
                        gap: 10px;
                    }

                    @media screen and (max-width: 924px) {
                        font-size: 18px;
                    }
                }

                &-text {

                    &-trending {
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        text-transform: uppercase;
                        font-weight: 600;
                        display: block;
                        margin-bottom: 10px;

                        @media screen and (max-width: 924px) {
                            margin-bottom: 5px;
                        }
                    }

                    &-title {
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 54px;
                        font-weight: 500;
                        line-height: 58px;

                        @media screen and (max-width: 924px) {
                            font-size: 32px;
                            line-height: 38px;
                        }
                    }

                    &-description {
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                        font-size: 18px;
                        margin: 25px 0 25px 0;
                        display: block;
                        font-weight: 400;

                        @media screen and (max-width: 924px) {
                            font-size: 16px;
                            margin: 12px 0 16px 0;
                        }
                    }

                }
            }
        }

        &-right {
            width: 100%;
            height: 100%;

            &__image {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>