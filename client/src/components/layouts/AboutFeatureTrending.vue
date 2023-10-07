<template>

    <!-- SECTION CONTAINER -->
    <div class="about-trending">

        <!-- INTERNAL CONTAINER FOR DIVIDING INTO LEFT AND RIGHT PARTS -->
        <div class="about-trending-content">

            <!-- LEFT SIDE IF SECTION -->
            <div class="about-trending-content-left">
                <div class="about-trending-content-left-top">
                    <span>TRENDING</span>
                    <h2>Supporting local designers.</h2>
                </div>
                <div class="about-trending-content-left-bottom">
                    <span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</span>
                </div>
            </div>

            <!-- RIGHT SIDE IF SECTION WITH IMAGE -->
            <div class="about-trending-content-right">
                <img class="about-trending-content-right" src="/img/feature-trending.jpg" alt="feature">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .about-trending {
        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 16px;
        }

        &-content {
            display: flex;
            align-items: center;
            gap: 115px;

            @media screen and (max-width: 1124px) {
                display: grid;
                gap: 24px;
                grid-template-columns: repeat(1, 1fr);
            }

            &-left {

                display: grid;
                width: 455px;
                row-gap: 24px;

                @media screen and (max-width: 1124px) {
                    width: 100%;
                }

                @media screen and (max-width: 768px) {
                    row-gap: 12px;
                }

                &-top {

                    span {
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 600;
                    }

                    h2 {
                        font-size: 54px;
                        letter-spacing: -1px;

                        @media screen and (max-width: 768px) {
                            font-size: 34px;
                        }
                    }
                }

                &-bottom {

                    span {
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                        font-weight: 400;
                    }
                }
            }
        }
    }
</style>
