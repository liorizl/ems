<template>
    <div class="container">
        <div class="left">
            <ul class="singleCol">
                <router-link to="/admin/partment/partmentList" tag="li">部门列表</router-link>
                <router-link :to="{name: 'partmentAdd', params: {act: 'add'}}" tag="li">添加部门</router-link>
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
            liClass: ['active', '', '', '']

        }
    },
    created() {
        if (this.$route.query.type) this.noActive(parseInt(this.$route.query.type))
    },
    methods: {
        noActive(type) {
            this.liClass = this.liClass.map((li, index) => {
                if (type - 1 === index) {
                    return 'active'
                } else {
                    return ''
                }
            })
        },
        goLink(type) {
            this.noActive(type)
            this.$router.push({ name: 'tempList', query: { type: type } })
        }
    },
    mounted() {
        util.addEvent()
    }
}
</script>

<style scoped>
</style>
