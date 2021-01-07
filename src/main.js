import {createApp} from 'vue'
import Vuex from 'vuex'
import './assets/main.css'
import App from './App.vue'
import {routes} from './routes.js'
import {createRouter, createWebHistory} from 'vue-router'
import {initStore} from "./globalStore"
import VueMatomo from 'vue-matomo'

let app = createApp(App, {})

app.use(Vuex)
app.use(initStore())

let router = createRouter({
    history: createWebHistory(),
    routes: import.meta.hot ? [] : routes,
})

if (import.meta.hot) {
    let removeRoutes = []

    for (let route of routes) {
        removeRoutes.push(router.addRoute(route))
    }

    import.meta.hot.acceptDeps('./routes.js', ({routes}) => {
        for (let removeRoute of removeRoutes) removeRoute()
        removeRoutes = []
        for (let route of routes) {
            removeRoutes.push(router.addRoute(route))
        }
        router.replace('')
    })
}

app.use(router)

app.use(VueMatomo, {
    host: "https://analytics.reisishot.pictures",
    siteId: 2,
    router: router
})

app.mount('#app')