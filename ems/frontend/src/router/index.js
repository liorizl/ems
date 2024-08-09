import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/admin'
import system from "../components/system/system.vue";
import sysCon from "../components/system/SysCon.vue";
import article from "../components/article/Article.vue";
import articleList from "../components/article/ArticleList.vue";
import articleAdd from "../components/article/ArticleAdd.vue";

Vue.use(Router)

export default new Router({
  routes: [
    { path: "", redirect: { name: 'login' } },
    { path: '/login', name: 'login', component: login},
    { path: '/admin', name: 'admin', component: admin,
      children: [
        { path: '/admin/', redirect: { name: 'sysCon' } },
        {
            path: '/admin/system/', component: system, name: 'system',
            children: [
                { path: '/admin/system/', component: sysCon, redirect: { name: 'sysCon' } },
                { path: '/admin/system/SysCon', component: sysCon, name: 'sysCon' },
            ]
        },
        {
          path: '/admin/article', component: article,
          children: [
              { path: '/admin/article/', component: articleInfo },
              { path: '/admin/article/ArticleList/', component: articleList, name: 'articleList' },
              { path: '/admin/article/ArticleAdd/:act', component: articleAdd, name: 'articleAdd' }
          ]
        },
      ]
    },
  ]
})
