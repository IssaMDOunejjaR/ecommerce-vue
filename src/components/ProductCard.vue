<script setup lang="ts">
import { updateUser } from '../services/users';
import type { Cart, Product } from '../types';
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const { state, dispatch } = useStore();

const props = defineProps<{
  data: Product;
}>();

const handleAddToCart = () => {
  const payload = { product: props.data, quantity: 1 };

  updateUser(state.user.id, {
    ...state.user,
    cart: [...state.user.cart.filter((item: Cart) => item.product.id !== props.data.id), payload]
  }).then((response) => {
    localStorage.setItem('user', JSON.stringify(response));
    dispatch('addToCart', payload);
  });
};
</script>

<template>
  <router-link
    :to="`/products/${data.id}`"
    class="flex flex-col rounded shadow overflow-hidden transition-transform border hover:scale-105"
  >
    <img :src="data.images[0]" :alt="data.title" class="h-[300px] object-cover" />

    <div class="p-3 flex flex-col gap-4 border-t flex-1">
      <div>
        <h3 class="font-semibold">{{ data.title }}</h3>
        <small class="text-gray-500">{{ data.category.name }}</small>
      </div>

      <div class="flex mt-auto items-center">
        <button
          class="bg-orange-500 p-1.5 rounded flex-1 flex justify-center items-center"
          @click.stop="handleAddToCart"
        >
          <img
            src="https://www.svgrepo.com/show/506144/cart-4.svg"
            alt="cart"
            class="w-6 h-6 invert"
          />
        </button>

        <p class="flex-1 font-bold text-2xl flex justify-center items-center">$ {{ data.price }}</p>
      </div>
    </div>
  </router-link>
</template>
