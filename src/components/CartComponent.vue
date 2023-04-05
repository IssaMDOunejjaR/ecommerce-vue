<script setup lang="ts">
import { useStore } from 'vuex';
import CartCard from './CartCard.vue';

const { state } = useStore();
</script>

<template>
  <div class="flex flex-col gap-4 min-w-[300px]">
    <h2 class="text-3xl uppercase font-bold">Cart</h2>

    <div class="min-h-[200px]">
      <p v-if="!state.user" class="text-lg text-center py-8">You need to login.</p>
      <p v-else-if="!state.user.cart.length" class="mx-auto text-lg max-w-[150px] text-center py-8">
        You dont have any products in your cart.
      </p>
      <div v-else>
        <div class="flex flex-col gap-2">
          <CartCard
            v-for="(item, index) in state.user.cart.slice(0, 4)"
            :key="index"
            :product="item.product"
            :quantity="item.quantity"
          />
        </div>
      </div>
    </div>

    <p v-if="state.user?.cart.length > 4" class="text-sm text-gray-500 text-center italic">
      And {{ state.user?.cart.length - 4 }} more products
    </p>
    <router-link
      to="/cart"
      class="text-center p-3 rounded bg-orange-500 text-white uppercase font-semibold"
    >
      Go to cart page
    </router-link>
  </div>
</template>
