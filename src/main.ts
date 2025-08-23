import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/tailwind.css'

const app: VueApp = createApp(App)
app.use(createPinia())
app.mount('#app')
