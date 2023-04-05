<script setup lang="ts">
import type { Product } from '../types';
import { defineEmits } from 'vue';

const emit = defineEmits(['handle-total']);

const props = defineProps<{
  product: Product;
  quantity: number;
}>();

emit('handle-total', props.product.price * props.quantity);
</script>

<template>
  <div class="py-1 flex items-center gap-2">
    <img :src="product.images[0]" :alt="product.title" class="w-10 h-10 rounded" />
    <p class="flex items-center flex-1">
      {{ product.title }} <span class="font-bold ml-2"> x {{ quantity }}</span>
      <span class="ml-auto font-semibold">$ {{ product.price * quantity }}</span>
    </p>
  </div>
</template>
