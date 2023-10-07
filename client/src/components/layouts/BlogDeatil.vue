<template>
    <div class="blog-detail" v-if="blog">
        <div class="blog-detail-content">
            <div class="blog-detail-header">
                <div class="blog-detail-header-text">
                    <span class="blog-detail-header-text__category">{{ blog.category }}</span>
                    <h2 class="blog-detail-header-text__title">{{ blog.title[0] }}</h2>
                </div>

                <div class="blog-detail-header-meta">
                    <div class="blog-detail-header-meta__block">
                        <img src="/svg/user.svg" alt="author">
                        <span class="blog-detail-header-meta__text">{{ blog.author }}</span>
                    </div>
                    <div class="blog-detail-header-meta__block">
                        <img src="/svg/comment.svg" alt="comment">
                        <span class="blog-detail-header-meta__text">{{ blog.commentUser.length }} comment</span>
                    </div>
                </div>
            </div>

            <div class="blog-detail-image__container">
                <img class="blog-detail__image" :src="blog.images[0]" alt="blog-photo">
            </div>

            <div class="blog-detail-text">

                <div class="blog-detail-text-description">
                    <h4 class="blog-detail-text-description-typography"> {{ blog.description[0] }} </h4>

                    <span class="blog-detail-text-description-regular">{{ blog.description[1] }}</span>
                    <span class="blog-detail-text-description-regular">{{ blog.description[2] }}</span>
                </div>

                <div class="blog-detail-text-description">
                    <h3 class="blog-detail-text-description-title">{{ blog.title[1] }}</h3>
                    
                    <span class="blog-detail-text-description-regular">{{ blog.description[3] }}</span>
                    <span class="blog-detail-text-description-regular">{{ blog.description[4] }}</span>
                </div>

                <div class="blog-detail-text-description">
                    <img class="blog-detail__image" :src="blog.images[1]" alt="blog-photo">
                </div>

                <div class="blog-detail-text-description">         
                    <span class="blog-detail-text-description-regular">{{ blog.description[3] }}</span>
                    <span class="blog-detail-text-description-regular">{{ blog.description[4] }}</span>
                </div>

            </div>

            <div class="blog-detail-post">
                <div class="blog-detail-post-content">
                    
                    <div class="blog-detail-post-content-top">
                        <span class="blog-detail-post-content-tag">Tags:  <span>{{ blog.tags[0] }}, {{ blog.tags[1] }}, {{ blog.tags[2] }}</span></span>
                    </div>

                    <div class="blog-detail-post-content-bottom">
                        <h3 class="blog-detail-post-content-bottom__title">You might also like...</h3>

                         <div class="blog-detail-post-content-bottom-elements">
                            <div class="blog-detail-post-content-bottom-element" v-for="blog in blogLimit" :key="blog._id">
                                
                                <a class="blog-detail-post-content-bottom-element__image-container" :href="`/blog/${blog._id}`">
                                    <img class="blog-detail-post-content-bottom-element__image" :src="blog.images[0]" alt="blog-image">
                                </a>

                                <a class="blog-detail-post-content-bottom-element-text" :href="`/blog/${blog._id}`">
                                    <span class="blog-detail-post-content-bottom-element-text__created">{{ formatDate(blog.createdAt) }}</span>

                                    <h3> {{ blog.title[1] }} </h3>

                                    <a class="blog-detail-post-content-bottom-element-text__link" :href="`/blog/${blog._id}`">Read more</a>
                                </a>
                                
                            </div>
                         </div>
                    </div>
                </div>
            </div>

            <div class="blog-detail-comment">

                <h2 class="blog-detail-comment-title">Post a comment</h2>
                <form class="blog-detail-comment-form" @submit.prevent="submitComment">
                    <textarea v-model.trim="newComment.comment" class="blog-detail-comment-form-message" placeholder="Write your comment"></textarea>
                
                    <button class="blog-detail-comment-form__btn" type="submit">Comment</button>
                </form>
            </div>

            <div class="blog-detail-user" v-for="item in blog.commentUser">
                <div class="blog-detail-user-top">
                    <div class="blog-detail-user-top-user">

                        <div class="blog-detail-user-top-user-avatar"></div>

                        <div class="blog-detail-user-top-user-content">
                            
                            <div class="blog-detail-user-top-user-info">
                                <h3 class="blog-detail-user-top-user-info__name"> {{ item.postedby.firstname }} </h3>
                                <span class="blog-detail-user-top-user-info__created"> {{ formatDate(item.postedby.createdAt) }} </span>
                            </div>
                        </div>
                    </div>

                    <span class="blog-detail-user-top-name"> {{ item.comment }}  </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import api from '@/config/api';

    const route = useRoute();

    const blogId = ref(null);
    const blog = ref(null);
    const blogLimit = ref([]);

    const newComment = ref({
        comment: "",
    });

    // DATA FORMATTING
    const formatDate = (createdAt) => {
        const dateObj = new Date(createdAt);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };

    // SENDING A COMMENT
    const submitComment = async () => {
        try {

            const response = await api.commentUser(blogId.value, newComment.value.comment)
            console.log(response);

        } catch (error) {
            console.log(error);
        };
    };

    onMounted(async () => {
        blogLimit.value = await api.getBlogLimit();

        blogId.value = route.params.blogId;
        blog.value = await api.getBlog(blogId.value);
    });

