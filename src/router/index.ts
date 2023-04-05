import CartPageVue from '@/views/CartPage.vue';
import HomePageVue from '@/views/HomePage.vue';
import ProductDetailsVue from '@/views/ProductDetails.vue';
import ProductsPageVue from '@/views/ProductsPage.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import ProductsByCategory from '@/views/ProductsByCategory.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import OrderConfirmation from '@/views/OrderConfirmation.vue';
import Profile from '@/views/ProfilePage.vue';
import NotFound from '@/views/NotFound.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageVue
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsPageVue
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: ProductDetailsVue
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesPage
    },
    {
      path: '/categories/:id',
      name: 'category-products',
      component: ProductsByCategory
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPageVue
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,
      beforeEnter: (_to, from) => {
        if (!store.state.user) {
          return from.path;
        }
      }
    },
    {
      path: '/order-confirmation/:id',
      name: 'order-confirmation',
      component: OrderConfirmation,
      beforeEnter: (_to, from) => {
        if (!store.state.user) {
          return from.path;
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (_to, from) => {
        if (!store.state.user) {
          return from.path;
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
});

export default router;
