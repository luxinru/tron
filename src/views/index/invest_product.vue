<template>
  <div class="page_root">
    <section class="account">
      <span>{{ $t('promotion_account_balance') }}</span>
      <span class="value">{{ balance }}</span>
      <img
        src="@/assets/tron/Invest products_slices/image-removebg-preview (11).png"
        alt=""
      />
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

    <section class="info_box">
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
      <div class="kuai">
        <img src="@/assets/tron/长箭头2@2x.png" alt="" />
      </div>
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
        Number(this.proAccount * this.data.rate/100 * this.data.day)
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  background-color: rgba(246, 245, 250, 1);
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .account {
    position: relative;
    width: 100%;
    height: 127px;
    display: flex;
    flex-direction: column;
    background: url('~@/assets/tron/Invest products_slices/椭圆 1 拷贝 3.png')
      no-repeat;
    background-size: 100% 100%;
    margin-top: 16px;
    padding: 24px 26px;

    span {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
    }

    .value {
      font-size: 31px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      margin-top: 26px;
    }

    img {
      position: absolute;
      width: 151px;
      height: 92px;
      right: -12px;
      bottom: -12px;
    }
  }
  .info_box {
    width: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 13px;
    margin-top: 16px;

    .item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
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
      }

      input {
        margin-left: 16px;
        flex: 1 0;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: right;
        overflow: hidden;
      }

      .sec_input {
        border: 1px solid #e5e5e8;
        border-radius: 4px;
        height: 80%;
        margin-left: 0;
        text-align: left;
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

  .btn {
    position: relative;
    min-width: 282px;
    padding: 0 16px;
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
    padding-left: 50px;
    box-sizing: border-box;
    text-align: center;

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
}
</style>
