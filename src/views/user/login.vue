<template>
  <div class="login-container">
    <div class="lang">
      <van-popover
        v-model="showPopover"
        trigger="click"
        placement="bottom-start"
        :actions="actions"
        @select="onChangeLanguage"
      >
        <template #reference>
          <img src="@/assets/tron/Home_slices/组 101.png" />
        </template>
      </van-popover>
    </div>

    <div class="login-box">
      <span class="title">{{ $t('mobile_number') }}</span>
      <div class="item">
        <input
          type="number"
          v-model="data.username"
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

      <div class="remember">
        <van-checkbox v-model="checked" checked-color="rgba(138, 7, 231, 1)"
          >{{ $t('remember_the_password') }}
        </van-checkbox>
      </div>

      <div class="login-btn" @click="handleSubmit">
        <div class="kuai">
          <img src="@/assets/tron/长箭头2@2x.png" alt="" />
        </div>
        {{ $t('sign_in') }}
      </div>

      <div class="forget" @click="handleGoRegister">{{ $t('sign_up') }}</div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      data: {
        username: '',
        password: ''
      },
      config: {},
      showPopover: false,
      actions: [
        {
          text: 'English',
          value: 'en',
        },
        {
          text: '한국어',
          value: 'kr',
        },
        {
          text: '日本語',
          value: 'jp',
        },
        {
          text: 'بالعربية',
          value: 'ar',
        },
        {
          text: 'Deutsch',
          value: 'de',
        },
        {
          text: 'Français',
          value: 'fr',
        },
        {
          text: 'português',
          value: 'pt',
        },
        {
          text: 'Türk',
          value: 'tr',
        },
        {
          text: 'Español',
          value: 'es',
        },
        {
          text: 'IndonesiaName',
          value: 'id',
        },
      ],
      checked: false,
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    // this.start()
  },
  methods: {
    onChangeLanguage(action) {
      window.localStorage.setItem('lang', action.value)
      window.location.reload()
    },
    clear() {
      this.data.username = ''
    },

    handleSubmit() {
      if (!this.data.username) {
        this.$notify(this.$t('mobile_phone_number_cannot_be_blank'))
        return
      }

      if (!this.data.password) {
        this.$notify(this.$t('login_password_cannot_be_blank'))
        return
      }

      Fetch('/index/login', {
        username: this.data.username,
        password: this.data.password,
      })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token)
          }
          this.$parent.setFooterType(res.data.footer)
          this.$notify({
            background: '#07c160',
            message: this.$t('login_successful'),
          })
        })
        .then(() => {
          this.$router.replace({
            path: /* this.$router.history.current.query.redirect || */ '/home',
          })
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
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({
        name: 'forgetpwd',
      })
    },
    // 注册
    handleGoRegister() {
      this.$router.push({
        name: 'register',
      })
    }
  },
}
</script>

<style lang="less" scoped>
@import 'login';
</style>
