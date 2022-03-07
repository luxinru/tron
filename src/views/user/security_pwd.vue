<template>
  <div class="page">
    <div class="main">
      <div class="item">
        <input
          type="password"
          v-model.trim="passwd"
          :placeholder="$t('old_security_password')"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model.trim="npasswd"
          :placeholder="$t('new_security_password')"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model.trim="snpasswd"
          :placeholder="$t('confrm_security_password')"
        />
      </div>
    </div>
    <div class="btn" @click="handleSubmit">
      <div class="kuai">
        <img src="@/assets/tron/长箭头2@2x.png" alt="" />
      </div>
      {{ $t('confrm') }}
    </div>
  </div>
</template>

<script>
// import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      passwd: '',
      npasswd: '',
      snpasswd: '',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    //this.start();
  },
  methods: {
    handleSubmit() {
      if (!this.passwd) {
        this.$notify(this.$t('please_enter_your_security_password'))
        return
      }

      if (!this.npasswd) {
        this.$notify(this.$t('new_password_cannot_be_blank'))
        return
      }

      if (!this.snpasswd) {
        this.$notify(this.$t('confirm_password_can_not_be_blank'))
        return
      }

      if (this.npasswd !== this.snpasswd) {
        this.$notify(this.$t('does_not_match'))
        return
      }

      // Fetch('/user/repasswd', {
      //   passwd: this.passwd,
      //   npasswd: this.npasswd
      // }).then(() => {
      //   this.$notify({
      //     background: '#07c160',
      //     message: this.$t('modified_successfully')
      //   })
      //   this.$router.back()
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100%;
  background-color: rgba(248, 248, 250, 1);
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  padding-top: 13px;
  // .header{
  //     position: relative;
  //     background-color: white;
  //     .back{
  //         position: absolute;
  //         width: 9px;
  //         height: 17px;
  //         top: 20px;
  //         left: 15px;
  //     }
  //     p{
  //         text-align: center;
  //         font-size: 17px;
  //         font-weight: bold;
  //         color: #000000;
  //         line-height: 57px;
  //     }
  // }
  .main {
    // box-sizing: border-box;
    // margin-top: 12px;
    padding: 0 13px;
    // font-size: 16px;
    // border-radius: 13px;
    // font-weight: 400;
    // color: #000000;
    .item {
      // padding: 21px 0;
      width: 100%;
      height: 45px;
      background: #ffffff;
      border-radius: 5px;
      border: 1px solid #cccccc;
      display: flex;
      align-items: center;
      margin-top: 15px;
      padding: 0 16px;
      .left {
        width: 110px;
        // font-weight: 500;
        color: #000;
        // display: flex;
        // align-items: center;
        // img{
        //     width: 14px;
        //     height: 17px;
        //     margin-right: 14px;
        // }
      }
      input {
        width: 100%;
        // margin-left: 44px;
        // line-height: normal;
        // font-weight: 400;
        // color: #a3a3a3;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8d8b98;
      }
    }
    // .new-psw-info{
    //     padding-bottom: 16px;
    //     padding-top: 18px;
    //     // padding: 15px;
    //     border-bottom: 1px solid rgba(0, 0, 0, 0.14);
    //     input{
    //         margin-left: 44px;
    //         line-height: normal;
    //     }
    // }
    // .confirm-psw-info{
    //     padding-bottom: 16px;
    //     padding-top: 18px;
    //     // padding: 15px;
    //     input{
    //         margin-left: 15px;
    //         line-height: normal;
    //     }
    // }
  }
  .btn {
    position: relative;
    width: calc(100% - 90px);
    height: 51px;
    margin: 24px auto;
    background-color: rgba(138, 7, 231, 1);
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #ffffff;
    padding: 0 30px 0 40px;
    box-sizing: border-box;

    .kuai {
      position: absolute;
      width: 37px;
      height: 37px;
      left: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
// .resetpaypwd_wrap .form {
//     display: block;
//     width: 92.8%;
//     margin: 0 auto;
//     padding-top: 15px;
// }

// .resetpaypwd_wrap .form .item {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-pack: justify;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     width: 100%;
//     position: relative;
//     height: 48px;
// }

// .resetpaypwd_wrap .form .item .info {
//     font-size: 15px;
//     color: #303442;
// }

// .resetpaypwd_wrap .form .item .inp {
//     font-size: 15px;
//     color: #303442;
//     text-align: right;
//     padding: 0 16px;
//     line-height: 17px;
// }

// .resetpaypwd_wrap .form .item:after {
//     position: absolute;
//     content: "";
//     width: 100%;
//     border-bottom: 1px solid #f3f3f3;
//     left: 0;
//     bottom: 0;
// }

// .resetpaypwd_wrap .form .forget_box {
//     width: 100%;
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-pack: end;
//     -ms-flex-pack: end;
//     justify-content: flex-end;
//     margin: 16px auto 26px auto;
// }

// .resetpaypwd_wrap .form .forget_box .forget {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
// }

// .resetpaypwd_wrap .form .forget_box .forget .icon {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     width: 18px;
//     height: 18px;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     -webkit-box-pack: center;
//     -ms-flex-pack: center;
//     justify-content: center;
//     font-size: 16px;
//     color: #fff;
//     background: #e9c37d;
//     border-radius: 18px;
//     margin-right: 6px;
// }

// .resetpaypwd_wrap .form .forget_box .forget .info {
//     font-size: 13px;
//     color: #303442;
// }

// .resetpaypwd_wrap .form .sbtn {
//     display: block;
//     width: 100%;
//     height: 42px;
//     line-height: 42px;
//     text-align: center;
//     background: #e8c27d;
//     border-radius: 2px;
//     font-size: 16px;
//     color: #fff;
//     -webkit-box-shadow: 0 2px 10px 0 #f2dbb2;
//     box-shadow: 0 2px 10px 0 #f2dbb2;
// }
</style>
