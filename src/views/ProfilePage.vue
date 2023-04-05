<script setup lang="ts">
import { useStore } from 'vuex';

const { state } = useStore();
</script>

<template>
  <main>
    <div class="container flex flex-col md:flex-row gap-4">
      <div class="md:w-[400px] flex flex-col items-center justify-center">
        <div class="rounded-full p-4 border-2 border-black mb-4">
          <img
            src="https://www.svgrepo.com/show/506352/user-1.svg"
            :alt="state.user.username"
            class="w-[100px] h-[100px]"
          />
        </div>
        <h2 class="text-2xl font-semibold">{{ state.user.username }}</h2>
        <p class="text-gray-500">{{ state.user.email }}</p>
      </div>
      <div class="flex-1 p-4">
        <h3 class="text-2xl font-bold mb-6 text-center md:text-left">Orders</h3>

        <div class="flex flex-col gap-2">
          <router-link
            v-for="(order, index) in state.user.orders"
            :to="`/order-confirmation/${order.orderId}`"
            :key="index"
            class="flex justify-between p-4 border border-gray-400 rounded"
          >
            <h4 class="text-lg font-semibold">#{{ order.orderId }}</h4>
            <p class="text-3xl font-bold">$ {{ order.totalPaid }}</p>
          </router-link>

          <p v-if="state.user.orders.length === 0" class="text-lg font-semibold text-center">
            You don't have any orders yet !
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
