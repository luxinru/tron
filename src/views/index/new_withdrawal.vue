<template>
  <div class="page_root">
    <div class="tabs">
      <span :class="{ active: active === 1 }" @click="active = 1">
        {{ $t('basic_account') }}
      </span>
      <span :class="{ active: active === 2 }" @click="active = 2">
        {{ $t('commission_account') }}
      </span>
      <span :class="{ active: active === 3 }" @click="active = 3">
        {{ $t('gift_account') }}
      </span>
    </div>

    <section class="header">
      <span class="title">{{ getTitle() }}</span>

      <span class="price">{{ getPrice() }}</span>

      <span class="tip">24 {{ $t('hour_withdrawal') }}</span>

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

    <div class="form">
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
    </div>

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
      // 获取钱包地址
      let that = this
      Fetch('/user/info').then((res) => {
        // that.$router.refresh();
        // this.dataInfo = res.data //res赋值
        var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
        httpRequest.open(
          'GET',
          'https://tron1688.com/api/createAccount?uid=' + res.data.mobile,
          true
        ) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send() //第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          }
        }
      })
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
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px 24px;

  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 30px;
    font-size: 13px;
    font-family: Arial;
    font-weight: 400;
    color: rgba(75, 149, 254, 1);
    box-sizing: border-box;
    overflow: hidden;
    margin-top: 16px;

    span {
      width: 101px;
      height: 100%;
      border-radius: 4px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .active {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(75, 149, 254, 1);
    }
  }

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: max-content;
    background: #fff;
    border-radius: 7px;
    margin-top: 13px;
    padding: 0 13px 16px;

    .title {
      text-align: center;
      min-height: 40px;
      padding: 0 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(75, 149, 254, 1);
      border-radius: 0 0 4px 4px;
      font-size: 15px;
      font-family: Arial;
      font-weight: 400;
      color: #ffffff;
    }

    .tip {
      min-height: 24px;
      padding: 0 20px;
      background: #f5f8fb;
      border-radius: 4px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4b95fe;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 14px;
    }

    .price {
      font-size: 33px;
      font-family: Arial;
      font-weight: bold;
      color: #353338;
      margin: 20px 0 0 0;
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
      margin-top: 15px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #5a5b5d;
      text-align: center;
    }

    .btn {
      padding: 0 22px;
      min-height: 41px;
      background: #4b95fe;
      border-radius: 21px;
      margin: 16px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    padding: 0 24px;

    .form_item {
      width: 100%;
      height: 45px;

      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      overflow: hidden;

      &:last-child {
        border-bottom: none;
      }

      input {
        width: 100%;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        background-color: transparent;
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
  }

  .tips {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4b95fe;
    margin: 20px 0;
  }

  .submit {
    width: 100%;
    min-height: 47px;
    background-color: #4b95fe;
    border-radius: 4px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
  }

  .submit_no {
    background-color: rgba(188, 190, 192, 1);
  }
}
</style>
