/**
* @desc 修改用户信息
* @author WL
* @date 2019/3/7
* @version 1.0
*/
<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BaseUpload from '@c/BaseUpload/BaseUpload';
    import BaseModal from '@c/BaseModal/BaseModal';
    import BaseButton from '@c/BaseButton/index';
    import add from './add@3x.png';
    import {uploadOSS} from '@u/oss';

    var urlencode = require('urlencode');

    export default {
        name: "ModifyInfo",
        components: {
            BaseNavbar,
            BaseButton,
            BaseUpload,
            BaseModal
        },
        data() {
            return {
                urlencode,
                //支付宝账号
                num: '',
                //收款码
                code: add,
                wxcode:add,
                //用户信息
                users: {
                    realname: '未实名',
                    referRealName: '未实名',
                },
                //上传显示隐藏
                isShow: false,
                //上传状态
                fileType: 0,
                //连点
                isPoint: false,
                //提示框显示|隐藏
                isPrompt: false,
                //图片放大显示|隐藏
                isZoom: false,
                isZoomWX:false,
                imgType:'ali',
            };
        },
        filters: {
            people(val) {
                if (val === undefined || val === '') {
                    return '无';
                }
                return val;
            }
        },
        created() {
            window.wave2 = this.wave2;
        },
        mounted() {
            this._getUserInfo();
        },
        methods: {
            /**
             * 确认
             * @private
             */
            _modify() {
                if (this.num === '' || this.num.length === 0) {
                    this.$my_message('请输入支付宝账号');
                    return;
                }
                if (this.code === add) {
                    this.$my_message('请上传支付宝收款码');
                    return;
                }
                this.isPrompt = true;
            },
            /**
             * 获得用户资料
             * @private
             */
            _getUserInfo() {
                let params = {
                    userId: sessionStorage.getItem('userId')
                };
                this.$FDPost('getMyMessage', params).then(re => {
                    if (re.status === 0) {
                        this.users = re.data;
                        this.num = re.data.alipayNumber == undefined ? "" : re.data.alipayNumber;
                        this.code = (re.data.alipayCode === undefined || re.data.alipayCode === '' || re.data.alipayCode === 'null') ? this.code : re.data.alipayCode;
                        this.wxcode = (re.data.wxCode === undefined || re.data.wxCode === '' || re.data.wxCode === 'null') ? this.wxcode : re.data.wxCode;
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * 上传展开
             * @private
             */
            _uploadState(t) {
                this.imgType = t
                this.isShow = true;
            },
            /**
             * 隐藏
             * @private
             */
            _close() {
                this.isShow = false;
            },
            /**
             * 相册上传
             */
            uploadHeadImg() {
                try {
                    Android.pic();
                    this.fileType = 0;
                } catch (e) {
                    if(this.imgType == 'ali'){
                        this.fileType = 1;
                        this.$refs.hiddenInput.click();
                    }else if(this.imgType == 'wx'){
                        this.fileType = 1;
                        this.$refs.hiddenInputwx.click();
                    }

                }
            },
            /**
             * 拍照上传
             */
            photograph() {
                try {
                    Android.paizhao();
                    this.fileType = 0;
                } catch (e) {
                    if(this.imgType == 'ali'){
                        this.fileType = 1;
                        this.$refs.hiddenInput.click();
                    }else if(this.imgType == 'wx'){
                        this.fileType = 1;
                        this.$refs.hiddenInputWx.click();
                    }
                }
            },
            /**
             * 上传OSS
             * @param event
             * @returns {Promise<void>}
             */
            async uploadImage(event) {
                this.$my_message('图片上传中,请稍后....')
                this.isShow = false;
                this.code = await uploadOSS(event, this.fileType);
            },
            /**
             * 上传OSS
             * @param event
             * @returns {Promise<void>}
             */
            async uploadImageWx(event) {
                this.$my_message('图片上传中,请稍后....')
                this.isShow = false;
                this.wxcode = await uploadOSS(event, this.fileType);
            },
            /**
             * 提供Android调用
             * @param str
             * @param base64
             */
            wave2(str, base64) {
                base64 = 'data:image/png;base64,' + base64;
                let file = this.dataURLtoFile(base64, new Date().getTime());
                this.uploadImage(file);
            },
            /**
             * 将base64转化成文件
             * @param url
             * @param filename
             * @returns {File}
             */
            dataURLtoFile(url, filename) {
                //将base64转换为文件
                var arr = url.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },
            /**
             * 确认修改
             * @param params
             * @private
             */
            _confirmTheChanges(params) {
                if (this.isPoint) {
                    return;
                }
                this.isPoint = true;
                this.$FDPost('updateMyMessage', params).then(re => {
                    ``
                    this.isPoint = false;
                    if (re.status === 0) {
                        this.$my_message(re.msg);
                        this.$router.back(-1);
                    } else {
                        this.$my_message(re.msg);
                    }
                }).catch(() => {
                    this.isPoint = false;
                });
            },
            /**
             * 确认修改资料
             * @private
             */
            _confirm() {
                this.isPrompt = false;
                let params = {
                    userId: sessionStorage.getItem('userId'),
                    apliNumeber: this.num,
                    apliCode: this.code,
                    wxCode:this.wxcode
                };
                this._confirmTheChanges(params);
            },
            /**
             * 关闭提示框
             * @private
             */
            _closePrompt() {
                this.isPrompt = false;
            },
            /**
             * 图片放大显示|隐藏
             * @private
             */
            _zoomTarget() {
                if (this.code === add) {
                    return;
                }
                this.isZoom = !this.isZoom;
            },
            _zoomTargetwx(){
                if (this.wxcode === add) {
                    return;
                }
                this.isZoomWX = !this.isZoomWX;
            },
        }
    };
</script>

<template>
    <div class="info">
        <BaseNavbar title="修改资料"></BaseNavbar>
        <div class="wrapper">
            <div class="head">
                <div class="zfb">
                    <i class="icon"></i>
                    <span>提示：修改支付宝号</span>
                    <span>支付宝收款码需要根据等级扣除相应额度与可售鱼</span>
                </div>
                <div class="item account-number">
                    <label class="name" for="num">支付宝账号</label>
                    <input type="text" id="num" v-model="num">
                </div>
                <div class="item code">
                    <span class="name">支付宝收款码</span>
                    <div class="img">
                        <img @click="_zoomTarget" :src="code" alt="">
                        <input type="file" id="file" accept="image/*" @change="uploadImage" ref="hiddenInput"
                               class="hiddenInput"/>
                        <div class="btn" @click="_uploadState('ali')">上传二维码</div>
                    </div>
                </div>
                <div class="item code">
                    <span class="name">微信收款码</span>
                    <div class="img">
                        <img @click="_zoomTargetwx" :src="wxcode" alt="">
                        <input type="file" id="filewx" accept="image/*" @change="uploadImageWx" ref="hiddenInputwx"
                               class="hiddenInput"/>
                        <div class="btn" @click="_uploadState('wx')">上传二维码</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="item">
                    <span>真实姓名（已实名）</span>
                    <span>{{urlencode.decode(users.realname)}}</span>
                </div>
                <div class="item">
                    <span>用户名</span>
                    <span>{{users.accountName}}</span>
                </div>
                <div class="item">
                    <span>推荐人</span>
                    <span>{{urlencode.decode(users.referRealName) | people}}</span>
                </div>
                <div class="item">
                    <span>注册时间</span>
                    <span>{{users.createTime}}</span>
                </div>
            </div>
            <div class="button">
                <BaseButton text="确认修改" @btn="_modify"></BaseButton>
            </div>
        </div>
        <div class="upload" v-show="isShow">
            <BaseUpload @close="_close" @upload="uploadHeadImg" @photograph="photograph"></BaseUpload>
        </div>
        <div v-show="isPrompt">
            <BaseModal message="是否确认修改资料" @e_confirm="_confirm" @e_cancel="_closePrompt"></BaseModal>
        </div>
        <transition name="mode">
            <div class="zoom" v-show="isZoom" @click="_zoomTarget">
                <img :src="code" alt="">
            </div>
        </transition>
        <transition name="mode">
            <div class="zoom" v-show="isZoomWX" @click="_zoomTargetwx">
                <img :src="wxcode" alt="">
            </div>
        </transition>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .info {
        padding-top: rem(90);

        .wrapper {
            .head {
                padding: 0 rem(28);
                background-color: #1C9EDA;

                .zfb {
                    display: flex;
                    padding: rem(53) 0 rem(6);
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    .icon {
                        display: inline-block;
                        width: rem(119);
                        height: rem(119);
                        margin-bottom: rem(20);
                        @include bgIcon('zfb');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }

                    span {
                        margin-top: rem(10);
                        font-size: rem(22);
                        color: rgba(255, 255, 255, .6);
                    }
                }

                .item {
                    display: flex;
                    padding: 0 rem(8);
                    justify-content: space-between;

                    &.account-number {
                        align-items: center;
                        height: rem(100);
                        border-bottom: rem(1) solid rgba(255, 255, 255, .5);
                    }

                    &.code {
                        height: rem(251);

                        .name {
                            margin-top: rem(50);
                        }

                        .img {
                            text-align: center;
                            margin: rem(46) rem(4) 0 0;
                            font-size: 0;

                            img {
                                width: rem(120);
                                height: rem(120);
                            }

                            .hiddenInput {
                                display: none;
                            }

                            .btn {
                                padding: rem(8) rem(20);
                                margin-top: rem(15);
                                font-size: rem(24);
                                background-color: #F6383A;
                                -webkit-border-radius: rem(10);
                                -moz-border-radius: rem(10);
                                border-radius: rem(10);
                                color: #FFFFFF;
                            }
                        }
                    }

                    .name {
                        font-size: rem(26);
                        color: #FFFFFF;
                    }

                    input {
                        flex: 1;
                        font-size: rem(26);
                        background-color: #1C9EDA;
                        text-align: right;
                        color: #FFFFFF;
                    }
                }
            }

            .content {
                .item {
                    display: flex;
                    height: rem(97);
                    padding: 0 rem(42);
                    margin-bottom: rem(2);
                    align-items: center;
                    justify-content: space-between;
                    background-color: #FFFFFF;

                    &:nth-child(3) {
                        margin-bottom: rem(10);
                    }

                    span {
                        font-size: rem(26);
                        color: $fontColor;
                    }
                }
            }

            .button {
                margin: rem(82) rem(74);
            }
        }

        .zoom {
            position: fixed;
            display: flex;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            background-color: #000000;

            &.mode-enter, &.mode-leave-active {
                opacity: 0;
            }

            &.mode-enter-active, &.mode-leave-active {
                transition: opacity .5s linear;
            }

            img {
                width: 100%;
                height: auto;
            }
        }
    }
</style>
