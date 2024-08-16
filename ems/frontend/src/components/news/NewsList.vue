<template>
    <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <input class="btn" type="button" value="添加新闻" @click="goAdd(cid)">
        <ul class="artList" >
            <li>
                <span class="checkbox"></span>
                <span class="id">ID</span>
                <span class="title">标题</span>
                <span class="uptime">上传时间</span>
                <span class="operate">操作</span>
            </li>
            <template v-if="newsList&&newsList.length!=0&&Array.isArray(newsList)">
                <template >
                    <li  v-for="(news, index) in newsList" :key="index">
                        <span class="checkbox"><input type="checkbox" :value="news.id" v-model="checkNews"></span>
                        <span class="id">{{news.id}}</span>
                        <span class="title isLink" :class="news.isUse==='false'?'notUse':''" @click="showNews(news.id, index)">
                            {{news.title.length > 22 ? news.title.substr(0, 20) : news.title}}
                        </span>
                        <span class="uptime">{{news.upTime}}</span>
                        <span class="operate">
                            <span @click="editNews(news.id, $route.query.cid)" class="edit">编辑新闻</span> | 
                            <span @click='deleNews(news.id, news.title)' class="dele">删除新闻</span>
                        </span>
                    </li>
                </template>
            </template>
            <li v-else-if="newsList&&newsList.length!=0&&!Array.isArray(newsList)">{{newsList}}</li>
            <li v-else class="noCon">还没有新闻！</li>
        </ul>
        <!-- <div class="bar">
            <div class="copy">
                <input type="checkbox" v-model="checkAll" @change="showCheck">{{checkAll?'全不选':'全选'}}
                将所选新闻
                <select v-model="copyAct" @change="checkIsDele">
                    <option value="copy">复制</option>
                    <option value="cut">剪切</option>
                    <option value="dele">删除</option>
                </select>
                <template v-if="!isDele">
                    到
                    <select v-model="copyToIndex">
                        <template v-if="colListArr.length>0">
                            <option disabled :value="0">请选择</option>
                            <template v-for="(col, index) in colListArr">
                                <option :value="index + 1">{{col.title}}</option>
                            </template>
                        </template>
                        <template v-else>
                            <option>加载中...</option>
                        </template>
                    </select>
                </template>
                <input type="button" value="执行" @click="goCopy">
            </div>
            <page-nation v-bind:pageMessage="pageMes" v-on:pageT="pageTurn"></page-nation>
        </div>
        <sub-ok v-bind:subData="propData" v-on:refresh="refreshPage"></sub-ok> -->
    </div>
</template>

