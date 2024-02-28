import {createRouter,createWebHistory} from 'vue-router'
import login from '../components/login.vue'
import product from '../components/product.vue'
import home from '../components/home.vue'
import cardProdut from '../components/cardProdut.vue'
import Mycart from '../components/MyCart.vue'

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/home',
        component: home,
        children: [
            {
                path: 'product',
                component: product
            },
            {
                path: 'show',
                component: cardProdut
            },
            {
                path: 'cart',
                component: Mycart
            },
        ]
    },
];

const router = createRouter({
    routes: routes,
    history: createWebHistory()
});

export default router
