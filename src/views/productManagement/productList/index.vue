 <!-- 产品列表界面 -->
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
                ></el-input>
              </span>
              <span>
                产品线：
                <el-select
                  v-model="pageList.productLine"
                  placeholder="请选择"
                  @change="productModelListUrl"
                >
                  <el-option
                    v-for="item in productLineData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </span>
              <span>
                产品型号：
                <el-select v-model="pageList.productModel" placeholder="请选择">
                  <el-option
                    v-for="item in productModelData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </span>
              <span>
                所属公司：
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
                <el-button @click="queryList()" type="primary" icon="el-icon-search" size="small">筛选</el-button>
                <el-button @click="emptySearch()" type="primary" size="small">清空筛选</el-button>
              </span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="page_body_area" :style="{height: `calc(100% - ${searchHeight + 70 + 'px'})`}">
        <div class="tableTitle">
          <span>
            <i class="el-icon-news"></i>
            <span>产品列表</span>
          </span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="addProduct">新增</el-button>
        </div>
        <div class="tableRow">
          <el-table :data="tableData" stripe show-overflow-tooltip>
            <el-table-column prop="image" label="产品图片">
              <template slot-scope="scope">
                <img style="height:40px;" :src="url+scope.row.image" alt />
                <!-- <img style="height:30px;" src="../../../assets/background1.jpg" alt /> -->
              </template>
            </el-table-column>
            <el-table-column prop="name" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="introduction" label="产品介绍" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lineName" label="产品线"></el-table-column>
            <el-table-column prop="modeName" label="产品型号"></el-table-column>
            <el-table-column prop="companyName" label="所属公司"></el-table-column>
            <el-table-column prop="pdfNumber" label="彩页数量"></el-table-column>
            <el-table-column prop="videoNumber" label="视频数量"></el-table-column>
            <el-table-column prop="createDate" label="上传时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="500">
              <template slot-scope="scope">
                <el-button size="small" @click="checkDetails(scope.row)">查看详情</el-button>
                <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                <el-button size="small" @click="checkColorPage(scope.row.id)">查看彩页</el-button>
                <el-button size="small" @click="checkVideo(scope.row.id)">查看视频</el-button>
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
    </div>
    <!-- 新增产品组件 -->
    <AddProduct v-if="isAddProduct" @dialogClose="dialogClose('isAddProduct')" />
    <!-- 添加编辑组件 -->
    <Edit v-if="isEdit" :rowData="rowData" @dialogClose="dialogClose('isEdit')" />
    <!-- 查看公司详情-->
    <CheckDetails
      v-if="isCheckDetails"
      :rowData="rowData"
      @dialogClose="dialogClose('isCheckDetails')"
    />
  </div>
</template>

<script>
import HeaderNav from '@/components/headerNav'
import AddProduct from './child/addProduct'
import Edit from './child/edit'
import VuePagination from '@/components/vuePagination'
import CheckDetails from './child/checkDetails'
import moment from 'moment'
import selectData from '@/mixins/selectData.js'

export default {
    data() {
        return {
            pagination: {
                pageSize: 10, // 显示的条数
                totals: 0, // 总数
                currentPage: 1, // 当前第几页
            },
            activeNames: ['1'], // 搜索框默认展开
            isEdit: false, // 是否显示编辑界面
            isAddProduct: false, // 是否显示添加产品界面
            isCheckDetails: false, // 是否显示产品详情界面
            isCheckColorPage: false, // 是否显示查看彩页界面
            isCheckVideo: false, // 是否显示查看视频界面
            pageList: {
                productName: '', // 产品名称
                productLine: '', // 产品线
                productModel: '', // 产品型号
                companyAffiliation: '', // 所属公司
            },
            url: 'http://172.14.10.55:7140/gjkfApi',
            tableData: [],
            searchHeight: 0,
            rowData: {}, // 产品数据
        }
    },
    components: {
        HeaderNav,
        AddProduct,
        Edit,
        VuePagination,
        CheckDetails,
    },
    mixins: [selectData],
    watch: {},
    created() {
        this.queryList()
    },
    mounted() {
        this.searchHeight = this.$refs.pageSearch.offsetHeight
    },
    methods: {
        // 时间转换
        moment(time, type) {
            if (type === '1') return time ? moment(time).format('YYYY-MM') : ''
            if (type === '2')
                return time ? moment(time).format('YYYY-MM-DD') : ''
            if (type === '3')
                return time ? moment(time).format('YYYY-MM-DD HH') : ''
            if (type === '4')
                return time ? moment(time).format('YYYY-MM-DD HH:mm') : ''
            if (type === '5')
                return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : ''
        },

        // 查询产品列表
        queryList() {
            let params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage,
                name: this.pageList.productName,
                productlineId: this.pageList.productLine,
                productlineId: this.pageList.productModel,
                companyId: this.pageList.companyAffiliation,
            }
            this.$Posting(this.$api.queryProductListUrl, params).then((res) => {
                if (res.code === 0) {
                    this.tableData = res.data.list
                    this.pagination.totals = res.data.totalCount
                }
            })
        },
        //清空筛选
        emptySearch() {
            this.pageList = {}
            this.queryList()
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
        addProduct() {
            this.isAddProduct = true
        },
        edit(row) {
            this.rowData = { ...row }
            this.isEdit = true
        },
        checkDetails(row) {
            this.rowData = { ...row }
            this.isCheckDetails = true
        },

        // 跳转到彩页列表
        checkColorPage(id) {
            this.$router.push({
                name: 'colorPageList',
                path: 'colorPageList',
                query: { productId: id },
            })
            // this.isCheckColorPage = true;
        },
        // 跳转到视频列表
        checkVideo(id) {
            this.$router.push({
                name: 'videoList',
                path: 'videoList',
                query: { productId: id },
            })
            // this.isCheckVideo = true;
        },
        del(id) {
            this.$Geting(
                this.$api.queryPageOrVideoUrl + `?productId=${id}`
            ).then((res) => {
                if (res.code === 500) {
                    this.$message({
                        type: 'error',
                        message: res.msg,
                    })
                } else if (res.code === 0) {
                    this.$Geting(this.$api.rmProductUrl + `?id=${id}`).then(
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
                }
            })

            // })
        },
        // 关闭各个组件
        dialogClose(val) {
            switch (val) {
                case 'isEdit':
                    // 关闭编辑页面
                    this.isEdit = false
                    break
                case 'isAddProduct':
                    // 关闭新增产品界面
                    this.isAddProduct = false
                    break
                case 'isCheckDetails':
                    // 关闭产品详情界面
                    this.isCheckDetails = false
                    break
                case 'isCheckColorPage':
                    // 关闭查看彩页界面
                    this.isCheckColorPage = false
                    break
                case 'isCheckVideo':
                    // 关闭查看视频界面
                    this.isCheckVideo = false
                    break
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