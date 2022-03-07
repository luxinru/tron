<template>
  <div class="main">
    <img src="@/views/user/images/sf/back.png" class="back" @click="$router.back()" />
    <div class="forget-cont">
      <div class="title">修改密码</div>
      <div class="item">
        <!-- <div class="left">手机号码</div> -->
        <img src="@/assets/xinguang/登录_slices/24gf-phoneBubble@2x.png" />
        <input
          class="right"
          v-model.trim="data.mobile"
          type="text"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="item">
        <!-- <div class="left">密码</div> -->
        <img src="@/assets/xinguang/登录_slices/密码（开） (1)@2x.png" />
        <input
          class="right"
          v-model.trim="data.passwd"
          type="password"
          placeholder="请输入登录密码"
        />
        <!-- <input class="right" v-model.trim="data.npasswd" type="password" placeholder="请再次输入"> -->
      </div>
      <div class="item">
        <!-- <div class="left">密码</div> -->
        <img src="@/assets/xinguang/登录_slices/密码（开） (1)@2x.png" />
        <!-- <input class="right" v-model.trim="data.passwd" type="password" placeholder="请输入密码"> -->
        <input
          class="right"
          v-model.trim="data.npasswd"
          type="password"
          placeholder="请确认登录密码"
        />
      </div>
      <!-- <div class="item">
                <div class="left">确认密码</div>
                <input class="right" v-model.trim="data.npasswd" type="password" placeholder="请再次确认密码">
            </div> -->
      <div class="item">
        <!-- <div class="left">验证码</div> -->
        <img src="@/assets/xinguang/注册_slices/验证码 (1)@2x.png" />
        <input
          v-model.trim="data.code"
          type="text"
          placeholder="请输入验证码"
        />
        <van-count-down class="code-btn" :time="time" @finish="timeCall">
          <template v-slot="timeData">{{
            time > 0 ? timeData.seconds : "发送验证码"
          }}</template>
        </van-count-down>
      </div>

      <div class="submit-btn" @click="handleSubmit">立即修改</div>
    </div>
    
    <!-- <span class="change-pwd">修改密码</span> -->
    <!-- <div class="login-cont">
            <div class="item"> -->
    <!-- <div class="left">手机号码</div> -->
    <!-- <input class="right" v-model.trim="data.mobile" type="text" placeholder="请输入手机号">
            </div>
            <div class="item"> -->
    <!-- <div class="left">新的密码</div> -->
    <!-- <input class="right" v-model.trim="data.passwd" type="password" placeholder="密码为6-16位字母和数字组合">
            </div>
            <div class="item"> -->
    <!-- <div class="left">确认密码</div> -->
    <!-- <input class="right" v-model.trim="data.npasswd" type="password" placeholder="请再次输入">
            </div>
            <div class="item"> -->
    <!-- <div class="left">验证码</div> -->
    <!-- <div class="right-cont">
                    <input class="right-left" v-model.trim="data.code" type="text" placeholder="请输入验证码">
                    <span class="right-right" @click="sendcode">
                        <van-count-down :time="time" @finish="timeCall">
                            <template v-slot="timeData">{{time > 0 ? timeData.seconds : '获取验证码'}}</template>
                        </van-count-down>
                    </span>
                </div>
            </div>
            <div class="submit-btn" @click="handleSubmit">确认修改</div>
        </div> -->
    <!-- <div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        修改密码
		    </div>
		</div>
        <div class="bg" v-bind:style="{'background-image':bg}"></div>
        <router-link to="/login" class="back"></router-link>
        <div class="title"></div>

        <form class="form" @submit.prevent="handleSubmit">
            <div class="content clearfix">
                <span class="left_icon phone_icon"></span>
                <input class="inp" v-model.trim="data.mobile" type="text" placeholder="请输入手机号码"> -->
    <!-- <span class="right right_icon clear_icon"></span> -->
    <!-- </div> -->
    <!-- <div class="content clearfix">
                <span class="left_icon captcha_icon"></span>
                <input class="inp inp1" type="text" v-model.trim="data.image_code" placeholder="请输入验证码">
                <img class="right click_code image_code" :src="base64Image" @click="getCode"/>
            </div> -->
    <!-- <div class="content clearfix">
                <span class="left_icon sms_icon"></span>
                <input class="inp inp1" v-model.trim="data.code" type="text" placeholder="输入短信验证码">
                <span class="right getsms" @click="sendcode">
                    <van-count-down :time="time" @finish="timeCall">
                        <template v-slot="timeData" class="sendCode">{{time > 0 ? timeData.seconds : '获取验证码'}}</template>
                    </van-count-down>
                </span>
            </div>
            <div class="content clearfix">
                <span class="left_icon pwd_icon"></span>
                <input class="inp" v-model.trim="data.passwd" type="password" placeholder="新密码">
                <span class="right right_icon show_icon" id="pwd_show"></span>
            </div>
            <div class="content clearfix">
                <span class="left_icon pwd_icon"></span>
                <input class="inp" v-model.trim="data.npasswd" type="password" placeholder="确认新密码">
                <span class="right right_icon show_icon" id="pwd2_show"></span>
            </div>
            <div class="content btn_content clearfix">
                <button type="submit" class="btn" id="btn">确认修改</button>
            </div> -->
    <!--           <div class="content btn_content clearfix">
                <router-link to="/resetpaypwd"><button  class="btn" id="btn">去修改支付密码</button> </router-link> 
            </div> -->
    <!-- </form> -->
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { CountDown } from "vant";

