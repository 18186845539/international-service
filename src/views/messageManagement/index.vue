 <!-- 留言管理界面 -->
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
                                <span>公司名称：</span>
                                <span class="searchItem">
                                    <el-input v-model="pageList.companyName" size="small" clearable></el-input>
                                </span>
                            </span>
                            <span>
                                <span>产品线：</span>
                                <el-select v-model="pageList.productLine" placeholder="请选择">
                                    <el-option label="呼吸机" value="呼吸机"></el-option>
                                    <el-option label="麻醉机" value="麻醉机"></el-option>
                                    <el-option label="手术灯" value="手术灯"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <span>产品型号：</span>
                                <el-select v-model="pageList.productModel" placeholder="请选择">
                                    <el-option label="VG70" value="VG70"></el-option>
                                    <el-option label="510S" value="510S"></el-option>
                                    <el-option label="590P" value="590P"></el-option>
                                </el-select>
                            </span>
                            <span>所属公司：</span>
                            <el-select v-model="pageList.companyAffiliation" placeholder="请选择">
                                <el-option label="呼吸机" value="呼吸机"></el-option>
                                <el-option label="麻醉机" value="麻醉机"></el-option>
                                <el-option label="手术灯" value="手术灯"></el-option>
                            </el-select>

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
                    <span>留言列表</span>
                </span>
            </div>
            <div class="tableRow">
                <el-table :data="tableData" stripe>
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column prop="messageContent" label="留言内容"></el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="productLine" label="产品线"></el-table-column>
                    <el-table-column prop="productModel" label="产品型号"></el-table-column>
                    <el-table-column prop="affiliationCompany" label="所属公司"></el-table-column>
                    <el-table-column prop="affiliationCountry" label="所属国家"></el-table-column>
                    <el-table-column prop="ipAddress" label="Ip地址"></el-table-column>
                    <el-table-column prop="messageTime" label="留言时间"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" @click="del">{{ '删除' || scope.row.id }}</el-button>
                        </template>
                    </el-table-column>
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
                companyName: "", //公司名称
                productName: "", //产品名称
                productModel: "", //产品型号
                companyAffiliation: "", //所属公司
            },
            tableData: [
                {
                    id: "1",
                    userName: "张三",
                    messageContent: "呼吸机供养有问题",
                    phone: "18186840000",
                    productLine: "呼吸机",
                    productModel: "VG70",
                    affiliationCompany: "谊安",
                    affiliationCountry: "中国",
                    ipAddress: "39.105.235.378",
                    messageTime: "2020-07-27",
                },
                {
                    id: "2",
                    userName: "张三",
                    messageContent: "呼吸机供养有问题",
                    phone: "18186840000",
                    productLine: "呼吸机",
                    productModel: "VG70",
                    affiliationCompany: "谊安",
                    affiliationCountry: "中国",
                    ipAddress: "39.105.235.378",
                    messageTime: "2020-07-27",
                },
                {
                    id: "3",
                    userName: "张三",
                    messageContent: "呼吸机供养有问题",
                    phone: "18186840000",
                    productLine: "呼吸机",
                    productModel: "VG70",
                    affiliationCompany: "谊安",
                    affiliationCountry: "中国",
                    ipAddress: "39.105.235.378",
                    messageTime: "2020-07-27",
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

        .fade-enter {
            opacity: 0;
            height: 0;
        }

        .fade-leave {
            opacity: 1;
            height: 100%;
        }

        .fade-enter-active,
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

        .details {
            margin: 20px 50px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                0 0 6px rgba(0, 0, 0, 0.04);

            .detailsRow {
                margin-bottom: 10px;
            }

            .detailsTitle {
                text-align: right;
            }

            .detailsBodle {
                color: #429efd;
            }
        }
    }

    .tableRow {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

        .workOrder {
            color: #29c0fc;
            cursor: pointer;
        }

        .tableTitle {
            margin: 20px 20px 10px;
            line-height: 33px;
            font-size: 14px;
            font-weight: 700;
            color: #29affb;
            display: flex;
            justify-content: space-between;
        }

        .el-table th {
            background-color: #f5f7fb;
            border-top: 1px solid #eaedf4;
        }
    }
}
.page_view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .page_body {
        position: absolute;
        top: 55px;
        width: 100%;
        height: calc(100% - 55px);
        &_menu {
            float: left;
            width: 240px;
            height: 100%;
            .el-tree {
                height: 100%;
                border-right: 1px solid #e6e6e6;
                background: none;
            }
        }
    }
    .page_body_area {
        float: right;
        width: calc(100% - 10px);
        height: 100%;
        overflow: hidden;
        .search {
            width: calc(100% - 40px);
            height: 50px;
            padding: 10px 20px;
            box-sizing: border-box;
            .el-input {
                width: 400px;
                float: left;
            }
            &_btn {
                float: left;
                display: block;
                width: 60px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #eaedf1;
                border-left: none;
                box-sizing: border-box;
                cursor: pointer;
            }
            .add-cenlit {
                float: right;
            }
        }
    }
}
</style>