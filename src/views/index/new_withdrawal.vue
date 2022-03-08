<template>
  <div class="page_root">
    <section class="tabs">
      <div class="item" :class="{ active: active === 1 }" @click="active = 1">
        {{ $t('basic_account') }}
        <span class="line"></span>
      </div>
      <div class="item" :class="{ active: active === 2 }" @click="active = 2">
        {{ $t('commission_account') }}
        <span class="line"></span>
      </div>
      <div class="item" :class="{ active: active === 3 }" @click="active = 3">
        {{ $t('gift_account') }}
        <span class="line"></span>
      </div>
    </section>

    <section class="header first" v-if="active === 1">
      <span class="title">
        {{ getTitle() }}
        <span>TRX</span>
      </span>
      <span class="price">{{ getPrice() }}</span>
      <span class="tip">24 {{ $t('hour_withdrawal') }}</span>
      <span class="line"></span>
      <span class="limit">
        {{ $t('daily_withdrawal_limit') }}: {{ daily_withdrawal_limit }}
      </span>
      <span class="limit">
        {{ withdrawal_limit_remaining_today }} trx {{ $t('withdrawal_limit_remaining_today') }}
      </span>
      <span class="btn" @click="$router.push('recharge_promotion')">
        {{ $t('transfer_to_commission_account') }}
      </span>
    </section>

    <section class="header" v-else>
      <span class="title">
        {{ getTitle() }}
        <span>{{ active === 2 ? 'TRX' : 'BBG' }}</span>
      </span>
      <span class="price">{{ getPrice() }}</span>
      <span class="tip">24 {{ $t('hour_withdrawal') }}</span>
    </section>

    <section class="tips">
      {{ $t('withdrawal_address_cannot_be_modified') }}
    </section>

    <section class="form_item" style="z-index: 1">
      <input
        v-model="money"
        type="text"
        :placeholder="$t('please_enter_withdrawal_limit')"
      />
    </section>

    <section class="form_item" style="z-index: 1">
      <input
        v-bind:disabled="diasabledInput"
        v-model="address"
        type="text"
        :placeholder="$t('please_enter_the_withdrawal_address')"
      />
    </section>

    <section class="form_item" style="z-index: 1">
      <input
        v-model="pwd"
        type="password"
        :placeholder="$t('please_enter_the_withdrawal_password')"
      />
    </section>

    <div
      class="submit"
      style="z-index: 1"
      v-if="active !== 3"
      @click="handleSubmit()"
    >
      {{ $t('confrm') }}
    </div>
    <div
      class="submit"
      :class="{ submit_no: gift_status === 0 }"
      style="z-index: 1"
      v-if="active === 3"
      @click="giftSubmit()"
    >
      {{ $t('confrm') }}
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
// import { Dialog } from 'vant'
export default {
  name: 'TradingList',
  data() {
    return {
      basic_account: '0.000000',
      gift_accoun: '0.000000',
      commission_account: '0.000000',
      withdrawal_limit_remaining_today: 0,
      daily_withdrawal_limit: 0,
      money: '',
      pwd: '',
      address: '',
      autoCash: 0,
      mobile: '',
      active: 1,
      gift_status: 0,
      diasabledInput: false,
    }
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      Fetch('/user/cash_info').then((res) => {
        this.mobile = res.data.mobile
        this.basic_account = res.data.basic_account
        this.gift_account = res.data.gift_account
        this.commission_account = res.data.commission_account
        this.daily_withdrawal_limit = res.data.daily_withdrawal_limit
        this.withdrawal_limit_remaining_today =
          res.data.withdrawal_limit_remaining_today
        this.autoCash = res.data.autoCash
        this.gift_status = res.data.gift_status
        this.address = res.data.address
        if (this.address) {
          this.diasabledInput = true
        } else {
          this.diasabledInput = false
        }
        // alert()
      })
    },
    handleSubmit() {
      if (!this.money) {
        this.$notify(this.$t('please_enter_the_withdrawal_amount'))
        return
      }
      Fetch('/user/cost_apply', {
        money: this.money,
        address: this.address,
        type: this.active,
        passwd: this.pwd,
      }).then((ret) => {
        // 自动提现开关
        if (this.autoCash) {
          var that = this
          var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
          httpRequest.open(
            'GET',
            'https://tron1688.com/api/auto_cash?phone=' +
              that.mobile +
              '&balance=' +
              that.money +
              '&to=' +
              that.address +
              '&oid=' +
              ret.info,
            true
          ) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
          httpRequest.send() //第三步：发送请求  将请求参数写在URL中
          /**
           * 获取数据后的处理程序
           */
          httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
              // 如果返回了非0数字，证明钱包系统已经成功发起转账
              let res = JSON.parse(httpRequest.responseText)
              console.log(ret.info)
              if (res.result && res.txid) {
                // 自动确认提现订单
                Fetch('/user/auto_cost_apply', {
                  oid: ret.info,
                  txid: res.txid,
                }).then((ret) => {
                  console.log('ret :>> ', ret)
                  this.$notify({
                    background: '#07c160',
                    message: this.$t('withdrawal_application_successful'),
                  })
                })
              }
            }
          }
        } else {
          this.$notify({
            background: '#07c160',
            message: this.$t('successful_application'),
          })
        }

        this.$router.back()
      })
    },
    giftSubmit() {
      if (this.gift_status == 1) {
        if (!this.money) {
          this.$notify(this.$t('please_enter_the_withdrawal_amount'))
          return
        }
        Fetch('/user/cash_gift', {
          money: this.money,
          address: this.address,
          type: this.active,
          passwd: this.pwd,
        }).then((ret) => {
          this.$notify({
            background: '#07c160',
            message: this.$t('successful_application'),
          })
          if (ret.code == 1) {
            this.$router.back()
          }
        })
      }
    },
    getTitle() {
      switch (this.active) {
        case 2:
          return this.$t('commission_account_balance')
        case 3:
          return this.$t('gift_account_balance')
        default:
          return this.$t('basic_account_balance')
      }
    },

    getPrice() {
      switch (this.active) {
        case 2:
          return this.commission_account
        case 3:
          return this.gift_account
        default:
          return this.basic_account
      }
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    height: 35px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(185, 185, 185, 1);
    margin-top: 16px;
    overflow: hidden;

    .item {
      position: relative;
      flex: 1 0;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .line {
        position: absolute;
        bottom: 0;
        width: 26px;
        height: 3px;
      }
    }

    .active {
      color: rgba(213, 10, 10, 1);

      .line {
        background-color: rgba(213, 10, 10, 1);
      }
    }
  }

  .header {
    position: relative;
    width: 100%;
    height: 144px;
    margin-top: 16px;
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: url('~@/assets/tron/a6d8a0db03baa79955316da04c68c9f9f95966de7b6c-k6K16M_fw1200 (2).png')
      no-repeat;
    background-size: 100% 100%;

    .title {
      width: 100%;
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      display: flex;
      align-items: center;

      span {
        width: 39px;
        height: 16px;
        background: #FFC618;
        border-radius: 3px;
        font-size: 11px;
        font-family: Arial;
        font-weight: bold;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
      }
    }

    .price {
      width: 100%;
      word-break: break-word;
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #FFFFFF;
    }

    .tip {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }

    input {
      font-size: 46px;
      font-family: Arial;
      font-weight: bold;
      color: #4b4d59;
      text-align: center;
      width: 100%;
      margin-top: 24px;
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.3);
      margin: 5px 0;
    }

    .limit {
      margin-top: 8px;
      width: 100%;
      min-height: 24px;
      background: #FFFFFF;
      border-radius: 3px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: Arial;
      font-weight: bold;
      color: #D50A0A;
    }

    .btn {
      width: 278px;
      min-height: 40px;
      background: #FFC618;
      border-radius: 20px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 16px auto 0;
    }
  }

  .first {
    height: 288px;
    background: url('~@/assets/tron/a6d8a0db03baa79955316da04c68c9f9f95966de7b6c-k6K16M_fw1200 (1).png')
      no-repeat;
    background-size: 100% 100%;
  }

  .form_item {
    width: 100%;
    height: 43px;
    background: #FAFAFA;
    border: 1px solid #cccccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-top: 16px;
    overflow: hidden;

    input {
      width: 100%;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      padding: 0 8.8px;
    }

    .dropdown {
      width: 100%;
      // height: 100%;

      /deep/ .van-dropdown-menu__item {
        width: 100%;
        height: 100%;

        .van-dropdown-menu__title {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &::after {
            margin-right: 16px;
          }
        }
      }
    }
  }

  .tips {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #D50A0A;
    margin-top: 16px;
  }

  .submit {
    position: relative;
    width: 100%;
    height: 47px;
    margin: 24px auto;
    background-color: #D50A0A;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    box-sizing: border-box;
  }
  .submit_no {
    background-color: rgba(188, 190, 192, 1);
    // color: #000;
  }
}
</style>
