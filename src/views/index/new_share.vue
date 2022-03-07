<template>
  <div class="page_root">
    <section class="header">{{ $t('share') }}</section>

    <section class="content">
      <img
        class="logo"
        src="@/assets/tron/Share_slices/3a55a99b40b8d458de6b526f5639df0ca17c7c4eb6e22-ApSyI5_fw1200.png"
        alt=""
      />

      <span class="title">{{ $t('invite_your_contacts') }}</span>
      <span class="sub_title">{{ $t('or_friends_and_earn_rewards') }}</span>

      <div class="code_box">
        <div class="code">
          <img :src="data.share_image_url" class="qrcode" />
        </div>
      </div>

      <span class="url">{{ data.register_url }}</span>

      <div class="btn" :data-clipboard-text="data.register_url" @click="copy">
        {{ $t('copy_link') }}
      </div>

      <div class="refer">
        <img
          src="@/assets/tron/Share_slices/b65ec548fe3e657e98c9ab73ae09d784724255f312716-LwzSb4.png"
          alt=""
        />
        <div class="info">
          <span>{{ $t('refer_and_earn_rewards') }}</span>
          <span>{{ $t('share_your_referal_link_and_start_earning') }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import Clipboard from 'clipboard'
export default {
  name: 'NewInvest',
  data() {
    return {
      data: {},
      active: 1,
    }
  },
  computed: {},
  created() {
    this.$parent.footer(true, 'new_share')
  },
  mounted() {
    this.start()
  },
  methods: {
    copy() {
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', (e) => {
        this.$notify({type: 'success', message: this.$t('copy_successfully')})
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$notify({type: 'danger', message: this.$t('copy_failed')})
        // 释放内存
        clipboard.destroy()
      })
    },
    start() {
      Fetch('/user/share').then((res) => {
        this.data = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  background: linear-gradient(40deg, #5e63e7 0%, #be92fe 100%);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 13px 16px;

  .header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background-color: transparent;
  }

  .content {
    width: 100%;
    padding: 10px 18px;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 300px;
      height: 138px;
      margin: 46px 0 0 65px;
    }

    .title {
      font-size: 21px;
      font-family: Arial;
      font-weight: bold;
      color: #394249;
      margin-top: 24px;
    }

    .sub_title {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4a5156;
      margin-top: 11px;
    }

    .code_box {
      width: 131px;
      height: 131px;
      background: rgba(180, 140, 255, 0.5);
      border-radius: 7px;
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;

      .code {
        width: 112px;
        height: 112px;
        background-color: #fff;
        .qrcode {
          width: 112px;
          height: 112px;
        }
      }
    }

    .url {
      margin-top: 18px;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
    }

    .btn {
      padding: 0 16px;
      height: 35px;
      background: #5e63e7;
      border-radius: 17px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }

    .refer {
      width: 312px;
      background: rgba(97, 100, 232, 0.2);
      border-radius: 20px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding: 8px 20px;

      img {
        width: 49px;
        height: 58px;
        margin-right: 16px;
      }

      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 17px;
        font-family: Arial;
        font-weight: bold;
        color: #1e253c;

        span {
          &:last-child {
            margin-top: 10px;
            font-size: 11px;
            font-family: Arial;
            font-weight: 400;
            color: #5e63e7;
          }
        }
      }
    }
  }
}
</style>
