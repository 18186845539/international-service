<!--     个人信息     -->
<template>
    <div>
        <HeaderNav />
        <img
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            class="image"
        />
        <div class="area">
            <span class="image1">姓名：张三</span>
            <br />
            <span class="image2">账号或手机号：18186848888</span>
            <br />
            <span class="image3">密码：************</span>
            <el-popover
                class="image5"
                placement="top-start"
                width="200"
                trigger="hover"
                content="修改手机号或账号请先询问管理员"
            >
                <el-link slot="reference" type="danger">？</el-link>
            </el-popover>
            <el-link class="image4" href="https://element.eleme.io" type="primary">修改密码</el-link>
        </div>
    </div>
</template>
<script>
import HeaderNav from "@/components/headerNav";

export default {
    data() {
        return {
            visible: false,
        };
    },
    components: {
        HeaderNav,
    },
    methods: {},
};
</script>
<style lang='less' scoped>
.image {
    position: absolute;
    width: 100%;
}
.area {
    position: relative;
    background-color: #ffffff;
    min-width: 300px;
    width: 30%;
    height: 50%;
    border-radius: 5px;
    position: absolute;
    left: 35%;
    top: 30%;

    .logo {
        width: 600px;
    }
    .image1 {
        font-size: 15px;
        position: absolute;
        top: 20%;
        left: 12%;
    }
    .image2 {
        font-size: 15px;
        position: absolute;
        top: 40%;
        left: 12%;
    }
    .image3 {
        font-size: 15px;
        position: absolute;
        top: 60%;
        left: 12%;
    }
    .image4 {
        font-size: 15px;
        position: absolute;
        top: 59%;
        left: 70%;
    }
    .image5 {
        position: absolute;
        top: 39%;
        left: 85%;
    }
}
</style>

