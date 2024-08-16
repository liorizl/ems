<template>
  <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <ul class="partmentList">
            <li>
                <span class="checkbox"></span>
                <span class="id">ID</span>
                <span class="title">标题</span>
                <span class="operate">操作</span>
            </li>
            <template v-if="partmentList&&partmentList.length!=0&&Array.isArray(partmentList)">
                <template >
                    <li  v-for="(partment, index) in partmentList" :key="index">
                        <span class="checkbox"><input type="checkbox" :value="partment.id" v-model="checkPartment"></span>
                        <span class="id">{{partment.id}}</span>
                        <span class="title">
                            {{partment.name}}
                        </span>
                        <span class="operate">
                            <span @click="editNews(partment.id)" class="edit">编辑</span> | 
                            <span @click='deleNews(partment.id, partment.name)' class="dele">删除</span>
                        </span>
                    </li>
                </template>
            </template>
            <li v-else-if="partmentList&&partmentList.length!=0&&!Array.isArray(partmentList)">{{partmentList}}</li>
            <li v-else class="noCon">还没有部门！</li>
        </ul>
    </div>
</template>

<script>
import nowPosition from '../tinyComp/NowPosition.vue'
import subOk from '../tinyComp/SubOk.vue'
export default {
    name: "partment-list",
    components: {
        nowPosition,
        subOk
    },
    inject: ['reload'],
    data: function () {
        return {
            type: parseInt(this.$route.query.type) || 1,
            posiList: '加载中...',
            partmentList: [],
            checkPartment: [],
            propData: { showSub: false, status: 0, pageName: '部门', query: { type: parseInt(this.$route.query.type) || 1 } }
        }
    },
    created: function () {
        this.axios({
            url: '/admin/partmentList'
        }).then(res => {
            if(res.status === 200) {
                this.partmentList = res.data
            }
        })
    },
    watch: {

    },
    methods: {
        editNews(id) {
            this.$router.push({ name: 'partmentAdd', query: { id: id }, params: { act: 'edit' } })
        },
        deleNews(id, name) {

        },
        refreshPage() {
            this.reload()
        },
    }
}
</script>

<style scoped>
</style>
