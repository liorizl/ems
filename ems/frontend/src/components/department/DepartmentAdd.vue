<template>
    <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <div class="ccon">
            <form method="post" name="formDepartment">
                
                <div class="input">
                    <span class="input-title"><label for="name">部门名称</label></span>
                    <span class="input-con">
                        <input type="text" :class="nameErrMes?'errorInput':''"  id="name" v-model="name" name="name" size="20" @blur="checkName">
                        <span class="error">{{nameErrMes}}</span>
                    </span>
                </div>
                <div class="input padding"><input class="btn marginLeft " type="button" value="提交" @click="subForm" :disabled="nameErrMes?true:false"></div>
            </form>
        </div>
    </div>  
</template>

<script>
import subOk from '../tinyComp/SubOk.vue'
import nowPosition from '../tinyComp/NowPosition.vue'
export default {
    name: 'partment-add',
    components: {
        subOk,
        nowPosition
    },
    data() {
        return {
            id: this.$route.query.id || null,
            act: this.$route.params.act || null,
            name: null,
            nameErrMes: null,
            isChecking: null,
            posiList: [{ name: '部门管理' }],
        }
    },
    created: function(){
        if(this.$route.query.id) {
            this.axios({
                url: "/admin/getDepartment?id="+ this.$route.query.id
            }).then(res => {
                if(res.status === 200) {
                    console.log(res.data.length)
                    if(res.data.length > 0) {
                        this.name = res.data[0].name
                    }
                }
            })
        }
    },
    methods: {
        checkName() {
            if (this.isChecking) {
                setTimeout(() => { this.checkName() }, 200)
                return
            }
            this.isChecking = true
            this.axios({
                method: 'post',
                url: '/admin/checkDepartmentName',
                data: {
                    name: this.name
                }
            }).then(res => {
                if(res.status === 200) {
                    console.log(res.data)
                    if(res.data.myStatus === 1) {
                        this.nameErrMes = '该名称已经存在!!!'
                        this.isChecking = false
                        return 
                    } else {
                        this.nameErrMes = null
                        console.log(this.nameErrMes)
                        this.isChecking = false
                    }
                    
                }
            })
        },
        subForm() {
            if (this.isChecking) {
                alert('正在检测名称，稍候再提交！！！')
                return
            }
            if(!this.name) {
                this.nameErrMes = '必须要有名称！'
                alert(this.nameErrMes)
                return 
            }
            this.checkName()
            let url
            if(this.act === 'edit') {
                url = '/admin/subDepartment?id=' + this.id
            } else {
                url = '/admin/subDepartment'
            }
            this.axios({
                method: 'post',
                url: url,
                data: {
                    name: this.name
                }
            }).then(res => {
                if(res.status === 200) {
                    console.log(res.data)
                    if(res.data.myStatus === 1) {
                        alert('添加/修改成功！')
                        this.$router.push({ name: 'departmentList' })
                    } else {
                        alert('添加/修改失败！')
                    }
                    
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.error {
    color: #f00;
}
</style>

