<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ type?: string; placeholder: string; modelValue: String }>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <label class="flex flex-col gap-1 text-sm w-full" :for="placeholder"
    >{{ placeholder }}

    <input
      :type="type"
      :id="placeholder"
      :placeholder="placeholder"
      class="border border-gray-300 p-2 rounded flex-1"
      :value="modelValue"
      @input="updateValue"
      required
    />
  </label>
</template>
