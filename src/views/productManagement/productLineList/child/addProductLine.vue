<!--  添加产品线界面  -->
<template>
  <el-dialog
    title="添加产品线"
    :visible.sync="dialogTableVisible"
    width="30%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="180px">
      <el-form-item label="产品线名称：" prop="productLineName">
        <el-input type="text" style="width:200px" v-model="form.productLineName"></el-input>
      </el-form-item>
      <el-form-item label="产品线备注：" prop="note">
        <el-input type="text" style="width:200px" v-model="form.note"></el-input>
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
                productLineName: '', //产品名称
                note: '', //备注
            },
            dialogTableVisible: true,
        }
    },
    components: {
        HeaderNav,
    },
    mounted() {},
    methods: {
        //提交表单
        submitForm() {
            const params = {
                name: this.form.productLineName,
                remark: this.form.note,
                type: 'PRODUCT_LINE',
            }
            this.$Posting(this.$api.addproductlineUrl, params).then((res) => {
                if (res.code === 0) {
                    this.$message.success('添加成功')
                    this.dialogClose()
                }
            })
        },
        dialogClose() {
            this.$emit('dialogClose')
        },
    },
}
</script>


