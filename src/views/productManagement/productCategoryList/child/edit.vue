<!--  编辑产品类别名称界面  -->
<template>
    <el-dialog
        title="编辑产品类别名称"
        :visible.sync="dialogTableVisible"
        width="30%"
        @close="dialogClose"
        :modal-append-to-body="false"
    >
        <el-form status-icon label-width="180px" >
            <el-form-item label="产品类别名称：" prop="language">
                <el-input type="text" style="width:200px" v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="update">提交</el-button>
            <el-button @click="dialogClose">返回</el-button>
        </div>
    </el-dialog>
</template>
<script>
import HeaderNav from "@/components/headerNav";
export default {
    data() {
        return {
            form: {
                id: '',
                name: '' // 产品类别名称
            },
            dialogTableVisible: true,
        };
    },
    props: {
        rowData: {
            type: Object,
            default: {}
        }
    },
    components: {
        HeaderNav,
    },
    created () {
        this.form = {...this.rowData}
    },
    methods: {
      //编辑提交表单
        update () {
            const params = {...this.form}
            this.$Posting(this.$api.editCategoryUrl, params).then(res => {
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.dialogClose()
                }
            })
        },
      //关闭按钮
        dialogClose () {
            this.$emit("dialogClose");
        },
    },
};
</script>
<style lang='less' scoped>
.dialog-footer {
    text-align: center;
}
</style>

