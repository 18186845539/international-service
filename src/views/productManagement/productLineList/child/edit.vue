<!--  编辑界面  -->
<template>
  <el-dialog
    :title="`修改${rowData.lineOrModel === 'line' ? '产品线' : '型号' }`"
    width="30%"
    :visible.sync="dialogTableVisible"
    :modal-append-to-body="false"
    @close="dialogClose"
  >
    <el-form status-icon label-width="180px">
      <el-form-item v-if="rowData.lineOrModel === 'line'" label="产品线名称：" prop="productLineName">
        <el-input type="text" style="width:50%" v-model="form.productLineName"></el-input>
      </el-form-item>
      <el-form-item v-else label="型号名称：" prop="productLineName">
        <el-input type="text" style="width:50%" v-model="form.productLineName"></el-input>
      </el-form-item>
      <el-form-item v-if="rowData.lineOrModel === 'line'" label="产品线备注：" prop="productLineNote">
        <el-input type="text" style="width:50%" v-model="form.productLineNote"></el-input>
      </el-form-item>
      <el-form-item v-else label="型号备注：" prop="productLineNote">
        <el-input type="text" style="width:50%" v-model="form.productLineNote"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="update()">提交</el-button>
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
                productLineName: '', //产品线名称
                productLineNote: '', //产品线备注
            },
            dialogTableVisible: true,
        }
    },
    components: {
        HeaderNav,
    },
    created() {
        this.form.productLineName = this.rowData.name
        this.form.productLineNote = this.rowData.remark
    },
    methods: {
        //更新表单
        update() {
            const params = {
                name: this.form.productLineName,
                remark: this.form.productLineNote,
                id: this.rowData.id,
            }
            this.$Posting(this.$api.editproductlineUrl, params).then((res) => {
                if (res.code === 0) {
                    this.$message.success('修改成功')
                    this.dialogClose()
                }
            })
        },
        //关闭弹框
        dialogClose() {
            this.$emit('dialogClose')
        },
    },
}
</script>
<style lang="less" scoped>
.dialog-footer {
    text-align: center;
}
</style>
