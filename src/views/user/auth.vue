<template>
  <div class="page">
    <!-- <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                实名认证
            </div>
        </div>
        <div class="verify_wrap">
            <form class="form" @submit.prevent="handleSubmit">
                <div class="item">
                    <span class="info">姓名</span>
                    <input class="inp" type="text" name="name" v-model.trim="data.name" placeholder="请输入姓名"
                           :readonly="data.is_auth === 'Y'">
                </div>
                <div class="item">
                    <span class="info">身份证号码</span>
                    <input class="inp" type="text" name="idcard" v-model.trim="data.idcard" placeholder="请输入身份证号"
                           :readonly="data.is_auth === 'Y'">
                </div>
                <button type="submit" class="btn" v-if="data.is_auth === 'N'">立即认证</button>
                <div class="warming">提醒：请您绑定本人真实姓名与身份证号码，若使用他人姓名绑定导致无法提现等问题，本公司概不负责。</div>
                <div class="success_box">
                    <img class="ok" src="./images/ok.svg" alt="">
                </div>
            </form>
        </div> -->

    <!-- <div class="header">
            <img src="../../assets/icons/back_black.png" @click="$router.back()" class="back">
            <p>实名认证</p>
        </div> -->
    <form class="form" @submit.prevent="handleSubmit">
      <div class="main">
        <div class="item">
          <div class="left">
            <!-- <img src="./images/people.png" /> -->
            <span>姓名</span>
          </div>
          <input
            type="text"
            v-model.trim="data.name"
            :readonly="data.is_auth === 'Y'"
            placeholder="请输入您的姓名"
          />
        </div>
        <div class="item">
          <div class="left">
            <!-- <img src="./images/idcard.png" /> -->
            <span>身份证号</span>
          </div>
          <input
            type="text"
            v-model.trim="data.idcard"
            :readonly="data.is_auth === 'Y'"
            placeholder="请输入身份证号"
          />
        </div>
      </div>
      <button type="submit" class="btn" v-if="data.is_auth === 'N'">
        立即认证
      </button>
      <!-- v-if="data.is_auth === 'N'" -->
    </form>
    <div v-if="data.is_auth === 'N'" class="tips">
      温馨提示：请您使用本人真实姓名和证件号码，若使用第三者信息绑定导致无法提现等问题，博越概不负责。博越承诺严格按照《隐私政策》及国家相关法律法规，严格保护用户信息安全，请您放心使用。
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      data: {},
      money_info: '',
      money: ''
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
      Fetch('/user/check_auth').then(res => {
        this.data = res.data
      })
    },
    handleSubmit () {
      if (!this.data.name) {
        this.$notify('请输入姓名')
        return
      }

      if (!this.data.idcard) {
        this.$notify('请输入身份证号')
        return
      }

      Fetch('/user/auth', {
        ...this.data
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '认证成功'
        })
        this.$router.replace({
          path: this.$router.history.current.query.redirect || '/mission'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100%;
  background-color: #f5f4fa;
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
    background-color: white;
    padding: 0 12px;
    // font-size: 16px;
    // border-radius: 13px;
    // font-weight: 400;
    // color: #000000;
    .item {
      // padding: 15px 14px 14px;
      padding-top: 18px;
      padding-bottom: 16px;
      // padding: 21px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.14);
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      .left {
        width: 110px;
        // font-weight: 500;
        color: #000;
        // display: flex;
        // align-items: center;
        // img{
        //     width: 16px;
        //     margin-right: 14px;
        // }
      }
      input {
        // width: 200px;
        // margin-left: 59px;
        // line-height: normal;
        // font-weight: 400;
        color: #a3a3a3;
      }
    }
    // .idcard-info{
    //     padding: 14px 14px 16px;
    //     border-bottom: 1px solid rgba(0, 0, 0, 0.14);
    //     input{
    //         width: 200px;
    //         margin-left: 29px;
    //         line-height: normal;
    //     }
    // }
  }
  .btn {
    width: 299px;
    height: 45px;
    background: #E9C58C;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px auto 0;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
  .tips{
      width: 346px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #C2C2C2;
      line-height: 18px;
      margin: 16px auto 0;
  }
}

// .verify_wrap .form {
//     display: block;
//     width: 100%;
//     padding-top: 46px;
// }

// .verify_wrap .form .item {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     -webkit-box-pack: justify;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     border-bottom: 1px solid #EDEDED;
//     font-size: 14px;
//     padding: 6px 4.3% 6px 7.4%;
//     margin-bottom: 22px;
// }

// .verify_wrap .form .item .inp {
//     -webkit-box-flex: 1;
//     -ms-flex: 1 1 auto;
//     flex: 1 1 auto;
//     text-align: right;
// }

// .verify_wrap .form .warming {
//     font-size: 12px;
//     line-height: 1.7;
//     color: #F01516;
//     padding: 0 7.4%;
// }

// .verify_wrap .form .btn {
//     display: block;
//     width: 60%;
//     height: 36px;
//     line-height: 36px;
//     color: #333333;
//     text-align: center;
//     border-radius: 36px;
//     background: #e8c27d;
//     font-size: 18px;
//     z-index: 1;
//     margin: 0 auto;
//     margin-bottom: 20px;
// }

// .verify_wrap .form .success_box {
//     margin: 80px auto 40px auto;
// }

// .verify_wrap .form .success_box .ok {
//     display: block;
//     width: 68%;
//     margin: 0 auto;
// }
</style>