</script>

<style lang="scss" scoped>
    .blog-detail {
        max-width: 1200px;
        padding: 72px 20px;
        margin: 0 auto;

        @media screen and (max-width: 924px) {
            padding: 40px 16px;
        }

        &-comment {

            &-title {
                font-size: 34px;
            }

            &-form {

                padding-bottom: 32px;
                border-bottom: 1px solid var(--gray);

                &-message {
                    width: 100%;
                    height: 150px;
                    margin-top: 30px;
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 5px;
                    resize: vertical; 
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 1.5; 
                }

                &__btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 140px;
                    height: 45px;
                    background: var(--black);
                    margin-top: 16px;
                    color: var(--white);
                    font-size: 18px;
                    font-family: 'Space Grotesk', sans-serif;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }
            }
        }

        &-user {

            padding-bottom: 32px;
            padding-top: 32px;
            border-bottom: 1px solid var(--gray);

            @media screen and (max-width: 924px) {
                padding-bottom: 24px;
                padding-top: 14px;
            }

            &-top {

                display: grid;
                row-gap: 12px;

                &-name {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                }

                &-user {

                    display: flex;
                    gap: 16px;

                    &-avatar {
                        width: 76px;
                        height: 76px;
                        background: var(--gray);
                        border-radius: 50px;
                    }

                    &-info {
                        display: flex;
                        align-items: baseline;
                        gap: 12px;

                        &__name {
                            font-family: 'Inter', sans-serif;
                            font-weight: 600;
                        }

                        &__created {
                            color: var(--light-gray-secondary);
                            font-family: 'Inter', sans-serif;
                            font-size: 16px;
                            font-weight: 400;
                        }
                    }

                    &-content {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }
                }
            }
}

        &-content {
            display: grid;
            row-gap: 32px;
        }

        &-image__container {
            height: 640px;
            max-width: 100%;

            @media screen and (max-width: 768px) {
                 height: 100%;
            }
        }

        &__image {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        &-text {
            display: grid;
            row-gap: 56px;
            border-bottom: 1px solid var(--gray);
            padding: 72px 0 72px 0;

            @media screen and (max-width: 924px) {
                padding: 10px 0 24px 0;
            }

            &-description {
                display: grid;
                row-gap: 24px;

                &-typography {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                }

                &-regular {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-weight: 400;
                }

                &-title {
                    font-size: 28px;
                }
            }
        }

        &-post {

            &-content {

                &-tag {
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    display: block;
                    margin-bottom: 56px;

                    span {
                        color: var(--text-blue);
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                    }
                }

                &-top {

                }

                &-bottom {

                    &__title {
                        font-size: 34px;
                    }

                    &-elements {
                        display: grid;
                        gap: 40px;
                        margin-top: 24px;
                        grid-template-columns: repeat(3, 1fr);
                        padding-bottom: 56px;
                        border-bottom: 1px solid var(--gray);

                        @media screen and (max-width: 768px) {
                            grid-template-columns: repeat(1, 1fr);
                            padding-bottom: 24px;
                            gap: 16px;
                        }
                    }

                    &-element {

                        display: flex;
                        flex-direction: column;
                        gap: 10px;

                        &__image-container {
                            height: 245px;
                            max-width: 100%;
                            display: block;
                            overflow: hidden;
                        }

                        &__image {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transform: scale(1);
                            transition: all 0.2s;

                            &:hover {
                                transform: scale(1.1);
                            }
                        }

                        &-text {

                            display: flex;
                            flex-direction: column;
                            gap: 8px;

                            &__created {
                                color: var(--light-gray-secondary);
                                font-family: 'Inter', sans-serif;
                                font-size: 12px;
                                font-weight: 400;
                            }

                            &__link {
                                font-size: 16px;
                                text-decoration: underline;
                                font-weight: 500;
                            }
                        }
                        
                    }
                }
            }
        }

        &-header {

            display: flex;
            flex-direction: column;
            row-gap: 16px;

            &-text {
                display: flex;
                flex-direction: column;
                row-gap: 8px;

                &__category {
                    font-family: 'Inter', sans-serif;
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

            &-meta {
                display: flex;
                align-items: center;
                gap: 24px;

                &__block {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                &__text {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                }
            }
        }
    }
</style> 