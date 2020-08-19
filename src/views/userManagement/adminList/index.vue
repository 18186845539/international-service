<!-- 管理员列表 -->
<template>
    <div class="admin-list-page">
        <HeaderNav />
        <div class="table">
            <div class="table_head">
                <div>
                    <i class="el-icon-news"></i>
                    <span>筛选查询</span>
                </div>
                <el-button type="success" size="small">查询结果</el-button>
            </div>
            <div class="table_search">
                <el-row type="flex" justify="space-around">
                    <el-col :span="5">
                        <span>姓名：</span>
                        <el-input
                            v-model="filterDatas.nameValue"
                            style="width: 200px"
                            placeholder="请输入姓名"
                        ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <span>手机号：</span>
                        <el-input
                            v-model="filterDatas.phoneValue"
                            style="width: 200px"
                            placeholder="请输入手机号"
                        ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <span>所属公司：</span>
                        <el-select
                            v-model="filterDatas.companyValue"
                            style="width: 200px"
                            placeholder="请选择所属公司"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <span>管理员状态：</span>
                        <el-select
                            v-model="filterDatas.adminState"
                            style="width: 200px"
                            placeholder="请选择状态"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div class="table_body">
                <el-table :data="tableData" style="width: 100%" stripe>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column prop="subordinateCompanies" label="所属公司"></el-table-column>
                    <el-table-column prop="SubordinatePublicRole" label="所属角色"></el-table-column>
                    <el-table-column prop="state" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span class="operation-a">{{ scope.row.state ? '启用' : '停用' }}</span>
                            <span class="operation-a" @click="opneEditUser('1')">查看详情</span>
                            <span class="operation-a">分配角色</span>
                            <span class="operation-a" @click="opneAddUser">新增</span>
                            <span class="operation-a" @click="opneEditUser('2')">编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分页器组件 -->
        <div class="pagination">
            <VuePagination
                ref="vuePagination"
                :current-page="pagination.currentPage"
                :pageSize="pagination.pageSize"
                :totals="pagination.totals"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <!-- 新增管理员组件 -->
        <AddManagement
            ref="AddManagement"
            :isAddManagement="isAddManagement"
            @closeDialog="closeDialog('AddManagement')"
        />
        <!-- 编辑管理员和查看详情组件 -->
        <EditManagement
            ref="EditManagement"
            :isEditManagement="isEditManagement"
            :isEditOrShow="isEditOrShow"
            @closeDialog="closeDialog('EditManagement')"
        />
    </div>
</template>
<script>
import HeaderNav from "@/components/headerNav";
import AddManagement from "./child/addManagement";
import EditManagement from "./child/editManagement";
import VuePagination from '@/components/vuePagination'
import moment from "moment"
export default {
    name: "adminList",
    components: {
        HeaderNav,
        AddManagement,
        VuePagination,
        EditManagement
    },
    data() {
        return {
            isEditOrShow: '', // 区分编辑组件和查看详情
            isEditManagement: false, // 是否显示编辑组件
            isAddManagement: false, // 是否显示新增组件
            tableData: [
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                },
                {
                    name: 'a', // 名字
                    phone: '2', // 电话
                    subordinateCompanies: '梵蒂冈', // 所属公司
                    SubordinatePublicRole: '试试水', // 所属角色
                    state: '沙雕' // 状态
                }
            ],
            options: [
                {
                    value: "选项1",
                    label: "黄金糕",
                },
                {
                    value: "选项2",
                    label: "双皮奶",
                },
                {
                    value: "选项3",
                    label: "蚵仔煎",
                },
                {
                    value: "选项4",
                    label: "龙须面",
                },
                {
                    value: "选项5",
                    label: "北京烤鸭",
                },
            ],
            pagination: {
                pageSize: 10, // 显示的条数
                totals: 0, // 总数
                currentPage: 1 // 当前第几页
            },
            // 筛选变量
            filterDatas: {
                nameValue: '',
                phoneValue: '',
                companyValue: '',
                adminState: '',
            }
        };
    },
    watch: {
        'pagination.currentPage' (newVal) {
            this.$refs.vuePagination.currentPage = newVal
        },
        'pagination.pageSize' (newVal) {
            this.$refs.vuePagination.size = newVal
        }
    },
    methods: {
        // 时间转换
        moment (time, type) {
            if (type === '1') return time ? moment(time).format('YYYY-MM') : ''
            if (type === '2') return time ? moment(time).format('YYYY-MM-DD') : ''
            if (type === '3') return time ? moment(time).format('YYYY-MM-DD HH') : ''
            if (type === '4') return time ? moment(time).format('YYYY-MM-DD HH:mm') : ''
            if (type === '5') return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : ''
        },
        // 打开新增管理员组件
        opneAddUser () {
            this.isAddManagement = true
        },
        // 打开编辑组件
        opneEditUser (type) {
            this.isEditOrShow = type
            this.isEditManagement = true
        },
        // 关闭弹框
        closeDialog (val) {
            switch (val) {
                case 'AddManagement':
                    this.isAddManagement = false
                    break;
                case 'EditManagement':
                    this.isEditManagement = false
                    break;
            }
        },
        // 改变每页的显示数量
        handleSizeChange (val) {
            this.pagination.pageSize = val.pageSize;
        },
        // 翻页
        handleCurrentChange (val) {
            val.totals = this.pagination.totals;
            this.pagination = {
                ...val
            };
        }
    }
};
</script>
<style lang="less" scoped>
.operation-a {
    display: inline-block;
    cursor: pointer;
}
.admin-list-page {
    .table {
        width: 100%;
        height: calc(100% - 120px);
        overflow: hidden;
        &_head {
            margin: 20px 0px 10px;
            padding: 0 30px;
            font-size: 20px;
            font-weight: 700;
            color: #29affb;
            display: flex;
            justify-content: space-between;
        }
        &_search {
            width: 100%;
            overflow: hidden;
            padding-bottom: 20px;
        }
        &_body {
            height: calc(100% - 100px);
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                0 0 6px rgba(0, 0, 0, 0.04);
            .el-table {
                height: 100%;
                /deep/.el-table__body-wrapper {
                    height: 100%;
                    overflow-y: scroll;
                }
            }
        }
    }
    .pagination {
        left: auto;
        right: 32px;
        bottom: 21px;
        height: 50px;
        padding-right: 50px;
        .page-wrapper {
            float: right;
            margin-top: 20px;
        }
    }
}
</style>
