<template>
    <div class="rightCon">
          <now-position v-bind:posList="posiList"></now-position>
          <div class="input">
                <span class="input-title">选择部门:</span>
                <span class="input-con">
                    <select v-model="department" @change="getEmpInDepart($event.target)">
                        <option value="0">所有部门</option>
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
              <template v-if="department==='0'&&employeeAll&&employeeAll.length!=0&&Array.isArray(employeeAll)">
                    <template  v-for="(department, index) in employeeAll" >
                        <li v-for="(employee, index2) in department.children">
                        <span class="id">{{employee.id}}</span>
                        <span class="department">{{department.name}}</span>
                        <span class="title">{{employee.name}}</span>
                        <span class="operate">
                            <span @click="editEmp(employee.id)" class="edit">编辑</span> | 
                            <span @click='deleEmp(employee.id, employee.name)' class="dele">删除</span>
                        </span>
                        </li>
                    </template>
              </template>
              <template v-else>
                    <li  v-for="(employee, index) in employeeArr" >
                        <span class="id">{{employee.id}}</span>
                        <span class="department">{{employee.department}}</span>
                        <span class="title">{{employee.name}}</span>
                        <span class="operate">
                            <span @click="editEmp(employee.id)" class="edit">编辑</span> | 
                            <span @click='deleEmp(employee.id, employee.name)' class="dele">删除</span>
                        </span>
                    </li>
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
                department: "0",
                employeeAll: [],
                employeeArr: [],
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
                    this.employeeArr = this.employeeAll
                }
            })
        },
        watch: {
    
        },
        methods: {
            editEmp(id){
                this.$router.push({ name: 'employeeAdd', query: { id: id }, params: { act: 'edit' } })
            },
            deleEmp(id, name){
                console.log(this.department)
                if(confirm('确定删除员工"' + name + '"')) {
                    this.axios({
                        url: '/admin/deleEmp?id=' + id
                    }).then(res => {
                        if(res.status === 200) {
                            if(res.data.myStatus === 1) {
                                alert('删除员工成功！')
                                if(this.department === '0') {
                                    this.refreshPage()
                                } else {
                                    this.getEmpInDepart({value: this.department})
                                }
                                // this.$router.push({name: 'employeeList'})
                            } else {
                                alert('删除员工失败')
                            }
                        }
                    })
                }
            },
            getEmpInDepart(e){
                const id = e.value
                this.axios({
                    url: '/admin/getEmpInDepart?id='+ id
                }).then(res => {
                    if(res.status === 200) {
                        this.employeeArr = res.data
                    }
                })
            },
            refreshPage() {
                this.reload()
            },
        }
  }
  </script>
  
  <style scoped>
  </style>
  