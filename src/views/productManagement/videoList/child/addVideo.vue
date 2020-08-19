<!--  添加视频界面  -->
<template>
  <el-dialog
    title="添加视频"
    :visible.sync="dialogTableVisible"
    width="70%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="100px" class="el-form">
      <div class="basicinformation">
        <span>基础信息</span>
        <el-form-item label="所属公司：" prop="companyAffiliation">
          <el-select v-model="form.companyAffiliation" placeholder="请选择">
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
            <el-form-item label="产品线：" prop="productLine">
              <el-select v-model="form.productLine" placeholder="请选择" @change="productModelListUrl">
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
            <el-form-item label="产品型号：" prop="productModel" class="left:300px;">
              <el-select v-model="form.productModel" placeholder="请选择">
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
        <el-form-item label="产品名称：" prop="productName">
          <el-input type="text" style="width:165px" v-model="form.productName"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="产品图片：" prop="productImg">
              <el-upload
                accept="image/gif, image/jpg, image/jpeg, image/png, image/svg"
                list-type="picture-card"
                style="width:200px"
                action
                :http-request="uploadPicSubmit"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :limit="1"
                @click.native="uploadClickGetIdx('')"
              >
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品介绍：" prop="productIntroduction">
              <el-input type="textarea" style="width:200px" v-model="form.productIntroduction"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="basicinformation" v-for="(item, index) in addVideo" :key="'info1' + index">
        <i class="el-icon-plus clolos" v-show="index === 0" @click="addvideoFile"></i>
        <i class="el-icon-delete clolos rm-icon" v-show="index !== 0" @click="deleteVideo(index)"></i>
        <span>新增视频信息</span>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="语言：" prop="languageId">
              <el-select v-model="item.languageId" placeholder="请选择">
                <el-option v-for="i in languageData" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品类别：" prop="categoryId">
              <el-select v-model="item.categoryId" placeholder="请选择">
                <el-option
                  v-for="i in productCategoryData"
                  :key="i.id"
                  :label="i.name"
                  :value="i.id"
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
          <el-upload
            accept=".mp4"
            class="upload-demo"
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
      <el-button type="primary" @click="submitForm">提交</el-button>
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
            picIdx: '', // 图片上传时index
            pdfIdx: '', // 文件上传时的index
            videoIdx: '', // 视频上传时的index
            //  productId:'',//产品id
            form: {
                companyAffiliation: '', // 所属公司
                productLine: '', // 产品线
                productModel: '', // 产品型号
                productName: '', // 产品名称
                productIntroduction: '', // 公司介绍
                productImg: '', // 产品图片
            },
            // 新增视频数据
            addVideo: [
                {
                    languageId: '', // 语言
                    categoryId: '', // 产品类别
                    name: '', // 视频名称
                    hyperlink: '', // 视频网址
                    videoUrl: '', // 视频文件
                    productId: '', // 产品id
                    companyId: '', // 公司id
                },
            ],
            dialogTableVisible: true,
        }
    },
    mixins: [selectData],
    components: {
        HeaderNav,
    },

    methods: {
        //提交表单
        submitForm() {
            let params = {
                companyId: this.form.companyAffiliation, // 所属公司
                createDate: '',
                createPeople: '',
                id: '',
                image: this.form.productImg, // 产品图片
                introduction: this.form.productIntroduction, // 公司介绍
                name: this.form.productName, // 产品名称
                productlineId: this.form.productModel
                    ? this.form.productModel
                    : this.form.productLine, // 有产品型号不用传产品线
            }
            // 基础信息提交
            this.$Posting(this.$api.addProductUrl, params).then((res) => {
                if (res.code === 0) {
                    // 循环pdf数据和视频数据
                    this.addVideo.forEach((i, idx) => {
                        i.productId = res.id
                        i.companyId = this.form.companyAffiliation
                    })

                    // 视频信息提交
                    this.$Posting(this.$api.addVideoUrl, this.addVideo).then(
                        (res) => {
                            if (res.code === 0) {
                                this.$message.success('新增成功')
                                this.dialogClose()
                            } else if (res.code === 500) {
                                this.$message.success('新增成功')
                                this.dialogClose()
                            }
                        }
                    )
                }
            })
        },
        // 添加视频对象
        addvideoFile() {
            const videoPdf = {
                languageId: '', // 语言
                categoryId: '', // 产品类别
                name: '', // 视频名称
                videoUrl: '', // 视频地址
                hyperlink: '', // 视频网址
                productId: '', //产品id
                companyId: '', // 公司id
            }
            this.addVideo.push(videoPdf)
        },
        // 删除视频对象
        deleteVideo(n) {
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
        handleRemoveVideo() {
            let path = this.addVideo[this.videoIdx].videoUrl
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
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
                        this.addPdf[this.pdfIdx].colorFile = res.data
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
            let path = this.addPdf[this.pdfIdx].colorFile
            this.$Posting(this.$api.rmFileUrl, { path }).then((res) => {
                if (res.code === 0) {
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
                        if (this.picIdx === '') {
                            this.addPdf[this.picIdx].image = res.data
                        } else {
                            this.form.productImg = res.data
                        }
                    }
                }
            )
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

