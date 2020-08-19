export default {
    data () {
        return {
            companyData: [], // 公司数据
            productLineData: [], // 产品线数据
            productModelData: [], // 产品型号数据
            languageData: [], // 语言数据
            productCategoryData: [], // 产品类别数据
        };
    },
    created () {
        this.queryCompanyUrl()
        this.productLineListUrl()
        this.languageListUrl()
        this.queryCategoryListUrl()
       
    },
    methods: {
        // 获取所属公司
        queryCompanyUrl () {
            this.$Posting(this.$api.querycompanyUrl).then((res) => {
                if (res.code === 0) {
                    this.companyData = res.data.list;
                }
            })
        },
        // 获取产品线
        productLineListUrl () {
            this.$Posting(this.$api.productlineListUrl).then((res) => {
                if (res.code === 0) {
                    this.productLineData = res.data.list;
                }
            })
        },
        // 获取产品型号
        productModelListUrl (id) {
            this.$Geting(this.$api.productmodelListUrl + `?id=${id}`).then((res) => {
                if (res.code === 0) {
                    this.productModelData = res.data;
                }
            })
        },
        // 获取语言
        languageListUrl () {
            this.$Posting(this.$api.languageListUrl).then(res => {
                if (res.code === 0) {
                    this.languageData = res.data.list
                }
            })
        },
        // 获取产品类别
        queryCategoryListUrl () {
            this.$Posting(this.$api.queryCategoryListUrl).then(res => {
                if (res.code === 0) {
                    this.productCategoryData = res.data.list
                }
            })
        }
    }
};
