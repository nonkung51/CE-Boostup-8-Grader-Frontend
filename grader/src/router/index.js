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
    var noAuthPath = ['/api', '/gists']

    if (noAuthPath.includes(to.path)) {
        next();
        return 0;
    }

    var existPath = [];
    // get all path
    routes.forEach(el => {
        existPath.push(el.path)
        if (el.children)
            el.children.forEach(child => {
                existPath.push(child.path)
            })
    })


    if (to.name != 'Auth') {
        if (!Vue.$cookies.get('user')) {
            next('/auth');
            return 0;
        }
    } else {
        if (to.name == 'Auth') // 
            if (Vue.$cookies.get('user')) {
            next(from.path);
            return 0;
        }
    }


    if (to.name != "Coding" && !existPath.includes(to.path)) {
        next('/');
    }

    next();
});

export default router