<template >
    <div class="rightCon">
        <now-position v-bind:posList="posiList"></now-position>
        <div class="ccon">
            <form method="post" name="formNews">
                <div class="input padding"><input class="btn marginLeft " type="button" value="提交" @click="goSub()"></div>
                <div class="input">
                    <span class="input-title"><label for="title">名称</label></span>
                    <span class="input-con">
                        <input type="text"  id="title" v-model="title" :class="errInput[0]" name="title" size="40" @blur="checkTitle" @input="getAlias">
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="alias">别名</label></span>
                    <span class="input-con">
                        <input type="text"  id="alias" v-model="alias" name="alias" size="20" >
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="title">关键词</label></span>
                    <span class="input-con">
                        <input type="text"  id="keyword" v-model="keyword" name="keyword" size="50" >
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="intro">简介</label></span>
                    <span class="input-con">
                        <textarea   id="intro" v-model="intro" name="intro" rows="6" cols="60" ></textarea>
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="template">页面模板</label></span>
                    <span class="input-con">
                        <input type="text"  id="template" v-model="template" name="template" size="20" :class="errInput[1]">
                        <select class="selectTag" @change="checkPageTemp($event.target)">
                            <option value="0" >选择列表页模板</option>
                            <template v-for="page in pageTemps">
                                <option  :value="page.title">{{page.title}}</option>
                            </template>
                        </select>
                    </span>
                </div>
                <div class="input">
                    <span class="input-title"><label for="contentTemp">内容页模板</label></span>
                    <span class="input-con">
                        <input type="text"  id="contentTemp" v-model="contentTemp" name="contentTemp" size="20" :class="errInput[2]">
                        <select class="selectTag" @change="checkContentTemp($event.target)">
                            <option value="0" >选择内容页模板</option>
                            <template v-for="content in contentTemps">
                                <option  :value="content.title">{{content.title}}</option>
                            </template>
                        </select>
                    </span>
                </div>
            </form>
            {{checkMustFill}}
        </div>
    </div>
</template>
<script>
import pinyin from 'pinyin'
import subOk from '../tinyComp/SubOk.vue'
import nowPosition from '../tinyComp/NowPosition.vue'
export default {
    name: 'news-setting',
    components: {
        subOk,
        nowPosition
    },
    data: function() {
        return {
            title: null,
            alias: null,
            keyword: null,
            intro: null,
            template: null,
            contentTemp: null,
            posiList: ['新闻页面设置'],
            errInput: ['', '', ''],
            alertMes: ['', '', ''],
            checkTitleIng: false,
            pageTemps: [],
            contentTemps: [],
        }
    },
    created: function() {
        this.axios({
            url: '/admin/getNewsMes'
        }).then((res) => {
            if(res.status === 200) {
                if(res.data.length !== 0) {
                    const newsData = res.data
                    this.title = newsData.title
                    this.alias = newsData.alias
                    this.keyword = newsData.keyword
                    this.intro = newsData.intro
                    this.template = newsData.template
                    this.contentTemp = newsData.contentTemp
                }
            }
        }).catch(err => {
            alert('服务器程序内部错误,请检查!')
            console.log(err)
        })
        this.axios({
            url: '/admin/getNewsTemps'
        }).then((res) => {
            if(res.status === 200) {
                if(res.data.length !== 0) {
                    this.pageTemps = res.data.pageTemps
                    this.contentTemps = res.data.contentTemps
                }
            }
        }).catch(err => {
            alert('服务器程序内部错误,请检查!')
            console.log(err)
        })
    },
    methods:  {
        goSub() {
            // if (this.checkTitleIng) {
            //     setTimeout(() => { this.goSub() }, 200)
            //     return
            // }
            if (!this.title) {
                this.alertMes[0] = "不能没有标题！"
                this.$set(this.errInput, 0, 'errInput')
            }
            if (!this.template) {
                this.alertMes[1] = "不能没有列表页模版！"
                this.$set(this.errInput, 1, 'errInput')
            }
            if (!this.contentTemp) {
                this.alertMes[2] = "不能没有内容页模板！"
                this.$set(this.errInput, 2, 'errInput')
            }
            if (this.alertMes[0] !== '' || this.alertMes[1] !== '' || this.alertMes[2] !== '') {
                alert(this.alertMes)
            } else {
                let formData = new FormData(formNews)
                // this.propData.showSub = true
                 this.axios({
                     method: 'post',
                     url: '/admin/upNewsMes',
                     data: formData
                 }).then(res => {
                     if (res.status === 200) {
                         console.log(res.data)
                         if (res.data.myStatus === 1) {
                             alert('添加或修改成功！！')
                         }
                     } else {
                         alert('添加或修改失败！！')
                     }
                 })
            }
        },
        checkTitle() {
            this.checkTitleIng = true
            if (!this.title) {
                this.titleErrMes = '请输入标题!'
                this.alertMes[0] = "新闻不能没有标题！"
                this.$set(this.errInput, 0, 'errInput')
            } else {
                this.checkTitleIng = false
            }
        },
        checkPageTemp(e) {
            if (e.value !== "0" && e.value !== '选择列表页模板') {
                this.template = e.value
            } else {
                this.template = null
            }
        },
        checkContentTemp(e) {
            if (e.value !== "0" && e.value !== '选择内容页模板') {
                this.contentTemp = e.value
            } else {
                this.contentTemp = null
            }
        },
        getAlias() {
            let pinyinArr = pinyin(this.title, { style: pinyin.STYLE_NORMAL })
            let pinyinStr = ''
            pinyinArr.forEach((value) => {
                // if (parseInt(this.indexPinYin) === 1) {
                //     pinyinStr += value[0].substring(0, 1)
                // }
                // else if (parseInt(this.indexPinYin) === 2) {
                //     pinyinStr += value[0]
                // }
                pinyinStr += value[0].substring(0, 1)
            })
            this.alias = pinyinStr
        }
    },
    computed: {
        checkMustFill() {
            if (this.title && !this.titleErrMes) {
                this.$set(this.errInput, 0, '')
                this.alertMes[0] = ''
            }
            if (this.template) {
                this.$set(this.errInput, 1, '')
                this.alertMes[1] = ''
            }
            if (this.contentTemp) {
                this.$set(this.errInput, 2, '')
                this.alertMes[2] = ''
            }
        },
    }
}
</script>
<style scoped>
    .rigth-content {
        border: 1px solid #000;
        position: relative;
    }
    .text {
        color: #f00;
    }
    .error {
        color: #f00;
    }
    .errInput {
        border: 1px solid #f00;
    }
</style>
