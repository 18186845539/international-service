 <!-- 产品线列表界面 -->
<template>
  <div class="page_view">
    <HeaderNav />
    <div class="page_body_area">
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>产品线列表</span>
        </span>
        <el-button type="success" icon="el-icon-plus" size="small" @click="addProLine">添加产品线</el-button>
      </div>
      <div class="tableRow">
        <el-table stripe :data="tableData">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.list"
                v-if="props.row.list.length !== 0"
                class="expandColimnInit"
                style="width: calc(100% - 48px);margin-left:48px"
                empty-text=" "
              >
                <el-table-column prop="name" label="产品型号"></el-table-column>
                <el-table-column prop="createDate" label="创建日期"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="props">
                    <el-button size="small" @click="edit(props.row, 'model')">编辑</el-button>
                    <el-button size="small" @click="del(props.row.id,props.row.type)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="产品线名称"></el-table-column>
          <el-table-column prop="createDate" label="创建日期"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="addProModel(scope.row)">添加型号</el-button>
              <el-button size="small" @click="edit(scope.row, 'line')">编辑</el-button>
              <el-button size="small" @click="del(scope.row.id,scope.row.type)">删除</el-button>
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
    <!-- 添加产品线组件 -->
    <AddProductLine v-if="isAddProductLine" @dialogClose="dialogClose('isAddProductLine')" />
    <!-- 添加产品型号组件 -->
    <AddProductModel
      v-if="isAddProductModel"
      :rowData="rowData"
      @dialogClose="dialogClose('isAddProductModel')"
    />
  </div>
</template>

<script>
import HeaderNav from '@/components/headerNav'
import Edit from './child/edit'
import VuePagination from '@/components/vuePagination'
import AddProductLine from './child/addProductLine'
import AddProductModel from './child/addProductModel'
export default {
    data() {
        return {
            pagination: {
                pageSize: 10, // 显示的条数
                totals: 0, // 总数
                currentPage: 1, // 当前第几页
            },
            rowData: {},
            isEdit: false, // 是否显示编辑界面
            isAddProductLine: false, // 是否显示添加产品线界面
            isAddProductModel: false, // 是否显示添加产品型号界面
            tableData: [],
        }
    },
    components: {
        HeaderNav,
        Edit,
        AddProductLine,
        AddProductModel,
        VuePagination,
    },
    created() {
        this.productLineList()
    },

    methods: {
        // 列表查询
        productLineList() {
            const params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage,
            }
            this.$Posting(this.$api.productlineListUrl, params).then((res) => {
                if (res.code === 0) {
                    this.tableData = res.data.list
                    this.pagination.totals = res.data.totalCount
                }
            })
        },

        // 添加产品线
        addProLine() {
            this.isAddProductLine = true
        },
        // 添加产品型号
        addProModel(row) {
            this.rowData = { ...row }
            this.isAddProductModel = true
        },
        // 编辑
        edit(row, type) {
            this.rowData = { ...row }
            this.rowData.lineOrModel = type
            this.isEdit = true
        },
        // 删除
        del(id, type) {
            const params = {
                id,
                type,
            }
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$Posting(this.$api.deleteproductlineUrl, params).then(
                    (res) => {
                        if (res.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            })
                            this.productLineList()
                        }
                    }
                )
            })
        },
        // 改变每页的显示数量
        handleSizeChange(val) {
            this.pagination.pageSize = val.pageSize
            this.productLineList()
        },
        // 翻页
        handleCurrentChange(val) {
            val.totals = this.pagination.totals
            this.pagination = {
                ...val,
            }
            this.productLineList()
        },
        //关闭弹框
        dialogClose(val) {
            switch (val) {
                case 'isEdit':
                    // 关闭编辑页面
                    this.isEdit = false
                    break
                case 'isAddProductLine':
                    // 关闭添加产品线界面
                    this.isAddProductLine = false
                    break
                // 关闭添加产品型号界面
                case 'isAddProductModel':
                    this.isAddProductModel = false
            }
            this.productLineList()
        },
    },
}
</script>
<style lang='less' scoped>
/deep/ .el-table__expanded-cell {
    padding: 0 !important;
    border-bottom: none !important;
    .el-table th {
        border-top: none !important;
    }
}
.expandColimnInit /deep/ th > .cell {
    font-size: 14px !important;
}
/deep/ .el-table__expand-icon > .el-icon {
    font-size: 14px;
    margin-top: -6px;
}
/deep/ .el-icon-arrow-right:before {
    content: '\E791';
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