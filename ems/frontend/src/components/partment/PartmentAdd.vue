<template>
    <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <div class="ccon">
            <form method="post" name="formPartment">
                
                <div class="input">
                    <span class="input-title"><label for="name">部门名称</label></span>
                    <span class="input-con">
                        <input type="text" :class="nameErrMes?'errorInput':''"  id="name" v-model="name" name="name" size="20" @blur="checkName">
                        <span class="error">{{nameErrMes}}</span>
                    </span>
                </div>
                <div class="input padding"><input class="btn marginLeft " type="button" value="提交" @click="subForm"></div>
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
    methods: {
        checkName() {
            if (this.isChecking) {
                setTimeout(() => { this.checkName() }, 200)
                return
            }
            this.isChecking = true
            this.axios({
                method: 'post',
                url: '/admin/checkPartmentName',
                data: {
                    name: this.name
                }
            }).then(res => {
                if(res.status === 200) {
                    if(res.data.myStatus === 0) {
                        this.nameErrMes = '该名称已经存在!!!'
                    }
                    this.isChecking = false
                }
            })
        },
        subForm() {
            if (this.isChecking) {
                alert('正在检测名称，稍候再提交！！！')
            }
            if(!this.name) {
                this.nameErrMes = '必须要有名称！'
                alert(this.nameErrMes)
            }
            let url
            if(this.act === 'edit') {
                url = '/admin/subPartment?id=' + this.id
            } else {
                '/admin/subPartment'
            }
            this.axios({
                method: 'post',
                url: url,
                data: {
                    name: this.name
                }
            }).then(res => {
                if(res.status === 200) {
                    if(res.data.myStatus === 1) {
                        alert('添加/修改成功！')
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

</style>

