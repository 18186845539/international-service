<!--  更换视频文件界面  -->
<template>
  <el-dialog
    title="更换视频文件"
    :visible.sync="dialogTableVisible"
    width="70%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="100px" class="el-form">
      <div class="basicinformation" v-for="(item, index) in addVideo" :key="'info' + index">
        <el-form-item label="视频文件：" prop="videoUrl">
          <el-upload
            accept=".mp4"
            class="upload-demo"
            action
            style="width:300px"
            :http-request="uploadVideoSubmit"
            :before-upload="beforeVideoUpload"
            :on-remove="handleRemoveVideo"
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
            addVideo: [
                {
                    videoUrl: '', // 视频文件
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

        // 视频自定义上传
        uploadVideoSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.videoUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        let path = this.rowData.videoUrl
                        this.$Posting(this.$api.rmFileUrl, { path }).then(
                            (res) => {
                                if (res.code === 500) {
                                    this.$message.success('更换视频文件成功')
                                    this.dialogClose()
                                } else if (res.code === 0) {
                                    this.$message.success('更换视频文件成功')
                                    this.dialogClose()
                                }
                            }
                        )
                    }
                }
            )
        },
        // 选择视频的校验
        beforeVideoUpload(file) {
            if (file.size / 1024 / 1024 > 128) {
                this.$message.warning('上传文件不超过128MB')
                return false
            }
            var ext = file.name.substring(file.name.lastIndexOf('.') + 1)
            const extension = ext === 'mp4'
            if (!extension) {
                this.$message.warning('上传视频格式只能为mp4')
                return false
            }
        },
        // 删除视频文件
        handleRemoveVideo() {},
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

