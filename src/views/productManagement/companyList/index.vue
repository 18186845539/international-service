 <!-- 公司列表界面 -->
<template>
  <div class="page_view">
    <HeaderNav />
    <div class="page_body_area">
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>公司列表</span>
        </span>
        <el-button type="success" icon="el-icon-plus" size="small" @click="addCompany">新增</el-button>
      </div>
      <div class="tableRow">
        <el-table :data="tableData" stripe>
          <el-table-column prop="logoImage" label="logo" width="100">
            <template slot-scope="scope">
              <img style="height:40px;" :src="url+scope.row.logoImage" alt />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="introduction" label="公司介绍"></el-table-column>
          <el-table-column prop="companyUrl" label="网址"></el-table-column>
          <el-table-column prop="noticeUrl" label="使用须知" show-overflow-tooltip></el-table-column>
          <el-table-column prop="themeStyle" label="主体风格"></el-table-column>
          <el-table-column prop="other" label="其他"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button size="small" @click="checkDetails(scope.row)">查看详情</el-button>
              <el-button size="small" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </div>

    <!-- 添加编辑组件 -->
    <Edit v-if="isEdit" :rowData="rowData" @dialogClose="dialogClose('isEdit')" />
    <!-- 添加公司组件 -->
    <AddCompany v-if="isAddCompany" @dialogClose="dialogClose('isAddCompany')" />
    <!-- 查看公司详情组件-->
    <CheckDetails
      v-if="isCheckDetails"
      :rowData="rowData"
      @dialogClose="dialogClose('isCheckDetails')"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderNav from '@/components/headerNav'
import AddCompany from './child/addCompany'
import Edit from './child/edit'
import CheckDetails from './child/cheakDetails'
import VuePagination from '@/components/vuePagination'

export default {
    data() {
        return {
            pagination: {
                pageSize: 10, // 显示的条数
                totals: 0, // 总数
                currentPage: 1, // 当前第几页
            },
            //  PICIP: '',
            url: 'http://172.14.10.55:7140/gjkfApi',
            isEdit: false, // 是否显示编辑界面
            isAddCompany: false, //是否显示新增公司界面
            isCheckDetails: false, //是否显示公司详情界面
            tableData: [],
            rowData: {},
        }
    },
    components: {
        HeaderNav,
        AddCompany,
        Edit,
        CheckDetails,
        VuePagination,
    },
    created() {
        this.querycompany()
    },

    methods: {
        querycompany() {
            const params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage,
            }
            this.$Posting(this.$api.querycompanyUrl, params)
                .then((res) => {
                    if (res.code === 0) {
                        this.tableData = res.data.list
                        this.pagination.totals = res.data.totalCount
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        //增加公司
        addCompany() {
            this.isAddCompany = true
        },
        //编辑公司
        edit(row) {
            this.rowData = { ...row }
            this.isEdit = true
        },
        //查看详情
        checkDetails(row) {
            this.rowData = { ...row }
            this.isCheckDetails = true
        },
        //删除
        del(id) {
            const params = {
                id,
            }
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(() => {
                    this.$Geting(this.$api.deletecompanyUrl, params).then(
                        () => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            })

                            this.querycompany()
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        // 改变每页的显示数量
        handleSizeChange(val) {
            this.pagination.pageSize = val.pageSize
            this.querycompany()
        },
        // 翻页
        handleCurrentChange(val) {
            val.totals = this.pagination.totals
            this.pagination = {
                ...val,
            }
            this.querycompany()
        },
        // 关闭弹框
        dialogClose(val) {
            switch (val) {
                case 'isEdit':
                    // 关闭编辑页面
                    this.isEdit = false
                    break
                case 'isAddCompany':
                    // 关闭新增公司界面
                    this.isAddCompany = false
                    break
                case 'isCheckDetails':
                    // 关闭公司详情界面
                    this.isCheckDetails = false
                    break
            }
            this.querycompany()
        },
    },
}
</script>
<style lang='less' scoped>
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
    }
    .page_body_area {
        float: right;
        width: 100%;
        height: calc(100% - 50px);
        overflow: hidden;
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
            height: calc(100% - 130px);
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
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
}
</style>