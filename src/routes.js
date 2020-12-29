import Home from './views/Vertrag.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
    {path: '/', component: Home, meta: {title: 'Reisishot Fotoshooting Vertrag'}},
    {path: '/:path(.*)', component: NotFound},
]
