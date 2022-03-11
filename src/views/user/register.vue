<template>
  <div class="register-container">
    <div class="header_title">
      {{ $t('sign_up') }}
    </div>

    <div class="register-box">
      <span class="title">{{ $t('mobile_number') }}</span>
      <div class="item">
        <input
          type="number"
          v-model="data.mobile"
          :placeholder="$t('please_enter_your_mobile_phone_number')"
        />
      </div>

      <span class="title">{{ $t('login_password') }}</span>
      <div class="item">
        <input
          type="password"
          v-model="data.password"
          :placeholder="$t('please_enter_your_login_password')"
        />
      </div>

      <span class="title">{{ $t('confrm_password') }}</span>
      <div class="item">
        <input
          type="password"
          v-model="data.cpassword"
          :placeholder="$t('confirm_password_can_not_be_blank')"
        />
      </div>
      <span class="title">{{ $t('security_password') }}</span>
      <div class="item">
        <input
          type="password"
          v-model="data.spassword"
          :placeholder="$t('please_enter_your_security_password')"
        />
      </div>

      <span class="title">{{ $t('invite_code') }}</span>
      <div class="item">
        <input
          v-model="data.t_mobile"
          :placeholder="$t('please_enter_your_invite_code')"
        />
      </div>

      <div class="login-footer">
        <div class="remember">
          <van-checkbox v-model="checked" checked-color="rgba(138, 7, 231, 1)"
            >{{ $t('encrypted_registration') }}
          </van-checkbox>
        </div>
        <div class="tips">
          {{ $t('register_text') }}
        </div>
      </div>
    </div>

    <div class="register-btn" @click="handleSubmit">
      {{ $t('sign_up') }}
    </div>
    <div class="forget" @click="handleLogin">{{ $t('sign_in') }}</div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  data() {
    return {
      bg: '',
      data: {
        mobile: '',
        password: '',
        spassword: '',
        cpassword: '',
        // code: '',
        t_mobile: '',
      },
      checked: false,
      config: {},
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.data.t_mobile = this.$route.query.m
    this.start()
  },
  methods: {
    start() {
      Fetch('/index/webconfig', {
        type: 'bg',
      }).then((res) => {
        this.bg = 'url("' + res.data.reg + '")'
      })
      Fetch('/index/webconfig', {
        type: 'web',
      }).then((res) => {
        this.config = res.data
      })
    },
    clear() {
      this.data.username = ''
    },

    handleSubmit() {
      if (!this.data.mobile) {
        this.$notify(this.$t('mobile_phone_number_cannot_be_blank'))
        return
      }

      if (!this.data.password) {
        this.$notify(this.$t('login_password_cannot_be_blank'))
        return
      }

      if (this.data.password !== this.data.cpassword) {
        this.$notify(this.$t('does_not_match'))
        return
      }

      if (!this.data.spassword) {
        this.$notify(this.$t('please_enter_your_security_password'))
        return
      }

      // if (!this.data.code && this.config.sms_verify) {
      // 	this.$notify(this.$t('please_enter_verification_code));
      // 	return;
      // }

      if (!this.checked) {
        this.$notify(this.$t('please_agree_to_the_user_agreement'))
        return
      }

      Fetch('/index/register', {
        ...this.data,
      }).then((res) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
        }
        this.$notify({
          background: '#07c160',
          message: this.$t('registration_success'),
        })
        this.$router.replace('/home')
        // 安卓原生
        if (/LT-APP/.test(navigator.userAgent)) {
          // this.$router.replace('/home');
        } else {
          // ios原生
        }
      })
    },

    // 登录
    handleLogin() {
      this.$router.push({
        name: 'login',
      })
    },
    // 隐私协议
    handleGoPrivacyPolicy() {
      this.$router.push({
        path: this.config.user_contract_ys_link,
      })
    },
    // 用户条款
    handleGoUserTerms() {
      this.$router.push({
        path: this.config.user_contract_link,
      })
    },
    // 选择地区
    handleSelectArea() {
      this.isShowAction = true
    },

    handleBack() {
      this.$router.push({
        name: 'login',
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import 'register';
</style>
