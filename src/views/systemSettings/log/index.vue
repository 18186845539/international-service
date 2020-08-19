 <!-- 登录日志 -->
<template>
    <div class="page_view">
        <HeaderNav />
        <!-- 筛选条件部分 -->
        <div class="pageContainer" ref="pageContainer">
            <div ref="pageSearch" class="pageSearch">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="结果筛选" name="1" class="tableTitle">
                        <div class="searchRow">
                            <span>
                                <span>用户名：</span>
                                <span class="searchItem">
                                    <el-input v-model="pageList.userName" size="small" clearable></el-input>
                                </span>
                            </span>
                            <span>
                                <span>用户类别：</span>
                                <el-select v-model="pageList.userCategory" placeholder="请选择">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="代理商" value="代理商"></el-option>
                                    <el-option label="客户" value="客户"></el-option>
                                    <el-option label="二级代理商" value="二级代理商"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <span>登录时间：</span>
                                <span>
                                    <el-date-picker
                                        v-model="pageList.createDateBegin"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="开始时间"
                                        size="small"
                                        clearable
                                    ></el-date-picker>
                                </span>
                            </span>

                            <span>
                                <span>至</span>
                                <span>
                                    <el-date-picker
                                        v-model="pageList.createDateEnd"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="结束时间"
                                        size="small"
                                        clearable
                                    ></el-date-picker>
                                </span>
                            </span>
                            <span>
                                <el-button
                                    @click="commonSearch()"
                                    type="primary"
                                    icon="el-icon-search"
                                    size="small"
                                >筛选</el-button>
                                <el-button @click="emptySearch()" type="primary" size="small">清空筛选</el-button>
                            </span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="page_body_area">
            <div class="tableTitle">
                <span>
                    <i class="el-icon-news"></i>
                    <span>登录日志</span>
                </span>
            </div>
            <div class="tableRow">
                <el-table :data="tableData" stripe>
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column prop="userCategory" label="用户类别"></el-table-column>
                    <el-table-column prop="affiliationCompany" label="所属公司"></el-table-column>
                    <el-table-column prop="ipAddress" label="Ip地址"></el-table-column>
                    <el-table-column prop="loginTime" label="登录时间"></el-table-column>
                    <el-table-column prop="loginStatus" label="登录状态"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderNav from "@/components/headerNav";

export default {
    data() {
        return {
            activeNames:["1"],//搜索框默认展开
            pageList: {
                userName: "", //用户名称
                userCategory: "", //用户类别
                createDateBegin:"",//开始时间
                createDateEnd:""//结束时间
            },
            tableData: [
                {
                    id: "1",
                    userName: "张三",
                    userCategory: "代理商",
                    affiliationCompany: "谊安",
                    ipAddress: "39.105.235.378",
                    loginTime: "2020-07-30",
                    loginStatus: "登录成功",
                },
               {
                    id: "2",
                    userName: "张三",
                    userCategory: "代理商",
                    affiliationCompany: "谊安",
                    ipAddress: "39.105.235.378",
                    loginTime: "2020-07-30",
                    loginStatus: "登录成功",
                },
               {
                    id: "3",
                    userName: "张三",
                    userCategory: "代理商",
                    affiliationCompany: "谊安",
                    ipAddress: "39.105.235.378",
                    loginTime: "2020-07-30",
                    loginStatus: "登录失败",
                },
            ],
        };
    },
    components: {
        HeaderNav,
    },
    methods: {
        //删除
        del() {},
    },
};
</script>
<style lang='less' scoped>
.pageContainer {
    padding: 10px;
    .pageSearch {
        display: block;
        line-height: 30px;
        margin-bottom: 20px;
        .searchRow {
            padding: 10px;
            display: inline-block;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .searchRow > span {
            display: inline-block;
            margin: 10px;
        }

        .searchItem {
            display: inline-block;
            max-width: 100px;
        }

        .red-leave-active {
            transition: all 2s;
        }

        .el-collapse-item__header {
            padding: 0 20px;
            font-weight: 700;
            color: #29affb;
            border-bottom: 1px solid #e4e4e4;
        }

        .el-collapse-item__content {
            padding: 0;
        }

        .el-collapse-item {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                0 0 6px rgba(0, 0, 0, 0.04);
        }

    }
    .tableRow {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .tableTitle {
            margin: 20px 20px 10px;
            line-height: 33px;
            font-size: 14px;
            font-weight: 700;
            color: #29affb;
            display: flex;
            justify-content: space-between;
        }

    }
}
    .page_body_area {
        float: right;
        width: calc(100% - 10px);
        height: 100%;
        overflow: hidden;
    }
</style>