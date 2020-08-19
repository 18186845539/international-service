<!--  编辑公司界面  -->
<template>
  <el-dialog
    title="编辑公司"
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
      <el-form-item label="公司Logo：" prop="logoImage">
        <hover-mask v-if="form.logoImage" @click.native="handleRemove">
          <!-- 默认插槽 -->
          <img class="pro-pic" style="height:150px;" :src="url+form.logoImage" alt />
          <!-- action插槽 -->
          <template v-slot:action>
            <i class="el-icon-delete"></i>
          </template>
        </hover-mask>
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
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>-->
      </el-form-item>
      <el-form-item label="公司主题风格：" prop="themeStyle">
        <el-select v-model="form.themeStyle" placeholder="请选择">
          <el-option
            v-for="item in companyData"
            :key="item.id"
            :label="item.themeStyle"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用须知：" prop="noticeUrl">
        <div class="color_file" v-if="form.noticeUrl">
          <a @click="downLoadFile(url+form.noticeUrl)">{{strCutName(form.noticeUrl)}}</a>
          <i class="el-icon-close" @click="handleRemovePdf"></i>
        </div>
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
          <el-option
            v-for="item in companyData"
            :key="item.id"
            :label="item.other"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网址：" prop="companyUrl">
        <el-input type="text" style="width:200px" v-model="form.companyUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update">提交</el-button>
        <el-button type="primary" @click="dialogClose">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import HeaderNav from '@/components/headerNav'
import HoverMask from '@/components/hoverMask'
import selectData from '@/mixins/selectData.js'

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
                name: '', //公司名称
                introduction: '', //公司介绍
                logoImage: '', //公司Logo
                themeStyle: '', //公司主题
                noticeUrl: '', //使用须知
                other: '', //其他
                companyUrl: '', //网址
            },
            url: 'http://172.14.10.55:7140/gjkfApi',
            // dialogImageUrl: '',
            // dialogVisible: false,
            dialogTableVisible: true,
        }
    },
    mixins: [selectData],
    components: {
        HeaderNav,
        HoverMask,
    },

    created() {
        this.form = { ...this.rowData }
    },
    methods: {
        //编辑
        update() {
            const params = {
                id: this.rowData.id,
                name: this.form.name,
                introduction: this.form.introduction,
                themeStyle: parseInt(this.form.themeStyle),
                logoImage: this.form.logoImage,
                noticeUrl: this.form.noticeUrl,
                other: this.form.other,
                companyUrl: this.form.companyUrl,
            }
            this.$Posting(this.$api.updatecategoryUrl, params)
                .then((res) => {
                    if (res.code === 0) {
                        this.dialogClose()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // 产品图片自定义上传
        uploadPicSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.picUploadUrl, uploadFile).then(
                (res) => {
                    this.form.image = res.data
                }
            )
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
            console.log(path)
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                }
            })
        },

        // 截取返回的彩页文件名
        strCutName(str) {
            const sIdx = str.lastIndexOf('/')
            const eIdx = str.lastIndexOf('.')
            return str.substring(sIdx + 1, eIdx)
        },
        // 下载彩页文件
        downLoadFile(url) {
            let fileName = this.strCutName(url)
            try {
                const link = document.createElement('a')
                link.href = url
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } catch (error) {
                window.open(url)
            }
        },
        // 删除图片时的方法
        handleRemove(file) {
            let path = this.form.productImg
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

        //关闭界面
        dialogClose() {
            this.$emit('dialogClose')
        },
    },
}
</script>

