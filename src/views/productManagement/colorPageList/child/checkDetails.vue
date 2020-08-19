<!--  查看详情  -->
<template>
  <el-dialog
    title="查看详情"
    :visible.sync="dialogTableVisible"
    width="70%"
    @close="dialogClose"
    :modal-append-to-body="false"
  >
    <el-form status-icon label-width="100px" class="el-form">
      <div class="basicinformation" v-for="(item, index) in addPdf" :key="index">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="语言：" prop="languageName">
              <span>{{ item.languageName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品类别：" prop="categoryName">
              <span>{{ item.categoryName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="10">
            <el-form-item label="彩页名称：" prop="name">
              <span>{{ item.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="彩页图片：" prop="pdfImage">
                <img style="height:40px;" :src="url+item.pdfImage" alt />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="10">
            <el-form-item label="彩页文件：" prop="fileUrl">
              <div class="color_file" v-if="item.fileUrl">
                <a @click="downLoadFile(url+item.fileUrl)">{{(url+item.fileUrl) +'    点击下载'}}</a>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="浏览量：" prop="pageviews">
              <span>{{ form.pageviews }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="10">
            <el-form-item label="上传时间：" prop="createDate">
              <span>{{ form.createDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属公司：" prop="companyName">
              <span>{{ form.companyName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
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
            url: 'http://172.14.10.55:7140/gjkfApi',
            form: {
                companyName: '', // 所属公司
            },
            // 新增pdf数据
            addPdf: [
                {
                    languageName: '', // 语言
                    categoryName: '', // 产品类别
                    name: '', // 彩页名称
                    image: '', // 彩页图片
                    colorFile: '', // 彩页文件
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
    created() {
        this.form = this.rowData
        this.getPdfData()
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
        // 获取pdf相关数据
        getPdfData() {
            this.$Posting(this.$api.queryPdfListUrl, {
                id: this.rowData.id,
            }).then((res) => {
                if (res.code === 0) {
                    this.addPdf = res.data.list
                }
            })
        },
        // 关闭弹框
        dialogClose() {
            this.$emit('dialogClose')
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

