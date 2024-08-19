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
import template from "../components/template/Template.vue";
import tempAdd from "../components/template/TempAdd.vue";
import tempList from "../components/template/TempList.vue";
import department from "../components/department/Department.vue";
import departmentList from "../components/department/DepartmentList.vue";
import departmentAdd from "../components/department/DepartmentAdd.vue";
import employee from "../components/employee/Employee.vue";
import employeeList from "../components/employee/EmployeeList.vue";
import employeeAdd from "../components/employee/EmployeeAdd.vue";
import attendance from "../components/attendance/Attendance.vue";
import attendEmpList from "../components/attendance/AttendEmpList.vue";
import attendList from "../components/attendance/AttendList.vue";
import attendAdd from "../components/attendance/AttendAdd.vue";

Vue.use(Router)

export default new Router({
  routes: [
    { path: "", redirect: { name: 'login' } },
    { path: '/login', name: 'login', component: login },
    {
      path: '/admin', name: 'admin', component: admin,
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
        {
          path: '/admin/department', component: department,
          children: [
            { path: '/admin/department/', redirect: { name: 'departmentList' } },
            { path: '/admin/department/departmentList/', component: departmentList, name: 'departmentList' },
            { path: '/admin/department/departmentAdd/:act', component: departmentAdd, name: 'departmentAdd' },
          ]
        },
        {
          path: '/admin/employee', component: employee,
          children: [
            { path: '/admin/employee/', redirect: { name: 'employeeList' } },
            { path: '/admin/employee/employeeList/', component: employeeList, name: 'employeeList' },
            { path: '/admin/employee/employeeAdd/:act', component: employeeAdd, name: 'employeeAdd' },
          ]
        },
        {
          path: '/admin/attendance', component: attendance,
          children: [
            { path: '/admin/attendance/', redirect: { name: 'attendEmpList' } },
            { path: '/admin/attendance/attendEmpList/', component: attendEmpList, name: 'attendEmpList' },
            { path: '/admin/attendance/attendList/', component: attendList, name: 'attendList' },
            { path: '/admin/attendance/attendAdd/:act', component: attendAdd, name: 'attendAdd' },
          ]
        },
      ]
    },
  ]
})
