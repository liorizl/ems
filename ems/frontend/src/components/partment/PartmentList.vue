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
            <template v-if="partment&&partmentList.length!=0&&Array.isArray(partmentList)">
                <template >
                    <li  v-for="(partment, index) in partmentList" :key="index">
                        <span class="checkbox"><input type="checkbox" :value="partment.id" v-model="checkPartment"></span>
                        <span class="id">{{partment.id}}</span>
                        <span class="title isLink" :class="partment.isUse==='false'?'notUse':''" @click="showpartment(partment.id, index)">
                            {{partment.title.length > 22 ? partment.title.substr(0, 20) : partment.title}}
                        </span>
                        <span class="uptime">{{partment.upTime}}</span>
                        <span class="operate">
                            <span @click="editNews(partment.id, $route.query.cid)" class="edit">编辑新闻</span> | 
                            <span @click='deleNews(partment.id, partment.title)' class="dele">删除新闻</span>
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
    name: "partmentList",
    components: {
        nowPosition,
        subOk
    },
    inject: ['reload'],
    data: function () {
        return {
            type: parseInt(this.$route.query.type) || 1,
            posiList: '加载中...',
            propData: { showSub: false, status: 0, pageName: '模版', query: { type: parseInt(this.$route.query.type) || 1 } }
        }
    },
    created: function () {
        
    },
    watch: {

    },
    methods: {

        refreshPage() {
            this.reload()
        },
    }
}
</script>

<style scoped>
</style>
