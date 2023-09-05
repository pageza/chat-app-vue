import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.withCredentials = true; // Send cookies and headers with each request

createApp(App).use(router).use(store).mount('#app')
