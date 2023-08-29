<template>
    <div class="navbar">
      <div class="container">
        <div class="nav-item">
          <router-link to="/">Home</router-link>
        </div>
        <div class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register">Register</router-link>
        </div>
        <div class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </div>
        <div class="nav-item" v-else>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        isLoggedIn: false, // You'll replace this with real authentication status
      };
    },
    methods: {
      logout() {
        // Clear token from cookies
        this.$cookies.remove("authToken");
  
        // Redirect to login page
        this.$router.push({ name: "login" });
  
        // Update isLoggedIn status
        this.isLoggedIn = false;
      },
    },
    mounted() {
      // Check if user is logged in when component mounts
      // Replace this with real authentication check
      axios.get('/check-auth')
        .then(response => {
        this.isLoggedIn = response.data.authenticated;
        })
        .catch(error => {
        console.error('An error occurred:', error);
        });    
    },
    watch: {
      // Watch for changes in the route
      // eslint-disable-next-line
      $route(to, from) {
        axios.get('/check-auth')
            .then(response => {
                this.isLoggedIn = response.data.authenticated;
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
        },
    },
  };
  </script>
  
  <style>
  .navbar {
    position: sticky;
    top: 0;
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-item {
    margin: 0 1rem;
  }
  </style>
  