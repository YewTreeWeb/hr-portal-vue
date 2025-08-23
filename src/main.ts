import { createPinia } from "pinia";
import { createApp, type App as VueApp } from "vue";
import App from "./App.vue";
import "./tailwind.css";

const app: VueApp = createApp(App);
app.use(createPinia());
app.mount("#app");
