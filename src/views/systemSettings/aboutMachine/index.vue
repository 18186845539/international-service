<!--     关于本机     -->
<template>
    <div>
        <HeaderNav />
        <img src="@/assets/background1.jpg" class="image" />
        <div class="area">
            <img src="@/assets/logo.png" class="logo" />
            <p class="image1">国际客服中心</p>
            <p class="image2">版本1.0.0.0</p>
        </div>
    </div>
</template>
<script>
import HeaderNav from "@/components/headerNav";

export default {
    data() {
        return {};
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
}
.area {
    position: relative;
    margin-top: 100px;
    .logo {
        width: 600px;
    }
    .image1 {
        font-size: 30px;
        color: #592c80;
        padding: 5% 11%;
    }
    .image2 {
        font-size: 30px;
        color: #592c80;
        padding: 0% 11%;
    }
}
</style>

