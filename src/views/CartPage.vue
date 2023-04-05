<script setup lang="ts">
import CartPageCard from '@/components/CartPageCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const { state } = useStore();

const total = ref(0);

const handleIncrementTotal = (value: number) => {
  total.value += value;
};

const handleDecrementTotal = (value: number) => {
  total.value -= value;
};
</script>

<template>
  <main class="px-4">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-4">Cart</h1>

      <div>
        <p v-if="!state.user" class="text-2xl font-semibold text-center py-8">You need to login.</p>
        <p
          v-else-if="!state.user.cart.length"
          class="mx-auto max-w-[250px] text-center py-8 text-2xl font-semibold"
        >
          You dont have any products in your cart.
        </p>
        <div v-else class="flex flex-col gap-4">
          <CartPageCard
            v-for="(item, index) in state.user.cart"
            :key="index"
            :product="item.product"
            :quantity="item.quantity"
            @increment-total="handleIncrementTotal"
            @decrement-total="handleDecrementTotal"
          />

          <div class="flex gap-4 justify-end p-4">
            <p class="text-lg font-semibold flex items-center gap-6">
              Total Price: <span class="text-4xl font-bold">$ {{ total }}</span>
            </p>

            <router-link
              to="/checkout"
              class="py-2 px-4 font-semibold bg-orange-500 rounded text-white"
              >Go to checkout</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
