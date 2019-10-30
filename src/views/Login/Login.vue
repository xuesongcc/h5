<template>
    <div class="Login">
<!--        <img class="background" :src="loginBackground" alt="">-->

        <!--登录区域-->
        <div class="loginArea">
            <div class="logo"><img src="./aiyayouLogo.png"></div>
            <!--登录方式-->
            <div class="login_type">
            <!--<span class="type_name" v-if="currentType !== v.type" v-for="(v,i) in TypeList" :key="i"-->
                  <!--@click="e_selectType(v.type)">{{v.label}}</span>-->
            </div>
            <!--注册按钮-->
            <div class="FormBtn" @click="e_goPage('/register')">
                <span>注册</span>
            </div>

            <!--输入框区域-->

            <div class="input_container">
                <input class="input" type="number" oninput="if(value.length>11)value=value.slice(0,11)"
                       v-model="loginForm.accountName"
                       onkeyup="value=value.replace(/\D/g,'')" placeholder="输入手机号"/>
            </div>


            <div class="input_container">
                <input type="password" class="input" v-model="loginForm.accountPwd" placeholder="输入密码">
            </div>

            <div class="FormLabel" v-if="currentType === 1">
                <span class="label_name">验证码</span>
                <div class="code_container ">
                    <div class="code_input">
                        <input class="input" type="number" oninput="if(value.length>6)value=value.slice(0,6)"
                               v-model="loginForm.verificationCode" onkeyup="value=value.replace(/^\d{11}$/,'')">
                    </div>
                    <div class="code_btn" @click="e_sendSMS">
                        <span>{{smsBtn}}</span>
                    </div>
                </div>
            </div>

            <!--登录按钮-->
            <div class="FormBtn" @click="e_login">
                <span>登录</span>
            </div>
            <!--提示区域-->
            <div class="message" >
                <span class="message-text">忘记密码?点击 </span>
                <span class="message-password" @click="e_goPage('/forget')">找回密码</span>
            </div>

