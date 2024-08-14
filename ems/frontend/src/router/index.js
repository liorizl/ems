import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/admin'
import system from "../components/system/system.vue";
import sysCon from "../components/system/SysCon.vue";
import news from "../components/news/News.vue";
import newsInfo from "../components/news/NewsInfo.vue";
import newsList from "../components/news/NewsList.vue";
import newsAdd from "../components/news/NewsAdd.vue";
import newsSetting from "../components/news/NewsSetting.vue"
import template from "../components/template/template.vue";
import tempAdd from "../components/template/tempAdd.vue";
import tempList from "../components/template/tempList.vue";

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
          path: '/admin/news', component: news,
          children: [
              { path: '/admin/news/', component: newsInfo },
              { path: '/admin/news/NewsList/', component: newsList, name: 'newsList' },
              { path: '/admin/news/NewsAdd/:act', component: newsAdd, name: 'newsAdd' },
              { path: '/admin/news/newsSetting/', component: newsSetting, name: 'newsSetting' }
          ]
        },
        {
          path: '/admin/template', component: template,
          children: [
            { path: '/admin/template/', redirect: { name: 'tempList' } },
            { path: '/admin/template/tempList/', component: tempList, name: 'tempList' },
            { path: '/admin/template/tempAdd/:act', component: tempAdd, name: 'tempAdd' },
          ]
        },
      ]
    },
  ]
})
