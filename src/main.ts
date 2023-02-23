import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from './plugins/element-plus'
import Material from "./plugins/material"
import 'element-plus/dist/index.css'
import './assets/main.css'
import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Material)
app.use(ElementPlus)
app.mount('#app')
