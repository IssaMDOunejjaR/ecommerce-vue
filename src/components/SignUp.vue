<script setup lang="ts">
import TextBox from './TextBox.vue';
import Button from './ButtonComponent.vue';
import { ref } from 'vue';
import { createUser } from '../services/users';
const username = ref('');
const email = ref('');
const password = ref('');

const handleSubmit = () => {
  createUser({
    username: username.value,
    email: email.value,
    password: password.value,
    cart: [],
    orders: []
  }).then((response) => {
    console.log(response);
  });
};
</script>

<template>
  <form class="flex flex-col gap-4 min-w-[300px]" @submit.prevent="handleSubmit">
    <h2 class="text-2xl uppercase font-bold text-center">Create an account</h2>

    <TextBox placeholder="Username" v-model="username" />
    <TextBox type="email" placeholder="Email" v-model="email" />
    <TextBox type="password" placeholder="Password" v-model="password" />

    <Button>Register</Button>

    <p className="text-sm text-center">
      Already have an account ?
      <button
        type="button"
        className="text-blue-500 underline"
        @click="$emit('handle-toggle', 'signin')"
      >
        Login
      </button>
    </p>
  </form>
</template>
