import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index.vue';
import Cart from '@/views/Cart.vue';
import Account from '@/views/Account.vue';
import AccountAddress from '@/views/AccountAddress.vue';
import AccountWishlist from '@/views/AccountWishlist.vue';
import AccountDetails from '@/views/AccountDetails.vue';
import Product from '@/views/Product.vue';
import ProductAll from '@/views/ProductAll.vue';
import Blog from '@/views/Blog.vue';
import BlogPost from '@/views/BlogPost.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';

const router = createRouter({
    history: createWebHistory(),

    routes: [ 

        // NOT FOUND 404
        { path: "/:pathMatch(.*)*", name: "NotFoundPage", component: NotFoundPage },

        // HOME
        { path: "/", name: "Index", component: Index },

        // REGISTERED, LOGIN
        { path: "/registered", name: "SignUp", component: SignUp },
        { path: "/login", name: "SignIn", component: SignIn },

        // ACCOUNT
        { path: "/account", name: "Account", component: Account },
        { path: "/account/address", name: "AccountAddress", component: AccountAddress },
        { path: "/account/wishlist", name: "AccountWishlist", component: AccountWishlist },
        { path: "/account/details", name: "AccountDetails", component: AccountDetails },

        // ABOUT
        { path: "/about", name: "About", component: About },

        // CONTACT
        { path: "/contact", name: "Contact", component: Contact },
        
        // CART
        { path: "/cart", name: "Cart", component: Cart },

        // PRODUCT
        { path: "/collections", name: "ProductAll", component: ProductAll },
        { path: "/collections/product/:productId", name: "Product", component: Product },

        // BLOG
        { path: "/blog", name: "Blog", component: Blog },
        { path: "/blog/:blogId", name: "BlogPost", component: BlogPost },
    ], 
});

export default router;