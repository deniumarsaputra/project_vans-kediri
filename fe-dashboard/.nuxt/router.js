import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6c54c777 = () => interopDefault(import('..\\pages\\adminDashboard.vue' /* webpackChunkName: "pages/adminDashboard" */))
const _d041c920 = () => interopDefault(import('..\\pages\\category.vue' /* webpackChunkName: "pages/category" */))
const _491cb05c = () => interopDefault(import('..\\pages\\detailProduct.vue' /* webpackChunkName: "pages/detailProduct" */))
const _7cdaf44b = () => interopDefault(import('..\\pages\\detailTransaction.vue' /* webpackChunkName: "pages/detailTransaction" */))
const _2c356820 = () => interopDefault(import('..\\pages\\detailUserMobile.vue' /* webpackChunkName: "pages/detailUserMobile" */))
const _52052a5b = () => interopDefault(import('..\\pages\\formAdminDashboard.vue' /* webpackChunkName: "pages/formAdminDashboard" */))
const _16bc7954 = () => interopDefault(import('..\\pages\\formCategory.vue' /* webpackChunkName: "pages/formCategory" */))
const _01c7a789 = () => interopDefault(import('..\\pages\\formProduct.vue' /* webpackChunkName: "pages/formProduct" */))
const _078eeebe = () => interopDefault(import('..\\pages\\formUser.vue' /* webpackChunkName: "pages/formUser" */))
const _28a3e8e7 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _26fa51ed = () => interopDefault(import('..\\pages\\product.vue' /* webpackChunkName: "pages/product" */))
const _aa65e494 = () => interopDefault(import('..\\pages\\tablePdf.vue' /* webpackChunkName: "pages/tablePdf" */))
const _08fb655c = () => interopDefault(import('..\\pages\\transaction.vue' /* webpackChunkName: "pages/transaction" */))
const _347b5537 = () => interopDefault(import('..\\pages\\unpaidTransaction.vue' /* webpackChunkName: "pages/unpaidTransaction" */))
const _b0e5bd70 = () => interopDefault(import('..\\pages\\usersMobile.vue' /* webpackChunkName: "pages/usersMobile" */))
const _5efc45d0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/adminDashboard",
    component: _6c54c777,
    name: "adminDashboard"
  }, {
    path: "/category",
    component: _d041c920,
    name: "category"
  }, {
    path: "/detailProduct",
    component: _491cb05c,
    name: "detailProduct"
  }, {
    path: "/detailTransaction",
    component: _7cdaf44b,
    name: "detailTransaction"
  }, {
    path: "/detailUserMobile",
    component: _2c356820,
    name: "detailUserMobile"
  }, {
    path: "/formAdminDashboard",
    component: _52052a5b,
    name: "formAdminDashboard"
  }, {
    path: "/formCategory",
    component: _16bc7954,
    name: "formCategory"
  }, {
    path: "/formProduct",
    component: _01c7a789,
    name: "formProduct"
  }, {
    path: "/formUser",
    component: _078eeebe,
    name: "formUser"
  }, {
    path: "/login",
    component: _28a3e8e7,
    name: "login"
  }, {
    path: "/product",
    component: _26fa51ed,
    name: "product"
  }, {
    path: "/tablePdf",
    component: _aa65e494,
    name: "tablePdf"
  }, {
    path: "/transaction",
    component: _08fb655c,
    name: "transaction"
  }, {
    path: "/unpaidTransaction",
    component: _347b5537,
    name: "unpaidTransaction"
  }, {
    path: "/usersMobile",
    component: _b0e5bd70,
    name: "usersMobile"
  }, {
    path: "/",
    component: _5efc45d0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
