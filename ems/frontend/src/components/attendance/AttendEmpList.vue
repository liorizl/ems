<template>
    <div class="rightCon">
        <emp-list :empListProp="empListProp"></emp-list>
    </div>
</template>

<script>
import empList from "../tinyComp/EmpList.vue"
export default {
    components: {
        empList
    },
    props: {},
    data() {
        return {
            empListProp: { name: '考勤', showRouter: 'attendList', addRouter: 'attendAdd' }
        }
    },
};
</script>
<style lang="less" scoped>
</style>