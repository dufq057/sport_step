import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import( '../views/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/login.vue'),
        meta: {
            requiresAuth: false
        }
    },
    // {
    //     path: '/wallet',
    //     name: 'wallet',
    //     component: () => import( '../views/wallet.vue'),
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    // {
    //     path: '/user',
    //     name: '用户查询',
    //     component: () => import( '../views/user.vue'),
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    {
        path: '/sport/index',
        name: '刷步首页',
        component: () => import( '../views/sport/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/sport/add',
        name: '刷步添加任务',
        component: () => import( '../views/sport/add.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/sport/edit',
        name: '刷步修改任务',
        component: () => import( '../views/sport/edit.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/jd/index',
        name: '京东首页',
        component: () => import( '../views/jd/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/jd/add',
        name: '刷步添加任务',
        component: () => import( '../views/jd/add.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/jd/edit',
        name: '刷步修改任务',
        component: () => import( '../views/jd/edit.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/setting/index',
        name: '我的',
        component: () => import( '../views/setting/index.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})
router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth){
        if(localStorage.getItem("sportToken")){
            next()
        }else{
            next({path:'/login'})
        }
    }else{
        if(to.meta.requiresAuth==null){
            next({path:'/login'})
        }else {
            next()
        }

    }
})

export default router
