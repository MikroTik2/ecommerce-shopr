<template>
    <div class="contactForm">
        <div class="contactForm-content">
            <div class="contactForm-content-top">
                <img class="contactForm-content-top__image" src="/img/map.jpg" alt="map">
            </div>

            <div class="contactForm-content-bottom__container">
                <div class="contactForm-content-bottom">

                    <!-- TITLE -->
                    <h3>Get in touch</h3>

                    <!-- FORM FOR ENTERING USER DATA -->
                    <form class="contactForm-content-bottom-form" @submit.prevent="handleSubmit">
                        <div class="contactForm-content-bottom-form-control"> 
                            <div class="contactForm-content-bottom-form-control-block">
                                <label 
                                    class="contactForm-content-bottom-form-control-block__label" 
                                    for="firstname">
                                    
                                    First name
                                </label>
                                <input
                                    v-model.trim="firstname" 
                                    placeholder="First name" 
                                    maxlength="20"
                                    :style="{ border: (v$.firstname?.$error || firstname.length === 20) ? '1px solid red' : '1px solid var(--gray)' }" 
                                    class="contactForm-content-bottom-form__input" 
                                    type="text"
                                >

                                <span 
                                    v-if="v$?.firstname?.$error" 
                                    class="contactForm-content-bottom-form-control-block__error">
                                    
                                    Please enter your first name
                                </span>

                                <span v-if="firstname.length === 20" class="contactForm-content-bottom-form-control-block__error">
                                    First name should not exceed 20 characters
                                </span>
                            </div>

                            <div class="contactForm-content-bottom-form-control-block">
                                <label 
                                    class="contactForm-content-bottom-form-control-block__label" 
                                    for="last-name">
                                    
                                    Last name
                                </label>
                                <input 
                                    v-model.trim="lastname" 
                                    :style="{ border: (v$.lastname?.$error || lastname.length === 20) ? '1px solid red' : '1px solid var(--gray)' }" 
                                    placeholder="Last name" 
                                    maxlength="20"
                                    class="contactForm-content-bottom-form__input" 
                                    type="text"
                                >
                                <span 
                                    v-if="v$?.lastname?.$error" 
                                    class="contactForm-content-bottom-form-control-block__error">

                                    Please enter your last name
                                </span>

                                <span v-if="lastname.length === 20" class="contactForm-content-bottom-form-control-block__error">
                                    Last name should not exceed 20 characters
                            </span>
                            </div>
                        </div>

                        <div class="contactForm-content-bottom-form-control-block">
                            <label 
                                class="contactForm-content-bottom-form-control-block__label" 
                                for="email-address">
                                
                                Email address
                            </label>
                            <input 
                                v-model.trim="emailaddress" 
                                :style="{ border: (v$.emailaddress?.$error || emailaddress.length === 100) ? '1px solid red' : '1px solid var(--gray)' }" 

                                placeholder="Email address" 
                                maxlength="100"
                                class="contactForm-content-bottom-form__input" 
                                type="email"
                            >
                            <span 
                                v-if="v$?.emailaddress?.$error" 
                                class="contactForm-content-bottom-form-control-block__error">
                                
                                Invalid credentials email
                            </span>

                            <span v-if="emailaddress.length === 100" class="contactForm-content-bottom-form-control-block__error">
                                    Email should not exceed 100 characters
                            </span>
                        </div>

                        <div class="contactForm-content-bottom-form-control-block">
                            <label 
                                class="contactForm-content-bottom-form-control-block__label" 
                                for="message">
                                
                                Message
                            </label>
                            <textarea 
                                v-model.trim="message" 
                                maxlength="1000"
                                :style="{ border: (v$.message?.$error || message.length === 1000) ? '1px solid red' : '1px solid var(--gray)' }" 
                                placeholder="Your Message"
                                class="contactForm-content-bottom-form__message">
                            </textarea>
                            <span 
                                v-if="v$?.message?.$error" 
                                class="contactForm-content-bottom-form-control-block__error">
                                
                                Please enter your message
                            </span>

                            <span v-if="message.length === 1000" class="contactForm-content-bottom-form-control-block__error">
                                    Message should not exceed 1000 characters
                            </span>
                        </div>

                        <button class="contactForm-content-bottom-form-control-btn" type="submit">Send message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { required, email, maxLength } from '@vuelidate/validators';
    import useVuelidate from '@vuelidate/core';
    import api from '@/config/api';

    const firstname = ref("");
    const lastname = ref("");
    const emailaddress = ref("");
    const message = ref("");

    // VALIDATION RULES FOR FORM FIELDS
    const rules = {
        firstname: { required, maxLength: maxLength(20) },
        lastname: { required, maxLength: maxLength(20) },
        emailaddress: { required, email, maxLength: maxLength(100) },
        message: { required, maxLength: maxLength(1000) },
    };

    // CREATING A HOOK FOR VALIDATION FORM FIELDS
    const v$ = useVuelidate(rules, {
        firstname,
        lastname,
        emailaddress,
        message,
    });

    // FUNCTION FOR PROCESSING FORM SUBMITTAL
    const handleSubmit = async () => {
        try {

            // CHECKING FIELD VALIDATION
            if (v$?.value) {
                await v$.value.$validate();

                // IF THERE ARE VALIDATION ERRORS, DO NOT SUBMIT THE FORM
                if (v$.value.firstname?.$error || v$.value.lastname?.$error || v$.value.emailaddress?.$error || v$.value.message?.$error) {
                    return;
                };
            };

            // CREATION A OBJECT WITH DATA FOR SENDING
            const formDataToSend = {
                firstname: firstname.value,
                lastname: lastname.value,
                emailaddress: emailaddress.value,
                message: message.value,
            };

            // RESTART PAGE
            window.location.reload();
            
            // SENDING DATA TO THE SERVER
            const response = await api.userContactUs(formDataToSend);


        } catch (error) {
            console.log(error);
        };
    };
