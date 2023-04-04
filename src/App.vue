<script setup lang="ts">
import Navbar from './components/NavbarComponent.vue';
import Footer from './components/FooterComponent.vue';
import { useStore } from 'vuex';

const { dispatch } = useStore();

const user = localStorage.getItem('user');

if (user) {
  dispatch('setUser', JSON.parse(user));
}
</script>

<template>
  <div class="flex flex-col min-h-screen gap-8">
    <Navbar />

    <router-view />

    <Footer />
  </div>
</template>
