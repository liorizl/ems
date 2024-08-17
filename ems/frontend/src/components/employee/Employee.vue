<template>
    <div class="container">
        <div class="left">
            <ul class="singleCol">
                <router-link to="/admin/employee/employeeList" tag="li">员工列表</router-link>
                <router-link :to="{name: 'employeeAdd', params: {act: 'add'}}" tag="li">添加员工</router-link>
            </ul>
        </div>
        <div class="line" draggable="true"></div>
        <div class="right">
            <router-view ></router-view>
        </div>
    </div>
</template>

<script>
import util from '../../../static/util.js'
export default {
    name: "temp",
    data() {
        return {
            id: null,
            

        }
    },
    created() {
        
    },
    methods: {

        goLink(type) {

        }
    },
    mounted() {
        util.addEvent()
    }
}
</script>

<style scoped>
</style>