<!--            <p class="info">未注册手机号完成验证后自动登录，注册即代表我已阅读并同意<span class="info_title">《用户注册协议》</span></p>-->
<!--            -->
<!--            <div class="downloadArea">-->
<!--                <img class="downIcon android" :src="android" alt="" @click="e_goDownApp('http://wgbook.shop/cdq65l')">-->
<!--                <img class="downIcon" :src="apple" alt="" @click="e_goDownApp('http://wgbook.shop/Yq6pi1')">-->
<!--            </div>-->
        </div>


        <!--弹框区域-->
        <div class="flexbox" v-if="isShowBox">
            <div class="box">
                <img class="bgi" :src="bgi" alt="">
                <span class="boxTitle">小人鱼提示：{{blockmessage}}</span>
                <div class="closeBtn" @click="e_closeBox">
                    <span>确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Check} from '@u/formCheck'
    import {setToken} from '@u/token';
    import bgi from './bgi.png'
    // import iconleft from './iconleft.png'
    // import iconright from './iconright.png'
    // import iconbottom from './iconbottom.png'
    import android from './android.png'
    import apple from './apple.png'

    export default {
        name: 'Login',
        data() {
            return {
                android,
                apple,
                blockmessage: '',
                // iconleft,
                // iconright,
                // iconbottom,
                // loginBackground,
                isShowBox: false,
                Check,
                setToken,
                bgi,
                TypeList: [
                    {
                        type: 0,
                        label: '密码登录'
                    }, {
                        type: 1,
                        label: '验证码登录'
                    },
                ],
                currentType: 0,
                smsBtn: '发送验证码', //发送验证码
                smdTimer: null, //发送验证码定时器,
                loginForm: {
                    accountName: '',
                    accountPwd: '',
                    logonMode: 16,
                    verificationCode: '',
                }
            };
        },

        components: {},
        computed: {},
        watch: {
            'loginForm.accountPwd'(v) {
                if (Check.checkZW(v)) {
                    this.loginForm.accountPwd = ''
                }
            }
        },
        methods: {
            /**
             * @Description 下载APP
             * @author 李雪松
             * @date 2019/4/13
             */
            e_goDownApp(p){
                window.location.href=p
            },
            /**
             * @Description: 选择登录方式
             * @author 李雪松
             * @date 2019/3/4
             */
            e_selectType(t) {
                this.currentType = t
                //如果登录方式为验证码登录 则传给后台的登录类型为16 默认为0 密码登录
                if (t == 1) {
                    this.loginForm.logonMode = 16
                } else if (t == 0) {
                    this.loginForm.logonMode = 0
                }
            },
            /**
             * @Description: 跳转注册页 忘记密码页
             * @author 李雪松
             * @date 2019/3/4
             */
            e_goPage(p) {
                this.$router.push(p)
            },

            /**
             * @Description: 发送短信验证码
             * @author 李雪松
             * @date 2019/3/4
             */
            e_sendSMS() {
                if (this.smsBtn == '发送验证码') {
                    this.beforeSendCheck()
                }
            },
            beforeSendCheck() {
                if (!this.Check.checkPhone(this.loginForm.accountName)) {
                    this.$my_message('请输入规则的手机号')
                    this.loginForm.accountName = ''
                    return
                }
                this.sendTimer()
            },
            sendTimer() {
                this.smsBtn = '60s'
                var counter = 59
                this.smdTimer = setInterval(() => {
                    if (counter == 0) {
                        this.smsBtn = '发送验证码'
                        clearInterval(this.smdTimer)
                    } else {
                        this.smsBtn = counter + 's'
                        counter--
                    }
                }, 1000)
                this.doSendSMS()
            },
            doSendSMS() {
                let sendData = {
                    type: 16,
                    phone: this.loginForm.accountName
                }
                this.$FDPost('app/user/sendMsg', sendData).then(re => {
                    console.log(re)
                    if (re.status == 0) {
                        this.$my_message(re.msg)
                    } else {
                        this.$my_message(re.msg)
                        this.smsBtn = '发送验证码'
                        clearInterval(this.smdTimer)
                    }
                })

            },
            /**
             * @Description: 登录按钮
             * @author 李雪松
             * @date 2019/3/4
             */
            e_login() {
                // Boolean(this.currentType) ? this.verificationLogin() : this.pwdLogin()
                this.pwdLogin()
            },
            //    验证码登录
            verificationLogin() {
                let params = {
                    accountName: this.loginForm.accountName,
                    accountPwd: this.loginForm.verificationCode,
                    logonMode: this.loginForm.logonMode
                }
                if (!this.Check.checkPhone(params.accountName)) {
                    this.$my_message('请输入规则的手机号')
                    this.loginForm.accountName = ''
                    return
                }
                if (params.accountPwd == '') {
                    this.$my_message('请输入验证码')
                    return
                }
                this.$JSONPost('app/oauth/token', params).then(response => {
                    if (response.status == 0) {
                        this.saveLocal(response)
                        if (response.data.hasCertified === '0') {
                            this.$router.push('/authentication')
                            this.$my_message('请实名认证')
                            return
                        }
                        this.$my_message('登录成功')
                        this.$router.push('/main')
                    } else {
                        this.checkBlock(response)
                    }
                })
            },
            //    密码登录
            pwdLogin() {
                let params = {
                    username: this.loginForm.accountName,//登录手机号
                    password: this.loginForm.accountPwd,//登录密码

                }


                if (params.username == '') {
                    this.$my_message('请输入手机号')
                    return
                }
                if (params.password == '') {
                    this.$my_message('请输入登录密码')
                    return
                }
                this.$JSONPost('app/oauth/token', params).then(response => {
                    console.log('密码登录结果', response)
                    // 这块是登录成功
                    if (response.status == 0) {
                        // 登录成功 存储用户基础数据
                        this.saveLocal(response)
                        // 登录成功后 在跳转首页前先判断是否实名认证了 如果没有实名则跳转到实名认证页面
                        if (response.data.hasCertified === '0') {
                            this.$router.push('/authentication')
                            this.$my_message('请实名认证')
                            return
                        }
                        // 登录成功且已经实名了 就直接进入首页
                        this.$my_message('登录成功')
                        this.$router.push('/main')
                        this.$store.dispatch('SetRedeemData', {showNotice:true});
                    } else {
                        // 没有登录成功 也就是 response.status 不等于0的情况
                        this.checkBlock(response)
                    }

                })
            },
            /**
             * @Description: 是否冻结判断
             * @author 李雪松
             * @date 2019/3/6
             */
            checkBlock(response) {
                // 登录不成功 并且返回了 isBlock 说明是冻结导致的不成功
                if (response.data && response.data.isBlock) {
                    this.isShowBox = true
                    this.blockmessage = response.data.message
                    this.$my_message('登录失败')
                } else {
                    // 其他原因的不成功
                    this.$my_message(response.msg)
                }
            },
            /**
             * @Description: 登录成功存储用户数据
             * @author 李雪松
             * @date 2019/3/4
             */
            saveLocal(re) {
                sessionStorage.setItem('accessToken', re.data.accessToken)
                sessionStorage.setItem('accountName', re.data.accountName)
                sessionStorage.setItem('accountType', re.data.accountType)
                sessionStorage.setItem('avatar', re.data.avatar)
                sessionStorage.setItem('givenTheAmountOf', re.data.givenTheAmountOf)
                sessionStorage.setItem('phoneNo', re.data.phoneNo)
                sessionStorage.setItem('userId', re.data.userId)
                this.setToken(re.data.accessToken)

                //取用户的手机号，旧密码，推荐码
                sessionStorage.setItem('username',re.data.username)//手机号
                sessionStorage.setItem('oldPassword',re.data.password)//密码
                sessionStorage.setItem('popCode',re.data.selfRecommend)//推荐码

            },
            /**
             * @Description: 关闭弹框
             * @author 李雪松
             * @date 2019/3/6
             */
            e_closeBox() {
                this.isShowBox = false
            }


        },

        mounted() {
        },
        destroyed() {
            this.smsBtn = '发送验证码'
            clearInterval(this.smdTimer)
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .Login {
        width: 100%;
        height: 100%;
        background: url("./loginBackground.png");
        background-size: 100% 100%;

        overflow: hidden;

        .loginArea{
            /*上开始*/
            /*padding:rem(600) rem(50) rem(50);*/
            /*定宽方案小屏手机不支持*/
            width: rem(600);
            margin:  0 auto;
            margin-top: 100%;
            .logo{
              position: absolute;
              left: 5vw;
              right:5vw;
              top: 10vw;
            }
        }
        .input_container{

            height: rem(60);
            margin-top: rem(20);

            .input{
                overflow: hidden;
                width: rem(550);
                padding-left: rem(50);
                height: 100%;
                background:#ffffff;
                border-radius: rem(100);
                border: none;


                font-size: rem(32);
            }

        }

        .message {
            text-align: center;
            margin: 0 auto;
            margin-top: rem(38);
            .message-text{
                font-size: rem(30);
                color: #ffffff;
            }
            .message-password{
                font-size: rem(30);
                color: #3EBBF9;
            }
        }

        .FormBtn {
            /*width: rem(635);*/
            height: rem(60);
            background:rgba(62,187,249,1);
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
            margin-top: rem(20);

        }

        .info {
            width: rem(622);
            margin: 0 auto;
            margin-top: rem(41);
            font-size: rem(26);
            font-family: ios9SC-Medium;
            font-weight: 500;
            color: white;

            .info_title {
                color: #FDDD41;
            }

        }

        .downloadArea{
            width: 100%;
            margin-top: rem(40);
            display: flex;
            flex-direction: row;
            justify-content: center;
            .downIcon{
                width: rem(64);
                height: rem(64);

            }
            .android{
                display: block;
                margin-right: rem(40);
            }

        }

        .flexbox {
            width: 100%;
            height: 100%;
            background: rgba(0, 1, 1, 0.6);
            position: fixed;
            top: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            z-index: 3;

            .box {
                width: rem(629);
                height: rem(489);
                background-color: white;
                border-radius: rem(6);
                position: relative;

                .bgi {
                    position: absolute;
                    top: rem(-208);
                    left: rem(25);
                }

                .boxTitle {
                    font-size: rem(28);
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(32, 32, 32, 1);
                    position: absolute;
                    top: rem(266);
                    display: block;
                    text-align: center;
                    left: 0;
                    right: 0;
                    margin: auto;
                    display: inline-block;
                    width: 95%;
                }

                .closeBtn {
                    width: rem(449);
                    height: rem(79);
                    background: rgba(255, 213, 5, 1);
                    border-radius: rem(100);
                    position: absolute;
                    bottom: rem(56);
                    left: 0;
                    right: 0;
                    margin: auto;
                    text-align: center;
                    line-height: rem(79);
                    font-size: rem(32);
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(32, 32, 32, 1);
                }

            }
        }


    }
</style>
