import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
// @ts-ignore
import Menchin from '@/presets/menchin'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: Menchin,
})

app.use(router)
app.mount('#app')
