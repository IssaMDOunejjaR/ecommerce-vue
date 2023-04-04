<script setup lang="ts">
import type { Product } from '../types';
import { computed, defineProps } from 'vue';

import TopCategoryCard from './TopCategoryCard.vue';

const props = defineProps<{
  data: Product[];
}>();

const randomProducts = computed(() => {
  const arr = [];

  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * props.data.length);

    arr.push(props.data[index]);
  }

  return arr;
});
</script>

<template>
  <div class="container p-4">
    <h2 class="font-semibold text-xl mb-3">Top Categories</h2>

    <div
      v-if="data.length"
      class="grid md:grid-cols-2 lg:grid-cols-5 grid-rows-[repeat(2,250px)] gap-3"
    >
      <div class="md:col-span-2 lg:col-span-3 lg:row-span-2">
        <TopCategoryCard :data="randomProducts[0]" />
      </div>
      <div class="lg:col-span-2">
        <TopCategoryCard :data="randomProducts[1]" />
      </div>
      <div class="lg:col-span-2">
        <TopCategoryCard :data="randomProducts[2]" />
      </div>
    </div>
  </div>
</template>
