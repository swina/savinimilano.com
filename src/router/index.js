import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Page from '../views/Page.vue'
import Scroller from '../views/Scroller.vue'
import Dashboard from '../views/admin/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/prodotti/:sector',
    name: 'products',
    component: Products
  },
  {
    path: '/azienda/:content',
    name: 'content',
    component: Page
  },
  {
    path: '/scroller',
    name: 'scroller',
    component: Scroller
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      logic: 'admin'
    },
    component: Dashboard
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
