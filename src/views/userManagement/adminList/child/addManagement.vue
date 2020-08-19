<template>
    <div class="add-page">
        <el-dialog title="添加管理员" :visible.sync="isVisible" @close="closeDialog">
            <el-form :model="form">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="姓名:" :label-width="formLabelWidth">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="电话:" :label-width="formLabelWidth">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="所属公司:" :label-width="formLabelWidth">
                            <el-select v-model="form.region" style="width: 100%" placeholder="请选择所属公司">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="分配角色:" :label-width="formLabelWidth">
                            <el-select v-model="form.region" style="width: 100%" placeholder="请选择分配角色">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="备注:" :label-width="formLabelWidth">
                            <el-input type="textarea" placeholder="请输入内容" v-model="form.name" show-word-limit></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">提 交</el-button>
                <el-button @click="closeDialog">返 回</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "",
    props: {
        isAddManagement: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    watch: {
        isAddManagement(val) {
            this.isVisible = val
        }
    },
    data() {
        return {
            isVisible: this.isAddManagement,
            form: {
                name:'',
                region: ''
            },
            formLabelWidth: '80px'
        };
    },
    methods: {
        // 关闭弹框
        closeDialog () {
            this.$emit('closeDialog')
        },
        // 提交数据
        submit () {

        }
    },
};
</script>
<style lang="less" scoped>
.add-page {
    position: relative;
    right: 0;
    top: 0;
    .el-dialog {
        height: 45%;
    }
    .dialog-footer {
        text-align: center;
    }
}
</style>
