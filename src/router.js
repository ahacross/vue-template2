import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const requireAuth = (to, from, next) => {
//   if (Auth.loggedIn()) {
//     return next()
//   } else {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   }
// }

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'LayoutDefault' },
      component: () => import('./views/Home')
    },
    {
      path: '/about',
      name: 'about',
      meta: { layout: 'LayoutDefault2' },
      component: () => import('./views/About')
      // beforeEnter: requireAuth
    },
    {
      path: '/hello',
      name: 'hello',
      meta: { layout: 'LayoutDefault2' },
      component: () => import('./views/HelloWorld')
      // beforeEnter: requireAuth
    },
    {
      path: '/grid',
      name: 'grid',
      meta: { layout: 'LayoutDefault' },
      component: () => import('./views/Grid')
      // beforeEnter: requireAuth
    }
  ]
})
