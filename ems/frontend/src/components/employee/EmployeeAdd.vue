<template>
    <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <div class="ccon">
            <form method="post" name="formEmployee">
                
                <div class="input">
                    <span class="input-title"><label for="name">姓名</label></span>
                    <span class="input-con">
                        <input type="text" :class="nameErrMes?'errorInput':''"  id="name" v-model="name" name="name" size="20" >
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="department">所属部门</label></span>
                    <span class="input-con">
                        <input type="text"  size="20" name="department" v-model="department">
                        <select v-model="fid" name="fid" @change="getDepartName($event.target)">
                        <option value="请选择部门" disabled>请选择部门</option>
                            <template v-if="departmentArr.length>0" v-for="depart in departmentArr">
                                <option :value="depart.id" >{{depart.name}}</option>
                            </template>
                        </select>
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="name">性别</label></span>
                    <span class="input-con">
                        <input type="radio" name="sex" v-model="sex" value=1> 男
                        <input type="radio" name="sex" v-model="sex" value=2> 女
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="mobile">电话</label></span>
                    <span class="input-con">
                        <input type="text" name="mobile" size="20" v-model="mobile">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="birthday">出生日期</label></span>
                    <span class="input-con">
                        <date-picker v-model="birthday"  ></date-picker>
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="address">地址</label></span>
                    <span class="input-con">
                        <input type="text" name="address"  size="40" v-model="address">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="gratuation">学历</label></span>
                    <span class="input-con">
                        <input type="text" name="gratuation"  size="20" v-model="gratuation">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="salary">基本工资</label></span>
                    <span class="input-con">
                        <input type="text" name="salary"  size="20" v-model.number="salary">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="inTime">入职时间</label></span>
                    <span class="input-con">
                        <date-picker v-model="inTime" ></date-picker>
                        
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="outTime">离职时间</label></span>
                    <span class="input-con">
                        <date-picker v-model="outTime" ></date-picker>
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'partment-add',
    components: {
        subOk,
        nowPosition,
        DatePicker 
    },
    data() {
        return {
            id: this.$route.query.id || null,
            act: this.$route.params.act || null,
            name: null,
            fid: null,
            sex: 1,
            mobile: null,
            address: null,
            gratuation: null,
            salary: 0,
            department: null,
            departmentArr: [],
            birthday: null,
            inTime: null,
            outTime: null,
            nameErrMes: [],
            isChecking: null,
            posiList: [{ name: '员工管理' }],
        }
    },
    created: function(){
        if(this.id && this.act) {
            this.axios({
                url: '/admin/getEmployee?id=' + this.id
            }).then(res => {
                if(res.status === 200) {
                    const empData = res.data
                    this.fid = empData.fid
                    this.name = empData.name
                    this.department = empData.department
                    this.address = empData.address
                    this.baseSalary = empData.baseSalary
                    this.gratuation = empData.gratuation
                    this.sex = empData.sex
                    this.mobile = empData.mobile
                    this.birthday = new Date(empData.birthday)
                    this.inTime = new Date(empData.inTime)
                    this.outTime = new Date(empData.outTime)
                    console.log(this.birthday)
                }
            })
        }
        this.axios({
            url: '/admin/departmentList'
        }).then(res => {
            if(res.status === 200) {
                this.departmentArr = res.data
            }
        })
    },
    methods: {

        getDepartName(e){
             let id = parseInt(e.value)
             for(let depart of this.departmentArr) {
                if(depart.id === id) {
                    this.department = depart.name
                    break 
                }
             }
        },
        subForm() {
            if(!this.name) { 
                alert('姓名为空！')
                return 
            }
            if(!this.department) { 
                alert('部门为空！')
                return 
            }
            if(!this.mobile) { 
                alert('电话为空！')
            } 
            let url, formData
            if(this.act === 'edit') {
                url = '/admin/subEmployee?id=' + this.id
            } else {
                url = '/admin/subEmployee'
            }
            formData = new FormData(formEmployee)
            this.axios({
                method: 'post',
                url: url,
                data: formData
            }).then(res => {
                if(res.status === 200) {
                    console.log(res.data.myStatus)
                    if(res.data.myStatus === 1) {
                        if(this.act === 'edit') {
                            alert('修改员工成功！！')
                        } else {
                            alert('添加员工成功！！')
                        }
                        this.$router.push({name: 'employeeList'})
                    } 
                    else{
                        if(this.act === 'edit') {
                            alert('修改员工失败！！')
                        } else {
                            alert('添加员工失败！！')
                        }
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
.mx-datepicker {
    margin-left: -15px;
    padding-left: 0;
}
.mx-input {
    padding: 0;
}
.error {
    color: #f00;
}
</style>

