<template>
  <!-- Registration form -->
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" />
      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
// Import the Vuex store to access its actions
import { mapActions } from 'vuex';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    // Map Vuex actions to methods in this component
    ...mapActions(['registerUser']),
    async register() {
      try {
        // Call the Vuex action 'registerUser' to handle the registration logic
        await this.registerUser({
          username: this.username,
          email: this.email,
          password: this.password
        });
        
        // Redirect to the UserProfile page after successful registration
        this.$router.push({ name: "UserProfile" });
      } catch (error) {
        console.error('An error occurred while registering:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your CSS styling here */
</style>
