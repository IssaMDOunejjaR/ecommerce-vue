<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
  title: string;
  description: string;
  img: string;
}>();
</script>

<template>
  <div class="flex gap-4 items-center justify-center">
    <div class="p-4 border border-white rounded-full">
      <img :src="img" :alt="title" class="w-10 h-10 invert" />
    </div>

    <div>
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="text-xs">{{ description }}</p>
    </div>
  </div>
</template>