</script>

<style lang="scss" scoped>
    .contactForm {

        &-content {

            &-top {

                height: 500px;

                &__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &-bottom__container {
                margin: 0 16px;
            }

            &-bottom {
                max-width: 1110px;
                padding: 50px;
                margin: auto;
                transform: translate(0px, -50px);
                background: var(--white);
                display: flex;
                flex-direction: column;
                row-gap: 56px;
                z-index: 1;

                @media screen and (max-width: 924px) {
                    padding: 16px;
                }

                h3 {
                    font-size: 40px;

                    @media screen and (max-width: 768px) {
                        font-size: 28px;
                    }
                }

                &-form {
                    display: grid;
                    row-gap: 24px;

                    @media screen and (max-width: 924px) {
                        row-gap: 16px;
                    }

                    &__input {
                        width: 100%;
                        padding: 0 16px;
                        height: 52px;
                        border-radius: 6px;
                        outline: none;
                        border: 1px solid var(--gray);
                        color: var(--light-gray);
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        background: var(--white);
                        transition: all 0.4s;

                        &:focus {
                            color: var(--black);
                            border: 1px solid var(--black);
                        }

                        @media screen and (max-width: 768px) {
                            height: 46px;
                        }
                    }

                    &__message {
                        width: 100%;
                        padding: 16px;
                        height: 250px;
                        border-radius: 6px;
                        resize: vertical; 
                        outline: none;
                        border: 1px solid var(--gray);
                        color: var(--light-gray);
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        background: var(--white);
                        transition: all 0.4s;

                        &:focus {
                            color: var(--black);
                            border: 1px solid var(--black);
                        }
                    }

                    &-control {
                        display: flex;
                        align-items: center;
                        gap: 24px;
                        
                        @media screen and (max-width: 924px) {
                            display: grid;
                            row-gap: 16px;
                        }

                        &-btn {
                            height: 52px;
                            width: 100%;
                            background: var(--black);
                            color: var(--white);
                            border-radius: 6px;
                            font-family: 'Space Grotesk', sans-serif;
                            font-size: 18px;
                            font-weight: 500;
                            border: none;
                            cursor: pointer;
                        }

                        &-block {
                            width: 100%;
                            display: grid;
                            row-gap: 8px;

                            &__error {
                                color: red;
                            }

                            &__label {
                                color: var(--text-blue);
                                font-family: 'Inter', sans-serif;
                                font-size: 16px;
                                font-weight: 600;
                            }
                        }
                    }
                }
            }
        }
    }
</style>