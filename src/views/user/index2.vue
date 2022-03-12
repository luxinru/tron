<template>
  <div class="page_root">
    <HeaderBar></HeaderBar>

    <section class="header">
      <div class="user">
        <img src="@/assets/tron/Mine_slices/avatar06 拷贝 5.png" alt="" />
        <span>{{ data.mobile }}</span>
      </div>

      <div class="total">
        <span class="total_title">{{ $t('total_balance') }}</span>
        <span class="total_value">{{ totalBalance }}<span>TRX</span></span>

        <section class="funtion">
          <div class="part" @click="handleMyService('new_recharge')">
            <span>{{ $t('recharge') }}</span>
          </div>

          <div class="part" @click="handleMyService('new_withdrawal')">
            <span>{{ $t('withdrawal') }}</span>
          </div>
        </section>
      </div>
    </section>

    <section class="quantity">
      <!-- <span class="title">{{ $t('trx_deposit_quantity') }}:</span> -->
      <div class="content">
        <div class="info">
          <span class="value">{{ data.money }}</span>
          <span class="value">{{ data.promotion }}</span>
        </div>
        <span class="tip">
          {{ $t('recharge_text') }}
        </span>
      </div>
    </section>

    <div class="app_title"><span></span>Selection function</div>

    <section class="services">
      <div class="item" @click="handleMyService('proft_list')">
        <img src="@/assets/tron/Mine_slices/文件.png" alt="" />
        <span>{{ $t('proft_list') }}</span>
      </div>
      <div class="item" @click="handleMyService('recharge_promotion')">
        <img src="@/assets/tron/Mine_slices/课程分析.png" alt="" />
        <span>{{ $t('transfer_to_basic') }}</span>
      </div>
      <div class="item" @click="handleMyService('setpwd')">
        <img src="@/assets/tron/Mine_slices/密码.png" alt="" />
        <span>{{ $t('change_password') }}</span>
      </div>
      <div class="item" @click="handleMyService('security_pwd')">
        <img src="@/assets/tron/Mine_slices/klm-修改密码.png" alt="" />
        <span>{{ $t('security_password') }}</span>
      </div>
    </section>

    <div class="app_title"><span></span>More features</div>

    <section class="services">
      <div class="item" @click="handleMyService('new_share')">
        <img src="@/assets/tron/Mine_slices/分享 (1).png" alt="" />
        <span>{{ $t('share') }}</span>
      </div>
      <div class="item" @click="handleMyService('notice')">
        <img src="@/assets/tron/Mine_slices/打开信息.png" alt="" />
        <span>{{ $t('notifcation') }}</span>
      </div>
      <div class="item">
        <img src="@/assets/tron/Mine_slices/app-app.png" alt="" />
        <span>{{ $t('app') }}</span>
      </div>
      <div class="item" @click="logout">
        <img src="@/assets/tron/Mine_slices/注销.png" alt="" />
        <span>{{ $t('logout') }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import Vue from 'vue'
import { NoticeBar } from 'vant'
import HeaderBar from '@/components/header-bar.vue'

Vue.use(NoticeBar)

export default {
  name: 'user',

  components: {
    HeaderBar,
  },

  data() {
    return {
      www: [],
      data: {
        money: 0,
        promotion: 0,
      },
      /* 待删除 */
      bg: '',
      footerType: 'n1',

      config: {},
      totalBalance: '0.000000',
    }
  },
  created() {
    console.log('this.$parent.getFooterType()', this.$parent.getFooterType())
    this.footerType = this.$parent.getFooterType()
    this.$parent.footer(true, 'info')
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      // 修复个别手机不能滚动到顶端
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      Fetch('/user/info').then((res) => {
        this.data = res.data //res赋值
        this.totalBalance = (
          Number(this.data.money) +
          Number(this.data.gift) +
          Number(this.data.promotion)
        ).toFixed(6)
      })
      /* 待删除 */
      Fetch('/index/webconfig', {
        type: 'bg',
      }).then((res) => {
        this.bg = 'url("' + res.data.login + '")'
      })
      Fetch('/index/webconfig', {
        type: 'web',
      }).then((res) => {
        this.config = res.data
      })
      /* 待删除 */
    },
    logout() {
      this.$parent.setFooterType('n1')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
    // 实名认证
    handleUSerCertification() {
      this.$router.push({ name: 'auth' })
    },
    // 站内信
    handleUSernnotice() {
      this.$router.push({ name: 'notice' })
    },
    // 设置
    handleSetting() {
      // auth
      this.$router.push({ name: 'account' })
    },
    // 查看明细
    handleGoFunds() {
      this.$router.push({ name: 'funds' })
    },
    // 充值
    handleRecharge() {
      this.$router.push({ name: 'recharge' })
    },
    // 提现
    handleWithdraw() {
      this.$router.push({ name: 'cash' })
    },
    // 我的服务跳转
    handleMyService(name) {
      if (name === 'protocol') {
        this.handleGoProtocol(1)
        return
      }
      if (name === 'privacy') {
        this.handleGoProtocol(2)
        return
      }
      this.$router.push({ name: name })
    },
    // 协议
    handleGoProtocol(type) {
      if (type === 1) {
        this.$router.push({ path: this.config.user_contract_link })
      }
      if (type === 2) {
        this.$router.push({ path: this.config.user_contract_ys_link })
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import 'index1';
</style>
