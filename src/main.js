import { createApp } from 'vue'
import axios from 'axios'
import router from "./router";
import store from './store'
import App from './App.vue'
import components from './components/UI'

// Прикрепляем JWT ко всем запросам (админ-эндпоинты защищены на бэке).
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .use(store)
    .mount('#app')

// Событие для prerender-spa-plugin
router.isReady().then(() => {
    document.dispatchEvent(new Event('render-event'))
})
