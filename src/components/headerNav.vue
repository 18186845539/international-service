<template>
    <div class="header-page">
        <div class="header-nav">
            <span>{{ this.$route.meta.title }}</span>
        </div>
        <div class="header-sets">
            <span @click="checkOut">注销</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'headerNav',
    components: {},
    props: {},
    data () {
        return {}
    },
    created () {
        // console.log(this.$route);
    },
    methods: {
        checkOut () {
            this.$router.push({path: 'home', name: 'home'});
        }
    }
}
</script>
<style lang="less" scoped>
.header-page {
    position: relative;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #eff2f7;
    .header-nav {
        float: left;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        padding-left: 50px;
    }
    .header-sets {
        float: right;
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        >span {
            cursor: pointer;
        }
    }
}
</style>