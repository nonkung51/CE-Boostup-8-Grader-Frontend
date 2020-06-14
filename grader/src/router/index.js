import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [{
                path: '/Home/dashboard',
                name: 'Dashboard',
                component: () =>
                    import ('../views/Dashboard.vue')
            },
            {
                path: '/Home/submission',
                name: 'Submission',
                component: () =>
                    import ('../views/Submission.vue')
            },
            {
                path: '/Home/task',
                component: () =>
                    import ('../views/Task.vue'),
                children: [{
                        path: '',
                        component: () =>
                            import ('../views/Tasks.vue'),
                    },
                    {
                        path: ':task_id',
                        name: 'Coding',
                        component: () =>
                            import ('../views/Coding.vue'),
                    },
                ],
            },
            {
                path: '/Home/profile',
                name: 'Profile',
                component: () =>
                    import ('../views/Profile.vue')
            },
            {
                path: '/Home/learn',
                beforeEnter() { location.href = 'https://stackoverflow.com' }
            }
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
    var noAuthPath = ['/api', '/gists']

    if (noAuthPath.includes(to.path)) {
        next();
        return 0;
    }

    var existPath = [];
    // get all path
    routes.forEach(el => {
        // root
        existPath.push(el.path)
        if (el.children)
        // root child
            el.children.forEach(child => {
            existPath.push(child.path);
            // root child child
            if (child.children)
                child.children.forEach(c => {
                    existPath.push(c.path)
                })
        })
    })


    var cookie = store.state.user.data
    if (to.name != 'Auth') {
        if (!cookie.username) {
            next('/auth');
            return 0;
        }
    } else {
        if (to.name == 'Auth') // 
            if (cookie.username) {
            next(from.path);
            return 0;
        }
    }

    if (to.name != "Coding" && !existPath.includes(to.path)) {
        next('/Home/dashboard');
    }

    next();
});

export default router