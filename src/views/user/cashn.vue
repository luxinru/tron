<template>
  <div class="page">
    <div class="cash-info-box">
      <div class="recharge-header-box">
        <div class="recharge-header">
          <div class="select-bank-card" @click="show = true" ref="add">
            选择银行卡
          </div>
          <img class="recharge-header-bg" src="./images/bg_2.png" />
          <div class="recharge-header-money">
            <img
              class="recharge-header-money-icon"
              src="./images/user/money.png"
            />
            <p style="padding-left:10px;">{{ data.money || 0 }}</p>
          </div>
          <div class="recharge-header-title">账户余额(元)</div>
        </div>
      </div>

      <div class="recharge-manner-box">
        <div class="transaction-password-box">
          <div class="recharge-title-box">提现金额</div>
          <div class="recharge-money-input">
            <span class="recharge-money-unit">￥</span>
            <input
              type="number"
              class="money-input"
              step="0.01"
              name="money"
              v-model="money"
              placeholder="请输入提现金额"
            />
          </div>
          <div class="recharge-title-box">提现到</div>
          <div class="bank-info-box" @click="show = true" ref="add">
            <div class="bank-info-left">
              <div class="bank-info-icon"></div>
              <div class="bank-info-name">{{ bank.bank }}</div>
            </div>
            <div class="bank-info-num">
              {{ editCardNum(bank.account) }}
            </div>
          </div>
          <div class="recharge-title-box">支付密码</div>
          <div class="password-input">
            <input
              type="password"
              class="money-input"
              step="0.01"
              name="money"
              v-model="passwd"
              placeholder="请输入支付密码"
            />
          </div>
          <div class="password-text">
            <!-- <div>最大可提现金额：{{data.value > data.min_cash_value ? data.money:(Number(data.money)-Number(data.system_gift)) > data.system_gift ?(Number(data.money)-Number(data.system_gift)):0}}</div> -->
            <div class="forget-password-btn" @click="handleForgetPassword">
              忘记密码？
            </div>
          </div>
          <div class="recharge-btn" @click="handleSubmit">立即提现</div>
        </div>

        <div class="recharge-remark-box">
          <p class="recharge-remark-title">提现说明</p>
          <p>1.注册、签到、实名认证赠送的现金为系统福利</p>
          <p>2.投资500元，就会有500流水</p>
          <p>
            3.流水未达到1500元,账户上的系统福利不可提出，系统送的福利金额可参与投资
            <span style="color: #F53C20;"></span>
          </p>
          <p>
            4.工作时间提现,10:00-22:00,都是即时到账，夜间提现,次日处理。因公司账户跨行转账,要具体根据您的银行卡到账时间为准,正常是两个小时内到账
          </p>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" style="height: 60%">
      <bank-select :onChange="selected" />
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import Fetch from '../../utils/fetch';
import { Popup, Dialog } from 'vant';
import select from './select';

Vue.use(Popup);

