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
      console.log("Setting auth token:", token);  // <-- Add this line

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
        console.log("Login response:", response);  // <-- Add this line

        if (response.data && response.data.token) {
          console.log("Received token:", response.data.token);  // <-- Add this line

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
      console.log("Entering checkAuth action");  // <-- Add this line
    
      console.log("Auth Token:", state.authToken);
      const headers = {};
      if (state.authToken) {
        headers['Authorization'] = `Bearer ${state.authToken}`;
        console.log("Setting Authorization header");  // <-- Add this line
      } else {
        console.log("No auth token found, clearing Authorization header");  // <-- Add this line
        delete axios.defaults.headers.common['Authorization'];
      }
    
      try {
        console.log("Sending API request to check auth");  // <-- Add this line
        const response = await axios.get(API_URL+'/check-auth', {
          headers,
        });
        console.log("API Response:", response.data);
    
        if (response.data && response.data.isAuthenticated) {
          console.log("User is authenticated, updating token");  // <-- Add this line
          commit('setAuthToken', state.authToken);
          return Promise.resolve('User is authenticated');
        } else {
          console.log("User is not authenticated, clearing token");  // <-- Add this line
          commit('clearAuthToken');
          return Promise.reject('User is not authenticated');
        }
      } catch (error) {
        console.log("API Error:", error);
        console.log("Clearing auth token due to API error");  // <-- Add this line
    
        commit('clearAuthToken');
        return Promise.reject(error);
      }
    }
    
    // async checkAuth({ commit, state }) {
    //   console.log("Auth Token:", state.authToken);
    //   const headers = {};
    //   if (state.authToken) {
    //     headers['Authorization'] = `Bearer ${state.authToken}`;
    //   }else {
    //     delete axios.defaults.headers.common['Authorization'];
    //   }
    //   try {
    //     // Replace with your API endpoint
    //     const response = await axios.get(API_URL+'/check-auth', {
    //       headers,
    //     });
    //     console.log("API Response:", response.data);

    //     if (response.data && response.data.isAuthenticated) {
    //       // Optionally update the token
    //       commit('setAuthToken', state.authToken);
    //       return Promise.resolve('User is authenticated');
    //     } else {
    //       commit('clearAuthToken');
    //       return Promise.reject('User is not authenticated');
    //     }
    //   } catch (error) {
    //     console.log("API Error:", error);

    //     commit('clearAuthToken');
    //     return Promise.reject(error);
    //   }
    // },
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
