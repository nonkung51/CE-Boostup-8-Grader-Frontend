import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/coding',
        name: 'Coding',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Coding.vue')
    },
    {
        path: '/submission',
        name: 'Submission',
        component: () =>
            import ('../views/Submission.vue')
    },
    {
        path: '/task',
        name: 'Task',
        component: () =>
            import ('../views/Task.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router