export default {
  name: 'index',
  components: {
    'bank-select': select,
  },
  data() {
    return {
      show: false,
      data: {},
      bank: {},
      bank_id: 0,
      money: '',
      passwd: '',
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
      Fetch('/user/cost_bank').then((res) => {
        this.data = res.data;
        this.bank = res.data.bank;
      });

      // 先选择银行卡
      if (!this.bank.id && this.bank.id != 0) {
        this.$refs.add.click();
      }
    },
    handleSubmit() {
      if (!this.bank.id && this.bank.id != 0) {
        this.$notify('请选择提现银行卡');
        return;
      }

      if (!this.money) {
        this.$notify('请输入提现金额');
        return;
      }

      Fetch('/user/cost_apply', {
        money: this.money,
        bank_id: this.bank.id,
        passwd: this.passwd,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '提现申请成功',
        });

        this.$router.back();
      });
    },
    editCardNum(id) {
      if (!id) return '';
      const len = id.length;
      const reLastNum = `${id.charAt(len - 1)}${id.charAt(len - 2)}${id.charAt(
        len - 3
      )}${id.charAt(len - 4)}`;
      const newId = reLastNum.padEnd(len, '*').replace(/(.{4})/g, '$1 ');
      return newId
        .split('')
        .reverse()
        .join('');
    },
    selected(bank) {
      this.show = false;
      this.bank = bank;
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ name: 'resetpaypwd' });
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100%;
  background-color: #f5f4fa;
  font-family: PingFang SC;
  .cash-info-box {
    .recharge-header-box {
      // padding: 30px 15px 15px;
      background-color: #f7f7f7;
      padding: 14px;
      .recharge-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 120px;
        font-size: 15px;
        color: #ffffff;
        border-radius: 12px;
        background: linear-gradient(-90deg, #00ca8f, #00d270);
        // background-size: 100%;
        // background-repeat: no-repeat;
        box-shadow: 0 0 0.34667rem 0 rgb(0 4 26 / 5%);
        position: relative;
        .recharge-header-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .recharge-header-title {
          position: absolute;
          top: 16px;
          left: 29px;
          color: #fff;
        }

        .select-bank-card {
          position: absolute;
          top: 25px;
          right: 0;
          padding: 7px 7px 7px 15px;
          font-size: 10px;
          font-weight: 500;
          color: #528fff;
          background-color: #fff;
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
          z-index: 10;
        }

        .recharge-header-money {
          font-size: 24px;
          font-weight: bold;
          padding-top: 40px;
          color: #fff;
          margin-top: 20px;
          display: flex;
          align-items: center;
          .recharge-header-money-icon {
            width: 27px;
            height: 27px;
          }
        }
      }
    }
    // .recharge-header-box {
    //   // padding: 10px 15px 15px;
    //   background-color: #fff;
    //   .recharge-header {
    //     position: relative;
    //     font-size: 15px;
    //     color: #ffffff;
    //     // background-image: url('./images/recharge-bg.png');
    //     background-size: 100%;
    //     background-repeat: no-repeat;
    //     // background: linear-gradient(180deg, rgba(215, 173, 112, 0.74) 26%, rgba(217, 169, 115, 0) 100%);
    //     // border-radius: 7px;
    //     padding-top: 40px;
    //     .recharge-header-title {
    //       padding-top: 25px;
    //     }
    //     .recharge-header-money {
    //       font-size: 28px;
    //       font-weight: bold;
    //       // margin-top: 15px;
    //     }
    //     .select-bank-card {
    //       position: absolute;
    //       top: 25px;
    //       right: 0;
    //       padding: 7px 7px 7px 15px;
    //       font-size: 10px;
    //       font-weight: 500;
    //       color: #528fff;
    //       background-color: #fff;
    //       border-top-left-radius: 18px;
    //       border-bottom-left-radius: 18px;
    //     }
    //   }
    // }

    // .recharge-money-input-box {
    //   width: 348px;
    //   height: 117px;
    //   background: #ffffff;
    //   box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
    //   border-radius: 7px;
    //   margin: 0 auto;
    //   padding-top: 35px;
    // }
    .recharge-title-box {
      display: flex;
      align-items: center;
      //   padding: 20px 13px 26px;
      // background-color: #F4F4F4;
      font-size: 15px;
      color: #333;
      //   font-weight: bold;
      margin-top: 20px;
      margin-bottom: 20px;
      .recharge-title-line {
        width: 3px;
        height: 10px;
        background-color: #434863;
        margin-right: 10px;
      }
    }
    .recharge-manner-box {
      padding: 0 14px 25px;
      // background-color: #fff;
      .bank-info-box {
        // width: 348px;
        height: 58px;
        background: #ffffff;
        // box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
        // border-radius: 7px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin-bottom: 20px;
        // margin-top: 27px;
        // padding: 0 30px;
        color: #000000;
        font-size: 15px;
        // position: relative;
        // top: 10px;
        border-bottom: solid 2px #f2f2f2;
        .bank-info-left {
          display: flex;
          align-items: center;
        }
        .bank-info-icon {
          width: 26px;
          height: 26px;
          background-image: url('./../../assets/images/cash/cash-2.png');
          background-size: cover;
          background-repeat: no-repeat;
          margin-right: 10px;
        }
      }
      .transaction-password-box {
        width: 348px;
        // height: 151px;
        // background: #FFFFFF;
        padding: 20px;
        box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
        border-radius: 7px;
        margin: 0 auto 10px;
        background-color: #fff;
        // .recharge-money-input-title {
        //   font-size: 15px;
        //   margin-bottom: 14px;
        // }
        .recharge-money-input {
          height: 55px;
          //   padding: 0 30px;
          text-align: center;
          background: #ffffff;
          position: relative;
          // box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
          // border-radius: 7px;
          .recharge-money-unit {
            position: absolute;
            left: 0;
            top: 15px;
            font-weight: bold;
            font-size: 23px;
          }
          .money-input {
            width: 100%;
            height: 100%;
            padding: 17px 30px;
            border-bottom: solid 2px #f2f2f2;
            text-align: left;
            font-size: 16px;
          }
        }
        .password-input {
          margin-bottom: 12px;
          text-align: center;
          > input {
            width: 100%;
            height: 41px;
            margin: 0 auto;
            font-size: 16px;
            // padding: 12px 15px;
            border-bottom: 1px solid #dedde0;
          }
        }
        .password-text {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          color: #999999;
          .forget-password-btn {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #737a84;
            margin-top: 6px;
          }
        }
      }
      .recharge-protocol-box {
        display: flex;
        align-items: center;
        padding: 14px 0 27px;
        font-size: 12px;
        color: #555763;
        .recharge-protocol-right {
          margin-left: 9px;
          font-size: 12px;
          color: #555763;
          .protocol-link {
            color: #50a5ff;
            cursor: pointer;
            margin-left: 5px;
          }
        }
      }
      .recharge-remark-box {
        width: 348px;
        /*height: 200px;*/
        background: #ffffff;
        box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
        border-radius: 7px;
        font-size: 13px;
        color: #989898;
        padding: 20px 15px;
        margin-bottom: 29px;
        // background: #F4F4F4;
        // border-radius: 7px;
        .recharge-remark-title {
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          margin-bottom: 10px;
        }
        > p {
          line-height: 20px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #989898;
        }
      }
      .recharge-btn {
        width: 300px;
        height: 40px;
        // background: linear-gradient(-90deg, #434863, #434863);
        background: #59bb4e;
        border-radius: 24px 24px 24px 24px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        margin: 12px 0 16px;
        margin: 10px auto 0;
      }
    }
    ::-moz-placeholder {
      color: #dcd9da;
      font-size: 19px;
    }
    ::-webkit-input-placeholder {
      color: #dcd9da;
      font-size: 19px;
    }
    :-ms-input-placeholder {
      color: #dcd9da;
      font-size: 19px;
    }
  }
  /*.cash-header-box {*/
  /*    height: 264px;*/
  /*    padding: 10px 13px;*/
  /*    background-color: #fff;*/
  /*}*/
  /*.bg{*/
  /*    display: flex;*/
  /*    justify-content: space-between;*/
  /*    align-items: flex-start;*/
  /*    .balance-info{*/
  /*        color: #fff;*/
  /*        margin-top: 23px;*/
  /*        margin-left: 13px;*/
  /*        font-size: 15px;*/
  /*        .money{*/
  /*            font-size: 28px;*/
  /*            font-weight: bold;*/
  /*            margin-top: 17px;*/
  /*        }*/
  /*    }*/
  /*    .select-bank-card{*/
  /*        margin-top: 19px;*/
  /*        padding: 11px 11px 11px 21px;*/
  /*        font-size: 13px;*/
  /*        font-weight: 500;*/
  /*        color: #50A5FF;*/
  /*        background-color: white;*/
  /*        border-top-left-radius: 18px;*/
  /*        border-bottom-left-radius: 18px;*/
  /*    }*/
  /*}*/
  /*.withdrawal{*/
  /*    margin-top: -70px;*/
  /*    width: 348px;*/
  /*    padding: 0 18px;*/
  /*    .recharge-money-input {*/
  /*        height: 55px;*/
  /*        padding: 0 30px;*/
  /*        margin-top: -30px;*/
  /*        text-align: center;*/
  /*        background: #FFFFFF;*/
  /*        box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);*/
  /*        border-radius: 7px;*/
  /*        .money-input {*/
  /*            width: 210px;*/
  /*            height: 100%;*/
  /*            padding: 17px 20px;*/
  /*        }*/
  /*        ::-moz-placeholder {*/
  /*            color: #DCD9DA;*/
  /*            font-size: 23px;*/
  /*        }*/
  /*        ::-webkit-input-placeholder {*/
  /*            color: #DCD9DA;*/
  /*            font-size: 23px;*/
  /*        }*/
  /*        :-ms-input-placeholder {*/
  /*            color: #DCD9DA;*/
  /*            font-size: 23px;*/
  /*        }*/
  /*    }*/
  /*    .money{*/
  /*        width: 171px;*/
  /*        font-size: 21px;*/
  /*        font-weight: bold;*/
  /*        margin-top: 39px;*/
  /*        margin-left: 88px;*/
  /*        line-height: normal;*/
  /*    }*/
  /*    .gray-line{*/
  /*        width: 214px;*/
  /*        height: 1px;*/
  /*        background: #000000;*/
  /*        opacity: 0.14;*/
  /*        margin-top: 21px;*/
  /*        margin-left: 67px;*/
  /*    }*/
  /*}*/
  /*.psw-cont{*/
  /*    margin-top: 14px;*/
  /*    margin-left: 13px;*/
  /*    margin-bottom: 12px;*/
  /*    width: 349px;*/
  /*    height: 61px;*/
  /*    background: #FFFFFF;*/
  /*    box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);*/
  /*    border-radius: 7px;*/
  /*    font-size: 15px;*/
  /*    font-weight: 400;*/
  /*    color: #000000;*/
  /*    display: flex;*/
  /*    align-items: center;*/
  /*    padding: 24px 20px 23px 22px;*/
  /*    .psw{*/
  /*        margin-left: 31px;*/
  /*        width: 130px;*/
  /*        line-height: normal;*/
  /*    }*/
  /*    img{*/
  /*        width: 13px;*/
  /*        height: 6px;*/
  /*        margin-left: 70px;*/
  /*    }*/
  /*}*/
  /*.forget{*/
  /*    float: right;*/
  /*    margin-right: 21px;*/
  /*    font-size: 13px;*/
  /*    font-weight: 400;*/
  /*    color: #3E8CFF;*/
  /*}*/
  /*.btn{*/
  /*    width: 351px;*/
  /*    height: 43px;*/
  /*    line-height: 43px;*/
  /*    text-align: center;*/
  /*    background: linear-gradient(90deg, #3D8BFF 1%, #52A9FF 100%);*/
  /*    border-radius: 7px;*/
  /*    margin-top: 43px;*/
  /*    margin-left: 12px;*/
  /*    font-weight: 400;*/
  /*    color: #FFFFFF;*/
  /*    font-size: 16px;*/
  /*}*/
}
// .forgetpay{
//     padding-bottom: 15px;
//     height: 30px;
//     .btn{
//         float: right;
//         font-size: 14px;
//         color: #00A0E9;
//     }
// }

