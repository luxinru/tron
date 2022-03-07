<template>
  <div class="account-security-container">
    <div class="account-security-item-box">
      <div class="account-security-item">
        <div class="account-security-item-left">
          <!-- <img src="./images/mobile-icon.png" /> -->
          <span>手机号</span>
        </div>
        <div class="account-security-item-right">
          <div>{{ getMobile(data.mobile) }}</div>
          <div><van-icon name="arrow" size="16" color="#C3C3C6" /></div>
        </div>
      </div>
      <div class="account-security-item" @click="handleGoChangePassword">
        <div class="account-security-item-left">
          <!-- <img src="./images/login-icon.png" /> -->
          <span>登录密码</span>
        </div>
        <div class="account-security-item-right">
          <div></div>
          <div><van-icon name="arrow" size="16" color="#C3C3C6" /></div>
        </div>
      </div>
      <!-- <div
        class="account-security-item"
        @click="handleGoPayPassword"
        v-if="footer_type === 'n2'"
      >
        <div class="account-security-item-left">
          <img src="./images/login-icon.png" />
          <span>支付密码</span>
        </div>
        <div class="account-security-item-right">
          <div></div>
          <div><van-icon name="arrow" size="16" color="#C3C3C6" /></div>
        </div>
      </div> -->
      <div class="account-security-item" @click="handleGoCertification">
        <div class="account-security-item-left">
          <!-- <img src="./images/name-icon.png" /> -->
          <span>实名认证</span>
        </div>
        <div class="account-security-item-right">
          <div>
            <span
              class="certification-icon"
              :class="{ 'no-certification': data.is_auth !== 'Y' }"
              >{{ data.is_auth === 'Y' ? '已认证' : '未认证' }}</span
            >
          </div>
          <div><van-icon name="arrow" size="16" color="#C3C3C6" /></div>
        </div>
      </div>
      <div class="account-security-item" @click="handleGoCertifications">
        <div class="account-security-item-left">
          <!-- <img src="./images/name-icon.png" /> -->
          <span>注销账号</span>
        </div>
        <div class="account-security-item-right">
          <div></div>
          <div><van-icon name="arrow" size="16" color="#C3C3C6" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      footer_type: 'n1',
      data: {}
    }
  },
  created () {
    this.$parent.footer(false)
    if (this.$parent.getFooterType() === 'n1') {
      this.$router.push('/account').catch(err => {
        err
      })
      this.$parent.footer(true, 'account')
    } else {
      this.$parent.footer(true, 'account')
      this.$data.footer_type = 'n2'
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      Fetch('/user/check_auth').then(res => {
        this.data = res.data
      })
    },
    // 修改密码
    handleGoChangePassword () {
      this.$router.push({ name: 'setpwd' })
    },
    handleGoPayPassword () {
      this.$router.push({ name: 'setpaypwd' })
    },
    // 认证
    handleGoCertification () {
      this.$router.push({ name: 'auth' })
    },
    //注销账号
    handleGoCertifications () {
      this.$router.push({ name: 'cancellation' })
    },
    getMobile (m) {
      if (m) {
        const n = m.split('')
        n.splice(3, 4, '****')
        return n.join('')
      }
      return ''
    },
    handleTreeListItemClick (type = 1) {
      switch (type) {
        case 1:
          this.checkin2()
          break
        case 2:
          this.$router.push({ name: 'scratch_card' })
          break
        case 88:
          this.$router.push({ name: 'canecllation' })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.account-security-container {
  min-height: 100vh;
  // margin-top: 12px;
  padding-top: 13px;
  background-color: #f5f4fa;
  // font-weight: 400;
  // font-family: PingFang SC;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  .account-security-item-box {
    // background-color: #fff;
    // font-size: 15px;
    // padding: 0 15px;
    background-color: #ffffff;
    // border-radius: 13px;
    padding: 0 12px;
    .account-security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 18px 15px 16px;
      // padding-top: 18px;
      // padding-bottom: 16px;
      // padding: 21px 0;
      padding-top: 18px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.14);
      &:last-child {
        border: none;
      }
      &-left {
        color: #000000;
      }
      &-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #a3a3a3;
        > div:first-child {
          margin-right: 20px;
        }
        .certification-icon {
          height: 18px;
          font-size: 12px;
          box-sizing: border-box;
          padding: 1px 8px;
          text-align: center;
          color: rgba(249, 138, 11, 1);
          background-color: #f5f9ff;
          border: 1px solid rgba(251, 101, 1, 1);
          border-radius: 4px;
          margin-left: 9px;
          &.no-certification {
            color: #a3a3a3;
            border: 1px solid #a3a3a3;
          }
        }
      }
    }
  }
}
</style>
