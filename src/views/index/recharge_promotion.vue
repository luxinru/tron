<template>
  <div class="page_root">
    <div class="logo"></div>
    <section class="bars">
      <span :class="{ active: active === 1 }" @click="active_action(1)">
        {{ $t('transfer_to_basicaccount') }}
      </span>
      <span :class="{ active: active === 2 }" @click="active_action(2)">
        {{ $t('transfer_to_commission_account') }}
      </span>
    </section>

    <section class="btns">
      <div class="item">
        <span v-if="active === 1">{{ $t('commission_account') }}</span>
        <span v-else>{{ $t('basic_income') }}</span>
        <div class="value">
          <span v-if="active === 1">{{ commission_account }}</span>
          <span v-else>{{ basic_account }}</span>
          <span>TRX</span>
        </div>
      </div>
      <img
        class="transfer_img"
        src="@/assets/tron/Transfer to basic_slices/矩形 628.png"
        alt=""
      />
      <div class="item">
        <span v-if="active === 1">{{ $t('basic_income') }}</span>
        <span v-else>{{ $t('commission_account') }}</span>
        <div class="value">
          <span v-if="active === 1">{{ basic_account }}</span>
          <span v-else>{{ commission_account }}</span>
          <span>TRX</span>
        </div>
      </div>
    </section>

    <span class="tips" v-if="active === 2">
      {{ $t('operable_conversion', { value: operable_conversion }) }}
    </span>
    <!-- <span class="tips" v-if="active === 1"
      >Tips: Available balance of commission account: * * * TRX</span
    > -->

    <div class="input_box">
      <input
        type="text"
        v-model="conversion_amount"
        :placeholder="$t('quantity_to_be_converted')"
      />
      <span @click="allbalance()">{{ $t('all') }}</span>
    </div>

    <div class="submit" @click="handleSubmit()">
      {{ $t('confrm') }}
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
export default {
  name: 'NewRecharge',
  data() {
    return {
      active: 1,
      commission_account: 0,
      basic_account: 0,
      conversion_amount: 0,
      operable_conversion: 0,
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
      Fetch('/user/my_account_balance').then((res) => {
        this.commission_account = res.data.commission_account
        this.basic_account = res.data.basic_account
        this.operable_conversion =
          res.data.basic_to_commission_convertible_amount
      })
    },
    active_action(index) {
      this.active = index
      this.conversion_amount = 0
    },
    allbalance() {
      if (this.active === 1) {
        this.conversion_amount = this.commission_account
      } else {
        if (this.basic_account > this.operable_conversion) {
          this.conversion_amount = this.operable_conversion
        } else {
          this.conversion_amount = this.basic_account
        }
      }
    },
    handleSubmit() {
      if (!this.conversion_amount)
        return this.$notify(this.$t('please_fill_in_the_transfer_amount'))

      if (this.active === 1) {
        //commission_to_basic
        Fetch('/user/commission_to_basic', {
          conversion_amount: this.conversion_amount,
        }).then((res) => {
          this.conversion_amount = 0
          this.$notify({
            background: '#07c160',
            message: res.info,
          })
          this.start()
        })
      } else {
        //basic_to_commission
        Fetch('/user/basic_to_commission', {
          conversion_amount: this.conversion_amount,
        }).then((res) => {
          this.conversion_amount = 0
          this.$notify({
            background: '#07c160',
            message: res.info,
          })
          this.start()
        })
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

  .logo {
    width: 100%;
    height: 161px;
    margin-top: 16px;
    background: url('~@/assets/tron/Transfer to basic_slices/Transfer to  basic.png')
      no-repeat;
    background-size: 100% 100%;
  }

  .bars {
    width: 100%;
    display: flex;
    align-items: center;

    span {
      flex: 1 0;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 500;
      text-align: center;
      padding: 14px 16px;
    }

    .active {
      color: rgba(75, 149, 254, 1);
    }
  }

  .btns {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;

    .transfer_img {
      width: 18px;
      height: 9px;
      margin: 16px 0;
    }

    .item {
      position: relative;
      width: 100%;
      height: 101px;
      background: #ffffff;
      box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
      border-radius: 7px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #4b95fe;

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;
        font-size: 27px;
        font-family: Arial;
        font-weight: bold;
        color: #2c3136;
        margin-top: 24px;

        span {
          &:last-child {
            font-size: 11px;
            font-family: Arial;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            margin: 0 0 4px 10px;
          }
        }
      }
    }
  }

  .tips {
    width: 100%;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(75, 149, 254, 1);
    margin-top: 16px;
  }

  .input_box {
    width: 100%;
    height: 45px;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    margin-top: 16px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-size: 13px;

    input {
      flex: 1 0;
      margin-right: 16px;
    }

    span {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(75, 149, 254, 1);
    }
  }

  .input {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border-radius: 5px;
    margin-top: 16px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-size: 13px;
  }

  .submit {
    width: 100%;
    height: 47px;
    background: #4B95FE;
    border-radius: 4px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
  }
}
</style>