// input::-webkit-input-placeholder { /* WebKit browsers */
//     color: #666666;
// }

// input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
//     color: #666666;
// }

// input::-moz-placeholder { /* Mozilla Firefox 19+ */
//     color: #666666;
// }

// input:-ms-input-placeholder { /* Internet Explorer 10+ */
//     color: #666666;
// }

// .withdraw_wrap .form {
//     display: block;
//     width: 94%;
//     margin: 0 auto;
// }

// .withdraw_wrap .form .bank_box {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     width: 100%;
//     height: 80px;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     -webkit-box-pack: justify;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     padding: 0 12px 0 24px;
//     background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
//     background-image: -o-linear-gradient(left, #666666, #262627);
//     background-image: linear-gradient(to right, #666666, #262627);
//     margin: 22px auto 34px auto;
//     -webkit-box-shadow: 0 1px 6px 0 #7d7c7c;
//     box-shadow: 0 1px 6px 0 #7d7c7c;
// }

// .withdraw_wrap .form .bank_box .left .left_bank_name {
//     color: #efeff4;
//     font-size: 16px;
//     margin-bottom: 8px;
// }

// .withdraw_wrap .form .bank_box .left .left_bank_number {
//     color: #efeff4;
//     font-size: 14px;
// }

// .withdraw_wrap .form .bank_box .right {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
// }

