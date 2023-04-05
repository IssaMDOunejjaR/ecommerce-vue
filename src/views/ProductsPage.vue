<script setup lang="ts">
import type { Category, Product } from '../types';
import { ref, watch, watchEffect } from 'vue';
import { getAllCategories, getAllProducts } from '../services/products';

import ProductCard from '../components/ProductCard.vue';
import TextBox from '../components/TextBox.vue';
import Loader from '../components/LoaderComponent.vue';

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const isLoading = ref(true);

const searchValue = ref('');
const selectedCategory = ref('');

let filteredProucts: Product[] = [];

watch([searchValue, selectedCategory], () => {
  filteredProucts = products.value.filter(
    (product) =>
      product.title.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()) &&
      product.category.name.includes(selectedCategory.value)
  );
});

watchEffect(() => {
  isLoading.value = true;
  getAllProducts().then((response) => {
    products.value = response;
    filteredProucts = response;

    getAllCategories().then((response) => {
      categories.value = response;

      isLoading.value = false;
    });
  });
});
</script>

<template>
  <main class="p-4">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-4">Products</h1>

      <div class="mb-6 flex flex-col md:flex-row gap-3">
        <TextBox placeholder="Search..." v-model="searchValue" />

        <select class="p-2 w-full border border-gray-300 rounded" v-model="selectedCategory">
          <option value="">Select Category</option>
          <option v-for="(category, index) in categories" :key="index" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard v-for="(product, index) in filteredProucts" :key="index" :data="product" />
      </div>

      <p v-if="filteredProucts.length === 0" class="p-4 text-center text-xl font-semibold">
        We didn't any products
      </p>
    </div>
  </main>

  <Loader v-if="isLoading" />
</template>
