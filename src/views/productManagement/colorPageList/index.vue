 <!-- 彩页列表界面 -->
<template>
  <div class="page_view">
    <HeaderNav />
    <!-- 筛选条件部分 -->
    <div class="pageContainer" ref="pageContainer">
      <div ref="pageSearch" class="pageSearch">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="结果筛选" name="1">
            <div class="searchRow">
              <span>
                产品名称：
                <el-input
                  v-model="pageList.productName"
                  style="width: 180px"
                  placeholder="请输入产品名称"
                  size="small"
                  clearable
                />
              </span>
              <span>
                彩页名称：
                <el-input
                  v-model="pageList.name"
                  style="width: 180px"
                  placeholder="请输入彩页名称"
                  size="small"
                  clearable
                />
              </span>
              <span>
                <span>产品类别：</span>
                <el-select v-model="pageList.categoryName" placeholder="请选择">
                  <el-option
                    v-for="item in productCategoryData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </span>
              <span>
                <span>语言：</span>
                <el-select v-model="pageList.languageName" placeholder="请选择">
                  <el-option
                    v-for="item in languageData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </span>
              <span>
                <span>所属公司：</span>
                <el-select v-model="pageList.companyAffiliation" placeholder="请选择">
                  <el-option
                    v-for="item in companyData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </span>
              <span>
                <el-button
                  @click="querycolorList()"
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
    <!-- 主页面内容 -->
    <div class="page_body_area" :style="{height: `calc(100% - ${searchHeight + 70 + 'px'})`}">
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>彩页列表</span>
        </span>
        <el-button type="success" icon="el-icon-plus" size="small" @click="addColorPage">新增</el-button>
      </div>
      <div class="tableRow">
        <el-table :data="tableData" stripe>
          <el-table-column prop="pdfImage" label="彩页图片">
            <template slot-scope="scope">
              <img style="height:40px;" :src="url+scope.row.pdfImage" alt />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="彩页名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="categoryName" label="产品类别"></el-table-column>
          <el-table-column prop="languageName" label="语言"></el-table-column>
          <el-table-column prop="companyName" label="所属公司"></el-table-column>
          <el-table-column prop="createDate" label="上传时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pageviews" label="浏览量"></el-table-column>
          <el-table-column label="操作" width="600">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button size="small" @click="checkDetails(scope.row)">查看详情</el-button>
              <el-button
                size="small"
                @click="del(scope.row.id,scope.row.fileUrl,scope.row.pdfImage)"
              >删除</el-button>
              <el-button size="small" @click="changePageFile(scope.row)">更换彩页文件</el-button>
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
    <!-- 新增彩页 -->
    <AddColorPage v-if="isAddColorPage" @dialogClose="dialogClose('isAddColorPage')" />
    <!-- 查看彩页详情-->
    <CheckDetails
      v-if="isCheckDetails"
      :rowData="rowData"
      @dialogClose="dialogClose('isCheckDetails')"
    />
    <!-- 更换彩页 -->
    <ChangeColorPage
      v-if="isChangeColorPage"
      :rowData="rowData"
      @dialogClose="dialogClose('isChangeColorPage')"
    />
  </div>
</template>

<script>
import HeaderNav from '@/components/headerNav'
import AddColorPage from './child/addColorPage'
import Edit from './child/edit'
import CheckDetails from './child/checkDetails'
import ChangeColorPage from './child/changePage'
import VuePagination from '@/components/vuePagination'
import selectData from '@/mixins/selectData.js'