// .withdraw_wrap .form .bank_box .right .right_bank_name {
//     font-size: 12px;
//     color: #f3b467;
//     margin-right: 18px;
// }

// .withdraw_wrap .form .bank_box .right .right_arrow {
//     display: inline-block;
//     width: 8px;
//     height: 16px;
//     background-image: url(./images/right_arrow.svg);
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
// }

// .withdraw_wrap .form .withdraw_warming {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-align: start;
//     -ms-flex-align: start;
//     align-items: flex-start;
//     -webkit-box-pack: justify;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     color: #212121;
// }

// .withdraw_wrap .form .withdraw_warming .left {
//     font-size: 15px;
//     white-space: nowrap;
//     margin-right: 16px;
//     line-height: 18px;
// }

// .withdraw_wrap .form .withdraw_warming .right {
//     font-size: 12px;
//     white-space: pre-wrap;
//     line-height: 22px;
//     text-align: right;
// }

// .withdraw_wrap .form .money_box {
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     width: 100%;
//     overflow: hidden;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     margin: 20px auto 36px auto;
// }

// .withdraw_wrap .form .money_box .rmb {
//     font-size: 43px;
//     color: #212121;
// }

// .withdraw_wrap .form .money_box .inp_money {
//     -webkit-box-flex: 1;
//     -ms-flex: 1 1 auto;
//     flex: 1 1 auto;
//     font-size: 36px;
//     color: #f3b467;
//     padding: 0 10px;
//     line-height: 40px;
// }

