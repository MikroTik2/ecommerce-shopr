<template>
    <div class="about-feature">
        <div class="about-feature-content">

            <!-- ABOUT LEFT -->
            <div class="about-feature-content-left">
                <div class="about-feature-content-left__image-container">
                    <img class="about-feature-content-left__image" src="/img/feature-1.jpg" alt="feature">
                </div>
                <div class="about-feature-content-left__image-container">
                    <img class="about-feature-content-left__image" src="/img/feature-2.jpg" alt="feature">
                </div>
            </div>

            <!-- ABOUT RIGHT -->
            <div class="about-feature-content-right">
                <div class="about-feature-content-right-top">
                    <span>Tagline</span>
                    <h2 class="about-feature-content-right-top__title">Products made with love.</h2>
                </div>
                <div class="about-feature-content-right-bottom">
                    <span class="about-feature-content-right-bottom__description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</span>
                </div>
            </div>

        </div>

        <!-- MOBILE VERSION -->
        <div class="about-feature-content-mobile">

            <!-- MOBILE VERSION RIGHT -->
            <div class="about-feature-content-right">
                <div class="about-feature-content-mobile-right-top">
                    <span>Tagline</span>
                    <h2 class="about-feature-content-right-top__title">Products made with love.</h2>
                </div>
                <div class="about-feature-content-right-bottom">
                    <span class="about-feature-content-right-bottom__description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</span>
                </div>
            </div>

            <!-- MOBILE VERSION LEFT -->
            <div class="about-feature-content-left">
                <div class="about-feature-content-left__image-container">
                    <img class="about-feature-content-left__image" src="/img/feature-1.jpg" alt="feature">
                </div>
                <div class="about-feature-content-left__image-container">
                    <img class="about-feature-content-left__image" src="/img/feature-2.jpg" alt="feature">
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
    .about-feature {
        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 16px;
        }

        &-content {

            justify-content: space-between;
            align-items: center;
            display: flex;
            gap: 30px;

            @media screen and (max-width: 1124px) {
                display: none;
            }

            &-left {
                display: flex;
                gap: 32px;

                @media screen and (max-width: 1224px) {
                    display: grid;
                    gap: 16px;
                    grid-template-columns: repeat(2, 1fr);
                }

                &__image-container {
                    overflow: hidden;
                }

                &__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transform: scale(1);
                    transition: ease 0.3s;

                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }

            &-right {
                width: 450px;
                display: grid;
                row-gap: 24px;

                @media screen and (max-width: 1224px) {
                    width: 60%;
                }

                @media screen and (max-width: 1124px) {
                    width: 100%;
                }

                @media screen and (max-width: 768px) {
                    row-gap: 12px;
                }
                
                &-top {

                    display: grid;
                    row-gap: 8px;

                    span {
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 600;
                    }

                    &__title {
                        font-size: 54px;
                        letter-spacing: -1px;

                        @media screen and (max-width: 768px) {
                            font-size: 34px;
                        }
                    }

                }

                &-bottom {

                    &__description {
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                    }
                }
            }
        }

        &-content-mobile {
            display: none;

            @media screen and (max-width: 1124px) {
                display: grid;
                gap: 24px;
            }
        }
    }
</style>