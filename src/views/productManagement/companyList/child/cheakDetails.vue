<!--  查看详情界面  -->
<template>
  <el-dialog
    title="查看公司"
    :visible.sync="dialogTableVisible"
    width="30%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="120px">
      <el-form-item label="公司名称：" prop="name">
        <span>{{ form.name }}</span>
      </el-form-item>
      <el-form-item label="公司logo：" prop="logoImage">
        <template slot-scope="scope">
          <img style="height:60px;" :src="scope.row.logoImage" alt />
        </template>
      </el-form-item>
      <el-form-item label="公司介绍：" prop="introduction">
        <span>{{ form.introduction }}</span>
      </el-form-item>
      <el-form-item label="网址：" prop="companyUrl">
        <span>{{ form.companyUrl }}</span>
      </el-form-item>
      <el-form-item label="使用须知：" prop="noticeUrl">
        <span>{{ form.noticeUrl }}</span>
      </el-form-item>
      <el-form-item label="主题风格：" prop="themeStyle">
        <span>{{ form.themeStyle }}</span>
      </el-form-item>
      <el-form-item label="其他：" prop="other">
        <span>{{ form.other }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import HeaderNav from '@/components/headerNav'
export default {
    props: {
        rowData: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            tableData: '',
            form: {
                name: '', //公司名称
                introduction: '', //公司介绍
                logoImage: '', //公司Logo
                themeStyle: '', //公司主题
                noticeUrl: '', //使用须知
                other: '', //其他
                companyUrl: '', //网址
            },
            //   url: 'http://172.14.10.55:7140/gjkfApi',
            dialogTableVisible: true,
        }
    },
    created() {
        // 将父组件传过来的数据赋值给表单data
        this.form = this.rowData
    },
    components: {
        HeaderNav,
    },
    methods: {
        // 查询产品列表
        queryList(id) {
            const params = { id }
            this.$Posting(this.$api.queryProductListUrl, params).then((res) => {
                if (res.code === 0) {
                    this.tableData = res.data.list
                    this.form = { ...this.tableData[0] }
                    this.form.languageName = this.rowData.languageName
                    this.form.categoryName = this.rowData.categoryName
                }
            })
        },
        dialogClose() {
            this.$emit('dialogClose')
        },
    },
}
</script>
<style lang='less' scoped>
.dialog-footer {
    text-align: center;
}
/deep/.el-form {
    .el-form-item {
        margin: auto;
        .el-form-item__label {
            width: 40% !important;
        }
    }
}
</style>
