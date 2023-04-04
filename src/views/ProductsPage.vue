<script setup lang="ts">
import type { Product } from '@/types';
import { ref, watchEffect } from 'vue';
import { getAllProducts } from '../services/products';

import ProductCard from '../components/ProductCard.vue';
import Loader from '../components/LoaderComponent.vue';

const products = ref<Product[]>([]);
const isLoading = ref(true);

watchEffect(() => {
  isLoading.value = true;
  getAllProducts().then((response) => {
    products.value = response;

    isLoading.value = false;
  });
});
</script>

<template>
  <main class="p-4">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-4">Products</h1>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard v-for="(product, index) in products" :key="index" :data="product" />
      </div>
    </div>
  </main>

  <Loader v-if="isLoading" />
</template>
