/**
* @desc 注册
* @author WL
* @date 2019/3/4
* @version 1.0
*/
<script>
    import BaseLargeTitle from '@c/BaseLargeTitle/index';
    import agreement from './agreement';
    import {Check} from '@u/formCheck';
    import CountryCode from '@c/CountryCode/index';

    export default {
        name: "Register",
        components: {
            BaseLargeTitle,
            CountryCode,
        },
        data() {
            return {
                Check,
                //用户名
                username: '',
                //密码
                password: '',
                //确认密码
                confirmPassword: '',
                //验证码
                validateCode: '',
                //推荐码
                popCode: '',
                //防止连点
                isPoint: false,
                //验证码提示
                text: '获得验证码',
                //定时器
                timer: '',
                //阅读协议
                read: '',
                //协议内容
                agreement,
                //协议显示隐藏
                isAgreement: false,

            };
        },
        watch: {
            'password'(v) {
                if (Check.checkZW(v)) {
                    this.password = '';
                }
            },
            
        },
        mounted() {
            if (this.$route.query.referrer) {
                this.recommend = this.$route.query.referrer;
            }

            this.getPopCode()
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        
        methods: {
            /**
             * 跳转页面
             * @param page
             * @private
             */
            _go(page) {
                this.$router.push(page);
            },
            /**
             * 提交之前验证
             * @private
             */
            _sendBeforeCheck() {
                if (this.username === '') {
                    this.$my_message('请输入手机号码');
                    return;
                }
                if (this.validateCode === '') {
                    this.$my_message('请输入验证码');
                    return;
                }
                if (this.password === '') {
                    this.$my_message('请输入密码');
                    return;
                }

                if (this.password.length < 6) {
                    this.$my_message('密码不能少于6位');
                    return;
                }
                if (this.password !== this.confirmPassword) {
                    this.$my_message('两次密码不一致，请重新输入');
                    return;
                }
                // if (this.recommend === '') {
                //     this.$my_message('请输入推荐人');
                //     return;
                // }

                if (this.read === '') {
                    this.$my_message('请选阅读注意规则,并且勾选同意!');
                    return;
                }

                // let data = {
                //     password: this.password,
                //     regName: this.name,
                //     phoneCode: this.code,
                //     // referralCode: this.recommend
                // };
                let data={
                    username: this.username,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    parentRecommend: this.popCode,
                    validateCode: this.validateCode,
                }
                console.log('国家区号动态：',data.areaCode)
                this._send(data);
            },
            /**
             * 发送验证码验证
             * @private
             */
            _verificationCode() {
                let phoneCheck = /^1[3456789]\d{9}$/;
                if (this.username === '') {
                    this.$my_message('请输入手机号');
                    return;
                }
                if (!phoneCheck.test(this.username)) {
                    this.$my_message('请输入合法手机号码');
                    return;

                }
                this._sendSMS();
            },
            /**
             * 发送验证码
             * @private
             */
            _sendSMS() {
                if (this.isPoint) {
                    return;
                }
                let params = {
                    // type: 12,
                    areaCode: this.$refs.countryCode.currentData.dialCode,
                    username : this.username
                };
                this.isPoint = true;
                this.$FDPost('app/sendValidateCode', params).then(re => {
                    if (re.status === 0) {
                        this.$my_message(re.msg);
                        this._countdown();
                    } else {
                        this.$my_message(re.msg);
                        this.isPoint = false;
                    }
                }).catch(err => {
                    this.isPoint = false;
                    console.log(err)
                });
            },
            /**
             * 倒计时
             * @private
             */
            _countdown() {
                let num = 60;
                this.text = num + 's';
                this.timer = setInterval(() => {
                    if (num <= 0) {
                        this.isPoint = false;
                        this.text = '获得验证码';
                        clearInterval(this.timer);
                        return;
                    }
                    num--;
                    this.text = num + "s";
                }, 1000);
            },
            /**
             * 发送
             * @param data
             * @private
             */
            _send(data) {
                this.$JSONPost('app/register', data).then(re => {
                    if (re.status === 0) {
                        this.$my_message("注册成功");
                        this.$router.push('/');
                    } else {
                        this.$my_message(re.msg);
                        // this.$my_message('系统注册人数较多，请稍后再试....');
                    }
                });
            },
            /**
             * 协议显示
             * @private
             */
            _showAgreement() {
                this.isAgreement = true;
            },
            /**
             * 隐藏
             * @private
             */
            _hiddenAgreement() {
                this.isAgreement = false;
            },
            /**
             * 同意协议
             * @private
             */
            _agreeAgreement() {
                this.read = 1;
                this._hiddenAgreement();
            },
            /**
             * 拒绝协议
             * @private
             */
            _refuseAgreement() {
                this.read = "";
                this._hiddenAgreement();
            },


            // 进入注册页面查看地址链接是否携带推荐码
            getPopCode() {
                let popCode = this.$route.query.popCode;
                console.log('获取推荐码为',popCode);
                if (popCode) {
                    this.popCode = popCode;
                }
            },
        }
    };

</script>

<template>
    <div class="register">
        <BaseLargeTitle text="注册"></BaseLargeTitle>
        <div class="form">
            <form>
                <div class="item">
                    <label for="phone">手机号码</label>
                    <div class="input">
                        <!-- lxs 添加国家区号 -->
                        <div class="left">
                            <CountryCode ref="countryCode"></CountryCode>
                        </div>


                        <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="username"
                               id="phone"
                               placeholder="请输入手机号"
                               onkeyup="value=value.replace(/\D/g,'')"/>
                    </div>
                </div>
                <div class="item">
                    <label for="code">验证码</label>
                    <div class="input">
                        <input type="number" oninput="if(value.length>4)value=value.slice(0,6)" class="validateCode"
                               v-model="validateCode" id="validateCode"
                               placeholder="请输入验证码"
                               onkeyup="value=value.replace(/\D/g,'')"/>
                        <div class="right" @click="_verificationCode">{{text}}</div>
                    </div>
                </div>
                <div class="item">
                    <label for="popCode">邀请码</label>
                    <div class="input">
                        <input type="number" placeholder="请输入邀请码"
                               v-model="popCode" id="popCode"
                               :readonly="$route.query.popCode"/>
                    </div>
                </div>
                <div class="item">
                    <label for="password">密码</label>
                    <div class="input">
                        <input type="password" maxlength="25" v-model="password" id="password"/>
                    </div>
                </div>
                <div class="item">
                    <label for="pwd">确认密码</label>
                    <div class="input">
                        <input type="password" maxlength="25" v-model="confirmPassword" id="confirmPassword"/>
                    </div>
                </div>
<!--                <div class="item">-->
<!--                    <label for="referrer">推荐人</label>-->
<!--                    <div class="input">-->
<!--                        <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="recommend"-->
<!--                               id="referrer"-->
<!--                               onkeyup="value=value.replace(/\D/g,'')"/>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="go">
                    <!--                    <span @click="_go('/')">登录 &gt;</span>-->
                    <!--                    <span @click="_go('/forget')">忘记密码? &gt;</span>-->
                    <div class="read">
                        <input id="read" type="radio" v-model="read" value="1">
                        <label @click="_showAgreement">我已认真阅读以上规则,同意加入艾亚游平台.</label>
                    </div>
                </div>
                <div class="submit" @click="_sendBeforeCheck">立即注册</div>
            </form>
        </div>
        <div class="agreement" v-show="isAgreement">
            <div class="content">
                <div class="header">
                    <i class="icon" @click="_hiddenAgreement"></i>
                    <h1>网站会员注册协议</h1>
                    <i class="right"></i>
                </div>
                <div class="text" v-html="agreement"></div>
                <div class="btn">
                    <span class="refuse" @click="_refuseAgreement">拒绝</span>
                    <span class="agree" @click="_agreeAgreement">同意</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .register {
        width: 100%;
        height: 100%;
        background: url("../Login/loginBackground.png");
        background-size: 100% 100%;

        .form {
            padding: 0 rem(39);

            .item {
                box-sizing: border-box;
                border-bottom: rem(1) solid #C6C5C5;

                label {
                    display: block;
                    padding-top: rem(35);
                    font-size: rem(28);
                    font-weight: bold;
                    color: $fontColor;
                }

                .input {
                    /*display: flex;*/
                    /*height: rem(90);*/
                    /*box-sizing: border-box;*/
                    /*align-items: center;*/
                    /*background-color:red;*/


                    width: rem(635);
                    height: rem(80);

                    border-radius: rem(100);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    font-size: rem(32);
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: #FFFFFF;
                    margin: 0 auto;

                    .left {
                        display: flex;
                        flex: 0 0 rem(80);
                        width: rem(80);
                        height: rem(48);
                        margin-right: rem(20);
                        font-size: rem(26);
                        color: $fontColor;
                        font-weight: bold;
                        align-items: center;
                        justify-content: center;
                        -webkit-border-radius: rem(5);
                        -moz-border-radius: rem(5);
                        border-radius: rem(5);

                    }

                    .right {
                        flex: 0 0 rem(235);
                        display: flex;
                        width: rem(235);
                        height: rem(60);
                        align-items: center;
                        justify-content: center;
                        background-color: #05D6CC;
                        font-size: rem(26);
                        color: #FFFFFF;
                        -webkit-border-radius: rem(5);
                        -moz-border-radius: rem(5);
                        border-radius: rem(5);
                    }

                    input {
                        flex: 1;
                        height: rem(48);
                        padding-left: rem(10);
                        font-size: rem(28);
                        background-color: transparent;

                        &.code {
                            width: rem(235);
                        }
                    }
                }
            }

            .go {
                display: flex;
                height: rem(110);
                padding: 0 rem(15);
                align-items: center;
                justify-content: space-between;

                .read {
                    display: flex;
                    align-items: center;

                    input[type=radio] {
                        width: rem(20);
                        height: rem(20);
                        margin-right: rem(15);
                    }

                    label {
                        font-size: rem(24);
                        color: #7E7E7E;
                    }
                }
            }

            .submit {
                display: flex;
                width: 100%;
                height: rem(100);
                margin: rem(40) auto;
                align-items: center;
                justify-content: center;
                -webkit-border-radius: rem(10);
                -moz-border-radius: rem(10);
                border-radius: rem(10);
                background-color: #05D6CC;
                font-size: rem(34);
                color: #FFFFFF;
            }
        }

        .agreement {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #FFFFFF;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
                box-sizing: border-box;
                padding: 0 rem(30) rem(20);

                .header {
                    display: flex;
                    height: rem(90);
                    align-items: center;
                    justify-content: space-between;

                    .icon {
                        display: inline-block;
                        width: rem(43);
                        height: rem(29);
                        @include bgIcon('return');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }

                    h1 {
                        font-size: rem(32);
                    }

                    .right {
                        display: inline-block;
                        width: rem(43);
                    }
                }

                .text {
                    font-size: rem(28);
                }

                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    span {
                        flex: 0 0 45%;
                        display: flex;
                        width: 45%;
                        height: rem(60);
                        align-items: center;
                        justify-content: center;
                        -webkit-border-radius: rem(10);
                        -moz-border-radius: rem(10);
                        border-radius: rem(10);
                        box-sizing: border-box;
                        font-size: rem(28);

                        &.agree {
                            color: #FFFFFF;
                            background-color: #F6383A;
                        }

                        &.refuse {
                            color: #F6383A;
                            border: rem(1) solid #F6383A;
                        }
                    }
                }
            }
        }
    }
</style>
