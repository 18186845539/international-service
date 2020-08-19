 <!-- 用户流向界面 -->
<template>
    <div class="page_view">
        <HeaderNav />
        <div class="pageContainer" ref="pageContainer">
            <div ref="pageSearch" class="pageSearch">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="结果筛选" name="1" class="tableTitle">
                        <div class="searchRow">
                            <span>
                                <el-select v-model="pageList.phone" placeholder="按天">
                                    <el-option label="按天" value="按天"></el-option>
                                    <el-option label="按月" value="按月"></el-option>
                                    <el-option label="按年" value="按年"></el-option>
                                </el-select>
                            </span>
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

                            <span>
                                <span>至&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                            <br />
                             <span> 数据解读：该数据为您显示：访客浏览页面的特征，为之后进行产品升级，活动营销做准备。 </span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="page_body_area">
            <div class="tableTitle">
                <span>
                    <i class="el-icon-news"></i>
                    <span>全部页面</span>
                </span>
                <span>
                    <el-select v-model="pageList.phone" placeholder="登录页面">
                        <el-option label="登录页面" value="登录页面"></el-option>
                        <el-option label="彩页页面" value="彩页页面"></el-option>
                        <el-option label="视频页面" value="视频页面"></el-option>
                    </el-select>
                </span>
            </div>
            <div class="tableRow">
                <el-table :data="tableData" stripe>
                    <el-table-column prop="userName" label="页面名称"></el-table-column>
                    <el-table-column prop="phone" label="浏览量"></el-table-column>
                    <el-table-column prop="email" label="访问次数"></el-table-column>
                    <el-table-column prop="machineCode" label="平均停留时间"></el-table-column>
                    <el-table-column prop="hospital" label="退出率"></el-table-column>
                    <el-table-column label="操作" width="400">
                        <template>
                            <el-button size="small" @click="checkDate">查看具体日期</el-button>
                            <el-button size="small" @click="checkFlowDetails">查看流向明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 查看具体日期组件-->
        <CheckDate v-if="isCheckDate" @dialogClose="dialogClose('isCheckDate')" />
        <!-- 查看流向明细组件-->
        <CheckFlowDetails
            v-if="isCheckFlowDetails"
            @dialogClose="dialogClose('isCheckFlowDetails')"
        />
    </div>
</template>

<script>
import HeaderNav from "@/components/headerNav";
import CheckDate from "./child/checkDate";
import CheckFlowDetails from "./child/checkFlowDetails";

export default {
    data() {
        return {
            activeNames:["1"],//搜索框默认展开
            isCheckDate: false, //是否查看具体日期
            isCheckFlowDetails: false, //是否查看流向明细组件
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
        CheckDate,
        CheckFlowDetails,
    },
    methods: {
        //查看具体日期
        checkDate() {
            this.isCheckDate = true;
        },
        //查看流向明细组件
        checkFlowDetails() {
            this.isCheckFlowDetails = true;
        },
        dialogClose(val) {
            switch (val) {
                case "isCheckDate":
                    // 关闭查看具体日期
                    this.isCheckDate = false;
                    break;
                case "isCheckFlowDetails":
                    // 关闭公司详情界面
                    this.isCheckFlowDetails = false;
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
        .table {
            height: calc(100% - 50px);
            .operation-a {
                display: inline-block;
                cursor: pointer;
            }
            .el-table-column {
                text-align: center;
            }
        }
        .tableTitle {
            margin: 20px 0px 10px;
            line-height: 20px;
            font-size: 20px;
            font-weight: 700;
            color: #29affb;
            display: flex;
            justify-content: space-between;
        }
        .tableRow {
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                0 0 6px rgba(0, 0, 0, 0.04);
            .el-table th {
                background-color: #f5f7fb;
                border-top: 1px solid #eaedf4;
            }
        }
    }
}
</style>