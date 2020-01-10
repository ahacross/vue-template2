import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

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
      component: loadView('Home')
    },
    {
      path: '/grid',
      name: 'grid',
      meta: { layout: 'Admin' },
      component: loadView('Grid')
      // beforeEnter: requireAuth
    },
    // {
    //   path: '/chart',
    //   name: 'chart',
    //   meta: { layout: 'Default' },
    //   component: loadView('Chart')
    //   // beforeEnter: requireAuth
    // },
    {
      path: '*',
      name: '404',
      meta: { layout: 'Default' },
      component: loadView('Error')
    }
  ]
})
