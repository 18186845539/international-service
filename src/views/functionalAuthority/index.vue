<template>
    <div class="auth_page widthContent">
        <HeaderNav />
        <div class="auth_head">
            <span>权限设置</span>
            <span class="auth_head-rm" @click="closeAuthPage">X</span>
        </div>
        <div class="auth_body">
            <div class="auth_select-system">
                <el-select v-model="value1" multiple placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1" title="微信客服" v-if="!(value1.indexOf('1') === -1)">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item name="1">
                            <template slot="title">
                                <span style="margin-right:30px;">菜单一</span>
                                <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                            </template>
                            <div class="auth_body_block">
                                <div class="auth_body_block-content">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city, idx) in cities" :label="city" :key="idx">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                <span style="margin-right:30px;">菜单二</span>
                                <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                            </template>
                            <div class="auth_body_block">
                                <div class="auth_body_block-content">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city, idx) in cities" :label="city" :key="idx">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title">
                                <span style="margin-right:30px;">菜单三</span>
                                <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                            </template>
                            <div class="auth_body_block">
                                <div class="auth_body_block-content">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city, idx) in cities" :label="city" :key="idx">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-collapse-item>
                <el-collapse-item name="2" title="国际客服" v-if="!(value1.indexOf('2') === -1)">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item name="1">
                            <template slot="title">
                                <span style="margin-right:30px;">菜单一</span>
                                <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                            </template>
                            <div class="auth_body_block">
                                <div class="auth_body_block-content">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city, idx) in cities" :label="city" :key="idx">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                <span style="margin-right:30px;">菜单二</span>
                                <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                            </template>
                            <div class="auth_body_block">
                                <div class="auth_body_block-content">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city, idx) in cities" :label="city" :key="idx">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title">
                                <span style="margin-right:30px;">菜单三</span>
                                <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                            </template>
                            <div class="auth_body_block">
                                <div class="auth_body_block-content">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city, idx) in cities" :label="city" :key="idx">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import HeaderNav from "@/components/headerNav";
export default {
    name: 'authFunctionPoint',
    components: {
        HeaderNav
    },
    data () {
        return {
            activeNames:["1"],//搜索框默认展开
            systemNames: [],
            activeNames: [],
            options: [
                {
                    value: '1',
                    label: '微信客服'
                },
                {
                    value: '2',
                    label: '国际服'
                },
                {
                    value: '3',
                    label: '呼吸云'
                }
            ],
            value1: [],
            checkAll: false,
            checkedCities: ['功能1'],
            cities: ['功能1', '功能2', '功能3', '功能4']
        }
    },
    watch: {
        value1 (newD, oldD) {
            // console.log(newD);
        }
    },
    methods: {
        // 全选按钮
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
        },
        // 单选
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
        },
        // 关闭页面
        closeAuthPage () {
            this.$emit('dialogClose');
        }
    }
}
</script>
<style lang='less' scoped>
    // 侧滑栏宽度为整个内容区时的动画
    @keyframes slidelipContent {
        from{
            left: calc(100% - 257px);
        }
        to{
            left: 0;
        }
    }
    .widthContent {
        animation: slidelipContent linear .3s;
    }
    .auth_page{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 90;
        height: 100%;
        width: 100%;
        .auth_head {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid rgb(201, 245, 199);
            padding: 0 20px;
            >span {
                display: inline-block;
            }
            &-rm {
                width: 20px;
                text-align: center;
                float: right;
                cursor: pointer;
            }
        }
        .auth_body {
            height: calc(100% - 90px);
            padding: 0 20px;
            .auth_select-system {
                width: 100%;
                height: 50px;
                line-height: 50px;
                .el-select {
                    width: 100%;
                }
            }
            &_block {
                &-title {
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    .el-checkbox {
                        float: right;
                    }
                }
                &-content {
                    padding: 10px 20px;
                }
                .line {
                    width: 100%;
                    height: 1px;
                    background: rgb(201, 245, 199);
                }
            }
        }
    }
</style>