<script setup lang="ts">
import { updateUser } from '../services/users';
import type { Product } from '../types';
import { useStore } from 'vuex';

const { state, dispatch } = useStore();

const props = defineProps<{
  product: Product;
  quantity: number;
}>();

const handleDeleteFromCart = () => {
  dispatch('removeFromCart', props.product.id);

  updateUser(state.user.id, state.user).then((response) => {
    localStorage.setItem('user', JSON.stringify(response));
  });
};
</script>

<template>
  <div class="flex items-center gap-2">
    <img :src="product.images[0]" :alt="product.title" class="w-12 h-12 shadow" />
    <h3 class="font-semibold">{{ product.title }}</h3>

    <button class="ml-auto p-1 bg-red-500 rounded" @click="handleDeleteFromCart">
      <img src="https://www.svgrepo.com/show/506767/trash.svg" alt="trash" class="w-6 h-6 invert" />
    </button>
  </div>
</template>
