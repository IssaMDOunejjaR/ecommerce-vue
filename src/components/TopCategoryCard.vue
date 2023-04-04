<script setup lang="ts">
import type { Product } from '../types';
import { defineProps } from 'vue';

defineProps<{
  data: Product;
}>();
</script>

<template>
  <div
    class="bg-gray-700 bg-opacity-50 w-full h-full relative flex gap-2 flex-col justify-center items-start p-4 text-white"
  >
    <img
      :src="data.category.image"
      :alt="data.category.name"
      class="absolute left-0 w-full h-full object-cover -z-[1]"
    />

    <h2 class="text-3xl font-bold">{{ data.category.name }}</h2>

    <router-link
      :to="`/categories/${data.category.id}`"
      class="bg-blue-500 py-3 px-6 rounded-lg uppercase font-semibold shadow"
    >
      See related products
    </router-link>
  </div>
</template>
