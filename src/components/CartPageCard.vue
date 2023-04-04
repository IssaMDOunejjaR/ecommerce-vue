<script setup lang="ts">
import { updateUser } from '../services/users';
import { getProductById } from '../services/products';
import type { Product } from '../types';
import { watchEffect, defineProps, ref, type Ref } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['update-total']);

const { state, dispatch } = useStore();

const props = defineProps<{
  productId: number;
  quantity: number;
}>();

const product = ref<Product>();
const quantity = ref(props.quantity);

watchEffect(() => {
  getProductById(props.productId).then((response) => {
    product.value = response;

    emit('update-total', product.value.price * quantity.value);
  });
});

const handleDeleteFromCart = () => {
  dispatch('removeFromCart', product.value?.id);

  updateUser(state.user.id, state.user).then((response) => {
    localStorage.setItem('user', JSON.stringify(response));
  });
};

const incrementQuantity = () => {};

const decrementQuantity = () => {};
</script>

<template>
  <div class="flex items-center gap-2">
    <img
      :src="product?.images[0]"
      :alt="product?.title"
      class="w-[100px] h-[100px] shadow rounded"
    />

    <div>
      <h3 class="font-semibold text-2xl">{{ product?.title }}</h3>
      <small class="text-gray-500">{{ product?.category.name }}</small>
      <p class="font-semibold text-lg">$ {{ product?.price }}</p>
    </div>

    <div class="ml-20 flex flex-col gap-2">
      <h4>Quantity:</h4>
      <div class="flex items-center gap-2">
        <button class="border bg-gray-100 rounded border-gray-300" @click="decrementQuantity">
          <img
            src="https://www.svgrepo.com/show/506259/minus-small.svg"
            alt="minus"
            class="w-10 h-10"
          />
        </button>
        <input
          type="number"
          min="1"
          class="border p-2 rounded border-gray-300"
          v-model="quantity"
        />
        <button class="border bg-gray-100 rounded border-gray-300" @click="incrementQuantity">
          <img
            src="https://www.svgrepo.com/show/506283/plus-small.svg"
            alt="plus"
            class="w-10 h-10"
          />
        </button>
      </div>
    </div>

    <div class="ml-20">
      <h4 class="flex gap-2">
        Total:
        <span class="text-xl font-semibold">$ {{ product && product.price * quantity }}</span>
      </h4>
    </div>

    <button class="ml-auto p-1 bg-red-500 rounded" @click="handleDeleteFromCart">
      <img src="https://www.svgrepo.com/show/506767/trash.svg" alt="trash" class="w-8 h-8 invert" />
    </button>
  </div>
</template>
