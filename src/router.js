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
      meta: { layout: 'Admin' },
      component: () => import('./views/Home')
    },
    {
      path: '/grid',
      name: 'grid',
      meta: { layout: 'User' },
      component: () => import('./views/Grid')
      // beforeEnter: requireAuth
    },
    // {
    //   path: '/chart',
    //   name: 'chart',
    //   meta: { layout: 'Default' },
    //   component: () => import('./views/Chart')
    //   // beforeEnter: requireAuth
    // },
    {
      path: '*',
      name: '404',
      meta: { layout: 'Default' },
      component: () => import('./views/Error')
    }
  ]
})
