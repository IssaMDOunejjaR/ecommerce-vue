<script setup lang="ts">
import { updateUser } from '../services/users';
import type { Cart, Product } from '../types';
import { defineProps, ref, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import CartCard from './CartCard.vue';
import ProductCard from './ProductCard.vue';

const emit = defineEmits(['increment-total', 'decrement-total']);

const { state, dispatch } = useStore();

const props = defineProps<{
  product: Product;
  quantity: number;
}>();

const quantity = ref(props.quantity);

emit('increment-total', props.product.price * quantity.value);

const handleDeleteFromCart = () => {
  dispatch('removeFromCart', props.product.id);

  updateUser(state.user.id, state.user).then((response) => {
    localStorage.setItem('user', JSON.stringify(response));
  });
};

const incrementQuantity = () => {
  if (quantity.value < 100) {
    emit('decrement-total', props.product.price * quantity.value);
    quantity.value++;

    updateUser(state.user.id, {
      ...state.user,
      cart: state.user.cart.map((item: Cart) =>
        item.product.id === props.product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response));
    });
    emit('increment-total', props.product.price * quantity.value);
  }
};

const decrementQuantity = () => {
  if (quantity.value > 0) {
    emit('decrement-total', props.product.price * quantity.value);
    quantity.value--;

    updateUser(state.user.id, {
      ...state.user,
      cart: state.user.cart.map((item: Cart) =>
        item.product.id === props.product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response));
    });
    emit('increment-total', props.product.price * quantity.value);
  }
};

onUnmounted(() => {
  emit('decrement-total', props.product.price * quantity.value);
});
</script>

<template>
  <div class="flex items-center gap-8">
    <img :src="product.images[0]" :alt="product.title" class="w-[100px] h-[100px] shadow rounded" />

    <div class="flex flex-col">
      <router-link :to="`/products/${product?.id}`" class="font-semibold text-2xl">{{
        product?.title
      }}</router-link>
      <small class="text-gray-500">{{ product?.category.name }}</small>
      <p class="font-semibold text-lg">$ {{ product?.price }}</p>
    </div>

    <div class="ml-auto flex flex-col gap-2">
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

    <div>
      <h4 class="flex gap-2">
        Total:
        <span class="text-xl font-semibold">$ {{ product && product.price * quantity }}</span>
      </h4>
    </div>

    <button class="p-1 bg-red-500 rounded" @click="handleDeleteFromCart">
      <img src="https://www.svgrepo.com/show/506767/trash.svg" alt="trash" class="w-8 h-8 invert" />
    </button>
  </div>
</template>
