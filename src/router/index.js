import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/todo',
    component: Layout,
    redirect: '/todo/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/todo/index'),
        name: 'todo',
        meta: { title: '任务列表', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/hproxy',
    component: Layout,
    redirect: '/hproxy/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/hproxy/index'),
        name: 'hproxy',
        meta: { title: 'HProxy设置', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/imock',
    component: Layout,
    redirect: '/imock/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/imock/index'),
        name: 'imock',
        meta: { title: 'iMock设置', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/idata',
    component: Layout,
    redirect: '/idata/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/idata/index'),
        name: 'idata',
        meta: { title: 'iData设置', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/http',
    component: Layout,
    redirect: '/http/list',
    meta: { title: 'HTTP API', icon: 'list', noCache: false },
    hidden: false,
    children: [
      {
        path: 'api',
        component: () => import('@/views/http/api/index'),
        name: 'http-api',
        meta: { title: 'HTTP API用例', icon: 'list', noCache: true }
      },
      {
        path: 'list',
        component: () => import('@/views/http/list/index'),
        name: 'http-list',
        meta: { title: 'HTTP API列表', icon: 'list', noCache: false }
      },
      {
        path: 'log',
        component: () => import('@/views/http/log/index'),
        name: 'http-log',
        meta: { title: 'HTTP API日志', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/mysql',
    component: Layout,
    redirect: '/mysql/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/mysql/index'),
        name: 'List',
        meta: { title: '数据查询', icon: 'list', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router