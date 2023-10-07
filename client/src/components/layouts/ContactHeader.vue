<template>
    <div class="contactHeader">
        <div class="contactHeader-top">

            <!-- SECTION HEADER -->
            <h2 class="contactHeader-top-title">Contact us</h2>

            <!-- TEXT DESCRIPTION OF THE SECTION -->
            <span class="contactHeader-top-text">At vero eos et accusamus et iusto odio dignissimos ducimus <br> qui blanditiis voluptatum deleniti.</span>
        </div>
    </div>
</template> 

<style lang="scss" scoped>
    .contactHeader {
        padding: 50px;

        @media screen and (max-width: 924px) {
            padding: 32px 16px;
        }

        &-top {

            display: grid;
            text-align: center;
            justify-content: center;
            row-gap: 16px;

            &-title {
                font-size: 54px;

                @media screen and (max-width: 768px) {
                    font-size: 40px;
                }
            }

            &-text {
                color: var(--text-blue);
                font-family: 'Inter', sans-serif;
                font-weight: 400;

                @media screen and (max-width: 768px) {
                    font-size: 16px;
                }
            }
        }
    }
</style>