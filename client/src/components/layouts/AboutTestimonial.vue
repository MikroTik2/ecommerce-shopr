<template>
    <div class="about-testimonial">
        <swiper 
        :space-between="20" 
        :swiper="swiperInstance"
        :slide-per-class="swiperInstance"
        :modules="[Navigation]"
        :pagination="{ clickable: true }"
        :navigation="{ prevEl: prevBtn, nextEl: nextBtn }"
        >
            
            <!-- FEEDBACK SLIDESHOW OUTPUT -->
            <swiper-slide v-for="user in duplicateSlides" :key="user._id">
                <div class="about-testimonial-content">
                    <div class="about-testimonial-content-customer">
                        <div class="about-testimonial-content-customer-avatar">
                            <img :src="user.avatar" alt="avatar">
                        </div>

                        <div class="about-testimonial-content-customer-rating">
                            <span> {{ user.name }} </span>
                            
                            <div>
                                <img v-for="star in user.star" src="/svg/star.svg" alt="star">
                            </div>
                        </div>
                    </div>

                    <div class="about-testimonial-content-comment" >
                        <span> {{ user.comment }}</span>
                    </div>
                </div>
            </swiper-slide>

            <!-- BUTTON NAVIGATION FOR SWIPER -->
            <div class="about-testimonial-element">
                <button class="about-testimonial-element-btn" ref="prevBtn" @click="handlePrev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12L11 18" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12L11 6" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="about-testimonial-element-btn" ref="nextBtn" @click="handleNext">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 18L19 12" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 6L19 12" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </swiper>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation } from 'swiper/modules';

    import 'swiper/css';
    import 'swiper/css/navigation';

    const commentUser = ref([
        { id: 1, avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg", comment: "Excellent product! I'm thrilled with the quality and functionality. This product is an absolute lifesaver for me!", name: "Alex", star: 4 },
        { id: 2, avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg", comment: "I'm very satisfied with this product. It's crafted to perfection, and its price more than justifies its quality.", name: "Bob", star: 5 },
        { id: 3, avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg", comment: "This product has become indispensable in my daily life. It meets all my needs and then some.", name: "Kate", star: 5 },
        { id: 4, avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg", comment: "Superb product! I have no complaints whatsoever. It quickly became my favorite accessory.", name: "Jackson", star: 4 },
        { id: 5, avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg", comment: "Wonderful choice! This product makes my life easier and more convenient. I highly recommend it to all my friends and family.", name: "Maks", star: 4 },
    ]);

    const slides = ref([]);

    const swiperInstance = ref(null);

    const prevBtn = ref(null);
    const nextBtn = ref(null);

    // HANDLER FOR SWITCHING TO THE PREVIOUS SLIDE
    const handlePrev = () => {
        if (swiperInstance.value) {
            swiperInstance.value.slidePrev();
        };
    };

    // HANDLER FOR SWITCHING TO THE NEXT SLIDE
    const handleNext = () => {
        if (swiperInstance.value) {
            swiperInstance.value.slideNext();
        };
    };

    // ARRAY WITH REVIEWS FOR THE CYCLIC SLIDER
    const duplicateSlides = computed(() => commentUser.value);


    onMounted(async () => { 
        slides.value = [ ...commentUser.value ];
    });

</script>

<style lang="scss" scoped>
    .about-testimonial {
        padding: 50px;
        background: var(--black-gray-secondary);
        
        @media screen and (max-width: 924px) {
            padding: 16px;
        }

        &-content {

            display: grid;
            row-gap: 24px;

            &-customer {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;

                &-avatar {
                    width: 60px;
                    height: 60px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 100px;
                    }
                }
            }

            &-comment {
                text-align: center;
                margin: auto;
                max-width: 70%;

                @media screen and (max-width: 924px) {
                    max-width: 100%;
                }

                span {
                    font-family: 'Inter', sans-serif;
                    font-size: 26px;
                    font-weight: 600;

                    @media screen and (max-width: 768px) {
                        font-size: 18px;
                    }
                }
            }
        }

        &-element {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 16px;

            &-btn {
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                cursor: pointer;
                border-radius: 50px;
                background: var(--gray-secondary);
                transition: all 0.6s;

                &:hover {
                    border: 1px solid var(--black);
                }
            }
        }
    }
</style>