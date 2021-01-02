import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/login/login";
import home from "../components/home/home";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]

const router = new VueRouter({
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login')return next();
  const token1 =sessionStorage.getItem('login')
  if(!token1)return next('/login')
  next()
})

export default router
