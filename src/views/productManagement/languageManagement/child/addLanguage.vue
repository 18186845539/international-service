<!--  添加语言界面  -->
<template>
  <el-dialog
    title="添加语言"
    :visible.sync="dialogTableVisible"
    width="30%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="180px">
      <el-form-item label="语言：" prop="name">
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
                name: '',
            },
            dialogTableVisible: true,
        }
    },
    components: {
        HeaderNav,
    },
    methods: {
        // 语言新增提交
        submitForm() {
            const params = {
                id: '',
                name: this.form.name,
            }
            this.$Posting(this.$api.addLanguageUrl, params).then((res) => {
                if (res.code === 0) {
                    this.$emit('dialogClose')
                    this.$message({
                        type: 'success',
                        message: '新增语言成功',
                    })
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
</style>

