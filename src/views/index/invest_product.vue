<template>
  <div class="page_root">
    <IHeader :title="$t('lnvest_products')"></IHeader>

    <section class="account">
      <span class="value">{{ balance }}</span>
      <span>{{ $t('promotion_account_balance') }}</span>
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
      <span class="title">{{ $t('promotion_account') }}</span>
      <input type="number" @input="changeInput()" v-model="proAccount" />
      <span class="title">{{ $t('security_password') }}</span>
      <input class="sec_input" v-model="password" type="password" />
      <div class="tip">
        {{ proAccount }} + ( {{ proAccount }} * {{ data.rate }}% *
        {{ data.day }} ) = {{ profit }}
      </div>
    </section>

    <div class="btn" @click="handleSubmit">
      {{ $t('partcipate_in_investment') }}
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'InvestProduct',

  components: {
    IHeader,
  },

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
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px 76px;
  background: url('~@/assets/tron/波场 2 拷贝 2.png') no-repeat;
  background-size: 100% 287px;

  .account {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 41px;

    .value {
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      display: flex;
      align-items: flex-end;
      margin-top: 0;

      &:after {
        content: 'TRX';
        font-size: 13px;
        font-family: Arial;
        font-weight: 400;
        color: #ffffff;
        margin-left: 12px;
        margin-bottom: 5px;
      }
    }

    span {
      font-size: 17px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 23px;
    }
  }
  .info_box {
    width: calc(100% - 12px);
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px;
    margin: 21px auto 0;

    .item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4E7091;

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
        color: #0A3867;
      }
    }
  }

  .info_box2 {
    width: calc(100% - 12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    .title {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #7E7E7F;
      margin-top: 24px;
    }

    input {
      margin-top: 18px;
      width: 100%;
      height: 43px;
      text-align: center;
      padding: 0 16px;
      background-color: transparent;
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #1E4C9A;
    }

    .sec_input {
      background: #FFFFFF;
      box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
      border-radius: 4px;
      text-align: left;
    }

    .tip {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #234E9B;
      margin-top: 15px;
    }
  }

  .btn {
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
    margin: 31px 0;
  }
}
</style>
