import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,


    routes: [
        {
            path: '/',
            name: 'musteri',
            component: () => import('./views/Musteri.vue')
        },
        {
            path: '/musteri',
            name: 'musteri',
            component: () => import('./views/Musteri.vue')
        },
        {
            path: '/urun',
            name: 'urun',
            component: () => import('./views/Urun.vue')
        },
        {
            path: '/calisan',
            name: 'calisan',
            component: () => import('./views/Calisan.vue')
        },
        {
            path: '/bakim',
            name: 'bakim',
            component: () => import('./views/Bakim.vue')
        }

    ]
})
export default router
