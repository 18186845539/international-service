<!-- 产品类别列表 -->
<template>
  <div class="page_view">
    <HeaderNav />
    <div class="page_body_area">
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>产品类别名称</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="addProductCategory">新增</el-button>
        </span>
      </div>
      <div class="tableRow">
        <el-table :data="tableData" stripe>
          <el-table-column prop="name" label="产品类别"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
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
    <!-- 添加产品类别名称组件 -->
    <AddProductCategory
      v-if="isAddProductCategory"
      @dialogClose="dialogClose('isAddProductCategory')"
    />
    <!-- 编辑产品类别名称组件 -->
    <Edit v-if="isEdit" :rowData="rowData" @dialogClose="dialogClose('isEdit')" />
  </div>
</template>

<script>
import VuePagination from '@/components/vuePagination'
import HeaderNav from '@/components/headerNav'
import AddProductCategory from './child/addProductCategory'
import Edit from './child/edit'

export default {
    data() {
        return {
            pagination: {
                pageSize: 10, // 显示的条数
                totals: 0, // 总数
                currentPage: 1, // 当前第几页
            },
            rowData: {},
            isAddProductCategory: false, // 是否显示添加产品类别界面
            isEdit: false, //是否显示编辑界面
            dialogVisible: false,
            tableData: [],
        }
    },
    components: {
        HeaderNav,
        AddProductCategory,
        Edit,
        VuePagination,
    },
    created() {
        this.queryList()
    },
    methods: {
        // 分页查询产品类别
        queryList() {
            const params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage,
            }
            this.$Posting(this.$api.queryCategoryListUrl, params).then(
                (res) => {
                    if (res.code === 0) {
                        this.tableData = res.data.list
                        this.pagination.totals = res.data.totalCount
                    }
                }
            )
        },
        //添加产品类别
        addProductCategory() {
            this.isAddProductCategory = true
        },
        //编辑
        edit(row) {
            this.rowData = { ...row }
            this.isEdit = true
        },
        //删除
        del(id) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$Geting(this.$api.rmCategoryUrl + `?id=${id}`).then(
                    (res) => {
                        if (res.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            })
                            this.queryList()
                        }
                    }
                )
            })
        },
        // 改变每页的显示数量
        handleSizeChange(val) {
            this.pagination.pageSize = val.pageSize
            this.queryList()
        },
        // 翻页
        handleCurrentChange(val) {
            val.totals = this.pagination.totals
            this.pagination = {
                ...val,
            }
            this.queryList()
        },
        dialogClose(val) {
            switch (val) {
                case 'isAddProductCategory':
                    // 关闭添加产品类别界面
                    this.isAddProductCategory = false
                    break
                // 关闭编辑产品类别界面
                case 'isEdit':
                    this.isEdit = false
            }
            this.queryList()
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