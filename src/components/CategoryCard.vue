<script setup lang="ts">
import type { Category } from '@/types';
import { defineProps } from 'vue';

defineProps<{
  data: Category;
}>();
</script>

<template>
  <router-link
    :to="`/categories/${data.id}`"
    class="relative p-16 bg-black bg-opacity-30 flex justify-center items-center transition-transform hover:scale-105 rounded overflow-hidden"
  >
    <img
      :src="data.image"
      :alt="data.name"
      class="absolute left-0 top-0 w-full h-full object-cover -z-10"
    />

    <h2 class="text-white text-4xl text-center font-semibold">{{ data.name }}</h2>
  </router-link>
</template>