<script>
import nowPosition from '../tinyComp/NowPosition.vue'
import subOk from '../tinyComp/SubOk.vue'
import pageNation from '../tinyComp/MyPagination.vue'
import util from '../../../static/util.js'
export default {
    name: "news-list",
    components: {
        nowPosition,
        subOk,
        pageNation
    },
    inject: ['reload'],
    data: function () {
        return {
            cid: this.$route.query.cid,
            newsList: '加载中...',
            num: 10,
            sum: null,
            copyAct: 'copy',
            checkNews: [],
            copyToIndex: 0,
            isDele: false,
            checkAll: false,
            nowPage: parseInt(this.$route.query.page) || null,
            posiList: [{ name: '新闻管理' }],
            pageMes: { status: 0 },
            propData: { showSub: false, status: 0, pageName: '文章', query: {} },
            colList: [],
            colListArr: []
        }
    },
    created: function () {
        this.getNewsList()
    },
    watch: {
        '$route'(to, from) {
            this.getNewsList()
            this.checkNews = []
            this.checkAll = false
        }
    },
    computed: {
    },
    methods: {
        getNewsList() {
            const url = !this.$route.query.page ?
                '/admin/getNewsList?num=' + this.num :
                '/admin/getNewsList?num=' + this.num + '&page=' + this.$route.query.page
            this.axios({
                method: 'get',
                url: url
            }).then(res => {
                if (res.status === 200) {
                    this.newsList = res.data.result
                    this.sum = res.data.sum
                    this.pageMes = {
                        num: this.num,
                        page: parseInt(this.$route.query.page) || 1,
                        sum: res.data.sum,
                        pageNum: Math.ceil(res.data.sum / this.num),
                        status: 1
                    }
                }
            })
            // this.axios({
            //     method: 'get',
            //     url: '/admin/getNowNews?cid=' + this.cid
            // }).then(res => {
            //     if (res.status === 200) {
            //         this.posiList = [this.posiList[0]].concat(res.data)
            //         this.posiList.push({ name: '文章列表' })
            //     }
            // })
        },
        goAdd(cid) {
            if (cid) {
                this.$router.push({ name: 'newsAdd', query: { cid: cid }, params: { act: 'add' } })
            } else {
                alert('请在左边选择栏目！')
            }
        },
        editNews(id, cid) {
            let page = this.$route.query.page
            let query = {}
            if (page) {
                query = {
                   id: id, 
                   cid: cid,
                   page: page
                }
            } else {
                query = { id: id, cid: cid }
            }
            this.$router.push({ name: 'newsAdd', query: query, params: { act: 'edit' } })
        },
        deleNews(id, title) {
            if (this.$route.query.page) {
                this.propData.query.page = this.$route.query.page
            }
            this.propData.act = "删除"
            if (confirm("确定删除？\r\nid:" + id + "标题:" + title)) {
                this.propData.showSub = true
                const table = 'news' //数据表名
                this.axios({
                    method: 'get',
                    url: '/admin/dele?table=' + table + '&id=' + id
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.myStatus === 1) {
                            this.propData.status = 1
                            this.propData.resStatus = 1
                        } else {
                            this.propData.status = 1
                            this.propData.resStatus = 2
                        }
                    }
                }).catch(err => {
                    this.propData.status = 1
                    this.propData.resStatus = 2
                })
            }
        },
        showNews(id, index) {
            let url
            const webSet = this.$store.state.webSetting
            const pagePath = webSet.pagePath === '/' ? '' : webSet.pagePath
            url = parseInt(webSet.pageModel) === 1 ?
                util.repalceStr(webSet.webUrl) + pagePath + util.repalceStr2(this.newsList[index].path) + this.newsList[index].newsName + '.html' :
                'http://' + webSet.hostName + ':' + webSet.backendPort + '/showNews?id=' + id
            window.open(url);
        },
        goLink(cid) {
            this.$router.push({ name: 'newsList', query: { cid: cid } })
        },
        refreshPage() {
            this.num = this.$store.state.webSetting.listNum
            this.colListArr = this.$store.getters.getColArr
            this.getNewsList()
            this.propData.showSub = false
        },
        pageTurn(e) {
            this.$router.push({ name: 'newsList', query: { cid: this.$route.query.cid, page: e } })
        },
        goCopy() {
            let action, updata
            if (this.copyAct === 'copy') {
                action = '复制'
            } else if (this.copyAct === 'cut') {
                action = '剪切'
            } else {
                action = '删除'
            }
            if (this.checkNews.length === 0) {
                alert('请选择要' + action + '的文章!')
                return
            }
            if (this.copyAct === 'dele' && this.checkNews.length > 1) {
                if (!confirm('确定要删除？')) {
                    return
                }
            }
            if (this.copyAct === 'dele' && this.checkNews.length === 1) {
                let title, id = this.checkNews[0]
                this.newsList.forEach(art => {
                    if (art.id === id) {
                        title = art.title
                    }
                })
                this.deleNews(id, title)
            } else {
                if (this.copyToIndex === 0 && this.copyAct !== 'dele') {
                    alert('请选择要' + action + '到的栏目!')
                    return
                }
                if (this.copyAct === 'dele') {
                    updata = {
                        act: this.copyAct,
                        artid: this.checkNews
                    }
                } else {
                    const nowCopyIndex = this.colListArr[this.copyToIndex - 1]
                    const copyToCid = nowCopyIndex.cid
                    const ultimate = nowCopyIndex.ultimate
                    if (parseInt(copyToCid) === this.cid) {
                        alert('不能' + action + '到当前栏目，这样会造成文章标题和文件名重复!')
                        return
                    }
                    if (ultimate === 'false') {
                        if (!confirm('所选栏目非终极栏目，\r\n要查看需要将栏目设为终极栏目,\r\n确定要' + action + '?')) {
                            return
                        }
                    }
                    updata = {
                        act: this.copyAct,
                        artid: this.checkNews,
                        cid: copyToCid
                    }
                }
                this.propData.act = action
                this.propData.showSub = true
                this.axios({
                    method: 'post',
                    url: '/admin/copyNews',
                    data: updata
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.myStatus === 1) {
                            this.propData.copy = { num: res.data.num }
                            this.propData.status = 1
                            this.propData.resStatus = 1
                        } else {
                            this.propData.copy = { errMes: res.data.errMes }
                            this.propData.status = 1
                            this.propData.resStatus = 2
                        }
                    }
                }).catch(err => {
                    this.propData.copy = { errMes: err }
                    this.propData.status = 1
                    this.propData.resStatus = 2
                })
            }
        },
        showCheck() {
            if (this.checkAll) {
                this.checkNews = this.newsList.map(art => {
                    return art.id
                })
            } else {
                this.checkNews = []
            }
        },
        checkIsDele() {
            this.isDele = this.copyAct === 'dele' ? true : false
        }
    }
}
</script>

<style lang="less" scoped>
ul li {
    display: flex;
}
</style>