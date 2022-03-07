<template>
  <div id="app">
    <keep-alive>
      <div class="header" v-if="currentPath && title">
        <div class="box">
          <img src="@/assets/tron/返回(2)@2x.png" alt="" @click="handleBack" />
        </div>
        <span>{{ title }}</span>
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
              ? require('@/assets/tron/icon_slices/主页 拷贝.png')
              : require('@/assets/tron/icon_slices/主页 拷贝 2.png')
          "
        />
      </router-link>

      <router-link class="footer_item" to="/trading">
        <img
          :src="
            show_type == 'trading'
              ? require('@/assets/tron/icon_slices/trading 拷贝.png')
              : require('@/assets/tron/icon_slices/trading 拷贝 2.png')
          "
        />
      </router-link>

      <router-link class="footer_item" to="/new_invest"
        >

        <div class="img_box">
          <img src="@/assets/tron/投资组合.png" alt="">
        </div>
      </router-link>

      <router-link class="footer_item" to="/new_share"
        ><img
          :src="
            show_type == 'new_share'
              ? require('@/assets/tron/icon_slices/分享 拷贝.png')
              : require('@/assets/tron/icon_slices/分享 拷贝 2.png')
          "
        />
      </router-link>

      <router-link class="footer_item" to="/user"
        ><img
          :src="
            show_type == 'info'
              ? require('@/assets/tron/icon_slices/我 拷贝.png')
              : require('@/assets/tron/icon_slices/我 拷贝 2.png')
          "
        />
      </router-link>
    </div>
    <kefu></kefu>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import Fetch from './utils/fetch'
import kefu from './utils/kefu.vue'
import router from './router'
var path, title, currentPath
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  path = from.path
  currentPath = to.meta.hiddenTitle ? false : true
  title = to.meta.title
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
      currentPath: '/',
      idfa: '',
    }
  },

  beforeUpdate() {
    this.path = path
    this.title = title
    this.currentPath = currentPath
    console.log('this.$route :>> ', this.$route)
    const lang = this.$route.meta
      ? this.$route.meta.lang || undefined
      : undefined
    if (lang) {
      this.title = this.$t(lang)
    }
    console.log('currentPath', currentPath)
  },

  created() {
    var type = localStorage.getItem('footer')
    if (type) {
      this.footer_type = type
    }
  },
  mounted() {
    this.syncDevNo()
    this.timer = setInterval(() => {
      this.syncDevNo()
    }, 5000)
  },

  methods: {
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
<style lang="less">
* {
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  box-sizing: border-box;
}
</style>

<style lang="less" scoped>
#app {
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: 0 22px 14px;

    .box {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 16px;
      }
    }

    span {
      width: 100%;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
      margin-top: 8px;
    }
  }

  .footer_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100px;
    margin: 0 auto;
    z-index: 998;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    background: url('~@/assets/tron/矢量智能对象.png') no-repeat;
    background-size: 100% 100%;

    .footer_item {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 16px;
        margin-top: 37px;
      }

      &:nth-child(2) {
        img {
          width: 18px;
        }
      }

      &:nth-child(4) {
        img {
          width: 18px;
        }
      }

      .img_box {
        width: 66px;
        height: 66px;
        background: url('~@/assets/tron/椭圆 535.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -19px;

        img {
          width: 19px;
          height: 21px;
          margin-top: 0;
        }
      }
    }
  }
}

#app ::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
