<template>
    <div class="blog">
        <div class="blog-top">
            <div class="blog-top-container">
                <div class="blog-top-content">
                    <div class="blog-top-content-link">
                        <router-link to="/">Home</router-link>
                        >
                        <router-link to="/blog"> Blog</router-link>
                    </div>

                    <div class="blog-top-content-text">
                        <h2 class="blog-top-content-text__title">Nayzak Blog</h2>
                        <span class="blog-top-content-text__description">At vero eos et accusamus et iusto odio dignissimos qui blanditiis praesentium voluptatum deleniti.</span>
                    </div>

                    <form class="blog-top-content-form">
                        <input v-model.trim="searchText" placeholder="Search" class="blog-top-content-form__input" type="text">
                        <button type="submit" class="blog-top-content-form-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.72574 7.91456C1.72574 4.56374 4.44211 1.84737 7.79292 1.84737C11.1437 1.84737 13.8601 4.56374 13.8601 7.91456C13.8601 11.2654 11.1437 13.9817 7.79292 13.9817C4.44211 13.9817 1.72574 11.2654 1.72574 7.91456ZM7.79292 0.231987C3.54996 0.231987 0.110352 3.67159 0.110352 7.91456C0.110352 12.1575 3.54996 15.5971 7.79292 15.5971C9.62367 15.5971 11.3049 14.9568 12.6247 13.8878L18.0259 19.289C18.3413 19.6044 18.8527 19.6044 19.1681 19.289C19.4836 18.9736 19.4836 18.4622 19.1681 18.1467L13.7669 12.7455C14.8354 11.4258 15.4755 9.74491 15.4755 7.91456C15.4755 3.67159 12.0359 0.231987 7.79292 0.231987Z" fill="#121212"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="blog-bottom">
            <div class="blog-bottom-content">
                <div class="blog-bottom-content-toolbar">
                    <div class="blog-bottom-content-toolbar-left">
                        <span class="blog-bottom-content-toolbar-left-article">{{ blogs.length }} Articles</span>
                    </div>
                </div>

                <div class="blog-bottom-content-elements" :style="{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }">
                    <div class="blog-bottom-content-element" v-for="blog in filterBlogs" :key="blog._id">
                        <a :href="`/blog/${blog._id}`" class="blog-bottom-content-element__image-container">
                            <img class="blog-bottom-content-element__image" :src="blog.images[0]" alt="photo-blog">
                        </a>

                        <a :href="`/blog/${blog._id}`" class="blog-bottom-content-element-text">
                            <span class="blog-bottom-content-element-text__createdAt"> {{ formatDate(blog.createdAt) }} </span>
                            <h3 class="blog-bottom-content-element-text__title"> {{  blog.title[0] }} </h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import api from '@/config/api';

    const blogs = ref([]);
    const searchText = ref("");

    const formatDate = (createdAt) => {
        const dateObj = new Date(createdAt);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };

    const filterBlogs = computed(() => {
        return blogs.value.filter(blog => {
            return blog.title[0].toLowerCase().includes(searchText.value.toLowerCase());
        });
    });

    onMounted(async () => {
        blogs.value = await api.getAllBlog();
    });

</script>

<style lang="scss" scoped>
    .blog {

        &-top {

            padding: 50px;

            @media screen and (max-width: 924px) {
                padding: 16px;
            }

            &-container {
                background: url('/img/shop-hero.jpg');
                background-size: cover;
                background-repeat: no-repeat;
                display: flex;
                padding: 24px 16px;
                align-items: center;
                justify-content: center;
                height: 400px;

                @media screen and (max-width: 768px) {
                    height: 245px;
                }
            }

            &-content {
                max-width: 600px;
                margin: 0 auto;

                &-link {
                    text-align: center;
                    color: var(--black-gray);
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                }

                &-text {

                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 24px;
                    
                    &__title {
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 72px;
                        font-weight: 500;

                        @media screen and (max-width: 768px) {
                            font-size: 40px;
                        }
                    }

                    &__description {
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                        font-weight: 400;

                        @media screen and (max-width: 768px) {
                            font-size: 14px;
                        }
                    }
                }

                &-form {

                    position: relative;

                    &__input {
                        width: 100%;
                        height: 52px;
                        background: var(--white);
                        outline: none;
                        border: none;
                        border-radius: 6px;
                        color: var(--light-gray);
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        padding: 0 16px;
                        font-weight: 400;
                    }

                    &-btn {
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        padding: 16px;
                    }
                }
            }
        }

        &-bottom {
            padding: 16px 52px 52px 52px;

            @media screen and (max-width: 924px) {
                padding: 16px;
            }

            &-content {

                &-toolbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 72px;

                    &-left {
                        &-article {
                            color: var(--black-gray);
                            font-family: 'Inter', sans-serif;
                            font-size: 16px;
                            font-weight: 400;
                        }
                    }

                    &-right {
                        display: flex;
                        align-items: center;
                        gap: 32px;

                        &__column {
                            
                            display: flex;
                            align-items: center;
                            gap: 10px;

                            &-block {
                                width: 46px;
                                height: 40px;
                                display: flex;
                                cursor: pointer;
                                align-items: center;
                                justify-content: center;
                                border: 1px solid var(--white-gray);
                            }
                        }
                    }
                } 

                &-elements {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 64px 32px;

                    @media screen and (max-width: 1024px) {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    @media screen and (max-width: 924px) {
                        grid-template-columns: repeat(1, 1fr);
                        gap: 32px 16px;
                    }
                }

                &-element {

                    display: flex;
                    flex-direction: column;
                    row-gap: 12px;

                    &-text {

                        &__createdAt {
                            color: var(--light-gray-secondary);
                            font-family: 'Inter', sans-serif;
                            font-size: 14px;
                            font-weight: 400;
                        }

                        &__title {
                            font-size: 20px;
                        }
                    }

                    &__image-container {
                        max-width: 100%;
                        height: 230px;
                    }

                    &__image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
</style>