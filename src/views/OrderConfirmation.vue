<script setup lang="ts">
import OrderCardVue from '@/components/OrderCard.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import type { Order } from '../types';
import { ref } from 'vue';

const { state } = useStore();
const { params } = useRoute();

const order = state.user.orders.filter((o: Order) => o.orderId === +params['id'])[0];

const total = ref(0);

const handleTotal = (value: number) => {
  total.value += value;
};
</script>

<template>
  <main class="p-4">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-8 flex flex-col items-center gap-2">
        <img
          src="https://www.svgrepo.com/show/509325/check-circle.svg"
          alt="check"
          class="w-[70px] h-[70px]"
        />
        Thank You For Your Order!
      </h1>

      <div class="max-w-[500px] mx-auto border border-gray-300 rounded">
        <div class="flex flex-col">
          <div class="flex justify-between bg-gray-300 font-bold p-3">
            <h2>Order Confirmation #</h2>
            <p>{{ order.orderId }}</p>
          </div>

          <div class="p-3">
            <OrderCardVue
              v-for="(item, index) in order.items"
              :key="index"
              :product="item.product"
              :quantity="item.quantity"
              @handle-total="handleTotal"
            />
          </div>
        </div>

        <div class="border-t p-3 flex flex-col gap-6">
          <p class="text-lg font-semibold flex justify-between">
            Total <span class="text-3xl font-bold">$ {{ total }}</span>
          </p>

          <div class="flex justify-between">
            <div class="flex flex-col">
              <h3 class="font-semibold">Delivery Address</h3>

              <p class="text-sm">{{ order.address }} {{ order.codePostal }}</p>
              <p class="text-sm">{{ order.country }}</p>
            </div>

            <div class="flex flex-col">
              <h3 class="font-semibold">User Information</h3>

              <p class="text-sm">{{ order.firstName }} {{ order.lastName }}</p>
              <p class="text-sm">{{ order.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
