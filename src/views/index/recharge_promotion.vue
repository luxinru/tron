<template>
  <div class="page_root">
    <IHeader :title="$t('transfer_to_basic')"></IHeader>

    <section class="bars">
      <span :class="{ active: active === 1 }" @click="active_action(1)">
        {{ $t('transfer_to_basicaccount') }}
      </span>
      <span :class="{ active: active === 2 }" @click="active_action(2)">
        {{ $t('transfer_to_commission_account') }}
      </span>
    </section>

    <div class="line"></div>

    <section class="btns">
      <div class="item">
        <div class="value">
          <span v-if="active === 1">{{ commission_account }}</span>
          <span v-else>{{ basic_account }}</span>
          <span>TRX</span>
        </div>
        <span style="width: 50%" v-if="active === 1">{{ $t('commission_account') }}</span>
        <span style="width: 50%" v-else>{{ $t('basic_income') }}</span>
      </div>
      <img class="transfer_img" src="@/assets/tron/返回 拷贝 4.png" alt="" />
      <div class="item">
        <div class="value">
          <span v-if="active === 1">{{ basic_account }}</span>
          <span v-else>{{ commission_account }}</span>
          <span>TRX</span>
        </div>
        <span style="width: 50%" v-if="active === 1">{{ $t('basic_income') }}</span>
        <span style="width: 50%" v-else>{{ $t('commission_account') }}</span>
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
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'NewRecharge',

  components: {
    IHeader,
  },

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
.page_root {
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  background: url('~@/assets/tron/波场 2 (1).png') no-repeat;
  background-size: 100% 315px;
  padding: 0 13px;

  .bars {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 43px;

    span {
      flex: 1 0;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      white-space: nowrap;
    }

    .active {
      color: rgba(255, 255, 255, 1);
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 28px 0;
  }

  .btns {
    width: 100%;
    height: 122px;
    display: flex;
    align-items: center;

    .transfer_img {
      width: 25px;
      height: 25px;
      margin: 0 20px;
    }

    .item {
      position: relative;
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 17px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;
        font-size: 34px;
        font-family: Arial;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 23px;

        span {
          &:last-child {
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #ffffff;
            margin: 0 0 5px 13px;
          }
        }
      }
    }
  }

  .tips {
    width: 100%;
    font-size: 11px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #234F9C;
    margin-top: 24px;
  }

  .input_box {
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px;
    margin-top: 20px;
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
      color: rgba(34, 78, 155, 1);
    }
  }

  .submit {
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
    margin: 22px 0;
  }
}
</style>
