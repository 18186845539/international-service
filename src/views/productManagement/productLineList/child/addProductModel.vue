<!--  添加产品型号界面 -->
<template>
  <el-dialog
    title="添加型号"
    :visible.sync="dialogTableVisible"
    width="30%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="180px">
      <el-form-item label="型号名称：" prop="modelName">
        <el-input type="text" style="width:50%" v-model="form.modelName"></el-input>
      </el-form-item>
      <el-form-item label="型号备注：" prop="modelNote">
        <el-input type="text" style="width:50%" v-model="form.modelNote"></el-input>
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
    props: {
        rowData: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            form: {
                modelName: '', //型号名称
                modelNote: '', //型号备注
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
            const params = {
                name: this.form.modelName,
                remark: this.form.modelNote,
                parentId: this.rowData.id,
                type: 'PRODUCT_MODEL',
            }
            this.$Posting(this.$api.addproductlineUrl, params)
                .then((res) => {
                    if (res.code === 0) {
                        this.dialogClose()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        //关闭弹框
        dialogClose() {
            this.$emit('dialogClose')
        },
    },
}
</script>

