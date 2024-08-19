<template>
    <div class="container">
        <div class="left">
            <ul class="singleCol">
                <router-link to="/admin/attendance/AttendEmpList" tag="li">员工列表</router-link>
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
    name: "department",
    data() {
        return {
            id: null,
            liClass: ['active', '', '', '']

        }
    },
    created() {
        // if (this.$route.query.type) this.noActive(parseInt(this.$route.query.type))
    },
    methods: {
        // noActive(type) {
        //     this.liClass = this.liClass.map((li, index) => {
        //         if (type - 1 === index) {
        //             return 'active'
        //         } else {
        //             return ''
        //         }
        //     })
        // },
        // goLink(type) {
        //     this.noActive(type)
        //     this.$router.push({ name: 'tempList', query: { type: type } })
        // }
    },
    mounted() {
        util.addEvent()
    }
}
</script>

<style scoped>
</style>
