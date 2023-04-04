<script setup lang="ts">
import CartPageCard from '@/components/CartPageCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const { state } = useStore();

const totalPrice = ref(0);

const handleUpdateTotalPrice = (value: number) => {
  totalPrice.value += value;
};
</script>

<template>
  <main class="p-4">
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
            :product-id="item.productId"
            :quantity="item.quantity"
            @update-total="handleUpdateTotalPrice"
          />

          <div class="flex justify-end p-4">
            <p class="text-lg font-semibold flex items-center gap-6">
              Total Price: <span class="text-4xl font-bold">$ {{ totalPrice }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
