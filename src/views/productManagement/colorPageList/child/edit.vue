<!--  编辑界面  -->
<template>
  <el-dialog
    title="编辑PDF"
    :visible.sync="dialogTableVisible"
    width="70%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="100px" class="el-form">
      <div class="basicinformation" v-for="(item, index) in addPdf" :key="'info' + index">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="语言：" prop="languageName">
              <el-select
                v-model="item.languageName"
                placeholder="请选择"
                @change="languageChange(item.languageName, index, 'c')"
              >
                <el-option
                  v-for="i in languageData"
                  :key="i.id + index"
                  :label="i.name"
                  :value="i.id + '-' + i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品类别：" prop="categoryName">
              <el-select
                v-model="item.categoryName"
                placeholder="请选择"
                @change="categoryChange(item.categoryName, index, 'c')"
              >
                <el-option
                  v-for="i in productCategoryData"
                  :key="i.id + index"
                  :label="i.name"
                  :value="i.id + '-' + i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="10">
            <el-form-item label="彩页名称：" prop="name">
              <el-input type="text" style="width:165px" v-model="item.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="彩页图片：" prop="pdfImage">
              <hover-mask v-if="item.pdfImage" @click="rmPdfPic(index)">
                <!-- 默认插槽 -->
                <img style="height:40px;" :src="url+item.pdfImage" alt />
                <!-- action插槽 -->
                <template v-slot:action>
                  <i class="el-icon-delete"></i>
                </template>
              </hover-mask>
              <el-upload
                v-else
                accept="image/gif, image/jpg, image/jpeg, image/png, image/svg"
                list-type="picture-card"
                action
                :http-request="uploadPicSubmit"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :limit="1"
                @click.native="uploadClickGetIdx(index, 'pic')"
              >
                <i class="el-icon-plus"></i>
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="彩页文件：" prop="fileUrl">
          <div class="color_file" v-if="item.fileUrl">
            <a @click="downLoadFile(url+item.fileUrl)">{{(url+item.fileUrl) }}</a>
            <i class="el-icon-close" @click="handleRemovePdf(index)"></i>
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
            @click.native="uploadClickGetIdx(index, 'pdf')"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateForm">修改</el-button>
      <el-button @click="dialogClose">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import selectData from '@/mixins/selectData.js'
import HeaderNav from '@/components/headerNav'
import HoverMask from '@/components/hoverMask'

