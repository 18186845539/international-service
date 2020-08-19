<template>
    <div class="page">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login">
            <el-form-item label="账号：" prop="account">
                <el-input type="text" v-model="ruleForm.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password"
                    v-model="ruleForm.password"
                    placeholder="请输入密码"
                    @keyup.enter.native="loginHome('ruleForm')">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginHome('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    app: 'LoginPage',
    data () {
        var validateAccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else if (value !== 'admin') {
                callback(new Error('账号输入不正确'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value !== '123456') {
                callback(new Error('密码输入不正确'));
            } else {
                callback();
            }
        };
        return {
            visitTime: null, // 定时器
            timeNum: 0, // 记录用户在当前页面的停留时间
            ruleForm: {
                account: '', // 账号 admin
                password: '' // 密码 123456
            },
            rules: {
                account: [{ validator: validateAccount, trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }]
            }
        }
    },
    created () {
        // 为了记录用户在当前页面停留的时间而使用定时器
        // this.visitTime = setInterval(() => {
        //     this.timeNum++
        // }, 1000);
    },
    methods: {
        loginHome (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$router.push({path: '/menuPage/functionalAuthority', name: 'functionalAuthority'});
                    // alert('登录成功');
                } else {
                    alert('登录失败');
                    return false;
                }
            });
        }
    },
    destroyed () {
        // 在组件销毁前关闭定时器
        // clearInterval(this.visitTime);
    }
}
</script>
<style lang='less' scoped>
    .page {
        position: relative;
        .login {
            width: 300px;
            height: 150px;
            position: absolute;
            top: 40%;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0 auto;
            >div {
                margin-bottom: 20px;
            }
            /deep/ .el-form-item__label {
                color: #fff;
            }
        }
    }
</style>