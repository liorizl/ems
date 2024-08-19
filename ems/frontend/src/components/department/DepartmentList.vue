<template>
  <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <ul class="departmentList">
            <li>
                <span class="checkbox"></span>
                <span class="id">ID</span>
                <span class="title">标题</span>
                <span class="operate">操作</span>
            </li>
            <template v-if="departmentList&&departmentList.length!=0&&Array.isArray(departmentList)">
                <template >
                    <li  v-for="(department, index) in departmentList" :key="index">
                        <span class="checkbox"><input type="checkbox" :value="department.id" v-model="checkDepartment"></span>
                        <span class="id">{{department.id}}</span>
                        <span class="title">
                            {{department.name}}
                        </span>
                        <span class="operate">
                            <span @click="editNews(department.id)" class="edit">编辑</span> | 
                            <span @click='deleNews(department.id, department.name)' class="dele">删除</span>
                        </span>
                    </li>
                </template>
            </template>
            <!-- <li v-else-if="partmentList&&partmentList.length!=0&&!Array.isArray(partmentList)">{{partmentList}}</li> -->
            <li v-else class="noCon">还没有部门！</li>
        </ul>
    </div>
</template>

<script>
import nowPosition from '../tinyComp/NowPosition.vue'
import subOk from '../tinyComp/SubOk.vue'
export default {
    name: "department-list",
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
            checkDepartment: [],
            propData: { showSub: false, status: 0, pageName: '部门', query: { type: parseInt(this.$route.query.type) || 1 } }
        }
    },
    created: function () {
        this.axios({
            url: '/admin/departmentList'
        }).then(res => {
            if(res.status === 200) {
                this.departmentList = res.data
            }
        })
    },
    watch: {

    },
    methods: {
        editNews(id) {
            this.$router.push({ name: 'departmentAdd', query: { id: id }, params: { act: 'edit' } })
        },
        deleNews(id, name) {
            if (confirm("确定要删除部门“"+ name + "“")) {
                this.axios({
                    url: '/admin/deleDepartment?id=' + id
                }).then(res => {
                    if(res.status === 200) {
                        if(res.data.myStatus === 1) {
                            alert('删除成功！！')
                            this.refreshPage()
                        } else {
                            alert('删除失败!!')
                            this.refreshPage()
                        }
                    }
                })
            } 
        },
        refreshPage() {
            this.reload()
        },
    }
}
</script>

<style scoped>
</style>
