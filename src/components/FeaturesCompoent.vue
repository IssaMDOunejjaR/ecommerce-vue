<script setup lang="ts">
import FeatureCard from './FeatureCard.vue';
</script>

<template>
  <div class="p-4 bg-black text-white">
    <div class="container grid gap-4 items-center justify-center md:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        title="Free Delivery"
        description="Free shipping on all order"
        img="https://www.svgrepo.com/show/513006/truck-round-653.svg"
      />
      <FeatureCard
        title="Online support 24/7"
        description="Support online 24 hours a day"
        img="https://www.svgrepo.com/show/486865/support.svg"
      />
      <FeatureCard
        title="Money Return"
        description="Back guarantee under 7 days"
        img="https://www.svgrepo.com/show/509169/money.svg"
      />
      <FeatureCard
        title="Member Discount"
        description="On every order over $120.00"
        img="https://www.svgrepo.com/show/506817/discount.svg"
      />
    </div>
  </div>
</template>
