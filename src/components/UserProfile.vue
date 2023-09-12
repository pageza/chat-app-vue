<template>
  <!-- Display the username fetched from the Vuex store -->
  <div>
    <h1>Welcome to your profile, {{ username }}</h1>
  </div>
</template>

<script>
// Import the Vuex store to access its state and getters
import { mapGetters } from 'vuex';

export default {
  // Computed properties to get data from the Vuex store
  computed: {
    // Use mapGetters to map the Vuex getter 'username' to this component
    ...mapGetters(['username', 'isAuthenticated'])
  },
  mounted() {
    // Check if the user is authenticated using the Vuex getter 'isAuthenticated'
    // If the user is not authenticated, redirect them to the login page
    if (!this.isAuthenticated) {
      this.$router.push({ name: "UserLogin" });
    }
    // If the user is authenticated, you could fetch additional user data here
    // For now, we are using the username from the Vuex store
  }
};
</script>

<style scoped>
/* Add your CSS styling here */
</style>
