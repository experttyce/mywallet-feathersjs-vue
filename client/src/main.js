import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  store.dispatch('auth/authenticate').then(() => {
    if ((to.path === '/signin' || to.path === '/signup')) {
      next('/')
    } else {
      next()
    }
  }).catch(() => {
    if (requiresAuth) {
      next('/signin')
    } else {
      next()
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
