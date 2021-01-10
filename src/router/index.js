import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'Full', title: '홈', requiresAuth: true },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'Empty', title: 'about', requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(
      /* webpackChunkName: "login" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // const isLogin = store.getters['login/isLogin']
  // // 로그인 필요여부 체크 : https://router.vuejs.org/guide/advanced/meta.html
  // if (to.meta.requiresAuth && !isLogin) {
  //   next('/login')
  // } else {
  //   next()
  //   document.title = to.meta.title + ' '
  // }
  next()
  document.title = to.meta.title
})

export default router
