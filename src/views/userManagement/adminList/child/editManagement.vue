<template>
    <div class="edit-page">
        <el-dialog :title="isEditOrShow === '2' ? '编辑管理员' : '查看详情'" :visible.sync="isVisible" @close="closeDialog">
            <el-form :model="form">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="姓名:" :label-width="formLabelWidth">
                            <el-input v-if="isEditOrShow === '2'" v-model="form.name"></el-input>
                            <p v-else>{{ form.name }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="电话:" :label-width="formLabelWidth">
                            <el-input v-if="isEditOrShow === '2'" v-model="form.name"></el-input>
                            <p v-else>{{ form.name }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="所属公司:" :label-width="formLabelWidth">
                            <el-select v-if="isEditOrShow === '2'" v-model="form.region" style="width: 100%" placeholder="请选择所属公司">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <p v-else>{{ form.name }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="分配角色:" :label-width="formLabelWidth">
                            <el-select v-if="isEditOrShow === '2'" v-model="form.region" style="width: 100%" placeholder="请选择分配角色">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <p v-else>{{ form.name }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="备注:" :label-width="formLabelWidth">
                            <el-input type="textarea" v-if="isEditOrShow === '2'" placeholder="请输入内容" v-model="form.name" show-word-limit></el-input>
                            <p v-else>{{ form.name }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="isEditOrShow === '2'" @click="submit">提 交</el-button>
                <el-button @click="closeDialog">返 回</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "",
    props: {
        isEditManagement: {
            type: Boolean,
            default: false
        },
        isEditOrShow: {
            type: String,
            default: ''
        }
    },
    watch: {
        isEditManagement(val) {
            this.isVisible = val
        }
    },
    data() {
        return {
            isVisible: this.isEditManagement,
            form: {
                name: '',
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
.edit-page {
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
