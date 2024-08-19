<template>
<div>
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
                    <span @click="show(employee.id, employee.name, department.name)" class="edit">查看{{empListProp.name}}</span> | 
                    <span @click='add(employee.id, employee.name, department.name)' class="dele">添加{{empListProp.name}}</span>
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
                    <span @click="show(employee.id, employee.name, employee.department)" class="edit">查看{{empListProp.name}}</span> | 
                    <span @click='add(employee.id, employee.name, employee.department)' class="dele">添加{{empListProp.name}}</span>
                </span>
            </li>
        </template>
        <li v-else class="noCon">还没有部门！</li>
    </ul>
</div>
</template>
<script>
export default {
    props: {
        empListProp: {
            name: String,
            showRouter: String,
            addRouter: String
        }
    }
    ,
    data: function () {
        return {
            departmentList: [],
            department: "0",
            employeeAll: [],
            employeeArr: [],
            checkPartment: [],
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
        show(id, name, department) {
            this.$router.push({name: this.empListProp.showRouter, query: {empId: id, name, department}})
        },
        add(id, name, department) {
            this.$router.push({name: this.empListProp.addRouter, query: {empId: id, name, department}, params: { act: 'add'}})
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