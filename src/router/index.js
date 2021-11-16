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
    redirect: '/home/projectManagement'
  },
  {
    path: '/home',
    component: Menu,
    children: [
      {
        path: 'projectManagement',
        name: 'projectManagement',
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
        path: 'editPage/:id',
        name: 'editPage',
        component: () => import('@/views/draw/index'),
        meta: {
          title: '编辑器',
          icon: ''
        }
      },
      {
        path: 'tempManagement',
        name: 'tempManagement',
        component: () => import('@/views/tempManagement/index'),
        meta: {
          title: '模板管理',
          icon: ''
        }
      },
      {
        path: 'componentGallery',
        name: 'componentGallery',
        component: () => import('@/views/componentGallery/index'),
        meta: {
          title: '组件库',
          icon: ''
        }
      },
      {
        path: 'componentDeploy',
        name: 'componentDeploy',
        component: () => import('@/views/componentGallery/deploy/index'),
        meta: {
          title: '组件编辑',
          icon: ''
        }
      },
    ]
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/draw/preview')
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
