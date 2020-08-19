<template>
    <div class="login">
        <img src="../assets/u=3189471364,3695419081&fm=26&gp=0.jpg" alt="地球"/>
        <LoginPage class="page"/>
    </div>
</template>
<script>
import LoginPage from './loginPage'
export default {
    app: 'home',
    components: {
        LoginPage
    },
    data () {
        return {

        }
    },
    methods: {}
}
</script>
<style lang='less' scoped>
.login{
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    .page {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 0 auto;
    }
}
</style>