<!-- 访问数据界面-->
<template>
    <div>
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
                            <span>数据解读：该数据为您显示：访客浏览页面的特征，为之后进行产品升级，活动营销做准备。</span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <!--为echarts准备一个具备大小的容器dome-->
                <div
                    id="main"
                    style="width: 600px;height: 400px;position: absolute;margin-left:30%;margin-top:5%"
                ></div>
            </div>
            <div class="tableTitle">
                <span>
                    <i class="el-icon-news"></i>
                    <span>彩页列表</span>
                </span>
                <el-button size="small" @click="addColorPage" style="margin-left:75%;">浏览量</el-button>
                <el-button size="small" @click="addColorPage">访问次数</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderNav from "@/components/headerNav";
import echarts from "echarts";
export default {
    name: "",
    data() {
        return {
            activeNames:["1"],//搜索框默认展开
            pageList: {
                userName: "", //用户名
                phone: "", //手机号
                machineCode: "", //机器编码
                companyAffiliation: "", //所属公司
            },
            charts: "",
            opinionData: ["3", "2", "4", "4", "5"],
        };
    },
    methods: {
        drawLine(id) {
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption({
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["浏览量"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },

                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["1", "2", "3", "4", "5"],
                },
                yAxis: {
                    type: "value",
                },

                series: [
                    {
                        name: "浏览量",
                        type: "line",
                        stack: "总量",
                        data: this.opinionData,
                    },
                ],
            });
        },
    },
    //调用
    mounted() {
        this.$nextTick(function () {
            this.drawLine("main");
        });
    },
     components: {
        HeaderNav
    },
};
</script>
<style lang='less' scoped>
.pageContainer {
    // height: calc(100vh - 100px);
    padding: 10px;
    .pageSearch {
        display: block;
        line-height: 30px;
        margin-bottom: 20px;

        .searchRow {
            padding: 10px;
            // display: flex;
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