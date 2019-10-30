/**
* @desc  激活
* @author JZ
* @date 2019/3/8
* @version 1.0
*/
<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BaseButton from '@c/BaseButton/index';
    import BaseInput from '@c/BaseInput/index';

    export default {
        name: "Activation",
        components: {
            BaseNavbar,
            BaseButton,
            BaseInput
        },
        data() {
            return {
                //可售鱼条数
                sellNum: 0,
                //解封账号
                account: '',
                //二级密码
                password: '',
                //是否开启数字验证
                isNumber: true,
                //防止连点
                isPoint: false
            };
        },
        mounted() {
            this.$store.dispatch('GetRedeemData').then(re => {
                this.sellNum = re.af;
            });
        },
        methods: {
            /**
             * 提交前验证
             * @private
             */
            _submitCheck() {
                let myreg = /^1[3456789]\d{9}$/;
                if (this.account === '') {
                    this.$my_message('请输入您需要激活的手机号码');
                    return;
                }
                if (!myreg.test(this.account)) {
                    this.$my_message('需要激活的手机号码不合法，请重新输入');
                    return;
                }
                if (this.password === '') {
                    this.$my_message('请输入您的二级密码');
                    return;
                }
                if (this.password.length < 6) {
                    this.$my_message('请输入6位二级密码');
                    return;
                }
                let params = {
                    // userId: sessionStorage.getItem('userId'),
                    phone: this.account,
                    password: this.password
                };
                this._submit(params);
            },
            /**
             *
             * @param params
             * @private
             */
            _submit(params) {
                if (this.isPoint) {
                    return;
                }
                this.isPoint = true;
                this.$FDPost('activationAccount', params).then(re => {
                    this.isPoint = false;
                    if (re.status === 0) {
                        this.$my_message(`用户${this.account}账户激活成功`);
                        this.$router.back(-1);
                    } else {
                        this.$my_message(re.msg);
                    }
                }).catch(() => {
                    this.isPoint = false;
                });
            }
        }
    };
</script>

<template>
    <div class="unsealing">
        <BaseNavbar title="会员激活"></BaseNavbar>
        <div class="wrapper">
<!--            <div class="item distinguish">-->
<!--                <span>可售鱼</span>-->
<!--                <span>{{sellNum}}条</span>-->
<!--            </div>-->
            <div class="item">
                <BaseInput id="account" name="会员账号" type="tel" :isNumber="isNumber" v-model="account" maxlength="11"
                           placeholder="请输入您需要激活的手机号码"></BaseInput>
            </div>
            <div class="item">
                <BaseInput id="password" name="二级密码" type="password" :isNumber="isNumber" v-model="password"
                           maxlength="6" placeholder="请输入您的二级密码"></BaseInput>
            </div>
            <div class="button">
                <BaseButton text="提交" @btn="_submitCheck"></BaseButton>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .unsealing {
        padding-top: rem(90);

        .wrapper {
            .item {
                height: rem(97);
                padding: 0 rem(42);
                margin-bottom: rem(2);
                background-color: #FFFFFF;

                &.distinguish {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                &:nth-child(2) {
                    margin-bottom: rem(10);
                }

                span {
                    font-size: rem(36);
                    color: $fontColor;
                }
            }

            .button {
                margin: rem(206) rem(74);
            }
        }
    }
</style>
