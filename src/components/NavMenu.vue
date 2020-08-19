<template>
    <div class="nav-menu">
        <div class="logo-hd">
            <img src="../assets/image002[77].jpg" alt />
        </div>
        <el-menu
            ref="menu"
            class="el-menu-vertical-demo"
            mode="vertical"
            :default-active="$route.path"
            :router="true"
            :unique-opened="false"
            :collapse="isCollapse"
            :default-openeds="['0', '1','2','3','4','5']"
        >
            <el-submenu index="0">
                <template slot="title">
                    <span slot="title" index="/menuPage/functionalAuthority">功能权限列表</span>
                </template>
                <el-menu-item index="/menuPage/functionalAuthority">
                    <span slot="title">功能权限列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
                <template slot="title">
                    <span slot="title">产品管理</span>
                </template>
                <el-menu-item index="/menuPage/productLineList">
                    <span slot="title">产品线列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/companyList">
                    <span slot="title">公司列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/languageManagement">
                    <span slot="title">语言列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/productCategoryList">
                    <span slot="title">产品类别列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/productList">
                    <span slot="title">产品列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/colorPageList">
                    <span slot="title">彩页列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/videoList">
                    <span slot="title">视频列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <span slot="title">用户管理</span>
                </template>
                 <el-menu-item index="/menuPage/adminList">
                    <span slot="title">管理员列表</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/userList">
                    <span slot="title">用户列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <span slot="title">数据管理</span>
                </template>
                <el-menu-item index="/menuPage/accessData">
                    <span slot="title">访问数据</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/userGo">
                    <span slot="title">用户流向</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                 <template slot="title">
                    <span slot="title">留言管理</span>
                </template>
                <el-menu-item index="/menuPage/messageManagement">
                    <span slot="title">留言管理</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <span slot="title">系统设置</span>
                </template>
                <el-menu-item index="/menuPage/log">
                    <span slot="title">登录日志</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/aboutMachine">
                    <span slot="title">关于本机</span>
                </el-menu-item>
                <el-menu-item index="/menuPage/personalInformation">
                    <span slot="title">个人信息</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <!-- <div class="shrink">
            <i
                class="icon iconfont"
                style="font-size: 18px;"
                :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
                @click="shrinkMenu"
            ></i>
        </div> -->
    </div>
</template>
<script>
export default {
    name: "NavMenu",
    data() {
        return {
            isCollapse: false,
        };
    },
    props: {
        menus: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    computed: {},
    methods: {
        shrinkMenu() {
            this.isCollapse = !this.isCollapse;
            this.$emit("changeMainLeft", this.isCollapse);
        },
    },
    watch: {},
    created() {},
};
</script>
<style lang="less" scoped>
.nav-menu {
    .logo-hd {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        // border-bottom: 1px solid rgb(142, 241, 241);
        text-align: center;
        box-sizing: border-box;
        img {
            width: 100%;
            line-height: 100%;
        }
    }
    .shrink {
        width: 100%;
        height: 41px;
        background: #fff;
        text-align: center;
        padding-top: 13px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        i {
            cursor: pointer;
        }
    }
}
</style>
<style lang="less">
.el-menu {
    background: #fafbfc !important;
    width: 240px !important;
}
.el-menu--collapse {
    width: 50px !important;
}
.el-submenu .iconfont {
    font-size: 14px !important;
    margin-right: 11px !important;
}
.el-submenu .el-menu-item > span {
    margin-left: 20px !important;
}
.el-submenu .el-menu-item {
    height: 34px !important;
    line-height: 34px !important;
}
.el-menu-item.is-active {
    border-right: 3px solid #592c80 !important;
    outline: 0 !important;
    color: #fff !important;
    background-color: #592c80 !important;
}
.el-menu-item,
.el-submenu__title {
    height: 34px !important;
    line-height: 34px !important;
}
.el-submenu .el-submenu__title .el-submenu__icon-arrow {
    font-size: 16px !important;
    color: #592c80 !important;
}
.el-menu-item:hover {
    color: #592c80 !important;
}
</style>
