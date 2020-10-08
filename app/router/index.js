import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 将路由菜单导出
export const routes = [{
    path: '/',
    name: '首页',
    hidden: true, // 不显示在菜单
    redirect: '/autocomplete'
  },
  {
    path: '/autocomplete',
    name: '带滚动加载和自定义滚动条的自动补全',
    component: () =>
      import(
        /* webpackChunkName: "autocomplete" */
        '../views/autocomplete/index.vue'
      ),
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router;