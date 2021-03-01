import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import( '../views/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/login.vue')
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: () => import( '../views/wallet.vue')
    },
    {
        path: '/user',
        name: '用户查询',
        component: () => import( '../views/user.vue')
    },
    {
        path: '/sport/add',
        name: '添加任务',
        component: () => import( '../views/sport/add.vue')
    },
    {
        path: '/sport/edit',
        name: '修改任务',
        component: () => import( '../views/sport/edit.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import( '../views/setting.vue')
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})
router.beforeEach((to, from, next) => {
    if(to.path === '/'){
        if (!localStorage.getItem("sportToken")){
            next({
                path:'/login'
            })
        }
    }
    next()
})

export default router
