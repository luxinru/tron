<template>
  <div id="app">
    <keep-alive>
      <div class="header" v-if="currentPath && title">
        <van-icon
          name="arrow-left"
          size="23"
          :color="color"
          @click="handleBack"
        />
        <div :style="`color: ${color}`">{{ title }}</div>
      </div>
    </keep-alive>
    <div>
      <router-view></router-view>
    </div>
    <div class="footer_nav" v-if="show_footer">
      <router-link class="footer_item" to="/home">
        <img
          :src="
            show_type == 'tree'
              ? require('@/assets/tron/icon_slices/home 拷贝.png')
              : require('@/assets/tron/icon_slices/home 拷贝 2.png')
          "
        />
        <span :class="{ active: show_type == 'tree' }">{{ $t('home') }}</span>
      </router-link>

      <router-link class="footer_item" to="/trading">
        <img
          :src="
            show_type == 'trading'
              ? require('@/assets/tron/icon_slices/交易 拷贝.png')
              : require('@/assets/tron/icon_slices/交易 拷贝 2.png')
          "
        />
        <span :class="{ active: show_type == 'trading' }">{{
          $t('trading')
        }}</span>
      </router-link>

      <!-- <router-link class="footer_item" to="/new_invest"><img :src="
            show_type == 'new_invest'
              ? require('@/assets/tron/icon_slices/invest_4 拷贝.png')
              : require('@/assets/tron/icon_slices/invest_4 拷贝 2.png')
          " />
				<span :class="{ active: show_type == 'new_invest' }">{{
          $t('invest')
        }}</span>
			</router-link> -->

      <div class="footer_item" @click="Toast({ message: $t('not_yet_open') })">
        <img
          :src="
            show_type == 'new_invest'
              ? require('@/assets/tron/icon_slices/invest_4 拷贝.png')
              : require('@/assets/tron/icon_slices/invest_4 拷贝 2.png')
          "
        />
        <span :class="{ active: show_type == 'new_invest' }">
          {{ $t('invest') }}
        </span>
      </div>

      <router-link class="footer_item" to="/new_share"
        ><img
          :src="
            show_type == 'new_share'
              ? require('@/assets/tron/icon_slices/share 拷贝.png')
              : require('@/assets/tron/icon_slices/share 拷贝 2.png')
          "
        />
        <span :class="{ active: show_type == 'new_share' }">{{
          $t('share')
        }}</span>
      </router-link>

      <router-link class="footer_item" to="/user"
        ><img
          :src="
            show_type == 'info'
              ? require('@/assets/tron/icon_slices/mine_fill 拷贝.png')
              : require('@/assets/tron/icon_slices/mine_fill 拷贝 2.png')
          "
        />
        <span :class="{ active: show_type == 'info' }">{{ $t('mine') }}</span>
      </router-link>
    </div>
    <kefu></kefu>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import Fetch from './utils/fetch'
import kefu from './utils/kefu.vue'
import router from './router'
import CheckTrans from './utils/tron.js'
var path, title, currentPath, color
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  path = from.path
  currentPath = to.meta.hiddenTitle ? false : true
  title = to.meta.title
  color = to.meta.color
  setTimeout(() => {
    window.$('body').scrollTop(0)
  })

  next()
})
export default {
  name: 'App',

  components: {
    kefu,
  },

  data() {
    return {
      footer_type: 'n1',
      show_footer: false,
      show_type: 'index',
      path: '/',
      title: '',
      color: '#1E253C',
      currentPath: '/',
      idfa: '',
      timerTron: null,
    }
  },

  beforeUpdate() {
    this.path = path
    this.title = title
    this.color = color
    this.currentPath = currentPath
    console.log('this.$route :>> ', this.$route)
    const lang = this.$route.meta
      ? this.$route.meta.lang || undefined
      : undefined
    if (lang) {
      this.title = this.$t(lang)
    }
  },

  created() {
    var type = localStorage.getItem('footer')
    if (type) {
      this.footer_type = type
    }
  },
  mounted() {
    this.syncDevNo()

    clearInterval(this.timerTron)
    this.timerTron = setInterval(() => {
      this.getTronTrans()
    }, 30000)
  },

  methods: {
    Toast: Toast,
    //是否显示底部
    footer: function (bool, show = 'index') {
      this.show_footer = bool
      this.show_type = show
    },
    setFooterType: function (type = 'n1') {
      console.log(type)
      this.footer_type = type
      localStorage.setItem('footer', type)
    },
    getFooterType: function () {
      return this.footer_type
    },
    tronCallback(t) {
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
      if (
        this.$route.name === 'register' ||
        this.$route.name === 'login' ||
        this.$route.name === 'kefu'
      ) {
        return false
      }
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
    syncDevNo() {
      if (this.title === '消息中心') {
        clearInterval(this.timer)
        return
      }
      Fetch('/index/sync', {}, null, false).then((r) => {
        this.footer_type = r.data.footer
        // this.footer_type = 'n2';
        localStorage.setItem('footer', this.footer_type)
        if (r.data.is_open_notice_dialog) {
          this.openNoticeDialog()
        }
      })
    },
    openNoticeDialog() {
      Dialog.confirm({
        title: '提示',
        message: '您有新消息，是否前往查看?',
      })
        .then(() => {
          this.$router.push('/notice').catch((err) => {
            err
          })
        })
        .catch(() => {
          return
        })
    },
    handleBack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.paddingTop {
  padding-top: 50px;
}

#app {
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .header {
    position: relative;
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #1E253C;

    i {
      position: absolute;
      left: 10px;
    }
  }

  .footer_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 78px;
    box-shadow: 0px -1px 5px rgba(89, 125, 172, 0.4);
    margin: 0 auto;
    z-index: 998;
    background-color: #fff;
    color: #7a7e83;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    overflow: hidden;

    .footer_item {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        height: 20px;
      }

      span {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #747474;
        text-align: center;
        margin-top: 11px;
      }

      .active {
        color: rgba(75, 149, 254, 1);
      }
    }
  }
}

.btn-group img {
  // background-color: #4CAF50; /* Green background */
  // border: 1px solid green; /* Green border */
  // color: white; /* White text */
  // padding: 10px 24px; /* Some padding */
  // cursor: pointer; /* Pointer/hand icon */
  // float: left; /* Float the buttons side by side */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: '';
  clear: both;
  display: table;
}

.btn-group img:not(:last-child) {
  border-right: none;
  /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group img:hover {
  // opacity: 10px;
  // border-radius: 50px;
  //    background-color: #3e8e41;
}

#app ::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

<style lang="less">
* {
  flex-shrink: 0;
  box-sizing: border-box;
}
</style>
