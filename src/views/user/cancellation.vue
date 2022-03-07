<template>
  <div class="main">
    <!-- <div class="bg" v-bind:style="{'background-image':bg}"></div>
        <router-link to="/login" class="back"></router-link> -->

    <form class="form" @submit.prevent="handleSubmit">
      <div class="info-cont">
        <div class="item">
          <!-- <img src="../../assets/icons/icon_3.png" class="icon-1"> -->
          <span class="left">手机号</span>
          <input
            class="right"
            v-model.trim="data.mobile"
            type="text"
            disabled="disabled"
          />
          <!-- <span class="right right_icon clear_icon"></span> -->
        </div>
        <!-- <div class="content clearfix">
					<span class="left_icon captcha_icon"></span>
					<input class="inp inp1" type="text" v-model.trim="data.image_code" placeholder="请输入验证码">
					<img class="right click_code image_code" :src="base64Image" @click="getCode"/>
				</div> -->
        <div class="item code-cont">
          <!-- <img src="../../assets/icons/icon_7.png" class="icon-2"> -->
          <span class="left">验证码</span>
          <div class="right-cont">
            <input
              class="right-left"
              v-model.trim="data.code"
              type="text"
              placeholder="请输入验证码"
            />
            <span class="right-right" @click="sendcode">
              <van-count-down :time="time" @finish="timeCall">
                <template v-slot="timeData" class="sendCode">{{
                  time > 0 ? timeData.seconds : '获取验证码'
                }}</template>
              </van-count-down>
            </span>
          </div>
        </div>
        <div class="item">
          <!-- <img src="../../assets/icons/icon_6.png" class="icon-3"> -->
          <span class="left">姓名</span>
          <input
            class="right"
            v-model.trim="data.name"
            type="input"
            placeholder="请输入您的姓名"
          />
          <!-- <span class="right right_icon show_icon" id="pwd_show"></span> -->
        </div>
        <div class="item">
          <!-- <img src="../../assets/icons/icon_5.png" class="icon-4"> -->
          <span class="left">身份证</span>
          <input
            class="right"
            v-model.trim="data.idcard"
            type="input"
            placeholder="请输入身份证号"
          />
          <!-- <span class="right right_icon show_icon" id="pwd2_show"></span> -->
        </div>
      </div>
      <div class="btn-cont">
        <button type="submit" class="btn" id="btn">确认</button>
      </div>
      <!--           <div class="content btn_content clearfix">
                <router-link to="/resetpaypwd"><button  class="btn" id="btn">去修改支付密码</button> </router-link> 
            </div> -->
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import Fetch from '../../utils/fetch'
import { CountDown } from 'vant'

Vue.use(CountDown)

