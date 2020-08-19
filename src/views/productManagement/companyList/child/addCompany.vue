<!--  添加公司界面  -->
<template>
  <el-dialog
    title="添加公司"
    :visible.sync="dialogTableVisible"
    width="30%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="180px">
      <el-form-item label="公司名称：" prop="name">
        <el-input type="text" style="width:200px" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="公司介绍：" prop="introduction">
        <el-input type="text" style="width:200px" v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="产品图片：" prop="logoImage">
        <el-upload
          accept="image/gif, image/jpg, image/jpeg, image/png, image/svg"
          list-type="picture-card"
          style="width:200px"
          action
          :http-request="uploadPicSubmit"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="公司主题风格：" prop="themeStyle">
        <el-select v-model="form.themeStyle" placeholder="请选择">
          <el-option label="紫色" value="1"></el-option>
          <el-option label="蓝色" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用须知：" prop="noticeUrl">
        <el-upload
          accept=".pdf, .word, .excel, .xls, .docx, .xlsx"
          class="upload-demo"
          action
          style="width:300px"
          :http-request="uploadPdfSubmit"
          :before-upload="beforePdfUpload"
          :on-remove="handleRemovePdf"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="其他：" prop="other">
        <el-select v-model="form.other" placeholder="请选择">
          <el-option label="one" value="one"></el-option>
          <el-option label="two" value="two"></el-option>
          <el-option label="three" value="three"></el-option>
          <el-option label="four" value="four"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网址：" prop="companyUrl">
        <el-input type="text" style="width:200px" v-model="form.companyUrl"></el-input>
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
import selectData from '@/mixins/selectData.js'

export default {
    name: 'imgUpload',
    data() {
        return {
            form: {
                name: '', //公司名称
                introduction: '', //公司介绍
                logoImage: '', //公司Logo
                themeStyle: '', //公司主题
                noticeUrl: '', //使用须知
                other: '', //其他
                companyUrl: '', //网址
            },
            dialogTableVisible: true,
            headerMsg: { Token: 'XXXXXX' },
            upLoadUrl: 'xxxxxxxxxx',
        }
    },
    mixins: [selectData],
    components: {
        HeaderNav,
    },
    methods: {
        // 产品图片自定义上传
        uploadPicSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.picUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        this.form.logoImage = res.data
                    }
                }
            )
        },
        // 删除图片时的方法
        handleRemove(file) {
            let path = this.form.logoImage
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                }
            })
        },
        // 选择图片的校验
        beforeUpload(file) {
            if (file.size / 1024 / 1024 > 3) {
                this.$message.warning('上传图片不超过3MB')
                return false
            }
            var ext = file.name.substring(file.name.lastIndexOf('.') + 1)
            const extension =
                ext === 'gif' ||
                ext === 'svg' ||
                ext === 'jpg' ||
                ext === 'png' ||
                ext === 'jpeg'
            if (!extension) {
                this.$message.warning(
                    '上传图片格式只能为gif、svg、jpg、png/jpeg'
                )
                return false
            }
        },
        //提交表单
        submitForm() {
            const params = {
                name: this.form.name,
                introduction: this.form.introduction,
                themeStyle: parseInt(this.form.themeStyle),
                logoImage: this.form.logoImage,
                noticeUrl: this.form.noticeUrl,
                other: this.form.other,
                companyUrl: this.form.companyUrl,
            }
            this.$Posting(this.$api.addcompanyUrl, params)
                .then((res) => {
                    if (res.code === 0) {
                        this.dialogClose()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        //关闭
        dialogClose() {
            this.$emit('dialogClose')
        },
        // 文件自定义上传
        uploadPdfSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.pdfUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        this.form.noticeUrl = res.data
                    }
                }
            )
        },
        // 选择文件的校验
        beforePdfUpload(file) {
            if (file.size / 1024 / 1024 > 10) {
                this.$message.warning('上传文件不超过10MB')
                return false
            }
            var ext = file.name.substring(file.name.lastIndexOf('.') + 1)
            const extension =
                ext === 'pdf' ||
                ext === 'word' ||
                ext === 'excel' ||
                ext === 'docx' ||
                ext === 'xlsx' ||
                ext === 'xls'
            if (!extension) {
                this.$message.warning(
                    '上传文件格式只能为pdf、word、excel、docx、xlsx、xls'
                )
                return false
            }
        },
        // 删除彩页文件
        handleRemovePdf() {
            let path = this.form.noticeUrl
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                }
            })
        },
    },
}
</script>
<style lang='less' scoped>
</style>

