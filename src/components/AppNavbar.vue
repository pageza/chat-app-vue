<template>
  <div class="navbar">
    <div class="container">
      <div class="nav-item">
        <router-link to="/">Home</router-link>
      </div>
      <!-- Use Vuex getter to check if user is logged in -->
      <div class="nav-item" v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </div>
      <div class="nav-item" v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </div>
      <div class="nav-item" v-else>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vuex mapGetters and mapActions to access store state and actions
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    // Map Vuex getters to computed properties
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    // Map Vuex actions to methods
    ...mapActions(['logoutUser', 'checkAuth']),
    async logout() {
      // Call Vuex action to handle logout
      await this.logoutUser();
      this.$router.push({ name: "UserLogin" });
    }
  },
  async mounted() {
    // Call Vuex action to check authentication status
    await this.checkAuth();
  },
  watch: {
    // Watch for changes in the route
    // eslint-disable-next-line
    async $route(to, from) {
      // Call Vuex action to check authentication status
      await this.checkAuth();
    }
  }
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
  