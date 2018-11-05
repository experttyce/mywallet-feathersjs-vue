import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('./views/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('./views/SignIn.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('./views/Category.vue'),
    meta: {
      requiresAuth: true
    }
  }
  ]
})
