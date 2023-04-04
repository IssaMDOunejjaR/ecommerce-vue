<script setup lang="ts">
import NavbarLink from './NavbarLink.vue';
import SearchBar from './SearchBar.vue';
import Modal from './ModalComponent.vue';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import Cart from './CartComponent.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const { state, dispatch } = useStore();

const showAuth = ref(false);
const showCart = ref(false);
const authMode = ref<'signin' | 'signup'>('signin');

const toggleShow = (value: 'auth' | 'cart') => {
  if (value === 'auth') {
    showCart.value = false;
    showAuth.value = !showAuth.value;
  } else if (value === 'cart') {
    showAuth.value = false;
    showCart.value = !showCart.value;
  }
};

const toggleAuthMode = () => {
  authMode.value = authMode.value === 'signin' ? 'signup' : 'signin';
};

const handleLogout = () => {
  localStorage.removeItem('user');

  dispatch('setUser', null);
};
</script>

<template>
  <nav class="sticky top-0 bg-white px-3 border-b shadow-sm z-10">
    <div class="relative container flex items-center gap-8 py-3">
      <h1 class="text-5xl font-extrabold uppercase text-orange-500">E-Shop</h1>

      <ul class="hidden md:flex gap-4">
        <NavbarLink to="/" title="Home" />
        <NavbarLink to="/products" title="Products" />
        <NavbarLink to="/categories" title="Categories" />
      </ul>

      <SearchBar />

      <div class="ml-auto flex items-center gap-4">
        <button class="p-1.5 border rounded-full border-black" @click="() => toggleShow('cart')">
          <img src="https://www.svgrepo.com/show/506144/cart-4.svg" alt="cart" class="w-5 h-5" />
        </button>
        <button
          v-if="state.user"
          class="p-1.5 border rounded-full border-black"
          @click="handleLogout"
        >
          <img src="https://www.svgrepo.com/show/507772/logout.svg" alt="logout" class="w-5 h-5" />
        </button>
        <button class="p-1.5 border rounded-full border-black" @click="() => toggleShow('auth')">
          <img src="https://www.svgrepo.com/show/506352/user-1.svg" alt="user" class="w-5 h-5" />
        </button>
        <h3 v-if="state.user" class="font-semibold text-lg">{{ state.user.username }}</h3>
      </div>

      <Modal v-if="!state.user && showAuth">
        <SignIn v-if="authMode === 'signin'" @handle-toggle="toggleAuthMode" />
        <SignUp v-else @handle-toggle="toggleAuthMode" />
      </Modal>

      <Modal v-if="showCart">
        <Cart />
      </Modal>
    </div>
  </nav>
</template>
