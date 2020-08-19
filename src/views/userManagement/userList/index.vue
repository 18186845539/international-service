 <!-- 用户列表界面 -->
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
                                <span>手机号：</span>
                                <el-select v-model="pageList.phone" placeholder="请选择">
                                    <el-option label="呼吸机" value="呼吸机"></el-option>
                                    <el-option label="麻醉机" value="麻醉机"></el-option>
                                    <el-option label="手术灯" value="手术灯"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <span>机器编码：</span>
                                <el-select v-model="pageList.machineCode" placeholder="请选择">
                                    <el-option label="VG70" value="VG70"></el-option>
                                    <el-option label="510S" value="510S"></el-option>
                                    <el-option label="590P" value="590P"></el-option>
                                </el-select>
                            </span>
                            <span>所属公司：</span>
                            <el-select v-model="pageList.companyAffiliation" placeholder="请选择">
                                <el-option label="谊安" value="谊安"></el-option>
                                <el-option label="Oricare" value="Oricare"></el-option>
                                <el-option label="heyer" value="heyer"></el-option>
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
                    <span>用户列表</span>
                </span>
            </div>
            <div class="tableRow">
                <el-table :data="tableData" stripe>
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column prop="machineCode" label="机器编码"></el-table-column>
                    <el-table-column prop="hospital" label="医院"></el-table-column>
                    <el-table-column prop="affiliationCountry" label="所属国家"></el-table-column>
                    <el-table-column prop="affiliationCompany" label="所属公司"></el-table-column>
                    <el-table-column prop="lastLoginTime" label="上次登录时间"></el-table-column>
                    <el-table-column prop="registrationTime" label="注册时间"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template>
                            <el-button size="small" @click="disable">停用</el-button>
                            <el-button size="small" @click="checkDetails">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 查看公司详情组件-->
        <CheckDetails v-if="isCheckDetails" @dialogClose="dialogClose('isCheckDetails')" />
    </div>
</template>

<script>
import HeaderNav from "@/components/headerNav";
import CheckDetails from "./child/checkDetails";
export default {
    data() {
        return {
            activeNames:["1"],//搜索框默认展开
            isCheckDetails: false, //是否显示详情界面
            pageList: {
                userName: "", //用户名
                phone: "", //手机号
                machineCode: "", //机器编码
                companyAffiliation: "", //所属公司
            },
            tableData: [
                {
                    id: "1",
                    userName: "张三",
                    phone: "18186845555",
                    email: "zhangsan@163.com",
                    machineCode: "ADDSSS7788455",
                    hospital: "北京协和医院",
                    affiliationCompany: "谊安",
                    affiliationCountry: "中国",
                    lastLoginTime: "2020-07-27",
                    registrationTime: "2020-07-27",
                },
                {
                    id: "2",
                    userName: "李四",
                    phone: "18186845555",
                    email: "zhangsan@163.com",
                    machineCode: "ADDSSS7788455",
                    hospital: "北京协和医院",
                    affiliationCompany: "谊安",
                    affiliationCountry: "中国",
                    lastLoginTime: "2020-07-27",
                    registrationTime: "2020-07-27",
                },
                {
                    id: "3",
                    userName: "王五",
                    phone: "18186845555",
                    email: "zhangsan@163.com",
                    machineCode: "ADDSSS7788455",
                    hospital: "北京协和医院",
                    affiliationCompany: "谊安",
                    affiliationCountry: "中国",
                    lastLoginTime: "2020-07-27",
                    registrationTime: "2020-07-27",
                },
            ],
        };
    },
    components: {
        HeaderNav,
        CheckDetails,
    },
    methods: {
        //停用
        disable() {},
        //查看详情
        checkDetails() {
            this.isCheckDetails = true;
        },
        dialogClose(val) {
            switch (val) {
                case "isEdit":
                    // 关闭编辑页面
                    this.isEdit = false;
                    break;
                case "isAddCompany":
                    // 关闭新增公司界面
                    this.isAddCompany = false;
                    break;
                case "isCheckDetails":
                    // 关闭公司详情界面
                    this.isCheckDetails = false;
                    break;
            }
        },
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
         .tableTitle {
            margin: 20px 20px 10px;
            line-height: 33px;
            font-size: 14px;
            font-weight: 700;
            color: #29affb;
            display: flex;
            justify-content: space-between;
        }

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