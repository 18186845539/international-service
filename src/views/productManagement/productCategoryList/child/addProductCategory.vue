<!--  添加产品类别名称界面  -->
<template>
  <el-dialog
    title="添加产品类别名称"
    :visible.sync="dialogTableVisible"
    width="30%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="180px">
      <el-form-item label="产品类别名称：" prop="name">
        <el-input type="text" style="width:200px" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="primary" @click="dialogClose">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import HeaderNav from '@/components/headerNav'
export default {
    data() {
        return {
            form: {
                id: '',
                name: '', //产品类别名称
            },
            dialogTableVisible: true,
        }
    },
    components: {
        HeaderNav,
    },
    methods: {
        //提交表单
        submitForm() {
            const params = { ...this.form }
            this.$Posting(this.$api.addCategoryUrl, params).then((res) => {
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '新增成功!',
                    })
                    this.dialogClose()
                }
            })
        },
        //实现弹框关闭功能
        dialogClose() {
            this.$emit('dialogClose')
        },
    },
}
</script>
<style lang='less' scoped>
</style>


