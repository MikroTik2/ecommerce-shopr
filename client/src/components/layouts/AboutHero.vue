<template>
    <div class="about-hero">
        
        <!-- SECTION TITLE -->
        <h2 class="about-hero-title">Hand-picked cultural products that will make you shine.</h2>
    </div>
</template>

<script setup>
    
</script>

<style lang="scss" scoped>
    .about-hero {
        background-image: url('/img/about-hero.jpg');
        background-repeat: no-repeat;
        padding: 50px;
        height: 550px;
        display: flex;
        align-items: center;

        @media screen and (max-width: 768px) {
            padding: 16px;
            height: 450px;
        }


        &-title {
            font-size: 54px;
            max-width: 880px;
            margin: 0 auto;
            text-align: center;
            color: var(--white);

            @media screen and (max-width: 768px) {
                font-size: 28px;
            }
        }
    }
</style>