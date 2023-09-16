import { createStore } from 'vuex';
import axios from 'axios';

const API_URL= process.env.VUE_APP_API_URL || "http://localhost:8888"

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
        const response = await axios.post(API_URL+'/login', {
          username: payload.username,
          password: payload.password,
        });

        if (response.data && response.data.token) {
          commit('setAuthToken', response.data.token);
          commit('setUsername', payload.username); 
          return Promise.resolve('Login successful');
        } else {
          return Promise.reject(new Error('Invalid credentials'));
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkAuth({ commit, state }) {
      const headers = {};
      if (state.authToken) {
        headers['Authorization'] = `Bearer ${state.authToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      try {
        const response = await axios.get(API_URL+'/check-auth', { headers });
    
        if (response.data && response.data.isAuthenticated) {
          commit('setAuthToken', state.authToken);
          return Promise.resolve('User is authenticated');
        } else {
          commit('clearAuthToken');
          return Promise.reject(new Error('User is not authenticated'));
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
