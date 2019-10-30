/**
* @desc 客服中心
* @author WL
* @date 2018/12/22
* @version 1.0
*/
<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BaseUpload from '@c/BaseUpload/BaseUpload';
    import {uploadOSS} from '@u/oss';
    import {getToken, removeToken, setToken} from '@u/token';

    export default {
        name: "CustomerService",
        components: {
            BaseNavbar,
            BaseUpload
        },
        data() {
            return {
                matters: [],
                setToken,
                news: [
                    {
                        id: 0,
                        content: '订单被拒绝',
                        type: 0,
                    }
                ],
                phone: '',//联系电话
                //旋转状态
                shift: false,
                //页数
                page: 1,
                // 条数
                limit: 5,
                //最大分页
                maxPage: 1,
                //人工还是系统
                isLeaveAMessage: true,
                //内容
                content: '',
                //是否转留言
                isTarget: false,
                //是否有内容
                isContent: false,
                //上传图片显示|隐藏
                isShow: false,
                //上传方式
                fileType: 0,
                //图片路径
                imgPath: '',
                //图片放大
                isZoom: false
            };
        },
        watch: {
            content() {
                if (this.content.length === 0) {
                    this.isContent = false;
                } else {
                    this.isContent = true;
                }
            },
        },
        created() {
            window.wave2 = this.wave2;
        },
        mounted() {
            this._getMatterList();
        },
        methods: {
            /**
             * @Description 获取地址链接token 和 userid  为了应对安卓的调用
             * @author 焦政
             * @date 2019/4/28
             */
            async getUrlToken() {
                let token = this.$route.query.token;
                let userid = this.$route.query.userid;
                if (token && userid) {
                    sessionStorage.setItem('accessToken',token)
                    this.setToken(token)
                    sessionStorage.setItem('userId',userid)
                }
            },
            /**
             * 选择问题
             * @param data [Object] 问题数据
             * @private
             */
            _quiz(data) {
                let obj = {
                    id: new Date().getTime(),
                    content: data.question,
                    type: 0
                };
                this.news.push(obj);
                this._scrollBottom();
                let params = {
                    id: data.id
                };
                this.$JSONPost('problemOne', params).then(re => {
                    if (re.status === 0) {
                        if (re.data.reply === undefined) {
                            return;
                        }
                        let ob = {
                            id: new Date().getTime(),
                            content: re.data.reply,
                            type: 1
                        };
                        this.news.push(ob);
                        this._scrollBottom();
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * 获得常见问题列表
             * @private
             */
           async _getMatterList() {
               await this.getUrlToken()
                let params = {
                    pageNum: (this.page - 1) * this.limit,
                    pageSize: this.limit
                };
                this.shift = true;
                setTimeout(() => {
                    this.shift = false;
                }, 1000);
                this.$JSONPost('problemList', params).then(re => {
                    if (re.status === 0) {
                        this.matters = re.data.problemList;
                        this.maxPage = this._maxPageNumber(re.data.number);
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * 最大分页页数
             * @param num
             * @private
             */
            _maxPageNumber(num) {
                if (num % this.limit === 0) {
                    return num / this.limit;
                }
                return Math.floor(num / this.limit) + 1;
            },
            /**
             * 换一换
             * @private
             */
            _changeOne() {
                this.page++;
                if (this.page > this.maxPage) {
                    this.page = 1;
                }
                this._getMatterList();
            },
            /**
             * 自动滑动到底部
             * @private
             */
            _scrollBottom() {
                this.$nextTick(() => {
                    let div = document.getElementById('customerService');
                    this.$refs.service.scrollTop = div.scrollHeight;
                    this.$refs.header.style.zIndex = '1000';
                });
            },
            /**
             * 转留言
             * @private
             */
            _leaveAMessage() {
                if (!this.isLeaveAMessage) {
                    return;
                }
                this.isTarget = true;
                this._scrollBottom();
            },
            /**
             * 获得留言记录
             * @private
             */
            _getMessageRecord() {
                this.news = [];
                let params = {
                    userId: sessionStorage.getItem('userId')
                };
                this.$JSONPost('messageRecordList', params).then(re => {
                    if (re.status === 0) {
                        let arr = [];
                        re.data.forEach(item => {
                            let obj = {
                                id: item.id,
                                content: item.message,
                                type: item.type
                            };
                            arr.push(obj);
                        });
                        this.news = arr;
                        this._scrollBottom();
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * 发送
             * @private
             */
            _send() {
                if (this.content === '') {
                    return;
                }
                let params = {
                    userId: sessionStorage.getItem('userId'),
                    message: this.content,
                    type: 0,
                    isReply: 2
                };
                this.$FDPost('saveRecord', params).then(re => {
                    if (re.status === 0) {
                        let obj = {
                            id: new Date().getTime(),
                            content: this.content,
                            type: 0,
                        };
                        this.news.push(obj);
                        this.content = '';
                        this._scrollBottom();
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * 确定转留言
             * @private
             */
            _transferMessage() {
                this.isTarget = false;
                this.isLeaveAMessage = false;
                this._getMessageRecord();
            },
            /**
             * 取消跳转
             * @private
             */
            _cancel() {
                this.isTarget = false;
            },
            /**
             * 显示上传方式
             * @private
             */
            _isUpload() {
                if (this.isLeaveAMessage) {
                    return;
                }
                this.isShow = true;
            },
            /**
             * 隐藏上传方式
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
                    this.fileType = 1;
                    this.$refs.hiddenInput.click();
                }
            },
            /**
             * 拍照上传
             */
            photograph() {
                try {
                    Android.pic();
                    this.fileType = 0;
                } catch (e) {
                    this.fileType = 1;
                    this.$refs.hiddenInput.click();
                }
            },
            /**
             * 上传OSS
             * @param event
             * @returns {Promise<void>}
             */
            async uploadImage(event) {
                this.isShow = false;
                let img = await uploadOSS(event, this.fileType);
                if (img) {
                    // this.content = `<img src="${img}"/>`;
                    this.content = `${img}`;
                    this._send();
                }
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
             * 放大图片
             * @param val
             * @private
             */
            _zoomInPicture(val) {
                if (val.indexOf('<img src') !== -1) {
                    this.isZoom = true;
                    let arr = val.split('"');
                    this.imgPath = arr[1];
                }
            },
            /**
             * 关闭图片放大
             * @private
             */
            _closeZoom() {
                this.isZoom = false;
            }
        }
    };
</script>

<template>
    <div class="customer-service paddingTop">
        <base-navbar title="客服中心"></base-navbar>
        <div class="service-wrapper" ref="service">
            <div class="head" ref="header">
                <i class="server-icon"></i>
                <span class="text">很高兴为您服务（HBT客服部）</span>
                <!--<div class="phone" @click="_callUp">-->
                <!--<i class="icon"></i>-->
                <!--<span>热线电话</span>-->
                <!--</div>-->
            </div>
            <div class="wrapper" id="customerService">
                <div class="infos" v-show="isLeaveAMessage">
                    <div class="item">
                        <div class="item-wrapper">
                            <div class="left"></div>
                            <div class="content">您好，您是遇到以下问题吗？</div>
                        </div>
                    </div>
                </div>
                <div class="container" v-show="isLeaveAMessage">
                    <div class="header">
                        <i class="icon"></i>
                        <span>常见问题</span>
                    </div>
                    <ul class="list">
                        <li class="item" v-for="item in matters" :key="item.id" @click="_quiz(item)">{{item.question}}
                        </li>
                    </ul>
                    <div class="change" @click="_changeOne">
                        <i class="icon" :class="{'active': shift}"></i>
                        <span>换一换</span>
                    </div>
                </div>
                <ul class="infos">
                    <li class="item" v-for="item in news" :key="item.id">
                        <div class="item-wrapper" :class="{'user': item.type === 0}">
                            <div class="left" v-if="item.type === 1"></div>
                            <div class="content" :class="{'user': item.type === 0}"
                                 v-if="item.content.indexOf('http://hbtdeal.oss-cn-hongkong.aliyuncs.com/') == -1"
                                 v-html="item.content"
                                 @click="_zoomInPicture(item.content)"></div>
                            <div class="content" :class="{'user': item.type === 0}"
                                 v-if="item.content.indexOf('http://hbtdeal.oss-cn-hongkong.aliyuncs.com/') != -1"
                                 @click="_zoomInPicture(item.content)">
                                <img :src="item.content" alt="">
                            </div>
                            <div class="right" v-if="item.type === 0"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="footer" @click="_leaveAMessage">
                <div class="left" v-show="isLeaveAMessage" @click="_leaveAMessage">
                    <img src="./turn.png" alt="">
                    <span>转留言</span>
                </div>
                <input type="text" :disabled="isLeaveAMessage" v-model="content" placeholder="请输入您所要描述的内容">
                <div class="btn" @click="_send" v-if="isContent">发送</div>
                <div class="upload" @click="_isUpload" v-else><img src="./add.png" alt=""></div>
            </div>
        </div>
        <transition name="fade">
            <div class="tips" v-show="isTarget">
                <div class="wrapper">
                    <h3>跳转留言</h3>
                    <div class="content">是否跳转留言？</div>
                    <div class="btn">
                        <div class="cancel" @click="_cancel">取消</div>
                        <div class="confirm" @click="_transferMessage">确认</div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="upload" v-show="isShow">
            <BaseUpload @close="_close" @upload="uploadHeadImg" @photograph="photograph"></BaseUpload>
            <input type="file" id="file" accept="image/*" @change="uploadImage" ref="hiddenInput"
                   class="hiddenInput"/>
        </div>
        <transition name="zoom">
            <div class="zoom" v-show="isZoom" @click="_closeZoom">
                <img :src="imgPath" alt="">
            </div>
        </transition>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .customer-service {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;


        .service-wrapper {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-bottom: rem(101);
            overflow: auto;
        }

        .head {
            position: fixed;
            display: flex;
            width: 100%;
            height: rem(102);
            padding: 0 rem(19);
            top: rem(90);
            left: 0;
            align-items: center;
            z-index: 100;
            background-color: #ffffff;
            box-sizing: border-box;

            .server-icon {
                display: inline-block;
                width: rem(67);
                height: rem(85);
                @include bgIcon('server');
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            .text {
                flex: 1;
                margin-left: rem(6);
                font-size: rem(26);
                color: $fontColor;
            }

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;

                .icon {
                    display: inline-block;
                    width: rem(30);
                    height: rem(33);
                    @include bgIcon('phone');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                span {
                    margin-top: rem(10);
                    line-height: rem(22);
                    font-size: rem(22);
                    color: $fontDescColor;
                }
            }
        }

        .wrapper {
            padding: rem(102) 0 rem(50);

            .container {
                margin: rem(38) rem(21) 0;
                padding: 0 rem(26);
                -webkit-border-radius: rem(15);
                -moz-border-radius: rem(15);
                border-radius: rem(15);
                background-color: #ffffff;

                .header {
                    display: flex;
                    height: rem(142);
                    align-items: center;
                    border-bottom: rem(1) solid #E2E1E1;

                    .icon {
                        display: inline-block;
                        width: rem(72);
                        height: rem(72);
                        @include bgIcon('matter-red');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }

                    span {
                        margin-left: rem(22);
                        font-size: rem(28);
                        color: $fontColor;

                    }
                }

                .list {
                    padding: rem(30) rem(27) 0 rem(53);

                    .item {
                        position: relative;
                        line-height: rem(68);
                        font-size: rem(28);
                        color: $fontColor;

                        &:before {
                            position: absolute;
                            display: inline-block;
                            width: rem(9);
                            height: rem(9);
                            margin-top: rem(-4.5);
                            top: 50%;
                            left: rem(-26);
                            border-radius: 50%;
                            background-color: $fontDescColor;
                            content: '';
                        }
                    }
                }

                .change {
                    display: flex;
                    height: rem(98);
                    padding-right: rem(13);
                    align-items: center;
                    justify-content: flex-end;

                    .icon {
                        display: inline-block;
                        width: rem(24);
                        height: rem(24);
                        @include bgIcon('change');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;

                        &.active {
                            transform: rotate(0);
                            animation: whirling 1s linear 1;
                        }
                    }

                    @keyframes whirling {
                        0% {
                            transform: rotate(0);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }

                    span {
                        margin-left: rem(11);
                        font-size: rem(24);
                        color: $fontDescColor;
                    }
                }
            }

            .infos {
                padding: 0 rem(25);

                .item {
                    margin-top: rem(37);

                    .item-wrapper {
                        display: flex;

                        &.user {
                            justify-content: flex-end;
                        }

                        .left {
                            width: 0;
                            height: 0;
                            margin-top: rem(20);
                            border-top: rem(8) solid transparent;
                            border-bottom: rem(8) solid transparent;
                            border-right: rem(9) solid #ffffff;
                        }

                        .content {
                            padding: rem(17) rem(41);
                            line-height: rem(50);
                            -webkit-border-radius: rem(10);
                            -moz-border-radius: rem(10);
                            border-radius: rem(10);
                            font-size: rem(24);
                            color: $fontColor;
                            background-color: #ffffff;

                            &.user {
                                color: #ffffff;
                                background-color: #F6383A;
                                /*background: -webkit-linear-gradient(#FC414E, #FA6A74); !* Safari 5.1 - 6.0 *!*/
                                /*background: -o-linear-gradient(#FC414E, #FA6A74); !* Opera 11.1 - 12.0 *!*/
                                /*background: -moz-linear-gradient(#FC414E, #FA6A74); !* Firefox 3.6 - 15 *!*/
                                /*background: linear-gradient(#FC414E, #FA6A74); !* 标准的语法 *!*/
                            }

                            img {
                                width: auto;
                                max-width: 100%;
                                height: auto;
                                max-height: rem(300);
                            }
                        }

                        .right {
                            width: 0;
                            height: 0;
                            margin-top: rem(20);
                            margin-left: rem(-1);
                            border-top: rem(8) solid transparent;
                            border-bottom: rem(8) solid transparent;
                            border-left: rem(9) solid #F6383A;
                        }
                    }
                }
            }
        }

        .footer {
            position: fixed;
            display: flex;
            height: rem(101);
            bottom: 0;
            left: 0;
            right: 0;
            padding: rem(22) rem(20) rem(15);
            align-items: center;
            justify-content: space-between;
            background-color: #FFFFFF;
            box-sizing: border-box;
            border-top: rem(1) solid #DDDCDC;
            z-index: 1000;

            .left {
                flex: 0 0 rem(64);
                display: flex;
                width: rem(64);
                height: 100%;
                align-items: center;
                flex-direction: column;
                justify-content: center;

                img {
                    width: rem(40);
                }

                span {
                    font-size: rem(15);
                    color: #F6383A;
                }
            }

            input {
                flex: 1;
                height: 100%;
                padding: rem(10) rem(20);
                background-color: #F6F6F6;
                -webkit-border-radius: rem(10);
                -moz-border-radius: rem(10);
                border-radius: rem(10);
                box-sizing: border-box;
                font-size: rem(26);
            }

            .btn {
                display: flex;
                width: rem(130);
                height: 100%;
                margin-left: rem(15);
                align-items: center;
                justify-content: center;
                background-color: #F6383A;
                font-size: rem(28);
                color: #FFFFFF;
                -webkit-border-radius: rem(10);
                -moz-border-radius: rem(10);
                border-radius: rem(10);
            }

            .upload {
                flex: 0 0 rem(64);
                width: rem(64);
                height: rem(64);
                margin-left: rem(15);
                text-align: center;
                font-size: 0;

                img {
                    width: rem(64);
                    height: rem(64);
                }
            }
        }

        .tips {
            position: fixed;
            display: flex;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            align-items: center;
            justify-content: center;
            z-index: 500;
            background-color: rgba(0, 0, 0, .5);

            &.fade-enter-active, &.fade-leave-active {
                transition: all .5s ease;
            }

            &.fade-enter, &.fade-leave-active {
                opacity: 0;
            }

            .wrapper {
                position: relative;
                width: rem(442);
                padding: rem(41) 0 rem(60);
                -webkit-border-radius: rem(10);
                -moz-border-radius: rem(10);
                border-radius: rem(10);
                background-color: #ffffff;

                h3 {
                    line-height: rem(30);
                    text-align: center;
                    font-size: rem(30);
                    color: #333333;
                }

                .content {
                    margin-top: rem(46);
                    padding-bottom: rem(46);
                    line-height: rem(20);
                    text-align: center;
                    font-size: rem(20);
                    color: #666666;
                }

                .btn {
                    position: absolute;
                    display: flex;
                    width: 100%;
                    height: rem(60);
                    left: 0;
                    bottom: 0;
                    border-top: rem(1) solid #F5F5F5;

                    div {
                        display: flex;
                        flex: 1;
                        align-items: center;
                        justify-content: center;
                        font-size: rem(24);

                        &.cancel {
                            border-right: rem(1) solid #F5F5F5;
                            color: #666666;
                        }

                        &.confirm {
                            color: #F6383A;
                        }
                    }
                }
            }
        }

        .hiddenInput {
            display: none;
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
            background-color: rgba(0, 0, 0, .9);

            &.zoom-enter, &.zoom-leave-active {
                opacity: 0;
            }

            &.zoom-enter-active, &.zoom-leave-active {
                transition: all .5s;
            }
        }
    }
</style>
