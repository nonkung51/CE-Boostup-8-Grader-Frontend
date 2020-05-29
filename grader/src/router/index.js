import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: '/',
        component: Home,
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [{
                path: '/Home/coding/:task_id',
                name: 'Coding',
                component: () =>
                    import ('../views/Coding.vue')
            },
            {
                path: '/Home/submission',
                name: 'Submission',
                component: () =>
                    import ('../views/Submission.vue')
            },
            {
                path: '/Home/task',
                name: 'Task',
                component: () =>
                    import ('../views/Task.vue')
            },
            {
                path: '/Home/profile',
                name: 'Profile',
                component: () =>
                    import ('../views/Profile.vue')
            },
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () =>
            import ('../views/Auth.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name != 'Auth')
        if (!Vue.$cookies.get('user')) {
            next('/auth');
            return 0;
        }
    to;
    from;
    next();
});

export default router