export default {
    data() {
        return {
            url: 'http://172.14.10.55:7140/gjkfApi',
            pagination: {
                pageSize: 10, // 显示的条数
                totals: 0, // 总数
                currentPage: 1, // 当前第几页
            },
            activeNames: ['1'], //搜索框默认展开
            isEdit: false, // 是否显示编辑界面
            isAddColorPage: false, //是否显示新增公司界面
            isCheckDetails: false, //是否显示公司详情界面
            isChangeColorPage: false, //是否显示更换彩页界面
            pageList: {
                productName: '', // 产品名称
                name: '', // 彩页名称
                categoryName: '', // 产品类别
                languageName: '', // 语言
                companyAffiliation: '', // 所属公司
            },
            rowData: {},
            tableData: [],
            searchHeight: 0,
        }
    },
    components: {
        HeaderNav,
        AddColorPage,
        Edit,
        CheckDetails,
        ChangeColorPage,
        VuePagination,
    },
    mixins: [selectData],

    created() {
        this.querycolorList()
    },
    mounted() {
        this.searchHeight = this.$refs.pageContainer.offsetHeight
    },
    methods: {
        // 查询彩页列表
        querycolorList() {
            let params = {
                productId: this.$route.query.productId,
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage,
                name: this.pageList.name,
                languageId: this.pageList.languageName,
                categoryId: this.pageList.categoryName,
                productlineId: this.pageList.productLine,
                productlineId: this.pageList.productModel,
                companyId: this.pageList.companyAffiliation,
            }
            this.$Posting(this.$api.queryPdfListUrl, params).then((res) => {
                if (res.code === 0) {
                    this.tableData = res.data.list
                    this.pagination.totals = res.data.totalCount
                }
            })
        },
        //清空筛选
        emptySearch() {
            this.pageList = {}
            this.querycolorList()
        },
        // 清空筛选列表
        emptySearch() {},
        // 改变每页的显示数量
        handleSizeChange(val) {
            this.pagination.pageSize = val.pageSize
            this.querycolorList()
        },
        // 翻页
        handleCurrentChange(val) {
            val.totals = this.pagination.totals
            this.pagination = {
                ...val,
            }
            this.querycolorList()
        },
        //打开添加彩页界面
        addColorPage() {
            this.isAddColorPage = true
        },
        //打开编辑界面
        edit(row) {
            this.rowData = { ...row }
            this.isEdit = true
        },
        //打开查看详情界面
        checkDetails(row) {
            this.rowData = { ...row }
            this.isCheckDetails = true
        },
        changePageFile(row) {
            this.rowData = { ...row }
            this.isChangeColorPage = true
        },
        // 删除
        del(id, fileUrl, pdfImage) {
            const params = { id }
            const params1 = {
                pdfPath: fileUrl,
                imagePath: pdfImage,
            }
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$Geting(this.$api.rmPdfUrl, params).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                    this.$Posting(this.$api.rmFileUrl, params1).then((res) => {
                        if (res.code === 0) {
                            console.log('PDF文件删除成功')
                        }
                    })

                    this.querycolorList()
                })
            })
        },
        dialogClose(val) {
            switch (val) {
                case 'isAddColorPage':
                    // 关闭彩页界面
                    this.isAddColorPage = false
                    break
                case 'isEdit':
                    // 关闭编辑页面
                    this.isEdit = false
                    break
                case 'isCheckDetails':
                    // 关闭公司详情界面
                    this.isCheckDetails = false
                    break
                case 'isChangeColorPage':
                    // 关闭更换彩页
                    this.isChangeColorPage = false
                    break
            }
            this.querycolorList()
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
    .pageContainer {
        padding-top: 10px;
        .pageSearch {
            display: block;
            line-height: 30px;
            margin-bottom: 20px;
            .searchRow {
                display: flex;
                justify-content: space-around;
            }
            /deep/.el-collapse-item__header {
                padding: 0 20px;
            }
            .el-collapse-item {
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                    0 0 6px rgba(0, 0, 0, 0.04);
            }
        }
    }
    .page_body_area {
        float: right;
        width: 100%;
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
            box-sizing: border-box;
            padding: 10px 20px;
            line-height: 33px;
            font-size: 16px;
            font-weight: 700;
            color: #29affb;
            display: flex;
            justify-content: space-between;
        }
        .tableRow {
            height: calc(100% - 120px);
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                0 0 6px rgba(0, 0, 0, 0.04);
            .el-table {
                height: 100%;
                /deep/.el-table__body-wrapper {
                    height: calc(100% - 40px);
                    overflow-y: scroll;
                }
            }
        }
    }
}
</style>