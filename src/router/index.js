import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/menu';
import Draw from '@/views/draw/index'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    component: Menu,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/projectManagement/index'),
        meta: {
          title: '项目管理',
          icon: ''
        }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/projectManagement/editProject'),
        meta: {
          title: '项目编辑',
          icon: ''
        }
      },
      {
        path: 'templateSelect',
        name: 'templateSelect',
        component: () => import('@/views/projectManagement/templateSelect'),
        meta: {
          title: '模板选择',
          icon: ''
        }
      },
      {
        path: 'editPage',
        name: 'editPage',
        component: () => import('@/views/draw/index')
      },
    ]
  },
];

export const notFoundRouter = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