export default {
    props: {
        rowData: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            url: 'http://172.14.10.55:7140/gjkfApi',
            pdfRmList: [], // 删除PDF的id集合
            videoRmList: [], // 删除video的id集合
            picIdx: '', // 图片上传时index
            pdfIdx: '', // 文件上传时的index
            videoIdx: '', // 视频上传时的index
            //  productId:'',//产品id
            form: {
                companyId: '', // 所属公司
                productlineId: '', // 产品线
                modelId: '', // 产品型号
                name: '', // 产品名称
                introduction: '', // 公司介绍
                image: '', // 产品图片
            },
            // 新增pdf数据
            addPdf: [
                {
                    languageName: '', // 语言
                    languageId: '',
                    categoryId: '', // 产品类别
                    categoryName: '',
                    name: '', // 彩页名称
                    image: '', // 彩页图片
                    fileUrl: '', // 彩页文件
                    productId: '', //产品id
                    companyId: '', //所属公司
                },
            ],
            dialogTableVisible: true,
        }
    },
    mixins: [selectData],
    components: {
        HeaderNav,
        HoverMask,
    },
    created() {
        this.form = this.rowData
        this.getPdfOrVideoData()
        this.productModelListUrl(this.form.productlineId)
    },
    methods: {
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
        // 截取返回的彩页文件名
        strCutName(str) {
            const sIdx = str.lastIndexOf('/')
            const eIdx = str.lastIndexOf('.')
            return str.substring(sIdx + 1, eIdx)
        },
        // 删除彩页文件
        handleRemovePdf(idx) {
            let path = this.addPdf[idx !== '' ? idx : this.pdfIdx].fileUrl
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.addPdf[idx !== '' ? idx : this.pdfIdx].fileUrl = ''
                    this.$message.success('删除成功')
                }
            })
        },

        // 产品类别改变的时候给name和id重新赋值
        categoryChange(v, i, type) {
            if (type === 'v') {
                this.addVideo[i].categoryId = v.split('-')[0]
                this.addVideo[i].categoryName = v.split('-')[1]
            } else {
                this.addPdf[i].categoryId = v.split('-')[0]
                this.addPdf[i].categoryName = v.split('-')[1]
            }
        },
        // 语言改变的时候给name和id重新赋值
        languageChange(v, i, type) {
            if (type === 'v') {
                this.addVideo[i].languageId = v.split('-')[0]
                this.addVideo[i].languageName = v.split('-')[1]
            } else {
                this.addPdf[i].languageId = v.split('-')[0]
                this.addPdf[i].languageName = v.split('-')[1]
            }
        },
        // 获取pdf和视频相关数据
        getPdfOrVideoData() {
            // 获取pdf相关数据
            this.$Posting(this.$api.queryPdfListUrl, {
                id: this.rowData.id,
            }).then((res) => {
                if (res.code === 0) {
                    this.addPdf = [...res.data.list]
                }
            })
            // 获取视频相关数据
            this.$Posting(this.$api.queryVideoListUrl, {
                id: this.rowData.id,
            }).then((res) => {
                if (res.code === 0) {
                    this.addVideo = [...res.data.list]
                }
            })
        },
        //修改信息
        updateForm() {
            // pdf信息提交
            this.$Posting(this.$api.editPdfUrl, this.addPdf).then((res) => {
                if (res.code === 0) {
                    this.$message.success('修改成功')
                    this.dialogClose()
                }
            })
        },
        //添加PDF对象
        addPdfFile() {
            const objPdf = {
                languageName: '', // 语言
                languageId: '',
                categoryId: '', // 产品类别
                categoryName: '',
                name: '', // 彩页名称
                image: '', // 彩页图片
                fileUrl: '', // 彩页文件
                productId: '', //产品id
                companyId: '', //所属公司
            }

            this.addPdf.push(objPdf)
        },
        // 删除PDF对象
        deletePdf(n) {
            if (this.addPdf[n].id) {
                this.pdfRmList.push(this.addPdf[n].id)
            }
            this.addPdf.splice(n, 1)
        },
        // 添加视频对象
        addvideoFile() {
            const videoPdf = {
                languageName: '', // 语言
                languageId: '',
                categoryId: '', // 产品类别
                categoryName: '',
                name: '', // 彩页名称
                image: '', // 彩页图片
                fileUrl: '', // 彩页文件
                productId: '', //产品id
                companyId: '', //所属公司
            }
            this.addVideo.push(videoPdf)
        },
        // 删除视频对象
        deleteVideo(n) {
            if (this.addVideo[n].id) {
                this.videoRmList.push(this.addVideo[n].id)
            }
            this.addVideo.splice(n, 1)
        },
        // 关闭弹框
        dialogClose() {
            this.$emit('dialogClose')
        },
        // 上传时获取index
        uploadClickGetIdx(idx, type) {
            if (type === 'pic') {
                // 图片的index
                this.picIdx = idx
            } else if (type === 'pdf') {
                // pdf的index
                this.pdfIdx = idx
            } else if (type === 'video') {
                // 视频的index
                this.videoIdx = idx
            }
        },
        // 文件自定义上传
        uploadPdfSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.pdfUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        this.addPdf[this.pdfIdx].fileUrl = res.data
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

        // 产品图片自定义上传
        uploadPicSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.picUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        this.addPdf[this.picIdx].pdfImage = res.data
                    }
                }
            )
        },
        //删除PDF图片
        rmPdfPic(i) {
            let path = this.addPdf[i].pdfImage
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                    this.addPdf[i].pdfImage = ''
                }
            })
        },
        // 删除图片时的方法
        handleRemove(file) {
            let path = ''
            if (this.picIdx === '') {
                path = this.addPdf[this.picIdx].image
            } else {
                path = this.form.productImg
            }
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

