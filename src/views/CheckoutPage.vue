<script setup lang="ts">
import TextBox from '@/components/TextBox.vue';
import Button from '@/components/ButtonComponent.vue';
import { ref } from 'vue';
import OrderCardVue from '@/components/OrderCard.vue';
import { useStore } from 'vuex';
import { updateUser } from '../services/users';
import type { Order, User } from '../types';
import { useRouter } from 'vue-router';
import { countries } from '../constants';

const router = useRouter();

const { state, dispatch } = useStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const postalCode = ref('');
const address = ref('');
const country = ref('');
const cardNumber = ref('');
const securityCode = ref('');
const expirationDate = ref('');

const total = ref(0);

const handleTotal = (value: number) => {
  total.value += value;
};

const handleSubmit = () => {
  const orderId = Date.now();

  const order: Order = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    codePostal: postalCode.value,
    address: address.value,
    cardNumber: cardNumber.value,
    cardSecurityCode: securityCode.value,
    cardExpirationDate: expirationDate.value,
    country: country.value,
    items: state.user.cart,
    orderId,
    totalPaid: total.value
  };

  const body: User = {
    ...state.user,
    orders: [...state.user.orders, order]
  };

  updateUser(state.user.id, body).then((response) => {
    dispatch('setUser', response);
    dispatch('clearCart');

    localStorage.setItem('user', JSON.stringify(response));

    router.push(`/order-confirmation/${orderId}`);
  });
};
</script>

<template>
  <main class="p-4">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-4">Checkout</h1>

      <div class="flex flex-col md:flex-row gap-4">
        <form class="flex flex-col gap-4 flex-1" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold">Personnal Information</h2>

            <div class="flex gap-2">
              <TextBox placeholder="First Name" v-model="firstName" />
              <TextBox placeholder="Last Name" v-model="lastName" />
            </div>
            <TextBox type="email" placeholder="Email" v-model="email" />
            <div class="flex gap-2">
              <label class="w-full text-sm flex flex-col gap-1">
                Country
                <select
                  class="w-full p-2 border border-gray-300 rounded"
                  v-model="country"
                  required
                >
                  <option value="" selected disabled>Select Country</option>
                  <option v-for="(country, index) in countries" :key="index" :value="country">
                    {{ country }}
                  </option>
                </select>
              </label>
              <TextBox placeholder="Postal Code" v-model="postalCode" />
            </div>
            <TextBox placeholder="Address" v-model="address" />
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold">Payment Details</h2>

            <TextBox placeholder="Card Number" v-model="cardNumber" />
            <div class="flex gap-2">
              <TextBox placeholder="Security Code" v-model="securityCode" />
              <TextBox type="date" placeholder="Expiration Date" v-model="expirationDate" />
            </div>
          </div>

          <Button>Confirm</Button>
        </form>

        <div class="w-[400px] border rounded border-gray-300 shadow-sm flex flex-col">
          <div class="p-4 flex flex-col">
            <h2 class="text-2xl font-semibold">Your Order</h2>

            <OrderCardVue
              v-for="(item, index) in state.user?.cart"
              :key="index"
              :product="item.product"
              :quantity="item.quantity"
              @handle-total="handleTotal"
            />
          </div>

          <div class="p-4 border-t mt-auto flex justify-between">
            <h2 class="text-lg font-semibold">Total:</h2>
            <p class="text-5xl font-bold">$ {{ total }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
