<template>
  <!-- Login form -->
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
// Import the Vuex store to access its actions
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    // Map Vuex actions to methods in this component
    ...mapActions(['loginUser']),
    async login() {
      try {
        // Call the Vuex action 'loginUser' to handle the login logic
        const response = await this.loginUser({
          username: this.username,
          password: this.password
        });
        console.log("Server Response:", response);
        // Redirect to the UserProfile page after successful login
        this.$router.push({ name: "UserProfile" });
      } catch (error) {
        console.error('An error occurred while logging in:', error);
      }
    }
  }
};
</script>



  <style scoped>
  .login {
    width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: inline-block;
    width: 100px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  </style>
  