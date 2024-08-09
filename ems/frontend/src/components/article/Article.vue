<template>
    <div class="container">
        <div class="left">
            <ul>
                <li>新闻列表</li>
                <li>添加新闻</li>
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
import vueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = vueRouter
export default {
    name: "article-info",
    components: {
        articleLeftNav: {
            name: 'article-left-nav',
            data() {
                return {
                    
                }
            },
            methods: {
                
            },
            watch: {
                
            },
            created() {
                
            },
            render(h) {
                
            },
        }
    },
    data: function () {
        return {
            colList: null,
            html: null,
            icon: [],
            ulClassArr: [],
            activeClass: { id: 0 },
            activeClassId: 0
        }
    },
    created: function () {
        this.colList = this.$store.state.webSetting.colList
    },
    methods: {
        goNav(e) {
            this.activeClassId = e.id
            if (this.$parent.$refs.appCon) this.$parent.$refs.appCon.scrollIntoView()
            this.$router.push({ name: 'articleList', query: { cid: e.cid }, params: { title: e.title } })
            .catch(err => {
                // console.log('点击了相同的链接！')
            })
        },
    },
    mounted() {
        util.addEvent()
    }
}
</script>

<style  lang="less">
@icon-margin-right: 30px;
@li-background-color: #999;
.flexColInArt {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flexLeft {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
}
.outLiHover {
    background-color: @li-background-color;
    color: #fff !important;
}
.inLiHover {
    text-decoration: none;
    color: #33a0c9;
}
.leftColList {
    width: 80%;
    min-width: 210px;
    max-width: 410px;
    margin: 0 auto;
    margin-top: 20px;
    li {
        max-width: 100%;
        height: 26px;
        margin: 0 auto;
        line-height: 26px;
        list-style: none;
        span:before,
        span:after {
            width: 18px;
            height: 18px;
            .flexCenter;
        }
        .title {
            .flexLeft();
            text-indent: 0.5em;
        }
    }
    ul {
        margin-left: 22px;
        border-left: 1px dashed #ccc;
        overflow: hidden;
    }
    > li {
        width: 100%;
        height: 36px;
        margin: 0 auto;
        line-height: 30px;
        cursor: pointer;
        border: 1px solid #f00;
        background-color: #f7f5f5;
        margin-top: 10px;
        border: 1px solid #ededed;
        .flexColInArt();
    }
    > li:hover {
        .outLiHover;
    }
    .notUlti:before,
    .notUlti1:before {
        content: "\e66f";
        font-size: 14px;
        margin-right: 5px;
    }
    .colExist {
        .icon:before {
            font-size: 14px;
            margin-right: @icon-margin-right;
        }
        .iconDown:before {
            content: "\e603";
        }
        .iconUp:before {
            content: "\e672";
        }
    }
    .isUlti:before,
    .isUlti1:before {
        content: "\e713";
        font-size: 18px;
        margin-right: 5px;
    }
    .colEmp .icon:before {
        content: "\e60d";
        font-size: 12px;
        margin-right: @icon-margin-right;
    }
    .colEmp,
    .colEmp1,
    .isUlti1 {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .colEmp:hover,
    .isUlti1:hover {
        .inLiHover;
    }
    .colEmp:before:hover,
    .isUlti1:before:hover {
        text-decoration: none;
    }
    .ulHide {
        display: none;
    }
    .ulShow {
        display: inherit;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .active {
        .inLiHover();
        background-color: #ededed;
    }
    .colEmp1.active::after,
    .isUlti1.active::after {
        content: "\e60d";
        font-size: 12px;
        margin-left: 10px;
    }
    > li.active {
        .outLiHover();
    }
}
</style>
