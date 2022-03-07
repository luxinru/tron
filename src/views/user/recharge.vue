<template>
  <div class="recharge-container">
    <!-- <div class="recharge-header-box">
            <div class="recharge-header">
                <div class="recharge-header-title">账户余额(元)</div>
                <div class="recharge-header-money">{{data.money}}</div>
            </div>
        </div> -->
    <headers title="充值中心" :money="data.money" />
    <!-- <div class="recharge-title-box">
            <div class="recharge-title-line"></div>
            <div>支付方式</div>
        </div> -->
    <div class="recharge-manner-box">
      <div class="recharge-money-input-box">
        
        <!-- <div class="recharge-money-input-unit">￥</div> -->
        <div class="recharge-money-input">
          <div class="recharge-money-input-title">¥</div>
          <input
            type="number"
            class="money-input"
            step="0.01"
            name="money"
            v-model="money"
            placeholder="请输入充值金额"
          />
        </div>
        <span class="recharge-money-tips">可用余额：{{data.money}}元</span>
      </div>
      <div class="recharge-manner-info-box">
        <div class="recharge-manner-info-title">支付方式</div>
        <div class="recharge-manner-header">
          <van-radio-group v-model="type">
            <template v-for="(channel, key) in data.config">
              <div
                class="recharge-manner-header-item"
                v-if="channel.is_show"
                :key="key"
                @click="type = channel.key"
              >
                
                <div class="recharge-manner-header-item-right">
                  <van-radio :name="channel.key">
                    <template #icon="props">
                      <i
                        class="radio-icon"
                        :class="{ 'active-radio-icon': props.checked }"
                      ></i>
                    </template>
                  </van-radio>
                </div>
                <div class="recharge-manner-header-item-left">
                  <!-- <div
                    class="left-icon"
                    :class="'recharge_' + channel.key"
                  ></div> -->
                  <div
                    class="left-info"
                    :class="{ 'left-info-active': type == channel.key }"
                  >
                    {{ channel.name }}
                  </div>
                </div>
                <div class="recharge-manner-header-item-btn">实时便捷</div>
              </div>
              <!-- <div class="recharge-manner-header-item" :key="key" @click="type = channel.key">
                                <div class="recharge-manner-header-item-left">
                                    <div class="left-icon" :class="'recharge_' + channel.key"></div>
                                    <div class="left-info" :class="{'left-info-active': type == channel.key}">{{channel.name}}</div>
                                    <span class="tipss">{{channel.reason?channel.reason:"便捷支付"}}</span>
                                </div>
                                <div class="recharge-manner-header-item-right">
                                    <van-radio :name="channel.key">
                                        <template #icon="props">
                                            <i class="radio-icon" :class="{'active-radio-icon': props.checked}"></i>
                                        </template>
                                    </van-radio>
                                </div>
                            </div> -->

              <!-- <div class="recharge-manner-header-item" :key="key" v-if="channel.is_show" @click="type = channel.key">
                                <div class="recharge-manner-header-item-left">
                                    <div class="left-icon" :class="'recharge_' + channel.key"></div>
                                    <div class="left-info" :class="{'left-info-active': type == channel.key}">{{channel.name}}</div>
                               
                                </div>
                                <div class="recharge-manner-header-item-right">
                                    <van-radio :name="channel.key">
                                        <template #icon="props">
                                            <i class="radio-icon" :class="{'active-radio-icon': props.checked}"></i>
                                        </template>
                                    </van-radio>
                                </div>
                            </div>
                            <div class="recharge-manner-header-item" :key="key" v-if="channel.is_show" @click="type = channel.key">
                                <div class="recharge-manner-header-item-left">
                                    <div class="left-icon" :class="'recharge_' + channel.key"></div>
                                    <div class="left-info" :class="{'left-info-active': type == channel.key}">{{channel.name}}</div>
                                   
                                </div>
                                <div class="recharge-manner-header-item-right">
                                    <van-radio :name="channel.key">
                                        <template #icon="props">
                                            <i class="radio-icon" :class="{'active-radio-icon': props.checked}"></i>
                                        </template>
                                    </van-radio>
                                </div>
                            </div> -->
            </template>
          </van-radio-group>
        </div>
      </div>
      <div class="recharge-btn" @click="handleSubmit">立即充值</div>

      <div class="recharge-remark-box">
          <p class="recharge-remark-title">转账说明</p>
          <p>1.选择“银行汇款”单笔3000以上有1.00%返利</p>
          <p>
            2.支付宝APP/扫码支付单笔金额≤5000元,如超过此金额,请分多笔转账或选择银行汇款
          </p>
          <p>
            3.“银行汇款”建议使用小数点的金额进行转账充值,例如:500.12、10000.34等小数金额（加快到账时间）
          </p>
          <p>4.如有疑问可以联系在线客服咨询</p>
        </div>
      <!--<div style="width: 98%;margin: 9px auto;">-->
      <!--	<img src="../index/image/huanbao/resm.jpg"  style="width: 100%;border-radius: 5px;" alt="">-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import headers from './components/header.vue'
export default {
  name: 'index',
  components: { headers },
  data () {
    return {
      data: {},
      type: '',
      money: ''
    }
  },
  created () {
    this.$parent.footer(false)
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      Fetch('/user/recharge').then(res => {
        console.log(res)

        this.data = res.data

        console.log('充值', this.data)
      })
    },
    getClass (channel) {
      return 'recharge_online_' + channel
    },
    handleSubmit () {
      if (!this.money) {
        this.$notify('请输入金额')
        return
      }

      if (
        this.type == 'alipay_app' &&
        this.money >= this.data.alipay_app_top_money
      ) {
        this.$notify(
          'app支付最高金额为' +
            this.data.alipay_app_top_money +
            '元，请选择其他支付通道。'
        )
        return
      }
      if (
        this.type == 'alipay_h5' &&
        this.money >= this.data.alipay_app_top_money
      ) {
        this.$notify(
          'app支付最高金额为' +
            this.data.alipay_app_top_money +
            '元，请选择其他支付通道。'
        )
        return
      }
      if (!this.type) {
        this.$notify('请选择充值方式')
        return
      }

      if (this.money < this.data.min_recharge) {
        this.$notify('最小充值金额' + this.data.min_recharge + '元')
        return
      }

      if (
        this.type == 'bank' ||
        this.type == 'gz_bank' ||
        this.type == 'alipay_bank' ||
        this.type == 'wx_bank'
      ) {
        this.$router.replace({
          path: '/recharge/bank',
          query: {
            money: this.money,
            type: this.type
          }
        })
        return
      }
      if (this.type == 'pay_service') {
        let d = new Date()
          .toLocaleTimeString('chinese', {
            hour12: false
          })
          .substring(0, 5)

        this.$router.replace({
          path: '/recharge/pay_service',
          query: {
            money: this.money,
            type: this.type
          }
        })
        return
      }

      this.$router.replace({
        path: 'pay',
        query: {
          money: this.money,
          channel: this.type
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import 'recharge';
</style>
