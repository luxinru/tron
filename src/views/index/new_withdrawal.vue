<template>
  <div class="page_root">
    <section class="header">
      <div class="logo">
        <img
          src="@/assets/tron/Withdrawal_slices/7101cb2ba7da2874ae11574f81f49abd992d568a2bd447-A9yRVS.png"
          alt=""
        />
      </div>

      <div class="tabs">
        <span :class="{ active: active === 1 }" @click="active = 1">
          {{ $t('basic_account') }}
        </span>
        <div class="line"></div>
        <span :class="{ active: active === 2 }" @click="active = 2">
          {{ $t('commission_account') }}
        </span>
        <div class="line"></div>
        <span :class="{ active: active === 3 }" @click="active = 3">
          {{ $t('gift_account') }}
        </span>
      </div>

      <span class="title">{{ getTitle() }}</span>

      <span class="tip">24 {{ $t('hour_withdrawal') }}</span>

      <span class="price">{{ getPrice() }}</span>

      <span class="limit" v-if="active === 1"
        >{{ $t('daily_withdrawal_limit') }}: {{ daily_withdrawal_limit }}</span
      >

      <template v-if="active === 1">
        <span class="limit">
          <span>{{ withdrawal_limit_remaining_today }} trx</span>
          {{ $t('withdrawal_limit_remaining_today') }}
        </span>

        <span class="btn" @click="$router.push('recharge_promotion')">
          {{ $t('transfer_to_commission_account') }}
        </span>
      </template>
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
      <div class="kuai">
        <img src="@/assets/tron/长箭头2@2x.png" alt="" />
      </div>
      {{ $t('confrm') }}
    </div>
    <div
      class="submit"
      :class="{ submit_no: gift_status === 0 }"
      style="z-index: 1"
      v-if="active === 3"
      @click="giftSubmit()"
    >
      <div class="kuai">
        <img
          v-if="gift_status === 1"
          src="@/assets/tron/长箭头2@2x.png"
          alt=""
        />
      </div>
      {{ $t('confrm') }}
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
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
              if (res.result && res.txid) {
                // 自动确认提现订单
                Fetch('/user/auto_cost_apply', {
                  oid: ret.info,
                  txid: res.txid,
                }).then((ret) => {
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
      } else {
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
  background: rgba(248, 248, 250, 1);
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .header {
    position: relative;
    margin-top: 60px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 13px;
    width: 100%;
    height: max-content;

    .logo {
      position: absolute;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-top: -55px;
      background-color: rgba(138, 7, 231, 1);

      img {
        width: 36px;
        height: 37px;
      }
    }

    .tabs {
      display: flex;
      align-items: center;
      height: 35px;
      border: 1px solid rgba(138, 7, 231, 1);
      border-radius: 4px;
      font-size: 13px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(138, 7, 231, 1);
      box-sizing: border-box;
      margin-top: 36px;
      overflow: hidden;
      span {
        flex: 1 0;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }

      .line {
        height: 100%;
        width: 1px;
        background-color: rgba(138, 7, 231, 1);
      }

      .active {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(138, 7, 231, 1);
      }
    }

    .title {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #4b4d59;
      margin-top: 20px;
      text-align: center;
    }

    .tip {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #8a07e7;
      margin-top: 10px;
    }

    .price {
      font-size: 46px;
      font-family: Arial;
      font-weight: bold;
      color: #4b4d59;
      text-align: center;
      width: 100%;
      margin: 20px 0 10px 0;
      word-break: break-word;
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

    .limit {
      margin-top: 10px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      text-align: center;

      span {
        color: rgba(138, 7, 231, 1);
      }
    }

    .btn {
      padding: 12px 16px;
      background-color: #8a07e7;
      border-radius: 17px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 16px;
    }
  }

  .account {
    font-size: 17px;
    font-family: Arial;
    font-weight: bold;
    color: #1e253c;
    margin-top: 25px;
  }

  .form_item {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 5px;
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
    color: #8a07e7;
    margin-top: 15px;
  }

  .submit {
    position: relative;
    width: 282px;
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
  .submit_no {
    background-color: rgba(188, 190, 192, 1);
  }
}
</style>
