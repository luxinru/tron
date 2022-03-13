<template>
  <div class="page_root">
    <div class="header">
      <van-icon name="arrow-left" size="23" color="#fff" @click="$router.go(-1)" />
      <div :style="`color: #fff`">{{ $t('lnvest_products') }}</div>
    </div>

    <section class="account">
      <span>{{ $t('promotion_account_balance') }}</span>
      <span class="value">{{ balance }}</span>
    </section>

    <section class="info_box">
      <div class="item">
        <span class="label">{{ $t('starting_amount') }}</span>
        <span>{{ data.min }}</span>
      </div>
      <div class="item">
        <span class="label">{{ $t('max_investment_amount') }}</span>
        <span>{{ data.max }}</span>
      </div>
      <div class="item">
        <span class="label">{{ $t('cycle') }}</span>
        <span>{{ data.day }} Day</span>
      </div>
      <div class="item">
        <span class="label">{{ $t('daily_interest_rate') }}</span>
        <span>{{ data.rate }}%</span>
      </div>
      <div class="item">
        <span class="label">{{ $t('number_of_investments') }}</span>
        <span>{{ data.num }}</span>
      </div>
    </section>

    <section class="info_box2">
      <div class="item">
        <span class="label">{{ $t('promotion_account') }}</span>
        <input type="number" @input="changeInput()" v-model="proAccount" />
      </div>
      <div class="item">
        <span class="label">{{ $t('security_password') }}</span>
      </div>
      <div class="item sec_item">
        <input class="sec_input" v-model="password" type="password" />
      </div>
      <div class="tip">
        {{ proAccount }} + ( {{ proAccount }} * {{ data.rate }}% *
        {{ data.day }} ) = {{ profit }}
      </div>
    </section>

    <div class="btn" @click="handleSubmit">
      {{ $t('partcipate_in_investment') }}
    </div>

    <div class="rules">
      <div class="title">
        <span></span>
        Project rules
      </div>
      <div class="box">
        <div class="item">
          <div class="item_title">
            <span></span>
            Project amount
          </div>
          <div class="content">
            9999999999.00 TRX
          </div>
        </div>

        <div class="item">
          <div class="item_title">
            <span></span>
            Repayment method
          </div>
          <div class="content">
            Return principal and income atmaturity (normal on holidays)
          </div>
        </div>

        <div class="item">
          <div class="item_title">
            <span></span>
            Starting investment amount
          </div>
          <div class="content">
            100.00 TRX
          </div>
        </div>

        <div class="item">
          <div class="item_title">
            <span></span>
            Project amount
          </div>
          <div class="content">
            9999999999.00 TRX
          </div>
        </div>

        <div class="item">
          <div class="item_title">
            <span></span>
            Release cycle
          </div>
          <div class="content">
            7 days , automatic settlementwithin 24 hours
          </div>
        </div>

        <div class="item">
          <div class="item_title">
            <span></span>
            Estimated income 
          </div>
          <div class="content">
            100.00 * 1.30% * 7 Days = totalincome 0 TRX principal100.00 TRX = total principaland interest 0 TRX
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
export default {
  name: 'InvestProduct',
  data() {
    return {
      proAccount: 2000,
      profit: 0,
      password: '',
      balance: 0,
      data: {},
      id: 0,
    }
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.id = this.$router.history.current.params.id
    this.start()
  },
  methods: {
    start() {
      /* setTimeout(() => {
	      var element = document.getElementById("app");
	      element.scrollIntoView();
	    }, 0); */
      Fetch('/index/item_view', { id: this.id }).then((res) => {
        this.data = res.data.view
        this.proAccount = this.data.min
        this.balance = res.data.money
        this.changeInput()
      })
    },
    handleSubmit() {
      if (!this.proAccount) {
        this.$notify(this.$t('please_enter_the_investment_amount'))
        return
      }

      if (!this.password) {
        this.$notify(this.$t('please_enter_transaction_password'))
        return
      }

      Fetch('/index/item_apply', {
        id: this.id,
        money: this.proAccount,
        pwd: this.password,
        vid: 1,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: this.$t('investment_success'),
        })
        this.$router.replace('/new_invest')
      })
    },
    changeInput() {
      this.profit =
        Number(this.proAccount) +
        Number(((this.proAccount * this.data.rate) / 100) * this.data.day)
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 13px;
  background: url('~@/assets/tron/矢量智能对象 (12).png') no-repeat;
  background-size: 100% 292px;

  .header {
    position: relative;
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #1e253c;

    i {
      position: absolute;
      left: 0;
    }
  }

  .account {
    position: relative;
    width: 60%;
    line-height: 24px;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    padding: 0 10px;

    span {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
    }

    .value {
      font-size: 27px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      margin-top: 23px;
      display: flex;
      flex-direction: column;
      &:after {
        content: 'TRX';
        margin-top: 19px;
        font-size: 13px;
        font-family: Arial;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .info_box {
    width: 100%;
    min-height: 244px;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    margin-top: 13px;

    .item {
      flex: 1 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4b95fe;
      overflow: hidden;

      span {
        flex: 1 0;
        word-break: break-all;
        text-align: right;
      }
      .label {
        flex: 2 0;
        margin-right: 8px;
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #2c3136;
      }
    }

    .sec_item {
      margin-top: -16px;
    }

    .tip {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #5e63e7;
      margin-top: 24px;
    }
  }

  .info_box2 {
    width: 100%;
    min-height: 173px;
    padding: 0 24px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    margin-top: 13px;

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4b95fe;
      overflow: hidden;

      span {
        flex: 1 0;
        word-break: break-all;
        text-align: right;
      }
      .label {
        flex: 2 0;
        margin-right: 8px;
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #2c3136;
      }

      input {
        margin-left: 16px;
        flex: 1 0;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: right;
        overflow: hidden;
        color: #4b95fe;
      }

      .sec_input {
        border: 1px solid #e5e5e8;
        border-radius: 4px;
        height: 100%;
        margin-left: 0;
        text-align: left;
        padding: 0 8px;
        color: #000;
      }
    }

    .sec_item {
      // margin-top: -16px;
      flex: 1 0;
      width: 100%;
      display: flex;
      align-items: center;
    }

    .tip {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ff761b;
      display: flex;
      align-items: center;
    }
  }

  .btn {
    width: 100%;
    height: 47px;
    background: #4b95fe;
    border-radius: 4px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rules {
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: Arial;
      font-weight: bold;
      color: #2C3136;

      span {
        width: 6px;
        height: 6px;
        background: #4B95FE;
        border-radius: 50%;
        margin-right: 15px;
      }
    }

    .box {
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
      border-radius: 7px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .item {
        width: 100%;
        display: flex;
        flex-direction: column;

        .item_title {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #2C3136;
          margin-top: 20px;

          span {
            width: 3px;
            height: 3px;
            background: #4B95FE;
            border-radius: 50%;
            margin-right: 8px;
          }
        }

        .content {
          margin-top: 16px;
          display: flex;
          align-items: center;
          word-break: break-all;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4B95FE;
          line-height: 18px;
          margin-left: 11px;
        }
      }
    }
  }
}
</style>
