<script setup lang="ts">
import TextBox from './TextBox.vue';
import Button from './ButtonComponent.vue';
import { authUser } from '../services/users';
import { ref } from 'vue';
import { useStore } from 'vuex';

const username = ref('');
const password = ref('');
const error = ref('');

const { dispatch } = useStore();

const handleSubmit = () => {
  error.value = '';

  authUser(username.value, password.value).then((response) => {
    if (response.length > 0) {
      localStorage.setItem('user', JSON.stringify(response[0]));

      dispatch('setUser', response[0]);
    } else {
      error.value = 'Invalid Username or Password';
    }
  });
};
</script>

<template>
  <form class="flex flex-col gap-4 min-w-[300px]" @submit.prevent="handleSubmit">
    <h2 class="text-3xl uppercase font-bold text-center">Login</h2>

    <p v-if="error" class="bg-red-500 text-white p-2 text-center">{{ error }}</p>

    <TextBox placeholder="Username" v-model="username" />
    <TextBox type="password" placeholder="Password" v-model="password" />

    <Button>Login</Button>

    <p className="text-sm text-center">
      Don&apos;t have an account ?
      <button
        type="button"
        className="text-blue-500 underline"
        @click="$emit('handle-toggle', 'signup')"
      >
        Create one now
      </button>
    </p>
  </form>
</template>
