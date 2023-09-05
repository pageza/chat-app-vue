import { createStore } from 'vuex';

export default createStore({
  state: {
    authToken: null,
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
  },
  actions: {
    // Async operations can go here
  },
  getters: {
    isAuthenticated(state) {
      return !!state.authToken;
    },
  },
});
