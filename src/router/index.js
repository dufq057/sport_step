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
    {
        path: '/resetPwd',
        name: 'resetPwd',
        component: () => import( '../views/resetPwd.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( '../views/register.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/video/index',
        name: '去水印',
        component: () => import( '../views/video/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/setting/invite',
        name: '邀请好友',
        component: () => import( '../views/setting/invite'),
        meta: {
            requiresAuth: true
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
        path: '/music/index',
        name: '网易云',
        component: () => import( '../views/music/index'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/music/add',
        name: '网易云',
        component: () => import( '../views/music/add'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/music/edit',
        name: '网易云',
        component: () => import( '../views/music/edit'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/setting/tuiJianMa',
        name: '推荐码',
        component: () => import( '../views/setting/tuiJianMa'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/integral',
        name: '赚积分',
        component: () => import( '../views/user/integral'),
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
