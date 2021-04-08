import { createApp } from 'vue'
import router from "@/router";
import App from './App.vue'
import antd from './plugin/antd'

createApp(App).use(router).use(antd).mount('#app')
