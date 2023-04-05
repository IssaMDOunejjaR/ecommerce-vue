import { updateUser } from '@/services/users';
import type { User } from '@/types';
import { createStore } from 'vuex';

export const store = createStore<{
  user: User | null;
}>({
  state() {
    return {
      user: null
    };
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    addToCart: (state, payload) => {
      if (state.user) {
        state.user.cart = [...state.user.cart, payload];
      }
    },
    removeFromCart: (state, payload) => {
      if (state.user) {
        state.user.cart = state.user.cart.filter((item) => item.product.id !== payload);
      }
    },
    decrementProductFromCart: (state, payload) => {
      if (state.user) {
        state.user.cart = state.user.cart.map((item) =>
          item.product.id === payload ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    },
    clearCart: (state) => {
      if (state.user) {
        state.user.cart = [];
      }
    },
    incrementProductFromCart: (state, payload) => {
      if (state.user) {
        state.user.cart = state.user.cart.map((item) =>
          item.product.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    }
  },
  actions: {
    setUser: ({ commit }, payload) => {
      commit('setUser', payload);
    },
    addToCart: ({ commit }, payload) => {
      commit('addToCart', payload);
    },
    removeFromCart: ({ commit }, payload) => {
      commit('removeFromCart', payload);
    },
    clearCart: ({ commit, state }) => {
      if (state.user) {
        updateUser(state.user.id, { ...state.user, cart: [] }).then(() => {
          commit('clearCart');
        });
      }
    },
    decrementProductFromCart: ({ commit }, payload) => {
      commit('decrementProductFromCart', payload);
    },
    incrementProductFromCart: ({ commit }, payload) => {
      commit('incrementProductFromCart', payload);
    }
  },
  getters: {}
});
