<template>
    <div class="rightCon">
        <div class="nowPosition">
            {{act==='edit'?'查看':'添加'}} {{department}} - {{name}} 的考勤
        </div>
        <div class="ccon">
            <form method="post" name="formAttend">
                <div class="input">
                    <span class="input-title"><label for="lateTimes">小迟到次数</label></span>
                    <span class="input-con">
                        <input type="text" id="lateTimes"  name="lateTimes" v-model="lateTimes" size="10">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="lateProTimes">大迟到次数</label></span>
                    <span class="input-con">
                        <input type="text" id="lateProTimes"  name="lateProTimes" v-model="lateProTimes" size="10">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="leaveTimes">早退次数</label></span>
                    <span class="input-con">
                        <input type="text" id="leaveTimes"  name="leaveTimes" v-model="leaveTimes" size="10">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="absentTimes">旷工次数</label></span>
                    <span class="input-con">
                        <input type="text" id="absentTimes"  name="absentTimes" v-model="absentTimes" size="10">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="overTimes">加班次数</label></span>
                    <span class="input-con">
                        <input type="text" id="overTimes"  name="overTimes" v-model="overTimes" size="10">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="overWorkTimes">加班总时间</label></span>
                    <span class="input-con">
                        <input type="text" id="overWorkTimes"  name="overWorkTimes" v-model="overWorkTimes" size="10">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="sourceUrl">考勤文件</label></span>
                    <span class="input-con">
                        <input type="text" id="sourceUrl"  name="sourceUrl" v-model="sourceUrl" size="30">
                        &nbsp;&nbsp; 查看文件
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="upMonth">考勤时间</label></span>
                    <span class="input-con">
                        <date-picker v-model="upMonth" type="month" @change="showDate($event)"></date-picker>
                    </span>
                </div>
                <div class="input padding"><input class="btn marginLeft " type="button" value="提交" @click="subForm"></div>
            </form>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'attend-add',
    components: {
        DatePicker
    },
    data() {
        return {  
            id: this.$route.query.id || null,
            empId: this.$route.query.empId || null,
            name: this.$route.query.name || null,
            department: this.$route.query.department || null,
            act: this.$route.params.act,
            lateTimes: 0,
            lateProTimes: 0,
            leaveTimes: 0,
            absentTimes: 0,
            overWorkTimes: 0, //加班总时间
            overTimes: 0, //加班次数
            sourceUrl: null,
            upMonth: this.$route.params.upMonth || null
        };
    },
    created() {
        if(this.id) {
            this.axios({
                url: '/admin/getAttend?id=' + this.id
            }).then(res => {
                if(res.status === 200) {
                    let resData = res.data
                    this.lateTimes = resData.lateTimes
                    this.lateProTimes = resData.lateProTimes
                    this.leaveTimes = resData.leaveTimes
                    this.absentTimes = resData.absentTimes
                    this.overWorkTimes = resData.overWorkTimes
                    this.overTimes = resData.overTimes
                    this.sourceUrl = resData.sourceUrl
                    this.upMonth = new Date(resData.upMonth)
                }
            })
        }
    },
    methods: {
        subForm() {
            let url, formData = new FormData(formAttend)
            formData.append('id', this.id)
            formData.append('name', this.name)
            formData.append('department', this.department)
            if(this.act === 'edit'){
                url = "/admin/upAttend?id=" + this.id
            } else {
                url = '/admin/upAttend' 
            }
            this.axios({
                method: 'post',
                url,
                data: formData
            }).then(res => {
                if(res.status === 200) {
                    if(res.data.myStatus === 1) {
                        if(this.act === 'edit') {
                            alert('修改考勤成功！！')
                        } else {
                            alert('添加考勤成功！！')
                        }
                        this.$router.push({name: 'attendList', query: {empId: this.empId, name: this.name, department: this.department}})
                    } 
                    else{
                        if(this.act === 'edit') {
                            alert('修改考勤失败！！')
                        } else {
                            alert('添加考勤失败！！')
                        }
                    }
                }
            })
        },
        showDate(e){
            console.log(e)
        }
    },

};
</script>
<style lang="less" scoped>
</style>