<template>
  <div class="recharge-centre-container">
    <!-- <headers title="充值详请" :money="money" /> -->
    <div class="header_box">
      <div class="header">
        <van-icon color="#fff" name="arrow-left" @click="$router.back()" />
        充值详请
        <span></span>
      </div>
    </div>
    <div class="money-cont">
      <span class="title">账户余额(元)</span>
      <span class="money">{{ money }}</span>
    </div>
    <div class="main">
      <div class="recharge-centre-info-form-box">
        <div class="info-form-item infoBox">
          <div class="info-form-item-left">收款银行</div>
          <div class=" infoRight">
            <div>{{ bank_name }}</div>
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">收款人</div>
          <div class="info-form-item-right rightFlex">
            <div
              class="copy-cont"
              v-clipboard="() => bank_user"
              v-clipboard:success="copy"
            >
              <img src="./images/sf/copy.png" />
              <span class="copyText">复制</span>
            </div>
            <span class="fontcolor">{{ bank_user }}</span>
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">收款账号</div>
          <div class="info-form-item-right">
            <span>{{ bank_card }}</span>
            <div
              class="copy-cont"
              v-clipboard="() => bank_card"
              v-clipboard:success="copy"
            >
              <img src="./images/sf/copy.png" />
              <span class="copyText">复制</span>
            </div>
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">付款人</div>
          <div class="info-form-item-right">
            <input
              type="text"
              class="remark-input"
              v-model="pay_user"
              placeholder="请输入付款人"
            />
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">转账附言</div>
          <div class="info-form-item-right">
            <input
              type="text"
              class="remark-input"
              v-model="pay_remark"
              placeholder="请输入转账附言"
            />
          </div>
        </div>
        <div class="precautions-text">
          注意:请复制上面专属账号,打开您的网银或手机银行进行转账汇款!
        </div>
      </div>
      <div class="info-form-btn" @click="submit">确认</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Button } from 'vant'
import Fetch from '../../utils/fetch'
import Clipboard from 'v-clipboard'
Vue.use(NavBar)
  .use(Button)
  .use(Clipboard)
export default {
  components: {},
  data () {
    return {
      bank_name: '',
      bank_user: '',
      bank_card: '',
      bank_remark: '',
      pay_user: '',
      pay_remark: '',
      money: 0,
      rid: 0
    }
  },
  mounted () {
    this.money = this.$route.query.money
    this.getData()
  },
  methods: {
    onClickLeft () {
      this.$router.replace('/recharge')
    },
    copy () {
      this.$notify({
        background: '#07c160',
        message: '复制成功'
      })
    },
    submit () {
      Fetch('/user/bank_apply', {
        money: this.money,
        remark: this.pay_remark,
        name: this.pay_user,
        rid: this.rid
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '提交成功'
        })
        this.$router.push('/user').catch(err => {})
      })
    },
    getData () {
      Fetch('/user/recharge_type', {
        type: this.$route.query.type,
        money: this.$route.query.money
      }).then(res => {
        this.bank_user = res.data.bank_user
        this.bank_card = res.data.bank_card
        this.bank_name = res.data.bank_name
        this.bank_remark = res.data.bank_remark
        this.rid = res.data.rid
      })
    }
  }
}
</script>
<style lang="less" scoped>
.fontcolor {
  margin-right: 10px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #767676;
}
.recharge-centre-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(247, 246, 246, 1);
  overflow: scroll;
  .header_box {
    position: relative;
    width: 100%;
    height: 208px;
    background: url('~@/assets/xinguang/充值详情_slices/形状 1 拷贝.png') no-repeat;
    background-size: 100% 100%;
    .header {
      position: absolute;
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }
  .money-cont {
    width: 348px;
    height: 147px;
    background: #FFFFFF;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -120px auto 0;
    .title {
      font-size: 15px;
      font-weight: 500;
      color: #3A3D46;
    }
    .money {
      font-size: 43px;
      font-weight: bold;
      color: #3A3D46;
      margin-top: 20px;
    }
  }
  .main {
    margin-top: 16pxpx;
    background-color: #f5f5f5;
    padding: 13px;
    .recharge-centre-info-form-box {
      background-color: #ffffff;
      border-radius: 13px;
      padding: 0 20px;
      .info-form-item {
        padding: 18px 0;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #e9eaec;
        .info-form-item-left {
          font-size: 14px;
          font-weight: 400;
          color: #848486;
          width: 90px;
          flex-shrink: 0;
        }
        .info-form-item-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          width: 100%;
          .copy-cont {
            display: flex;
            align-items: center;
            img {
              width: 14px;
              height: 15px;
            }
            span {
              font-size: 13px;
              font-weight: 400;
              text-decoration: underline;
              color: #0f79ff;
              margin-left: 4px;
            }
          }
        }
      }
      .infoBox {
        justify-content: space-between;
      }
      .infoRight {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #767676;
      }
      .rightFlex {
        flex-direction: row-reverse;
        justify-content: end !important;
      }
      .precautions-text {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        text-decoration: underline;
        color: #80838e;
        line-height: 18px;
        margin-top: 10px;
        padding-bottom: 20px;
      }
    }
    .step {
      width: 100%;
      margin-top: 13px;
    }
    .info-form-btn {
      width: 306px;
      height: 52px;
      background: rgba(233, 197, 140, 1);
      border-radius: 26px;
      line-height: 52px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      margin: 17px auto;
    }
  }
}
</style>
