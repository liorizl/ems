<template>
    <div class="rightCon">
        <div class="nowPosition">当前位置：新闻管理</div>
        <div>共有文章：{{news}}篇(其中启用的有{{newsUse}}篇)</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: null,
            newIndex: null,
            newsUse: null
        }
    },
    created() {
        this.axios({
            url: '/admin/getNewsMes'
        }).then(res => {
            if (res.status === 200) {
                const resData = res.data
                this.news = resData.news
                this.newsIndex = resData.newsIndex
                this.newsUse = resData.newsUse
            }
        })
    },

    methods: {}
}
</script>
<style  scoped>
</style>