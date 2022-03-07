<template>
  <div class="page">
    <headers title="提现" :money="data.money"/>

    <div class="main">
      <div class="inputBox">
        <div class="money-cont">
          <span>￥</span>
          <input
            type="number"
            name="money"
            v-model="money"
            placeholder="请输入提现金额"
          />
        </div>
        <span class="tips">可用余额：{{ data.money }}元</span>
      </div>

      <div class="textBox">
        <p class="cash-type">提现银行</p>
        <div class="bank-info-box">
          <div class="leftBox">
            <img class="bank-info-icon" src="./images/sf/bank_icon.png" />
            <div class="bank-info-name">{{ bank.bank }}</div>
          </div>
          <div class="select-bank-card" @click="show = true" ref="add">
            更换
          </div>
        </div>
        <p class="pwd-tips">交易密码</p>
        <input
          type="password"
          class="pwd-input"
          step="0.01"
          name="money"
          v-model="passwd"
          placeholder="请输入交易密码"
        />
        <p class="forget-pwd" @click="handleForgetPassword">忘记密码？</p>
        <!-- <div class="cash-btn" @click="handleSubmit">立即提现</div> -->
        <div class="cash-tips-cont">
          <p class="cash-title">提现说明</p>
          <div v-if="footer1121 == 'n2'">
            <p>1.注册、签到、实名认证赠送的现金为系统福利</p>
            <p>2.投资500元，就会有500流水</p>
            <p>
              3.流水未达到1500元,账户上的系统福利不可提出，系统送的福利金额可参与投资<span
                >(您充值的本金可以随时提，不受流水影啊)</span
              >
            </p>
            <p>
              4.工作时间提现,9:00-23:00,都是即时到账，夜间提现,次日处理。因公司账户跨行转账,要具体根据您的银行卡到账时间为准,正常是两个小时内到账
            </p>
          </div>
          <div v-else>
            <p>
              工作时间提现,9:00-23:00,都是即时到账,夜间提现,次日处理。因公司账户跨行转账,要具体根据您的银行卡到账时间为准,正常是两个小时内到账
            </p>
          </div>
        </div>
      </div>
      <div class="cash-btn" @click="handleSubmit">立即提现</div>
    </div>
    <van-popup v-model="show" position="bottom" style="height: 60%">
      <bank-select :onChange="selected" />
    </van-popup>
  </div>
</template>

<script>
import headers from './components/header.vue'
import Vue from 'vue'
import Fetch from '../../utils/fetch'
import { Popup } from 'vant'
import select from './select'

Vue.use(Popup)

export default {
  name: 'index',
  components: {
    'bank-select': select,
    headers
  },
  data () {
    return {
      show: false,
      data: {},
      bank: {},
      bank_id: 0,
      money: '',
      passwd: '',
      footer1121: ''
    }
  },
  created () {
    this.$parent.footer(false)
  },
  mounted () {
    this.start()
    this.footer1121 = this.$parent.getFooterType()
    console.log('haha', this.footer1121)
  },
  methods: {
    start () {
      Fetch('/user/info').then(res => {
        this.data.money = res.data.money //res赋值
        // this.data.push(res.data)
        console.log('个人信息', this.data) //接口内容打印
      })

      Fetch('/user/cost_bank').then(res => {
        this.data = res.data
        this.bank = res.data.bank
        console.log('haha', this.bank)
      })

      // 先选择银行卡
      if (!this.bank.id && this.bank.id != 0) {
        this.$refs.add.click()
      }
    },
    handleSubmit () {
      if (!this.bank.id && this.bank.id != 0) {
        this.$notify('请选择提现银行卡')
        return
      }

      if (!this.money) {
        this.$notify('请输入提现金额')
        return
      }

      Fetch('/user/cost_apply', {
        money: this.money,
        bank_id: this.bank.id,
        passwd: this.passwd
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '提现申请成功'
        })

        this.$router.back()
      })
    },
    editCardNum (id) {
      if (!id) return ''
      const len = id.length
      const reLastNum = `${id.charAt(len - 1)}${id.charAt(len - 2)}${id.charAt(
        len - 3
      )}${id.charAt(len - 4)}`
      const newId = reLastNum.padEnd(len, '*').replace(/(.{4})/g, '$1 ')
      return newId
        .split('')
        .reverse()
        .join('')
    },
    selected (bank) {
      this.show = false
      this.bank = bank
    },
    // 忘记密码
    handleForgetPassword () {
      this.$router.push({ name: 'resetpaypwd' })
    }
  }
}
</script>

