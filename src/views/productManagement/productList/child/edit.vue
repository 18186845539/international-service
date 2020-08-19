<!--  编辑界面  -->
<template>
  <el-dialog
    title="编辑产品"
    :visible.sync="dialogTableVisible"
    width="70%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="100px" class="el-form">
      <div class="basicinformation">
        <span>基础信息</span>
        <el-form-item label="所属公司：" prop="companyId">
          <el-select v-model="form.companyId" placeholder="请选择">
            <el-option
              v-for="item in companyData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="产品线：" prop="productlineId">
              <el-select
                v-model="form.productlineId"
                placeholder="请选择"
                @change="productModelListUrl"
              >
                <el-option
                  v-for="item in productLineData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品型号：" prop="modelId" class="left:300px;">
              <el-select v-model="form.modelId" placeholder="请选择">
                <el-option
                  v-for="item in productModelData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="产品名称：" prop="name">
          <el-input type="text" style="width:165px" v-model="form.name"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="产品图片：" prop="image">
              <HoverMask v-if="form.image" @click.native="handleRemove">
                <!-- 默认插槽 -->
                <img style="height:150px;width:150px" :src="url+form.image" alt />
                <!-- action插槽 -->
                <template v-slot:action>
                  <i class="el-icon-delete"></i>
                </template>
              </HoverMask>
              <el-upload
                v-else
                accept="image/gif, image/jpg, image/jpeg, image/png, image/svg"
                list-type="picture-card"
                style="width:200px"
                action
                :http-request="uploadPicSubmit"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :limit="1"
                @click.native="uploadClickGetIdx"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品介绍：" prop="introduction">
              <el-input type="textarea" style="width:200px" v-model="form.introduction"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="basicinformation" v-for="(item, index) in addPdf" :key="'info' + index">
        <i class="el-icon-plus clolos" v-show="index === 0" @click="addPdfFile"></i>
        <i class="el-icon-delete clolos rm-icon" v-show="index !== 0" @click="deletePdf(index)"></i>
        <span>新增PDF</span>
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
            <el-form-item label="彩页文件：" prop="fileUrl">
              <div class="color_file" v-if="item.fileUrl">
                <a @click="downLoadFile(url+item.fileUrl)">{{(url+item.fileUrl) }}</a>
                <i class="el-icon-close" @click="handleRemovePdf(index)"></i>
              </div>
              <el-upload
                v-else
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
          </el-col>
        </el-row>

        <el-form-item label="彩页图片：" prop="pdfImage">
          <HoverMask v-if="item.pdfImage" @click="rmPdfPic(index)">
            <!-- 默认插槽 -->
            <img style="height:150px;width:150px" :src="url+item.pdfImage" alt />
            <!-- action插槽 -->
            <template v-slot:action>
              <i class="el-icon-delete"></i>
            </template>
          </HoverMask>
          <el-upload
            v-else
            accept="image/gif, image/jpg, image/jpeg, image/png, image/svg"
            list-type="picture-card"
            action
            :http-request="PdfSubmit"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :limit="1"
            @click.native="uploadClickGetIdx(index, 'pic')"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="basicinformation" v-for="(item, index) in addVideo" :key="'info1' + index">
        <i class="el-icon-plus clolos" v-show="index === 0" @click="addvideoFile"></i>
        <i class="el-icon-delete clolos rm-icon" v-show="index !== 0" @click="deleteVideo(index)"></i>
        <span>新增视频信息</span>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="语言：" prop="languageName">
              <el-select
                v-model="item.languageName"
                placeholder="请选择"
                @change="languageChange(item.languageName, index, 'v')"
              >
                <el-option
                  v-for="i in languageData"
                  :key="i.id"
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
                plac
                eholder="请选择"
                @change="categoryChange(item.categoryName, index, 'v')"
              >
                <el-option
                  v-for="i in productCategoryData"
                  :key="i.id"
                  :label="i.name"
                  :value="i.id + '-' + i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="10">
            <el-form-item label="视频名称：" prop="name">
              <el-input type="text" style="width:165px" v-model="item.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="视频链接：" prop="hyperlink">
              <el-input type="text" style="width:165px" v-model="item.hyperlink"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="视频文件：" prop="videoUrl">
          <div class="color_file" v-if="item.videoUrl">
            <span>{{(url+item.videoUrl) }}</span>
            <i class="el-icon-close" @click="handleRemoveVideo(index)"></i>
          </div>
          <el-upload
            v-else
            accept=".mp4"
            class="avatar-uploader"
            action
            style="width:300px"
            :http-request="uploadVideoSubmit"
            :before-upload="beforeVideoUpload"
            :on-remove="handleRemoveVideo"
            :limit="1"
            @click.native="uploadClickGetIdx(index, 'video')"
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
            // 新增视频数据
            addVideo: [
                {
                    languageName: '', // 语言
                    languageId: '',
                    categoryId: '', // 产品类别
                    categoryName: '',
                    name: '', // 视频名称
                    hyperlink: '', // 视频地址
                    videoUrl: '', // 视频文件
                    productId: '', //产品id
                    companyId: '', //所属公司
                },
            ],
            // 新增pdf数据
            addPdf: [
                {
                    languageName: '', // 语言
                    languageId: '',
                    categoryId: '', // 产品类别
                    categoryName: '',
                    name: '', // 彩页名称
                    pdfImage: '', // 彩页图片
                    fileUrl: '', // 彩页文件
                    productId: '', //产品id
                    companyId: '', //所属公司
                },
            ],
            url: 'http://172.14.10.55:7140/gjkfApi',
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
        // 编辑时初次调用获取产品型号数据
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
                productId: this.rowData.id,
            }).then((res) => {
                if (res.code === 0) {
                    if (res.data.list.length !== 0) {
                        this.addPdf = [...res.data.list]
                    }
                }
            })
            // 获取视频相关数据
            this.$Posting(this.$api.queryVideoListUrl, {
                productId: this.rowData.id,
            }).then((res) => {
                if (res.code === 0) {
                    if (res.data.list.length !== 0) {
                        this.addVideo = [...res.data.list]
                    }
                }
            })
        },
        //修改信息
        updateForm() {
            let params = {
                companyId: this.form.companyId, // 所属公司
                id: this.rowData.id,
                image: this.form.image, // 产品图片
                introduction: this.form.introduction, // 公司介绍
                name: this.form.name, // 产品名称
                productlineId: this.form.modelId
                    ? this.form.modelId
                    : this.form.productlineId, // 有产品型号不用传产品线
            }
            // 基础信息提交
            this.$Posting(this.$api.editProductUrl, params).then((res) => {
                if (res.code === 0) {
                    // 循环pdf数据和视频数据
                    this.addVideo.forEach((i, idx) => {
                        i.productId = res.id
                        i.companyId = this.form.companyId
                    })
                    this.addPdf.forEach((i, idx) => {
                        i.productId = res.id
                        i.companyId = this.form.companyId
                    })
                    // 删除对应的数据
                    if (this.videoRmList.length !== 0) {
                        this.$Posting(
                            this.$api.rmVideoListUrl,
                            this.videoRmList
                        ).then((res) => {
                            if (res.code === 0) {
                                console.log(res)
                            }
                        })
                    }
                    if (this.pdfRmList.length !== 0) {
                        this.$Posting(
                            this.$api.rmPdfListUrl,
                            this.pdfRmList
                        ).then((res) => {
                            if (res.code === 0) {
                                console.log(res)
                            }
                        })
                    }
                    // 视频信息提交
                    this.$Posting(this.$api.editVideoUrl, this.addVideo).then(
                        (res) => {
                            if (res.code === 0) {
                                // pdf信息提交
                                this.$Posting(
                                    this.$api.editPdfUrl,
                                    this.addPdf
                                ).then((res) => {
                                    if (res.code === 0) {
                                        this.$message.success('修改成功')
                                        this.dialogClose()
                                    }
                                })
                            }
                        }
                    )
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
                pdfImage: '', // 彩页图片
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

        // 视频自定义上传
        uploadVideoSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.videoUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        this.addVideo[this.videoIdx].videoUrl = res.data
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
        handleRemoveVideo(idx) {
            let path = this.addVideo[idx !== '' ? idx : this.videoIdx].videoUrl
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.addVideo[idx !== '' ? idx : this.videoIdx].videoUrl =
                        ''
                    this.$message.success('删除成功')
                }
            })
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

        // 产品图片自定义上传
        uploadPicSubmit(file) {
            let uploadFile = new FormData()
            uploadFile.append('file', file.file)
            this.$PostingBlob(this.$api.picUploadUrl, uploadFile).then(
                (res) => {
                    if (res.code === 0) {
                        this.form.image = res.data
                    }
                }
            )
        },
        //PDF图片自定义上传
        PdfSubmit(file) {
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
        // 删除图片时的方法
        handleRemove() {
            let path = this.form.image
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                    this.form.image = ''
                }
            })
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
.color_file {
    width: 400px;
    height: 40px;
    line-height: 40px;
    .el-icon-close {
        display: inline-block;
        cursor: pointer;
    }
}

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

