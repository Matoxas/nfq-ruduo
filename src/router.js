import Vue from 'vue'
import Router from 'vue-router'
import index from './components/index.vue'
import orders from './components/orders.vue'
import cart from './components/cart.vue'
import order from './components/order.vue'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/order',
      name: 'order',
      component: order
    }
  ]
})
