<script setup lang="ts">
import type { Product } from '@/types';
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
      :src="data.images[0]"
      :alt="data.title"
      class="absolute left-0 w-full h-full object-cover -z-[1]"
    />

    <h2 class="text-3xl font-bold">{{ data.title }}</h2>
    <p class="max-w-[50%] italic text-sm mb-4 overflow-hidden h-[40px]">
      {{ data.description }}
    </p>

    <router-link
      :to="`/products/${data.id}`"
      class="bg-blue-500 py-3 px-6 rounded-lg uppercase font-semibold shadow"
    >
      Shop Now
    </router-link>
  </div>
</template>
