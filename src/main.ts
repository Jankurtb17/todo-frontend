import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from './plugins/element-plus'
import Material from "./plugins/material"
import 'element-plus/dist/index.css'
import './assets/main.css'
import './index.css'
import { initializeApp } from "firebase/app";


// For Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsXwadglpNccVPBrmqNHt3yQHipkH_-yI",
  authDomain: "todo-ceb51.firebaseapp.com",
  projectId: "todo-ceb51",
  storageBucket: "todo-ceb51.appspot.com",
  messagingSenderId: "926542903835",
  appId: "1:926542903835:web:84127aca517d5450c896be",
  measurementId: "G-5269R9P1E8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Material)
app.use(ElementPlus)
app.mount('#app')
