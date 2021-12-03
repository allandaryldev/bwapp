import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d78be006 = () => interopDefault(import('..\\client\\pages\\auth.vue' /* webpackChunkName: "pages/auth" */))
const _2ba79f58 = () => interopDefault(import('..\\client\\pages\\app\\create.vue' /* webpackChunkName: "pages/app/create" */))
const _ecbafa30 = () => interopDefault(import('..\\client\\pages\\app\\dashboard.vue' /* webpackChunkName: "pages/app/dashboard" */))
const _8f1df452 = () => interopDefault(import('..\\client\\pages\\app\\_id\\update.vue' /* webpackChunkName: "pages/app/_id/update" */))
const _6e73064d = () => interopDefault(import('..\\client\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth",
    component: _d78be006,
    name: "auth"
  }, {
    path: "/app/create",
    component: _2ba79f58,
    name: "app-create"
  }, {
    path: "/app/dashboard",
    component: _ecbafa30,
    name: "app-dashboard"
  }, {
    path: "/app/:id?/update",
    component: _8f1df452,
    name: "app-id-update"
  }, {
    path: "/",
    component: _6e73064d,
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
