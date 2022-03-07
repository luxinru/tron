<template>
  <div class="page_root">
    <section class="bars">
      <span :class="{ active: active === 1 }" @click="active_action(1)">
        {{ $t('transfer_to_basicaccount') }}
      </span>
      <span :class="{ active: active === 2 }" @click="active_action(2)">
        {{ $t('transfer_to_commission_account') }}
      </span>
    </section>

    <section class="lines">
      <span :class="{ active: active === 1 }"> </span>
      <span :class="{ active: active === 2 }"> </span>
    </section>

    <section class="btns">
      <div class="item">
        <span style="width: 50%" v-if="active === 1">{{
          $t('commission_account')
        }}</span>
        <span style="width: 50%" v-else>{{ $t('basic_income') }}</span>
        <div class="value">
          <span v-if="active === 1">{{ commission_account }}</span>
          <span v-else>{{ basic_account }}</span>
          <span>TRX</span>
        </div>
      </div>
      <img class="transfer_img" src="@/assets/tron/返回 拷贝 5.png" alt="" />
      <div class="item">
        <span style="width: 50%" v-if="active === 1">{{
          $t('basic_income')
        }}</span>
        <span style="width: 50%" v-else>{{ $t('commission_account') }}</span>
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
      <div class="kuai">
        <img src="@/assets/tron/长箭头2@2x.png" alt="" />
      </div>
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
            message: res.data.info,
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
            message: res.data.info,
          })
          this.start()
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(11, 11, 11, 1);
  background-color: transparent;

  .arrow {
    position: absolute;
    left: 0;
  }
}

.page_root {
  background: rgba(248, 248, 250, 1);
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

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
      white-space: nowrap;
      padding: 14px 0;
    }

    .active {
      color: #6767e8;
    }
  }

  .lines {
    width: 100%;
    height: 2px;
    display: flex;
    align-items: center;

    span {
      flex: 1 0;
      height: 2px;
      margin: 0 20px;
    }

    .active {
      background-color: #6767e8;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 119px;
    margin-top: 13px;

    .transfer_img {
      width: 30px;
      height: 30px;
    }

    .item {
      position: relative;
      width: 153px;
      height: 100%;
      background: url('~@/assets/tron/Transfer to basic_slices/椭圆 1 拷贝 5.png')
        no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        span {
          &:last-child {
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #ffffff;
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
    color: #8a07e7;
    margin-top: 16px;
  }

  .input_box {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 5px;
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
      color: #8a07e7;
    }
  }

  .input {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 5px;
    margin-top: 16px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-size: 13px;
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
}
</style>
