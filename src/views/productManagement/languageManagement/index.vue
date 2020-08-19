<!-- 语言列表 -->
<template>
  <div class="page_view">
    <HeaderNav />
    <div class="page_body_area">
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>语言列表</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="addAddLanguage">新增</el-button>
        </span>
      </div>

      <div class="tableRow">
        <el-table :data="tableData" stripe>
          <el-table-column prop="name" label="语言"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button size="small" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加语言组件 -->
    <AddLanguage v-if="isAddLanguage" @dialogClose="dialogClose('isAddLanguage')" />
    <!-- 编辑语言组件 -->
    <Edit v-if="isEdit" :rowData="rowData" @dialogClose="dialogClose('isEdit')" />
  </div>
</template>

<script>
import HeaderNav from '@/components/headerNav'
import AddLanguage from './child/addLanguage'
import Edit from './child/edit'

export default {
    data() {
        return {
            rowData: {},
            dialogVisible: false,
            isAddLanguage: false, // 是否显示添加用户界面
            isEdit: false, //是否显示编辑用户界面
            tableData: [],
        }
    },
    components: {
        HeaderNav,
        AddLanguage,
        Edit,
    },
    created() {
        this.queryLangageList()
    },
    methods: {
        // 查询语言列表
        queryLangageList() {
            this.$Posting(this.$api.languageListUrl).then((res) => {
                if (res.code === 0) {
                    this.tableData = res.data.list
                }
            })
        },
        //增加语言界面
        addAddLanguage() {
            this.isAddLanguage = true
        },
        //编辑语言界面
        edit(row) {
            this.rowData = { ...row }
            this.isEdit = true
        },
        // 删除语言
        del(id) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$Geting(this.$api.rmLanguageUrl + `?id=${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                    this.queryLangageList()
                })
            })
        },

        dialogClose(val) {
            switch (val) {
                case 'isAddLanguage':
                    // 关闭添加语言界面
                    this.isAddLanguage = false
                    break
                // 关闭编辑语言界面
                case 'isEdit':
                    this.isEdit = false
            }
            this.queryLangageList()
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
        width: calc(100% - 10px);
        height: 100%;
        overflow: hidden;
        .table {
            height: calc(100% - 50px);
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