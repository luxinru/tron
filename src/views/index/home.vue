<template>
  <div class="page_root">
    <HeaderBar></HeaderBar>

    <section class="header">
      <div class="total">
        <span class="total_value">{{ totalBalance }}<span>TRX</span></span>
        <span class="total_ex"
          >≈ ＄{{ (totalBalance * price_in_usd).toFixed(2) }}</span
        >
        <span class="total_title"
          >{{ $t('total_balance') }}
          <img src="@/assets/tron/刷新 (3).png" @click="tgHistory()" />
        </span>
      </div>

      <section class="function">
        <div class="item" @click="$router.push('/new_recharge')">
          <img src="@/assets/tron/Home_slices/组 102.png" />
          <span>{{ $t('deposit') }}</span>
        </div>
        <div class="item" @click="$router.push('/new_withdrawal')">
          <img src="@/assets/tron/Home_slices/组 102 拷贝.png" />
          <span>{{ $t('withdrawal') }}</span>
        </div>
        <div class="item" @click="$router.push('/new_share')">
          <img src="@/assets/tron/Home_slices/组 102 拷贝 2.png" />
          <span>{{ $t('share') }}</span>
        </div>
        <div class="item" @click="$router.push('/team')">
          <img src="@/assets/tron/Home_slices/组 102 拷贝 3.png" />
          <span>{{ $t('team') }}</span>
        </div>
      </section>

      <van-notice-bar
        class="notice_bar"
        background="#ffffff"
        color="#1B0A1C"
        :text="data.notice"
        @click="$router.push('/new_notice')"
      >
        <template #left-icon>
          <img src="@/assets/tron/Home_slices/212喇叭 (1).png" />
        </template>
      </van-notice-bar>
    </section>

    <section class="platform">
      <span class="platform_title">{{ $t('platform_data_display') }}</span>

      <div class="wallet_info">
        <div class="item">
          <img src="@/assets/tron/Home_slices/Wallet.png" alt="" />
          <div class="info">
            <div class="info_title">{{ $t('wallet') }}</div>
            <div class="info_value">
              <span class="value">{{ dataInfo.money }}</span>
              <span class="value"
                >≈ $ {{ (dataInfo.money * price_in_usd).toFixed(2) }}</span
              >
            </div>
          </div>
        </div>

        <div class="item">
          <img src="@/assets/tron/Home_slices/皇冠.png" alt="" />
          <div class="info">
            <div class="info_title">{{ $t('promotion') }}</div>
            <div class="info_value">
              <span class="value">{{ dataInfo.promotion }}</span>
              <span class="value"
                >≈ $ {{ (dataInfo.promotion * price_in_usd).toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="millionaire">
        <span class="platform_title">{{ $t('millionaire') }}</span>

        <div class="box">
          <div class="tip">
            {{ $t('technology') }}
          </div>

          <img src="@/assets/tron/Home_slices/波场 2(1).png" />
        </div>
      </div>

      <span class="platform_title">{{
        $t('platform_data_display')
      }}</span>

      <div class="wallet_info2">
        <div class="item">
          <img src="@/assets/tron/Home_slices/利润.png" />
          <div class="info">
            <div class="info_title">{{ $t('accumulated_profit') }}</div>
            <div class="info_value">
              <span class="value">{{ block * price_in_usd * 15 }}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/tron/Home_slices/membership.png" />
          <div class="info">
            <div class="info_title">{{ $t('membership') }}</div>
            <div class="info_value">
              <span class="value">{{ block }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ablout">
        <span class="platform_title">{{ $t('about_us') }}</span>

        <div class="box">
          <img src="@/assets/tron/Home_slices/色相／饱和度 1(1).png" />

          <div class="introduce">
            {{ $t('cost_effective') }}
          </div>
        </div>

        <!-- <div class="tip">{{ $t('we_are_at_our_best') }}</div> -->
      </div>

      <span class="platform_title" style="margin-top: 38px">{{
        $t('global_partners')
      }}</span>

      <div class="brand">
        <img src="@/assets/tron/图层7@2x.png" alt="">
      </div>
    </section>

    <van-dialog class="dialog" v-model="isShowModel" :showConfirmButton="false">
      <div v-html="ad.activity_content" @click="goAd()"></div>
      <div class="btn" @click="isShowModel = false">{{ $t('confirm') }}</div>
    </van-dialog>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import CheckTrans from '../../utils/tron.js'
import HeaderBar from '@/components/header-bar.vue'

export default {
  name: 'index',

  components: {
    HeaderBar,
  },

  data() {
    return {
      isShowModel: false,
      footer_type: 'n1',
      dataInfo: {},
      data: {
        app: {},
        notice: '',
      },
      down_show: true,
      link_width: 0,
      banner: [],
      notice: '',
      links: [],
      type: 'n1',
      ad: {},
      examinationData: [
        {
          id: '1',
          name: 'one',
          question: '...',
        },
      ],
      indexMenuType: 1,
      category_data: [],
      dh_num: [],

      price_in_usd: 0.0,
      block: '',
      totalBalance: '0.000000',
    }
  },
  computed: {
    indexMenuInfoBackClasses() {
      return `info-back-class-${this.indexMenuType}`
    },
  },
  created() {
    if (this.$parent.getFooterType() === 'n1') {
      this.$router.push('/home').catch((err) => {
        err
      })
      this.$parent.footer(true, 'tree')
    } else {
      this.$parent.footer(true, 'tree')
      this.$data.footer_type = 'n2'
    }
  },
  mounted() {
    this.start()
    var that = this
    var bslua = navigator.userAgent
    if (bslua.indexOf('bsl') != -1) {
      that.down_show = false
    }

    // if (window.sessionStorage.getItem('isShowModel') !== '1') {
    //   this.isShowModel = true
    //   window.sessionStorage.setItem('isShowModel', '1')
    // }
  },
  methods: {
    logout() {
      this.$parent.setFooterType('n1')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
    goAd() {
      // this.close();
      // this.$router.push(this.ad.url).catch(err => {err});
      this.close()
      this.$router.push(this.ad.url)
    },
    getIputValue(index) {
      // console.log(index + 1 + "题" + this.radio);
      this.allRadio[index] = this.radio[index] // 将数据存入提交给后台的数据中
      console.log(this.allRadio)
      // console.log(this.radio)
    },
    toBox(title = '', contain = '') {
      var newsBox = document.getElementsByClassName('modal')[0]
      newsBox.style.display = 'block'

      var bodyBox = document.getElementsByClassName('body-box')[0]
      bodyBox.innerHTML = contain
      var newsTitle = document.getElementsByClassName('news-title')[0]
      newsTitle.innerText = title
    },
    checkin2() {
      this.$router.push('/qiandao')
    },
    closeBox() {
      var newsBox = document.getElementsByClassName('modal')[0]
      newsBox.style.display = 'none'
    },

    appdown_close() {
      this.data.app.is_disable = 'N'
    },
    close() {
      this.isShowModel = false
    },
    category_btn(id, num) {
      Fetch('/index/shop_exchange', {
        gid: id,
        num: num,
      }).then((res) => {
        this.$notify({
          background: '#07c160',
          message: res.info,
        })
      })
    },
    start() {
      this.getTRXPrice()
      this.getTRXBlock()
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      this.type = this.$parent.getFooterType()
      Fetch('/user/info').then((res) => {
        this.dataInfo = res.data //res赋值
        this.totalBalance = (
          Number(this.dataInfo.money) +
          Number(this.dataInfo.gift) +
          Number(this.dataInfo.promotion)
        ).toFixed(6)
      })

      Fetch('/index/int').then((res) => {
        console.log('res.data :>> ', res.data)
        this.ad = res.data.ad
        this.data = res.data

        if (res.data.ad.activity_status == 1) {
          this.isShowModel = true
        } else {
          this.isShowModel = false
        }
      })
    },
    onChange(index) {
      let els = this.$refs.dian.querySelectorAll('div')
      for (let i = 0; i < els.length; i++) {
        els[i].className = ''
      }
      els[index].className = 'selected'
    },
    schedule(schedule) {
      return {
        width: schedule + '%',
      }
    },
    schedule_left(schedule) {
      if (schedule > 80) {
        return {
          left: schedule - 30 + '%',
          color: '#fff',
        }
      } else {
        return {
          left: schedule.slice(0, 5) + '%',
        }
      }
    },

    handleTreeListItemClick(type = 1) {
      switch (type) {
        case 1:
          this.checkin2()

          break
        case 2:
          this.$router.push({
            name: 'scratch_card',
          })
          break
        case 3:
          this.$router.push({
            name: 'sport_event',
          })
          break
        case 4:
          this.$router.push({
            name: 'wenjuan',
          })
          break
        case 5:
          this.$router.push({
            name: 'prize',
          })
          break
        case 6:
          this.$router.push({
            name: 'goods',
          })
          break
        case 7:
          this.$router.push({
            name: 'item',
          })
          break
        case 8:
          this.$router.push({
            name: 'baoku',
          })
          break
        case 9:
          this.$router.push({
            name: 'qiandao',
          })
          break
        case 10:
          this.$router.push({
            name: 'alipay',
          })
          break
        case 11:
          this.$router.push({
            name: 'about',
          })
          break
        case 12:
          this.$router.push({
            name: 'auth',
          })
          break
        case 13:
          this.$router.push({
            name: 'alipay',
          })
          break
      }
    },
    handleMenuSwitch(type) {
      if (this.indexMenuType === type) return
      this.indexMenuType = type
    },
    goToDetail() {
      if (this.indexMenuType == 1) {
        this.handleTreeListItemClick(9)
      }
      if (this.indexMenuType == 2) {
        this.$router.push('/question_type')
      }
      if (this.indexMenuType == 3) {
        this.$router.push('/share')
      }
      if (this.indexMenuType == 4) {
        this.$router.push('/alipay')
      }
    },

    getTRXPrice() {
      var that = this
      var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
      httpRequest.open(
        'GET',
        'https://apilist.tronscan.org/api/token/price?token=trx',
        true
      ) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
      httpRequest.send() //第三步：发送请求  将请求参数写在URL中
      /**
       * 获取数据后的处理程序
       */
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          // 如果返回了非0数字，证明钱包系统没有确认上分，平台发起充值记录(需手动确认)
          let res = JSON.parse(httpRequest.responseText)
          // console.log(res)
          that.price_in_usd = Number(res.price_in_usd).toFixed(6)
        }
      }
    },

    getTRXBlock() {
      // https://apilist.tronscan.org/api/system/status
      var that = this
      var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
      httpRequest.open(
        'GET',
        'https://apilist.tronscan.org/api/system/status',
        true
      ) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
      httpRequest.send() //第三步：发送请求  将请求参数写在URL中
      /**
       * 获取数据后的处理程序
       */
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          // 如果返回了非0数字，证明钱包系统没有确认上分，平台发起充值记录(需手动确认)
          let res = JSON.parse(httpRequest.responseText)
          // console.log(res)
          that.block = (Number(res.database.block) / 1000).toFixed(0)
        }
      }
    },
    tronCallback(t) {
      alert(111)
      if (!t['data']) {
        return
      }
      let data = t['data']
      let sortArr = []
      let totalAmount = 0
      let value = null
      for (let i = 0; i < data.length; i++) {
        value = data[i]['raw_data']['contract'][0]['parameter']['value']
        let amount = value['amount'] ? value['amount'] : 0
        let txID = data[i]['txID']
        // 处理激活1TRX造成的回调失败,激活账户的数据要去掉
        if (amount > 100000) {
          value['txID'] = txID
          sortArr.push(value)
          // 总充值
          totalAmount += amount
        }
      }

      // 对账
      Fetch('/user/get_sum_recharge', {}, null, false).then((ret) => {
        let recharge = ret.data.sum_recharge
        // console.log(totalAmount / 1000000 , value)
        // 有新订单了
        if (Math.abs(totalAmount / 1000000 - recharge) > 5) {
          // 查询钱包后台
          const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }

          fetch(
            'https://tron1688.com/api/GetTransactionBytxId?phone=' +
              ret.data.phone +
              '&txid=' +
              sortArr[0]['txID'] +
              '&amount=' +
              sortArr[0]['amount'],
            options
          )
            .then((response) => response.json())
            .then((response) => response)
            .catch((err) => err)
        }
      })
    },
    getTronTrans() {
      let that = this
      Fetch('/user/get_address', {}, null, false).then((ret) => {
        //地址不为空的时候继续往下查
        if (ret.data) {
          // 获取apikey
          Fetch('/user/get_api_key', {}, null, false).then((res) => {
            if (!res.data) {
              return
            }
            CheckTrans(ret.data, res.data, that.tronCallback)
          })
        }
      })
    },
    tgHistory() {
      // 查询历史订单
      // this.getTronTrans()
      this.$router.push('/home').catch((err) => {})
    },
    submit(trx, txID) {
      Fetch('/user/trx_apply', {
        trx: trx,
        remark: '',
        txID: txID,
        rid: 0,
      }).then((res) => {
        if (res.code == 1) {
          Fetch('/user/autoAgree', {
            txID: txID,
          }).then((res1) => {
            if (res1.code == 1) {
              var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
              httpRequest.open(
                'GET',
                'https://tronUrls.com/api/confrimByTxID?txID=' + txID,
                true
              ) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
              httpRequest.send() //第三步：发送请求  将请求参数写在URL中
              /**
               * 获取数据后的处理程序
               */
              httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                }
              }
            }

            this.$router.go(0)
          })
        }
        this.$notify({
          background: '#07c160',
          message: this.$t('please_click_refresh_every_few_minutes'),
        })
        // this.$router.go(0)
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import 'tree';
</style>
