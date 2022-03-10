<template>
  <div class="page_root">
    <IHeader
      :title="$t('withdrawal')"
      color="rgba(0, 0, 0, 1)"
      fontColor="rgba(0, 0, 0, 1)"
    ></IHeader>

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

    <section class="header">
      <span class="title">
        {{ getTitle() }}
      </span>
      <span class="price">{{ getPrice() }}</span>
      <span class="tip">24 {{ $t('hour_withdrawal') }}</span>
      <template v-if="active === 1">
        <span class="line"></span>
        <span class="limit">
          {{ $t('daily_withdrawal_limit') }}: {{ daily_withdrawal_limit }}
        </span>
        <span class="limit limit2">
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
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'TradingList',

  components: {
    IHeader,
  },

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
      color: rgba(34, 78, 155, 1);

      .line {
        background-color: rgba(34, 78, 155, 1);
      }
    }
  }

  .header {
    position: relative;
    width: 100%;
    min-height: 137px;
    height: max-content;
    margin-top: 16px;
    padding: 25px 18px;
    display: flex;
    flex-direction: column;
    background: #224e9b;
    box-shadow: 0px 4px 21px 0px rgba(34, 78, 155, 0.71);
    border-radius: 4px;

    .title {
      width: 100%;
      font-size: 15px;
      font-family: Arial;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
    }

    .price {
      width: 100%;
      word-break: break-word;
      font-size: 27px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      margin-top: 16px;
    }

    .tip {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 16px;
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
      background-color: rgba(255, 255, 255, 0.4);
      margin: 16px 0;
    }

    .limit {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
    }

    .limit2 {
      margin-top: 16px;

      span {
        color: rgba(255, 140, 2, 0.7);
      }
    }

    .btn {
      width: 100%;
      height: 31px;
      background: #ffffff;
      border-radius: 16px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #224e9b;
    }
  }

  .tips {
    width: 100%;
    height: 34px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #224E9B;
    line-height: 22px;
    margin: 28px 0;
  }

  .form_item {
    width: 100%;
    height: 45px;
    background: #ffffff;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-top: 12px;
    overflow: hidden;

    input {
      width: 100%;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      padding: 0 22px;
    }
  }

  .submit {
    position: relative;
    width: 100%;
    height: 47px;
    background: #ED6608;
    border-radius: 4px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 33px 0;
  }

  .submit_no {
    background-color: rgba(188, 190, 192, 1);
  }
}
</style>