<style lang="less" scoped>
.textBox {
  background-color: #ffffff;
  border-radius: 13px 13px 0px 0px;
  margin-top: -13px;
  padding: 0 14px;
}

.inputBox {
  width: 348px;
  height: 130px;
  background: url('~@/assets/xinguang/充值中心_slices/矩形 5 拷贝 24@2x.png')
    no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 19px;
  margin-top: 28px;
  p {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #475673;
  }
}
.select-bank-card {
  font-size: 15px;
  font-weight: 500;
  color: #528fff;
}
.leftBox {
  display: flex;
}
.page {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  .cash-header {
    height: 147px;
    background-image: url('./images/sf/money_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    padding-top: 44px;
    color: #ffffff;
    position: relative;
    .title {
      font-size: 13px;
      font-weight: 500;
    }
    .money {
      font-size: 30px;
      font-family: DIN Alternate;
      font-weight: bold;
      margin-top: 17px;
    }
    .select-bank-card {
      position: absolute;
      top: 25px;
      right: 13px;
      padding: 7px 7px 7px 15px;
      font-size: 10px;
      font-weight: 500;
      color: #528fff;
      background-color: #fff;
      border-top-left-radius: 18px;
      border-bottom-left-radius: 18px;
    }
  }
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    margin-top: 50px;
    .money-cont {
      width: 100%;
      height: 55px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(53, 27, 0, 0.4);

      input {
        flex: 1 0;
        height: 100%;
        background: transparent;

        font-size: 20px;
        font-weight: 400;
        color: #351b00;
      }
      ::-moz-placeholder {
        color: rgba(53, 27, 0, 0.3);
        font-size: 23px;
      }
      ::-webkit-input-placeholder {
        color: rgba(53, 27, 0, 0.3);
        font-size: 23px;
      }
      :-ms-input-placeholder {
        color: rgba(53, 27, 0, 0.3);
        font-size: 23px;
      }
    }

    .tips {
      width: 100%;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #626364;
      margin-top: 15px;
    }
    .cash-btn {
      width: 285px;
      height: 49px;
      background: #E9C58C;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      position: fixed;
      bottom: 36px;

    }
    .cash-type,
    .pwd-tips {
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #000000;
      margin-top: 28px;
    }
    .cash-type {
      margin-top: 33px;
    }
    .bank-info-box {
      margin-top: 30px;
      width: 348px;
      height: 60px;
      background: #FFFFFF;
      border: 1px solid #E3E3E5;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 22px;
      .bank-info-icon {
        width: 20px;
        height: 15px;
      }
      .bank-info-name {
        margin-left: 18px;
        font-size: 15px;
        font-weight: 400;
        color: #2e2e2e;
      }
    }
    .pwd-input {
      margin-top: 30px;
      width: 348px;
      height: 60px;
      background: #FFFFFF;
      border: 1px solid #E3E3E5;
      border-radius: 7px;
      display: flex;
      align-items: center;
      padding: 0 22px;
    }
    .forget-pwd {
      width: 100%;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #E9C58C;
      text-align: right;
      margin-top: 13px;
      padding: 0 13px;
    }
    .cash-tips-cont {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 21px;
      margin-bottom: 120px;
      .cash-title {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3c455b;
        text-align: center;
      }
      div {
        margin-top: 19px;
        padding-bottom: 20px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #3c455b;
        line-height: 18px;
        opacity: 0.8;
        span {
          // color: #0F79FF;
        }
      }
    }
  }
}
</style>
