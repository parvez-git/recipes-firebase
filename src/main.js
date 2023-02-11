import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '@/firebase'
import './style.css'

let app
auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
        app.provide('store', store)
        app.use(router)
        app.mount('#app')
    }
})
