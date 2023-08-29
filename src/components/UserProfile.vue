<template>
    <div>
      <h1>Welcome to your profile, {{ username }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "John Doe" // This will be fetched from the server later
      };
    },
    mounted() {
      // Fetch user data from the server here
      if (!this.$cookies.get("authToken")) {
      this.$router.push({ name: "login" });
    }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styling here */
  </style>
  