<template>
    <div class="feature">
        <div class="feature-content">

            <!-- FEATURE LEFT WITH CONTENT -->
            <div class="feature-left">
                <div>
                    <div class="feature-left-text">
                        <h3 class="feature-left-text__title">Action Packed</h3>
                        <span class="feature-left-text__description">Phosfluor escently engage worldwide with web-enabled process-centric technology.</span>
                    </div>

                    <router-link to="/collections" class="feature-left-btn">See collection <img class="feature-left-content-arrow" src="/svg/arrow-right-white.svg" alt="arrow-right"> </router-link>
                </div>
            </div>
            
            <!-- FEATURE RIGHT WITH IMAGE -->
            <div class="feature-right">
                <img class="feature-right__image" src="/img/feature-two.jpg" alt="feature">
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
            display: grid;
            gap: 32px;
            grid-template-columns: repeat(2, 1fr);

            @media screen and (max-width: 768px) {
                grid-template-columns: repeat(1, 1fr);
                gap: 16px;
            }
        }
        
        &-left {
            background: var(--red-light);
            color: var(--white);
            display: flex;
            align-items: center;
            padding: 50px;

            @media screen and (max-width: 768px) {
                padding: 16px;
            }

            &-btn {
                display: flex;
                margin-top: 25px;
                align-items: center;
                color: var(--white);
                border: none;
                background: transparent;
                font-family: 'Space Grotesk', sans-serif;
                font-size: 18px;
                cursor: pointer;
                font-weight: 500;
                gap: 5px;
                transition: all 0.2s;

                &:hover {
                    gap: 10px;
                }
                
                @media screen and (max-width: 768px) {
                    font-size: 16px;
                    margin-top: 16px;
                }
            }

            &-text {

                &__title {
                    font-size: 40px;
                    margin-bottom: 13px;
                    display: block;

                    @media screen and (max-width: 768px) {
                        font-size: 28px;
                        font-weight: 400;
                        margin-bottom: 8px;
                    }
                }

                &__description {
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 400;

                    @media screen and (max-width: 768px) {
                        font-size: 16px;
                    }
                }
            }


        }

        &-right {

            height: 495px;

            &__image {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
</style>