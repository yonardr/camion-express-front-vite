import { createRouter, createWebHistory } from 'vue-router'

import Main from "../pages/Main.vue";
import Documents from "../pages/Documents.vue";
import AuthPage from "../pages/AuthPage.vue";
import PersonalAccount from "../pages/PersonalAccount.vue";
import DocumentsAdmin from "../pages/DocumentsAdmin.vue";
import Calculator from "../components/MainPage/Calculator.vue";
import NewsPage from "../pages/NewsPage.vue";


const routes = [
    {
        name: 'main',
        path: '/',
        component: Main
    },
    {
        name:'docs',
        path: '/documents',
        component: Documents
    },
    {
        name: 'auth',
        path: '/auth',
        component: AuthPage
    },
    {
      path: '/news/:id',
      component: NewsPage
    },
    {
        name: 'personal',
        path: '/personal',
        component: PersonalAccount,
        children: [
            {
                name: 'docsEdit' ,
                path: 'docsEdit',
                component: DocumentsAdmin
            },
            {
                name: 'calcEdit' ,
                path: 'calcEdit',
                component: Calculator
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                left: 0,
                top: 110,
                behavior: 'smooth'
            }
        }
    }
})
export default router
