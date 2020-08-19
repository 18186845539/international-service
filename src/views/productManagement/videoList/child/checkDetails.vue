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
      <div class="basicinformation" v-for="(item, index) in addVideo" :key="'info1' + index">
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
            <el-form-item label="视频名称：" prop="name">
              <span>{{ item.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="视频链接：" prop="hyperlink">
              <span>{{ item.hyperlink }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="10">
            <el-form-item label="视频文件：" prop="videoUrl">
              <span>{{ url+item.videoUrl }}</span>
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
    props: {
        rowData: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            url: 'http://172.14.10.55:7140/gjkfApi',
            form: {
                companyName: '', // 所属公司
            },
            // 新增视频数据
            addVideo: [
                {
                    languageName: '', // 语言
                    categoryName: '', // 产品类别
                    name: '', // 视频名称
                    hyperlink: '', // 视频地址
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
    created() {
        this.form = this.rowData
        this.getVedioData()
    },
    methods: {
        getVedioData() {
            this.$Posting(this.$api.queryVideoListUrl, {
                id: this.rowData.id,
            }).then((res) => {
                if (res.code === 0) {
                    this.addVideo = res.data.list
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

