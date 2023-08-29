<template>
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
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8888/login', {
          username: this.username,
          password: this.password
        });
        console.log('User logged in:', response);
        // You can store the JWT token here if needed
        this.$cookies.set("authToken", response.data.token);
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
  