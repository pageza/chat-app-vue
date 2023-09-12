import { createStore } from 'vuex';
import axios from 'axios';

const API_URL= "http://localhost:8888"

export default createStore({
  state: {
    authToken: null,
    username: null,
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    async loginUser({ commit }, payload) {
      try {
        // Replace with your API endpoint
        const response = await axios.post(API_URL+'/login', {
          username: payload.username,
          password: payload.password,
        });

        if (response.data && response.data.token) {
          commit('setAuthToken', response.data.token);
          commit('setUsername', payload.username); // Assuming username is returned
          return Promise.resolve('Login successful');
        } else {
          return Promise.reject('Invalid credentials');
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkAuth({ commit, state }) {
      try {
        // Replace with your API endpoint
        const response = await axios.get(API_URL+'/check-auth', {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
        });

        if (response.data && response.data.isAuthenticated) {
          // Optionally update the token
          commit('setAuthToken', state.authToken);
          return Promise.resolve('User is authenticated');
        } else {
          commit('clearAuthToken');
          return Promise.reject('User is not authenticated');
        }
      } catch (error) {
        commit('clearAuthToken');
        return Promise.reject(error);
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.authToken;
    },
    username(state) {
      return state.username;
    },
  },
});
