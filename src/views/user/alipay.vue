<template>
    <div class="mains">
        
		<!-- <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                支付宝设置
            </div>
        </div> -->
		<!-- <div style="text-align: center;" ><img class="logo" src="./images/alipay-top.jpg" alt=""></div> -->
        <div class="verify_wrap">
            <form class="form" @submit.prevent="handleSubmit">
                <div class="item">
                    <div class="left">
                        <!-- <img src="./images/people.png" /> -->
                        <span>姓名</span>
                    </div>
                    <input type="text" v-model.trim="data.name" :readonly="data.is_auth === 'Y'" placeholder="请输入您的姓名">
                </div>
                <div class="item">
                    <div class="left">
                        <!-- <img src="./images/people.png" /> -->
                        <span>支付宝账号</span>
                    </div>
                    <input type="text" v-model.trim="data.alipay" :readonly="ready" placeholder="请输入您的支付宝账号">
                </div>
                

                <!-- <div class="item" style="background-color: #ffffff;">
                    <span class="info"></span>
                    <input class="inp" type="text" name="name" v-model.trim="data.name" placeholder="请输入姓名" :readonly="data.is_auth === 'Y'">
                </div>
                <div class="item" style="background-color: #ffffff;">
                    <span class="info"></span>
                    <input class="inp" type="text" name="alipay" v-model.trim="data.alipay" placeholder="请输入支付宝账号" :readonly="data.is_alipay === 'Y'">
                </div> -->
               
                <div class="warming">绑定的支付宝必须与实名一致，否则将无法成功提现。</div>
            </form>
        </div>
        <div class="recharge-remark-box" style="margin:0 20px 20px;">
        <p>
            温馨提示：该绑定仅用于小额提现时系统自动转账到用户所需的支付宝账号；该绑定并非授权，不会自动扣费，请您放心使用。
        </p>
        </div>
         <!-- <button type="submit" class="btnhui" v-if="data.is_alipay !== 'N'">立即绑定</button> -->
         <button type="submit" class="btn" v-if="data.is_alipay == 'N'"  @click="bangding">立即绑定</button>

    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        components: {},
        data() {
            return {
                data: {},
                money_info: '',
                money: '',
                ready:true,
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.start();
        },
        methods: {
            bangding(){
                 Fetch("/user/set_alipay", {
                    ...this.data
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '操作成功'
                    });
                    this.$router.replace({
                        path: this.$router.history.current.query.redirect || "/info"
                    });
                })
            },

            start() {
                Fetch('/user/alipay').then(res => {
                    console.log('绑定',res.data)
                    this.data = res.data;
                    if(this.data.alipay){
                        this.ready = true
                    }else{
                        this.ready = false
                    }
                })

            },
            handleSubmit() {

                if (!this.data.name) {
                    this.$notify("请输入姓名");
                    return;
                }

                if (!this.data.alipay) {
                    this.$notify("请输入支付宝账号");
                    return;
                }

                Fetch("/user/set_alipay", {
                    ...this.data
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '操作成功'
                    });
                    this.$router.replace({
                        path: this.$router.history.current.query.redirect || "/info"
                    });
                })
            }
        }
    };
</script>

<style lang="less" scoped>
.btnhui{
    display: block;
        width: 351px;
        height: 43px;
        background: #cccccc;
        border-radius: 7px 7px 7px 7px;
        text-align: center;
        z-index: 1;
        margin: 0 auto;
        margin-bottom: 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
}
.item{
    background: #ffffff;
    // padding: 15px 14px 14px;
    height: 51px;
    padding-top: 18px;
    // padding-bottom: 16px;
    // padding: 21px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.14);
    display: flex;
    align-items: center;

    .left{
        width: 110px;
        // font-weight: 500;
        color: #000
        // display: flex;
        // align-items: center;
        // img{
        //     width: 16px;
        //     margin-right: 14px;
        // }
    }
    input{
        // width: 200px;
        // margin-left: 59px;
        // line-height: normal;
        // font-weight: 400;
        color: #A3A3A3;
    }
}
.recharge-remark-box {
  font-size: 13px;
  color: #989898;
  padding: 17px 15px;
  margin-bottom: 29px;
  border-radius: 7px;
  background: #DCE1FA;
  box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
  border-radius: 7px;
  .recharge-remark-title {
    font-size: 15px;
    font-weight: 400;
    color: #000000;
  }
  > p {
    margin-bottom: 10px;
    line-height: 20px;
  }
}
.mains{
background-color: #F5F4FA;
min-height: 100vh;
}
.logo {
        display: block;
        width: 100%;
        margin: 0 auto 14px auto;
    }

    .verify_wrap .form {
        display: block;
        width: 100%;
        padding-top: 13px;
    }

    .verify_wrap .form .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        border-bottom: 1px solid #EDEDED;
        font-size: 14px;
        padding: 6px 4.3% 6px 7.4%;
        // margin-bottom: 22px;
    }

    .verify_wrap .form .item .inp {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        text-align: right;
		padding-right:10px;
    }

    .verify_wrap .form .warming {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #D62C3A;
        padding: 19px 0 15px;
        text-align: center;
    }



    .verify_wrap .form .success_box {
        margin: 80px auto 40px auto;
    }

    .verify_wrap .form .success_box .ok {
        display: block;
        width: 68%;
        margin: 0 auto;
    }
    .btn {
        display: block;
        width: 351px;
        height: 43px;
        background: #023EFE;
        border-radius: 7px 7px 7px 7px;
       
        text-align: center;
        z-index: 1;
        margin: 0 auto;
        margin-bottom: 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
    }
</style>