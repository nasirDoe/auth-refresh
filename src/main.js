import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import router from '@/router'
import store from '@/store'
import axiosInterceptors from '@/http/refreshToken'
axiosInterceptors(store)
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
