import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from '../screens/home.vue'
import Shop from '../screens/shop.vue'
import Login from '../screens/login.vue'
import Forgot from '../screens/forgot.vue'
import MyAccount from '../screens/myAccount.vue'
import Checkout from '../screens/checkout.vue'
import OrderComplete from '../screens/orderComplete.vue'
import Product from '../screens/product.vue'
import Help from '../screens/help.vue'
import Reset from '../screens/resetPassword.vue'

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { index: 1 }
    },
    {
        path: "/shop",
        name: "Shop",
        component: Shop,
        meta: { index: 2 }
    },
    {
        path: "/my-account",
        name: "MyAccount",
        component: MyAccount,
        meta: { requiresAuth: true, index: 3 }
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
        meta: { requiresAuth: true, index: 5 }
    },
    {
        path: "/order-complete",
        name: "OrderComplete",
        component: OrderComplete,
        meta: { requiresAuth: true, index: 8 }
    },
    {
        path: "/help",
        name: "Help",
        component: Help,
        meta: { index: 9 }
    },
    {
        path: "/sign-in",
        name: "Login",
        component: Login,
        meta: { requiresVisitor: true, index: 10 }
    },
    {
        path: "/forgot-password",
        name: "Forgot",
        component: Forgot,
        meta: { index: 12 }
    },
    {
        path: "/product",
        name: "Product",
        component: Product,
        meta: { index: 15 }
    },
    {
        path: "/reset-password/:token",
        name: "Reset",
        component: Reset,
        meta: { index: 16 }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn");
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                name: "Login"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                name: "Home"
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});



export default router;