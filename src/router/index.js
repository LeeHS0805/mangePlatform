import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/login";
import home from "../components/home";
import welcome from "../components/welcome";
import users from "../components/user/users";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        redirect: '/welcome',
        path: '/home',
        name: 'home',
        component: home,
        children:
            [
                {
                    path: '/welcome',
                    name: 'welcome',
                    component: welcome
                },
                {
                    path: '/users',
                    name: 'users',
                    component: users
                }
            ]
    },

]

const router = new VueRouter({
    routes
})

//路由守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    const token1 = sessionStorage.getItem('login')
    if (!token1) return next('/login')
    next()
})

export default router
