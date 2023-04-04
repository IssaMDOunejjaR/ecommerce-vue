import CartPageVue from '@/views/CartPage.vue';
import HomePageVue from '@/views/HomePage.vue';
import ProductDetailsVue from '@/views/ProductDetails.vue';
import ProductsPageVue from '@/views/ProductsPage.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import ProductsByCategory from '@/views/ProductsByCategory.vue';
import { createRouter, createWebHistory } from 'vue-router';

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
    }
  ]
});

export default router;