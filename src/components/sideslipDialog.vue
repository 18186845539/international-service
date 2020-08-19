<template>
    <div>
        <div class="modal" v-if="visible" @click="closeDialog"></div>
        <div
        class="sideslip-dialog"
        :class="[width === 'calc(100% - 257px)' ? 'widthContent' : 'width400']"
        v-if="visible"
        :style="{width: width, 'z-index': zIndex}">
            <div class="title">
                <h4>{{title}}</h4>
                <button
                type="button"
                aria-label="Close"
                class="el-dialog__headerbtn"
                @click="closeDialog">
                    <i class="el-dialog__close el-icon el-icon-close" ></i>
                </button>
            </div>
            <div class="slot-content" :style="{bottom: showFoot ? '69px' : '0px'}">
                <slot name="content"></slot>
            </div>
            <div class="slot-foot" v-if="showFoot">
                <slot name="foot"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sideslipDialog',
    data () {
        return {
            zIndex: 99
        };
    },
    props: {
        showFoot: {
            type: Boolean,
            default: true
        },
        visible: {
            type: Boolean,
            default () {
                return false;
            }
        },
        title: {
            type: String,
            default () {
                return '';
            }
        },
        width: {
            type: String,
            default () {
                return '400px';
            }
        }
    },
    computed: {},
    watch: {
        // visible (newVal) {
        //     if (newVal) {
        //         this.changeIndex();
        //     }
        // }
    },
    methods: {
        closeDialog () {
            this.$emit('dialogClose');
        },
        changeIndex () {
            this.zIndex = parseInt(new Date().getTime() / 1000000);
            console.log(this.zIndex);
        }
    }
};

</script>
<style lang="less" scoped>
    @keyframes slidelip {
        from{
            right: -400px;
        }
        to{
            right: 0;
        }
    }
    // 侧滑栏宽度为整个内容区时的动画
    @keyframes slidelipContent {
        from{
            right: calc(257px - 100%);
        }
        to{
            right: 0;
        }
    }
    .width400 {
        animation: slidelip linear .3s;
    }
    .widthContent {
        animation: slidelipContent linear .3s;
    }
    .modal{
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: transparent;
            z-index: 90;
            opacity: 0.5;
    }
    .sideslip-dialog{
        background: #fff;
        border: 1px solid #F6F6F6;
        box-shadow:2px 0px 6px rgba(222,231,243,0.79);
        padding: 0 20px;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        z-index: 99;
        >div{
            position: absolute;
            left: 20px;
            right: 20px;
        }

        .title{
            top: 0;
            bottom: auto;
            border-bottom: 2px solid #EAEDF1;
            padding: 10px 0;
            h4{
                float: left;
                font-size: 16px;
                color: #3A4E64;
                font-family: 'MicrosoftYaHei-Bold';
                font-weight: bold;
            }
            button{
                float: right;
                position: static;
            }
        }
        .slot-content{
            top: 40px;
            overflow: scroll;
        }
        .slot-foot{
            height: 67px;
            border-top: 2px solid #EAEDF1;
            top: auto;
            bottom: 0;
            background: #fff;
        }
        .confirm-cancel{
            height: 30px;
            padding: 20px 89px 0;
            button{
                width: 80px;
                height: 30px;
                line-height: 30px;
                padding: 0;
                background: #4A8DF0;
                border-radius: 2px;
                border: 1px solid #4A8DF0;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
            }
            .confirm{
                float: left;
            }
            .cancel{
                float: right;
                background: #fff;
                color: #3A4E64;
                border-color: #EAEDF1;
            }
            .confirm:hover{
                border-color: #4184E7;
                background: #4184E7;
            }
            .confirm:focus{
                border-color: #3070CF;
                background: #3070CF;
            }
        }
    }
</style>
