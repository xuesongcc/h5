<template>
    <div class="top">
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="form">
        <form>
<!--            <div class="item">-->
<!--                <label for="oldPassword">旧密码 <span style="color:red">(选填)</span></label>-->
<!--                <div class="input">-->
<!--                    <input type="password" maxlength="25" v-model="oldPassword" id="oldPassword" placeholder="请输入旧密码"/>-->
<!--                </div>-->
<!--            </div>-->
            <div class="item">
                <label for="password">新密码</label>
                <div class="input">
                    <input type="password" maxlength="25" v-model="password" id="password" placeholder="请输入新密码"/>
                </div>
            </div>
            <div class="item">
                <label for="confirmPassword">确认密码</label>
                <div class="input">
                    <input type="password" maxlength="25" v-model="confirmPassword" id="confirmPassword" placeholder="请输入新密码"/>
                </div>
            </div>
            <div class="item">
                <label for="code">验证码</label>
                <div class="input">
                    <input type="number" oninput="if(value.length>4)value=value.slice(0,6)" class="code"
                           v-model="code" id="code" onkeyup="value=value.replace(/\D/g,'')" placeholder="请输入验证码"/>
                    <div class="right" @click="_verificationCode">{{text}}</div>
                </div>
            </div>
<!--            确定按钮-->
            <div class="submit" @click="confirmBeforeCheck">确认</div>
        </form>
        </div>

    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        data(){
            return {
                title:'修改支付密码',
                isLeft: true,


                //验证码
                code: '',
                //旧密码
                oldPassword:'',
                //密码
                password: '',
                confirmPassword: '',
                //防止连点
                isPoint: false,
                //验证码提示
                text: '获得验证码',
                //定时器
                timer: '',

                newPhone:'',// 新的手机号



            }
        },
        components:{
            BaseNavbar,
        },
        methods:{
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
           * @Description
           * @author 李雪松
           * @date 2019/8/26
           */
          // 确认前验证
            /**
             * 提交之前验证
             * @private
             */
            confirmBeforeCheck() {

                if (this.code === '') {
                    this.$my_message('请输入验证码');
                    return;
                }
                if (this.password === '') {
                    this.$my_message('请输入新密码');
                    return;
                }

                if (this.password.length < 6) {
                    this.$my_message('密码不能少于6位');
                    return;
                }

                if (this.password !== this.confirmPassword) {
                    this.$my_message('两次密码不一致');
                    return;
                }

                // primaryPassword--旧密码
                // userId--用户id
                // msgCode--验证码
                // newPassword--新密码
                // againPassword--再新密码
                let data = {
                    primaryPassword: this.oldPassword,
                    userId: sessionStorage.getItem('userId'),
                    msgCode: this.code,
                    newPassword: this.password,
                    againPassword: this.confirmPassword
                };

                this.confirm(data);
            },
            confirm(params){
                console.log('shurude dongxi ',params)
                this.$FDPost('app/sc/my/replaceTradePassword',params).then(res=>{
                   if(res.status === 0){
                       this.$router.back(-1)
                       this.$my_message(res.msg)
                   }else {
                       this.$my_message(res.msg)
                   }
                })
            },
            /**
             * 发送验证码验证
             * @private
             */
            _verificationCode() {
                // let phoneCheck = /^1[3456789]\d{9}$/;


                let params= {
                    userName: sessionStorage.getItem('username')
                }
                this.$FDPost('app/sc/my/getPhone',params).then(res=>{
                    if(res.status ===0){
                        this.phone= res.data.phone
                        console.log(this.phone)
                        this._sendSMS(this.phone)
                    }else {
                        this.$my_message(res)
                    }
                })



            },

            /**
             * 发送验证码
             * @private
             */
             _sendSMS(phone) {


                if (this.isPoint) {
                    return;
                }
                let params = {
                    code: 'CN',
                    phone: phone
                };
                this.isPoint = true;
                this.$FDPost('app/sc/my/sendReplacePayPwdCode', params).then(res => {
                    console.log('sendSMS',res)
                    if (res.status === 0) {
                        this.$my_message(res.msg);
                        this._countdown();
                    } else {
                        this.$my_message(res.msg);
                        this.isPoint = false;
                    }
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
.top{
    margin-top: 4.5rem;
}

    .form {
        padding: 0 rem(39);

        .item {
            border-bottom: rem(1) solid #C6C5C5;

            label {
                display: block;
                padding-top: rem(35);
                font-size: rem(28);
                font-weight: bold;

            }

            .input {
                display: flex;
                height: rem(90);
                align-items: center;

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
                    background: #F2F2F2;
                }

                input {
                    flex: 1;
                    height: rem(48);
                    padding-left: rem(10);
                    font-size: rem(26);
                    background-color: transparent;
                    &.code {
                        width: rem(235);
                    }
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
            }
        }

        .go {
            display: flex;
            height: rem(50);
            padding: 0 rem(15);
            align-items: center;
            justify-content: space-between;

            span {
                font-size: rem(24);
                color: #7E7E7E;
            }
        }

        .submit {
            display: flex;
            width: 100%;
            height: rem(100);
            margin: 0 auto;
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
</style>