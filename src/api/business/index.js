// 业务相关接口
export default {
    //------------------产品线列表---------------------
    // 添加产品线
    addproductlineUrl: '/addCateGory/prolin/addprolin',
    // 查看产品线列表
    productlineListUrl: "/addCateGory/prolin/queryplpage",
    //通过产品线ID查询型号
    productmodelListUrl: "/addCateGory/prolin/querymodbyid",
    //删除产品线
    deleteproductlineUrl: "/addCateGory/prolin/prolinrm",
    //修改产品线
    editproductlineUrl: "/addCateGory/prolin/updateprolin",

    //------------------公司列表---------------------
    //查看公司列表
    querycompanyUrl: '/addCateGory/company/querycompage',
    //增加公司
    addcompanyUrl: '/addCateGory/company/addcompany',
    //删除公司
    deletecompanyUrl: '/addCateGory/company/rmcategory',
    //检查公司是否包含产品
    countproductUrl: '/addCateGory/company/countproduct',
    //修改类别
    updatecategoryUrl: '/addCateGory/company/updatecategory',

    //------------------语言列表---------------------
    // 分页查询语言
    languageListUrl: '/addCateGory/language/page',
    // 语言新增接口
    addLanguageUrl: '/addCateGory/language/addlanguage',
    // 语言删除接口
    rmLanguageUrl: '/addCateGory/language/rmlanguage',
    // 语言编辑接口
    updateLanguageUrl: '/addCateGory/language/updatelanguage',

    //------------------产品类别列表---------------------
    // 分页查询产品类别
    queryCategoryListUrl: '/addCateGory/category/querycgpage',
    // 产品类别新增接口
    addCategoryUrl: '/addCateGory/category/addcategory',
    // 产品类别删除接口
    rmCategoryUrl: '/addCateGory/category/rmcategory',
    // 产品类别编辑接口
    editCategoryUrl: '/addCateGory/category/updatecategory',

    //------------------产品列表---------------------
    // 分页查询产品
    queryProductListUrl: '/addCateGory/product/queryproductpage',
    // 产品新增接口
    addProductUrl: '/addCateGory/product/addproduct',
    // 产品删除接口
    rmProductUrl: '/addCateGory/product/rmproduct',
    // 产品编辑接口
    editProductUrl: '/addCateGory/product/updateproduct',
    // 查看该产品下是否包含彩页和视频
    queryPageOrVideoUrl: '/addCateGory/product/coutpdfandvideo',
    // 通过id查询产品
    queryProductIdUrl: '/addCateGory/product/productbyid',


    //------------------ 彩页列表 ---------------------
    // 分页查询pdf
    queryPdfListUrl: '/addCateGory/pdf/querypdf',
    // pdf新增接口
    addPdfUrl: '/addCateGory/pdf/addpdf',
    // pdf删除接口
    rmPdfUrl: '/addCateGory/pdf/rmpdf',
    // pdf编辑接口
    editPdfUrl: '/addCateGory/pdf/updatepdf',
    // 删除多个视频接口
    rmPdfListUrl: '/addCateGory/pdf/rmpdfs',

    //------------------ 视频列表 ---------------------
    // 分页查询视频列表
    queryVideoListUrl: '/addCateGory/video/queryvideo',
    // 视频新增接口
    addVideoUrl: '/addCateGory/video/addvideo',
    // 视频删除接口
    rmVideoUrl: '/addCateGory/video/rmvideo',
    // 视频编辑接口
    editVideoUrl: '/addCateGory/video/updatevideo',
    // 删除多个视频接口
    rmVideoListUrl: '/addCateGory/video/rmvideos',

    //------------------ pdf，图片，视频相关接口 ---------------------
    // pdf上传
    pdfUploadUrl: '/addCateGory/upload/pdffile',
    // 图片上传
    picUploadUrl: '/addCateGory/upload/uploadfile',
    // 视频上传
    videoUploadUrl: '/addCateGory/upload/videofile',
    // 删除已上传文件
    rmFileUrl: '/addCateGory/upload/deletefile'
}