export default {
  name: 'index',
  data () {
    return {
      bg: '',
      data: {
        mobile: ''
      },
      base64Image: '',
      time: 0,
      is_send: false
    }
  },
  created () {
    this.$parent.footer(false)
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      Fetch('/index/webconfig', { type: 'bg' }).then(res => {
        this.bg = 'url("' + res.data.forget + '")'
      })
      Fetch('/user/info').then(res => {
        this.data.mobile = res.data.mobile
        //console.log(this.data.mobile)
      })
    },
    timeCall () {
      this.is_send = false
      this.time = 0
    },
    sendcode () {
      if (this.is_send) {
        return
      }

      this.is_send = true
      Fetch('/index/cancellation_code', {
        type: 'cancellation'
      })
        .then(() => {
          this.time += 60 * 1000
          this.$notify({
            background: '#07c160',
            message: '发送成功'
          })
        })
        .catch(() => {
          this.is_send = false
        })
    },
    handleSubmit () {
      if (!this.data.name) {
        this.$notify('请输入姓名')
        return
      }

      if (!this.data.idcard) {
        this.$notify('请输入身份证号码')
        return
      }

      Fetch('/index/cancellation', {
        type: 'cancellation',
        name: this.data.name,
        idcard: this.data.idcard,
        code: this.data.code
      })
        .then(() => {
          this.$notify({
            background: '#07c160',
            message: '注销成功！10天缓和期后，系统自动处理注销！'
          })
        })
        .then(() => {
          this.$parent.setFooterType('n1')
          localStorage.removeItem('token')
          this.$router.replace('/login')
          /* this.$router.replace({
						path: this.$router.history.current.query.redirect || "/"
                    }); */
        })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100%;
  background-color: #f5f4fa;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  padding-top: 13px;
  .info-cont {
    padding: 0 12px;
    background-color: #ffffff;
    // border-radius: 13px;
    .item {
      display: flex;
      align-items: center;
      padding-top: 18px;
      padding-bottom: 16px;
      // padding: 21px 0;
      border-bottom: solid 1px rgba(0, 0, 0, 0.14);
      &:last-child {
        border-bottom: none;
      }
      .left {
        width: 110px;
        flex-shrink: 0;
        // font-weight: 500;
        color: #000;
      }
      .right {
        // font-weight: 400;
        color: #a3a3a3;
      }
      .right-cont {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        .right-left {
          width: 110px;
          // font-weight: 400;
          color: #fff;
        }
        .right-right {
          div {
            width: 90px;
            line-height: 30px;
            background-color: #0055fe;
            border-radius: 15px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
    .code-cont {
      padding: 14px 0;
    }
  }
  .btn {
    width: 299px;
    height: 45px;
    background: #E9C58C;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    margin-left: 38px;
    margin-top: 21px;
  }
}
// .main {
// 	background-color: #F4F5F7;
//     position: relative;
//     padding-top: 1px;
//     padding-bottom: 20px;
// 	height: 100%;
//     .image_code {
//         font-size: .4rem;
//         cursor: pointer;
//         border-radius: 10px;
//     }
// 	.header .head{
// 		position: fixed;
// 		top: 0;
// 		width: 100%;
// 		max-width: 750px;
// 		margin: 0 auto;
// 		z-index: 10;
// 		height: 50px;
// 		text-align: center;
// 		background-color: #F4F5F7;
// 		line-height: 50px;
// 		color: #000000;
// 		font-weight: 550;
// 		font-size: 5vw;
// 	}
//     .bg {
//         position: fixed;
//         z-index: 1;
//         top: 0;
//         bottom: 0;
//         right: 0;
//         left: 0;
//         background: no-repeat center;
//         background-size: cover;
//     }

//     .back {
//         display: inline-block;
//         width: 18px;
//         height: 18px;
//         background: url(../index/image/back.png) no-repeat center;
//         background-size: contain;
//         position: absolute;
//         top: 27px;
//         left: 20px;
//         z-index: 2;
//     }

//     .title {
//         width: 60%;
//         height: 62px;
//         color: #000000;
//         font-size: 26px;
//         line-height: 62px;
//         border-radius: 0 0 26px 26px;
//         position: relative;
//         z-index: 2;
//         margin: 0 auto;
//         background: #fff;
//         opacity: 0.5;
//         text-align: center;
//         margin-top: -1px;
//     }

//     .ssyse {
//         width: 92.8%;
// 		padding: 20px;
// 		background-color: #FFFFFF;
// 		box-shadow: 0 3px 15px #EEEFF2;
// 		border-radius: 2vw;
// 		position: relative;
// 		margin: 7% auto;
// 		z-index: 2;
// 	}

//     .form .content {
//         width: 100%;
//         border-bottom: 1px solid #F2F2F2;
//         -webkit-box-sizing: border-box;
//         box-sizing: border-box;
//         -webkit-box-align: center;
//         -ms-flex-align: center;
//         align-items: center;
//         padding: 6px 10px 38px 0px;
//         position: relative;
//         z-index: 4;
//         margin-bottom: 20px;
//     }

//     .form .content .left_icon {
//         float: left;
//         width: 18px;
//         height: 18px;
//         background-repeat: no-repeat;
//         background-size: contain;
//         background-position: center;
//     }

//     .form .content .phone_icon {
//         background-image: url(images/mobile.png);
//     }

//     .form .content .pwd_icon {
//         background-image: url(images/pwd.png);
//     }

//     .form .content .captcha_icon {
//         background-image: url(images/captcha.png);
//     }

//     .form .content .sms_icon {
//         background-image: url(images/sms.png);
//     }

//     .form .content .right {
//         float: right;
//     }

//     .form .content .right_icon {
//         display: inline-block;
//         width: 16px;
//         height: 16px;
//         background-repeat: no-repeat;
//         background-size: contain;
//         background-position: center;
//     }

//     .form .content .clear_icon {
//         background-image: url(images/clear.png);
//     }

//     .form .content .show_icon {
//         background-image: url(images/hidepwd.png);
//     }

//     .form .content .invite_icon {
//         background-image: url(images/invite.png);
//     }

//     .form .content .getsms {
//         display: inline-block;
//         width: 88px;
//         height: 28px;
//         line-height: 28px;
//         border-radius: 28px;
//         text-align: center;
//         background: #c0bfc8;
//         color: #464765;
//         font-size: 12px;

//         /deep/ .van-count-down{
//             line-height: 28px;
//         }
//     }

//     .form .content .captcha_img {
//         background-image: url(images/captcha_img.png);
//         display: inline-block;
//         width: 88px;
//         height: 28px;
//     }

//     .form .content .inp {
//         float: left;
//         padding: 0 8px;
//         font-size: 14px;
//         background: transparent;
//         color: #000000;
//     }

//     .form .content .inp1 {
//         width: 50%;
//     }

//     .form .content .inp2 {
//         width: 80%;
//     }

//     .form .btn_content {
//         border: none;

//         padding: 0;
//     }

//     .form .btn {
//         text-align: center;
//             width: 9.36rem;
//             height: 1.14667rem;
//             line-height: 1.14667rem;
//             margin-top: .32rem;
//             margin-left: .32rem;
//             //background: -webkit-linear-gradient(right,#ebd18f,#f4e5bd);
//             background: linear-gradient(-90deg,#ebd18f,#f4e5bd);
//             border-radius: .10667rem;
//             font-size: .42667rem;
//             font-weight: 500;
//             color: #6a532c;
//     }

//     @media (max-width: 360px) {
//         .form .content .getsms {
//             width: 74px;
//         }

//         .form .content .captcha_img {
//             width: 74px;
//         }
//     }
// }
</style>
