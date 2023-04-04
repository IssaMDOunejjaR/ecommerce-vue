<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import TopProducts from '../components/TopProducts.vue';
import Features from '../components/FeaturesCompoent.vue';
import TopCategories from '../components/TopCategories.vue';
import Sales from '../components/SalesComponent.vue';
import type { Product } from '@/types';
import { getAllProducts } from '../services/products';
import Loader from '@/components/LoaderComponent.vue';

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
  <main class="flex flex-col gap-8">
    <!-- Top Products -->
    <TopProducts :data="products" />

    <!-- Features -->
    <Features />

    <!-- Top Categories -->
    <TopCategories :data="products" />

    <!-- Sales -->
    <Sales :data="products" />
  </main>

  <Loader v-if="isLoading" />
</template>
