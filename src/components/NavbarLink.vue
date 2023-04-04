<script setup lang="ts">
import { defineProps } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  title: String;
}>();
</script>

<template>
  <li class="text-gray-500 font-semibold transition-colors hover:text-black">
    <router-link :to="to" active-class="text-black">{{ title }}</router-link>
  </li>
</template>
