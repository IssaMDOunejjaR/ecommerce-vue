<script setup lang="ts">
import { getProductById, getProductsByCategory } from '../services/products';
import { updateUser } from '../services/users';
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import type { Cart, Product } from '../types';
import Loader from '../components/LoaderComponent.vue';
import ProductCard from '../components/ProductCard.vue';

import { useStore } from 'vuex';

const { state, dispatch } = useStore();

const route = useRoute();

const product = ref<Product>();
const similarProducts = ref<Product[]>([]);
const selectedPicture = ref();
const isLoading = ref(true);
const quantity = ref(1);

watchEffect(() => {
  isLoading.value = true;

  getProductById(+route.params['id']!).then((response) => {
    product.value = response;
    selectedPicture.value = product?.value?.images[0];

    getProductsByCategory(product.value.category.id).then((response) => {
      similarProducts.value = response.filter((item) => item.id !== product?.value?.id).slice(0, 4);

      isLoading.value = false;
    });
  });
});

const incrementQuantity = () => {
  if (quantity.value < 100) quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const handleAddToCart = () => {
  const payload = { product: product.value, quantity: quantity.value };

  updateUser(state.user.id, {
    ...state.user,
    cart: [
      ...state.user.cart.filter((item: Cart) => item.product.id !== product.value?.id),
      payload
    ]
  }).then((response) => {
    localStorage.setItem('user', JSON.stringify(response));
    dispatch('addToCart', payload);
  });
};
</script>

<template>
  <main class="p-4">
    <div class="container">
      <div class="flex flex-col lg:flex-row">
        <div class="flex flex-col gap-4 flex-1">
          <img :src="selectedPicture" :alt="product?.title" class="rounded shadow" />

          <div class="flex justify-center gap-4">
            <div
              v-for="(img, index) in product?.images"
              :key="index"
              class="cursor-pointer border border-transparent p-0.5 rounded shadow"
              :class="{ '!border-black': selectedPicture === img }"
              @click="selectedPicture = img"
            >
              <img
                :src="img"
                :alt="`${product?.title}_img_${index}`"
                class="w-[120px] h-[120px] rounded"
              />
            </div>
          </div>
        </div>

        <div class="p-8 flex-1">
          <h2 class="text-2xl font-bold">{{ product?.title }}</h2>
          <small class="text-gray-500">{{ product?.category.name }}</small>

          <h3 class="font-semibold mt-6">Description:</h3>
          <p class="max-w-[60%]">{{ product?.description }}</p>

          <h3 class="font-semibold mt-6">Quantity:</h3>
          <div class="flex items-center gap-2 mt-2">
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

          <div class="flex items-center mt-6 gap-4">
            <button
              class="bg-orange-500 flex items-center gap-4 p-4 rounded text-white uppercase font-semibold"
              @click="handleAddToCart"
            >
              <img
                src="https://www.svgrepo.com/show/506144/cart-4.svg"
                alt="cart"
                class="w-6 h-6 invert"
              />
              Add to cart
            </button>

            <p class="text-3xl font-bold p-4 flex items-center">${{ product?.price }}</p>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-4">Similar Products</h2>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="(product, index) in similarProducts" :key="index" :data="product" />
        </div>
      </div>
    </div>
  </main>

  <Loader v-if="isLoading" />
</template>
