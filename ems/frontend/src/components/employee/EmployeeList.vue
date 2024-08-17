<template>
    <div class="rightCon">
          <now-position v-bind:posList="posiList"></now-position>
          <div class="input">
                <span class="input-title">选择部门</span>
                <span class="input-con">
                    <select v-model="department">
                        <option value="0">全部部门</option>
                        <template v-if="employeeAll.length>0" v-for="depart in employeeAll">
                            <option :value="depart.id">{{depart.name}}</option>
                        </template>
                    </select>
                </span>
            </div>
          <ul class="employeeList">
              <li>
                  <span class="id">ID</span>
                  <span class="department">部门</span>
                  <span class="title">姓名</span>
                  <span class="operate">操作</span>
              </li>
              <template v-if="employeeAll&&employeeAll.length!=0&&Array.isArray(employeeAll)">
                    <template  v-for="(department, index) in employeeAll" >
                        <li v-for="(employee, index2) in department.children">
                        <span class="id">{{employee.id}}</span>
                        <span class="department">{{department.name}}</span>
                        <span class="title">{{employee.name}}</span>
                        <span class="operate">
                            <span @click="editEmp(employee.id)" class="edit">编辑</span> | 
                            <span @click='deleEmp(employee.id, partment.name)' class="dele">删除</span>
                        </span>
                        </li>
                    </template>
              </template>
              <li v-else class="noCon">还没有部门！</li>
          </ul>
      </div>
  </template>
  
  <script>
  import nowPosition from '../tinyComp/NowPosition.vue'
  import subOk from '../tinyComp/SubOk.vue'
  export default {
        name: "partment-list",
        components: {
            nowPosition,
            subOk
        },
        inject: ['reload'],
        data: function () {
            return {
                type: parseInt(this.$route.query.type) || 1,
                posiList: '加载中...',
                departmentList: [],
                employeeAll: [],
                checkPartment: [],
                propData: { showSub: false, status: 0, pageName: '员工', query: { type: parseInt(this.$route.query.type) || 1 } }
            }
        },
        created: function () {
            this.axios({
                url: '/admin/getAllEmployee'
            }).then(res => {
                if(res.status === 200) {
                    this.employeeAll = res.data
                }
            })
        },
        watch: {
    
        },
        methods: {
            editEmp(){},
            addEmp(){},
            refreshPage() {
                this.reload()
            },
        }
  }
  </script>
  
  <style scoped>
  </style>
  