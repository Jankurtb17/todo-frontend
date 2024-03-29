import { createApp } from "vue";
import { createPinia } from "pinia";
import { auth } from "@/firebase/firebase.js"
import App from "./App.vue";

import ElementPlus from "./plugins/element-plus";
import router from "./router";
import Material from "./plugins/material";
import "element-plus/dist/index.css";
import "./assets/main.css";
import "./index.css";
const app = createApp(App);
app.config.globalProperties.$auth = auth;
app.use(createPinia());
app.use(router);
app.use(Material);
app.use(ElementPlus);
app.mount("#app");