// .withdraw_wrap .form .remain_money {
//     font-size: 15px;
//     color: #212121;
// }

// .withdraw_wrap .form .remain_money .money {
//     color: #f3b467;
// }

// .withdraw_wrap .form .pay_box {
//     width: 100%;
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-pack: justify;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     height: 46px;
//     padding: 0 14px 0 12px;
//     margin: 15px auto;
//     -webkit-box-shadow: 0 1px 8px 0 #F1F1F1;
//     box-shadow: 0 1px 8px 0 #F1F1F1;
//     border-radius: 2px;
// }

// .withdraw_wrap .form .pay_box .left_icon {
//     -webkit-box-flex: 0;
//     -ms-flex: 0 0 18px;
//     flex: 0 0 18px;
//     height: 20px;
//     background-image: url(./images/password.svg);
//     background-repeat: no-repeat;
//     background-size: contain;
//     background-position: center;
// }

// .withdraw_wrap .form .pay_box .right_icon {
//     -webkit-box-flex: 0;
//     -ms-flex: 0 0 20px;
//     flex: 0 0 20px;
//     height: 20px;
//     background-image: url(./images/eye_close.svg);
//     background-repeat: no-repeat;
//     background-size: contain;
//     background-position: center;
// }

// .withdraw_wrap .form .pay_box .right_icon.right_icon_open {
//     background-image: url(./images/eye_open.svg);
// }

// .withdraw_wrap .form .pay_box .inp_pay {
//     -webkit-box-flex: 1;
//     -ms-flex: 1 1 auto;
//     flex: 1 1 auto;
//     padding: 0 10px;
//     font-size: 14px;
//     line-height: 14px;
//     color: #212121;
// }

// .withdraw_wrap .form .sbtn {
//     display: block;
//     width: 100%;
//     height: 42px;
//     line-height: 42px;
//     text-align: center;
//     background: #e8c27d;
//     border-radius: 2px;
//     font-size: 18px;
//     color: #fff;
// }

// .withdraw_wrap .form .withdraw_tip {
//     font-size: 12px;
//     color: #212121;
//     opacity: .5;
//     line-height: 1.7;
//     margin-top: 16px;
// }
</style>
