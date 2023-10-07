<template>
    <div class="contactFAQ">
      <div class="contactFAQ-content">
        <h3>Frequently asked</h3>
  
        <div class="contactFAQ-content-items">
          <div class="contactFAQ-content-item" v-for="(item, index) in faqItems" :key="index">
            
            <div class="contactFAQ-content-item-top" @click="toggleItem(index)">
              <span>{{ item.question }}</span>
              <img :src="item.isOpen ? '/svg/minus.svg' : '/svg/plus.svg'" alt="" />
            </div>

            <div class="contactFAQ-content-item-bottom" :class="{ 'open': item.isOpen }">
                <span>{{ item.answer }}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const faqItems = ref([
    {
      question: "How does SHOPR work?",
      answer: "SHOPR is an innovative platform that provides convenient solutions for online shopping. We gather the best deals from various online stores and present them to you on one user-friendly platform. You can search for products, compare prices, and make purchases without leaving our website.",
      isOpen: true,
    },
    {
      question: "Which payment methods are accepted?",
      answer: "We accept a variety of payment methods to make the payment process as convenient as possible for you. You can use credit and debit cards, e-wallets, bank transfers, and other popular payment methods. We guarantee the security of your payments.",
      isOpen: false,
    },
    {
      question: "How to get familiar with Figma?",
      answer: "Figma is a powerful design and prototyping tool. To get familiar with it, you can start by visiting the official Figma website, where there is introductory video content and documentation available. There are also many online courses and resources for learning Figma in more detail.",
      isOpen: false,
    },
    {
      question: "Can I get a refund?",
      answer: "Yes, we offer a refund policy. If you have any issues with your purchase or are not satisfied with the product, please contact our customer support, and we will assist you in resolving the situation. Please review our refund policy for detailed information.",
      isOpen: false,
    },
    {
      question: "Where is my order?",
      answer: "You can track the status of your order on our website. After placing an order, you will receive a unique tracking number that will allow you to monitor the progress of your shipment. If you have any questions regarding delivery, our customer support is always ready to help.",
      isOpen: false,
    },
    {
      question: "I have a problem",
      answer: "We apologize for any inconvenience you may have encountered. Please contact our customer support, and our specialists will do their best to resolve your issue. We value your loyalty and are committed to improving your shopping experience.",
      isOpen: false,
    },
  ]);
  
  // FUNCTION FOR SWITCHING THE ELEMENT STATE (OPEN/CLOSED)
  const toggleItem = (index) => {
    faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
  };
  </script>
  
  <style lang="scss" scoped>
  .contactFAQ {
    padding: 0px 16px 64px 16px;

    @media screen and (max-width: 924px) {
      padding: 32px 16px;
    }
  
    &-content {
      max-width: 900px;
      margin: auto;
  
      h3 {
        font-size: 34px;

        @media screen and (max-width: 768px) {
          font-size: 28px;
        }
      }

      &-item {

        padding: 32px 0px 12px 0px;
        border-bottom: 1px solid var(--gray);

        @media screen and (max-width: 924px) {
          padding: 24px 0px 12px 0px;
        }
        
            &-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;

                span {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;

                    @media screen and (max-width: 768px) {
                      font-size: 16px;
                    }
                }
            }

            &-bottom {
                
                span {
                    color: var(--text-blue);
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 400;

                    @media screen and (max-width: 768px) {
                      font-size: 14px;
                    }
                }
            }
        }
    }
  
    .contactFAQ-content-item-bottom {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }
  
    .contactFAQ-content-item-bottom.open {
      max-height: 300px; 
    }
  }
  </style>
  