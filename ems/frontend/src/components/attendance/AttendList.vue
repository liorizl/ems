
<template>
    <div class="rightCon">
        <div class="nowPosition">
            查看 {{department}} - {{name}} 的考勤
        </div>
        <ul class="attendList">
            <li>
                <span class="time">时间</span>
                <span class="lateTimes">迟到次数</span>
                <span class="leaveTimes">早退次数</span>
                <span class="overTimes">加班次数</span>
                <span class="sourceUrl">查看文件</span>
                <span class="operate">操作</span>
            </li>
            <template v-if="attendArr.length>0">
                <li v-for="attend in attendArr">
                    <span class="time">{{attend.upMonth}}</span>
                    <span class="lateTimes">{{attend.lateTimes + attend.lateProTimes}}</span>
                    <span class="leaveTimes">{{attend.leaveTimes}}</span>
                    <span class="overTimes">{{attend.overTimes}}</span>
                    <span class="sourceUrl">点击查看</span>
                    <span class="operate">
                        <span  class="edit" @click="edit(attend.id,attend.empId, attend.upMonth)">查看考勤</span> | 
                        <span  class="dele" @click="dele(attend.id,attend.name,attend.upMonth)">删除考勤</span>
                    </span>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            empId: this.$route.query.empId,
            name: this.$route.query.name,
            department: this.$route.query.department,
            attendArr: [],
        }
    },
    watch: {},
    created() {
        this.axios({
            url: '/admin/getEmpAttend?empId='+ this.empId
        }).then(res => {
            if(res.status === 200) {
                this.attendArr = res.data
            }
        })
    },
    computed: {},
    methods: {
        edit(id, empId, upMonth) {
            this.$router.push({name: 'attendAdd', query: {id, empId, name: this.name, department: this.department}, params: {act: 'edit'}})
        },
        dele(id, name, upMonth) {
            if(confirm('确定删除 ' + name + ' 在 ' + upMonth + ' 的考勤？')) {
                this.axios({
                    url: '/admin/deleAttend?id=' + id
                }).then(res=> {
                    if(res.status === 200) {
                        if(res.data.myStatus === 1) {
                            alert('删除成功!')
                            this.$router.push({name: 'attendList', query: {empId: this.empId, name: this.name, department: this.department}})
                        } else {
                            alert('删除失败!!')
                        }
                    }
                })
            }
        }
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
.attendList {
    li span {
        text-align: center;
    }
    .time {
        width: 15%;
    }
    .lateTimes {
        width: 15%;
    }
    .leaveTimes {
        width: 15%;
    }
    .overTimes {
        width: 15%;
    }
    .sourceUrl {
        width: 15%;
    }
    .operate {
        width: 25%;
    }
}
</style>