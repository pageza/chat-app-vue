<template>
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
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8888/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        console.log('User registered:', response);

        // Redirect to profile page
        this.router.push({ name: 'UserProfile' });
      } catch (error) {
        console.error('An error occurred while registering:', error);
      }
    }
  }
};
</script>