Vue.use(CountDown);

export default {
  name: "index",
  data() {
    return {
      bg: "",
      data: {},
      base64Image: "",
      time: 0,
      is_send: false,
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/webconfig", { type: "bg" }).then((res) => {
        this.bg = 'url("' + res.data.forget + '")';
      });
    },
    timeCall() {
      this.is_send = false;
      this.time = 0;
    },
    sendcode() {
      if (this.is_send) {
        return;
      }

      if (!this.data.mobile) {
        this.$notify("请输入手机号");
        return;
      }

      this.is_send = true;
      Fetch("/index/code", {
        type: "forgetpwd",
        mobile: this.data.mobile,
      })
        .then(() => {
          this.time += 60 * 1000;
          this.$notify({
            background: "#07c160",
            message: "发送成功",
          });
        })
        .catch(() => {
          this.is_send = false;
        });
    },
    handleSubmit() {
      if (!this.data.mobile) {
        this.$notify("请输入您的手机号");
        return;
      }

      if (!this.data.passwd) {
        this.$notify("请输入新密码");
        return;
      }

      if (this.data.passwd !== this.data.npasswd) {
        this.$notify("两次密码不一致");
        return;
      }

      Fetch("/index/forgetpwd", {
        type: "forgetpwd",
        phone: this.data.mobile,
        password: this.data.passwd,
        code: this.data.code,
      })
        .then(() => {
          this.$notify({
            background: "#07c160",
            message: "修改成功",
          });
        })
        .then(() => {
          this.$router.replace({
            path: this.$router.history.current.query.redirect || "/",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: rgba(233, 197, 140, 1);
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  .back {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 8px;
    height: 15px;
    // margin-top: 32px;
  }
  .forget-cont {
    width: 319px;
    height: 396px;
    background: #ffffff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 106px;

    .title {
      margin-top: 33px;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }
    .item {
      margin-top: 36px;
      display: flex;
      align-items: center;
      height: 21px;
      width: 100%;
      padding: 0 24px;
      img {
        width: 21px;
        height: 21px;
        margin-right: 13px;
        flex-shrink: 0;
      }
      input {
        flex: 1 0;
        font-size: 16px;
        font-weight: 500;
        color: #c4c5d1;
        background-color: transparent;
      }
      .code-btn {
        width: 80px;
        font-size: 15px;
        font-weight: 500;
        text-decoration: underline;
        color: #CBA667;
      }
    }
  }
  .submit-btn {
    width: 272px;
    height: 45px;
    background: #E9C58C;
    border-radius: 23px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 37px;
  }
  // .change-pwd{
  //     font-weight: bold;
  //     color: #000000;
  //     position: relative;
  //     left: 15px;
  //     top: 57px;
  //     &::after{
  //         content: ' ';
  //         width: 8px;
  //         height: 4px;
  //         position: absolute;
  //         background: #EFC969;
  //         border-radius: 2px;
  //         left: 50%;
  //         transform: translateX(-50%);
  //         top: 22px;
  //     }
  // }
  // .login-cont{
  //     // position: relative;
  //     // z-index: 1;
  //     // width: 348px;
  //     // height: 316px;
  //     // margin-left: 13px;
  //     // padding: 18px 15px 0;
  //     background-color: #fff;
  //     // margin-top: 81px;
  //     // box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
  //     // border-radius: 13px;
  //     // padding: 0 26px;
  //     margin-top: 88px;
  //     padding: 0 15px;
  //     .item{
  //         padding-top: 33px;
  //         padding-bottom: 13px;
  //         display: flex;
  //         font-size: 13px;
  //         font-weight: 400;
  //         color: #2E2F31;
  //         border-bottom: 1px solid #E4E4E4;
  //         height: 59px;
  //         // align-items: center;
  //         .left{
  //             width: 80px;
  //             flex-shrink: 0;
  //         }
  //         .right-cont{
  //             width: 100%;
  //             display: flex;
  //             justify-content: space-between;
  //             align-items: center;
  //             .right-left{
  //                 width: 100px;
  //             }
  //             .right-right{
  //                 // background: linear-gradient(90deg, #3D8BFF 1%, #52A9FF 100%);
  //                 // height: 26px;
  //                 // width: 94px;
  //                 // text-align: center;
  //                 // box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
  //                 // border-radius: 13px;
  //                 // font-size: 12px;
  //                 // font-weight: 500;
  //                 div{
  //                     // line-height: 26px;
  //                     color: #EFC969;
  //                 }
  //             }
  //         }
  //     }
  //     .submit-btn{
  //         width: 348px;
  //         height: 43px;
  //         background: linear-gradient(-90deg, #EAD190 0%, #F3E4BC 100%);
  //         border-radius: 4px;
  //         // width: 303px;
  //         // height: 43px;
  //         // background: linear-gradient(90deg, #3D8BFF 1%, #52A9FF 100%);
  //         // border-radius: 22px;
  //         font-size: 16px;
  //         font-weight: 500;
  //         // color: #FFFFFF;
  //         color: #6A532C;
  //         line-height: 43px;
  //         text-align: center;
  //         margin-top: 17px;
  //     }
  // }
}
</style>


