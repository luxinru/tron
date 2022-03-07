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
    <div class="captcha" id="captcha" v-show="!showCaptcha"></div>
  </div>
</template>
<script type="text/javascript" charset="utf-8" src="//g.alicdn.com/sd/nvc/1.1.112/guide.js?t=2015052012"></script>
<script src="//g.alicdn.com/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      data: {
        telAddress: '中国大陆（+86）',
        username: '',
        password: '',
        mobile_system: 0,
        nc: null, // noCaptcha实例的值
      },
      loginTerms: true,
      bg: '',
      config: {},
      isShowAction: false,
      formAreaLabel: '+86',
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
      showCaptcha: true,
      checked: false,
    }
  },
  created() {
    this.$parent.footer(false)
    this.set_ALY_config().then((res) => {
      this.get_ALY_file()
    })
  },
  mounted() {
    window.returnIosIdfa = this.returnIosIdfa
    this.start()
  },
  methods: {
    onChangeLanguage(action) {
      window.localStorage.setItem('lang', action.value)
      window.location.reload()
    },

    start() {
      let that = this
      if (/LT-APP/.test(navigator.userAgent)) {
        // that.$notify('inapp:');
        this.data.mobile_system = 2
        jsBridge.getOAID(function (oaid) {
          if (oaid) {
            // alert(oaid);
            // that.$notify('oaid:'+oaid);
            Fetch('/index/check', {
              oaid: oaid,
              imei: '',
              os: 0,
              type: 1,
            }).then((res) => {})
          } else {
            jsBridge.getIMEI(function (imei) {
              // that.$notify('imei:'+imei);
              Fetch('/index/check', {
                imei: imei,
                os: 0,
                type: 1,
              }).then((res) => {})
            })
          }
        })
      } else {
        this.getIosIdfa()
      }
    },
    clear() {
      this.data.username = ''
    },
    getIosIdfa() {
      window.webkit.messageHandlers.idfa.postMessage({
        result: 'idfa',
      }) //app中接收到之后会回调给下面的函数
    },
    returnIosIdfa(idfa) {
      // this.$notify('idfa:'+idfa);
      this.data.mobile_system = 1
      Fetch('/index/check', {
        os: 1,
        imei: idfa,
        type: 1,
      })
    },

    tologin(nvc) {
      let _this = this
      Fetch('/index/newlogin', {
        username: _this.data.username,
        password: _this.data.password,
        nvc: nvc,
      }).then((res) => {
        console.log(res.data.BizCode)
        if (res.data.BizCode == 400) {
          //唤醒滑动验证
          getNC().then(function () {
            NoCaptcha.upLang('cn', {
              LOADING: _this.$t('loading'), //加载
              SLIDER_LABEL: _this.$t('please_slide_right_to_verify'), //等待滑动
              CHECK_Y: _this.$t('verification_passed'), //通过
              ERROR_TITLE: _this.$t('very_sorry_this_is_wrong'), //拦截
              CHECK_N: _this.$t('verification_failed'), //准备唤醒二次验证
              OVERLAY_INFORM: _this.$t('operating_environment'), //二次验证
              TIPS_TITLE: _this.$t('incorrect_verification_code'), //验证码输错时的提示
            })
            _nvc_nc.reset()
            _this.showCaptcha = false
          })
        } else if (res.data.BizCode == 100 || res.data.BizCode == 200) {
          //登录成功
          nvcReset()
          _this.showCaptcha = true
          if (res.data.token) {
            localStorage.setItem('token', res.data.token)
          }
          _this.$notify({
            background: '#07c160',
            message: _this.$t('login_successful'),
          })
          _this.$parent.setFooterType(res.data.footer)
          _this.$router.replace({
            path: /* this.$router.history.current.query.redirect || */ '/home',
          })
        } else if (res.data.BizCode == 800 || res.data.BizCode == 900) {
          //直接拦截
          nvcReset()
          _this.$notify({
            background: '#07c160',
            message: _this.$t('please_download', {
              url: 'https://ls.hzyuechuang.com/',
            }),
          })
        }
      })
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
    },
    // 选择地区
    handleSelectArea() {
      this.isShowAction = true
    },
    handleSelectAction(item) {
      this.formAreaLabel = item.labelName
      this.data = Object.assign({}, this.data, {
        telAddress: item.name,
      })
    },
    handleCancelAction() {
      this.isShowAction = false
    },
    // 动态加载js文件
    get_ALY_file() {
      try {
        var stamp = new Date().getTime()
        var script = document.createElement('script')
        script.setAttribute('type', 'text/javascript')
        script.setAttribute(
          'src',
          'https://g.alicdn.com/sd/nvc/1.1.112/guide.js?t=' + stamp
        )
        document.documentElement.appendChild(script)
      } catch (e) {}
    },
    set_ALY_config() {
      console.log('set_ALY_config')
      var _this = this
      return new Promise((resolve, reject) => {
        window.NVC_Opt = {
          //无痕配置 && 滑动验证、刮刮卡、问答验证码通用配置
          // appkey: "CF_APP_1",
          // scene: "nvc_register_h5",
          appkey: 'FFFF0N0000000000A5C6',
          scene: 'nvc_login_h5',
          isH5: true,
          popUp: false,
          renderTo: '#captcha',
          nvcCallback: function (data) {
            // console.log(data);
            _this.tologin(data)
            // data为getNVCVal()的值，此函数为二次验证滑动或者刮刮卡通过后的回调函数
            // data跟业务请求一起上传，由后端请求AnalyzeNvc接口，接口会返回100或者900
          },
          trans: {
            key1: 'code0',
            nvcCode: 400,
          },
          language: 'cn',
          //滑动验证长度配置
          customWidth: 240,
          //刮刮卡配置项
          width: 300,
          height: 100,
          elements: [
            '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
            '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
          ],
          bg_back_prepared:
            '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
          bg_front:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
          obj_ok: '//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
          bg_back_pass:
            '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
          obj_error:
            '//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
          bg_back_fail:
            '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
          upLang: {
            cn: {
              _ggk_guide: '请在屏幕上滑动，刮出两面盾牌',
              _ggk_success: '恭喜您成功刮出盾牌<br/>继续下一步操作吧',
              _ggk_loading: '加载中',
              _ggk_fail: [
                '呀，盾牌不见了<br/>请',
                'javascript:NoCaptcha.reset()',
                '再来一次',
                '或',
                'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
                '反馈问题',
              ],
              _ggk_action_timeout: [
                '我等得太久啦<br/>请',
                'javascript:NoCaptcha.reset()',
                '再来一次',
                '或',
                'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
                '反馈问题',
              ],
              _ggk_net_err: [
                '网络实在不给力<br/>请',
                'javascript:NoCaptcha.reset()',
                '再来一次',
                '或',
                'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
                '反馈问题',
              ],
              _ggk_too_fast: [
                '您刮得太快啦<br/>请',
                'javascript:NoCaptcha.reset()',
                '再来一次',
                '或',
                'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
                '反馈问题',
              ],
            },
          },
        }
        resolve()
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import 'login';
</style>
