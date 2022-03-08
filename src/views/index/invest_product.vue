<template>
  <div class="page_root">
    <section class="account">
      <span>{{ $t('promotion_account_balance') }}</span>
      <span class="value">
        {{ balance }}
        <div>TRX</div>
      </span>
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

    <section class="input_box">
      <div class="item">
        <div class="label">
          <span class="line"></span>
          <span class="value">{{ $t('promotion_account') }}</span>
          <span class="line"></span>
        </div>
        <input type="number" @input="changeInput()" v-model="proAccount" />
      </div>
      <div class="item">
        <div class="label">
          <span class="line"></span>
          <span class="value">{{ $t('security_password') }}</span>
          <span class="line"></span>
        </div>
        <input class="sec_input" v-model="password" type="password" />
      </div>
    </section>

    <div class="tip">
      {{ proAccount }} + ( {{ proAccount }} * {{ data.rate }}% *
      {{ data.day }} ) = {{ profit }}
    </div>

    <div class="btn" @click="handleSubmit">
      {{ $t('partcipate_in_investment') }}
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
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .account {
    position: relative;
    width: 100%;
    height: 122px;
    display: flex;
    flex-direction: column;
    background: url('~@/assets/tron/a6d8a0db03baa79955316da04c68c9f9f95966de7b6c-k6K16M_fw1200.png')
      no-repeat;
    background-size: 100% 100%;
    margin-top: 16px;
    padding: 28px 21px;

    span {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
    }

    .value {
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      margin-top: 21px;
      display: flex;
      align-items: flex-end;

      div {
        width: 39px;
        height: 16px;
        background: #ffc618;
        border-radius: 3px;
        font-size: 11px;
        font-family: Arial;
        font-weight: bold;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 5px 15px;
      }
    }
  }
  .info_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 7px;

    .item {
      width: 100%;
      height: 53px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #575757;
      overflow: hidden;
      border-bottom: 1px solid rgba(230, 230, 230, 0.6);

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
        color: #000001;
      }
    }
  }

  .input_box {
    width: 100%;
    display: flex;
    flex-direction: column;

    .item {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .label {
        display: flex;
        align-items: center;

        .line {
          width: 24px;
          height: 1px;
          background-color: rgba(213, 10, 10, 1);
        }

        .value {
          font-size: 15px;
          font-family: Arial;
          font-weight: bold;
          color: #212121;
          margin: 0 16px;
        }
      }

      input {
        width: 100%;
        height: 43px;
        border-radius: 4px;
        text-align: center;
        margin-top: 16px;
        padding: 0 10px;
      }

      .sec_input {
        background: #fafafa;
        border: 1px solid #cccccc;
        text-align: left;
      }
    }
  }

  .tip {
    width: 100%;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #d50a0a;
    margin-top: 16px;
    text-align: center;
  }

  .btn {
    width: 100%;
    min-height: 47px;
    background: #d50a0a;
    border-radius: 4px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 36px auto;
  }
}
</style>
