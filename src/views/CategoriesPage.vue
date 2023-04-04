<script setup lang="ts">
import type { Category } from '@/types';
import { ref, watchEffect } from 'vue';
import { getAllCategories } from '../services/products';
import CategoryCard from '@/components/CategoryCard.vue';
import Loader from '@/components/LoaderComponent.vue';

const categories = ref<Category[]>([]);
const isLoading = ref(true);

watchEffect(() => {
  isLoading.value = true;
  getAllCategories().then((response) => {
    categories.value = response;

    isLoading.value = false;
  });
});
</script>

<template>
  <main class="p-4">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-4">Categories</h1>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CategoryCard v-for="category in categories" :key="category.id" :data="category" />
      </div>
    </div>
  </main>

  <Loader v-if="isLoading" />
</template>
