<!--  更换彩页文件界面  -->
<template>
  <el-dialog
    title="更换彩页文件"
    :visible.sync="dialogTableVisible"
    width="70%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="100px" class="el-form">
      <div class="basicinformation" v-for="(item, index) in addPdf" :key="'info' + index">
        <el-form-item label="彩页文件：" prop="colorFile">
          <el-upload
            accept=".pdf, .word, .excel, .xls, .docx, .xlsx"
            class="upload-demo"
            action
            style="width:300px"
            :http-request="uploadPdfSubmit"
            :before-upload="beforePdfUpload"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import selectData from '@/mixins/selectData.js'
import HeaderNav from '@/components/headerNav'
export default {
    data() {
        return {
            // 新增pdf数据
            addPdf: [
                {
                    fileUrl: '', // 彩页文件
                },
            ],
            dialogTableVisible: true,
        }
    },
    props: {
        rowData: {
            type: Object,
            default: {},
        },
    },
    mixins: [selectData],
    components: {
        HeaderNav,
    },
    methods: {
        // 关闭弹框
        dialogClose() {
            this.$emit('dialogClose')
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
        // 文件自定义上传
        uploadPdfSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.pdfUploadUrl, uploadFile).then( (res) => {
                    if (res.code === 0) {
                          this.$Posting(this.$api.rmFileUrl, { path: this.rowData.fileUrl,}).then((res) => {
                            if (res.code === 0) {
                                this.$message.success('PDF上传成功')
                                this.dialogClose()
                            }else if(res.code === 500){
                                   this.$message.success('PDF上传成功')
                                this.dialogClose()
                            }
                        })
                    }
                }
            )
        },
    },
}
</script>
<style lang='less' scoped>
/deep/.el-dialog {
    margin-top: 7vh !important;
    height: 85%;
    overflow-y: scroll;
    .basicinformation {
        position: relative;
        margin: 0 auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        width: 70%;
        padding: 20px;
        margin-bottom: 30px;
        .clolos {
            position: absolute;
            right: -60px;
            top: 50%;
            transform: translateY(-50%);
            width: 35px;
            height: 35px;
            background: #29affb;
            line-height: 35px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            z-index: 1;
        }
        .rm-icon {
            background: red;
        }
    }
    .dialog-footer {
        text-align: center;
    }
}
</style>

