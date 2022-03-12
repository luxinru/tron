<template>
  <div class="page_root">
    <section class="header">{{ $t('share') }}</section>

    <section class="content">

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
  background: url('~@/assets/tron/矢量智能对象 (3).png') no-repeat;
  background-size: 100% 812px;
  width: 100%;
  min-height: 812px;
  display: flex;
  flex-direction: column;
  padding: 0 13px;
  margin-bottom: 78px;

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
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 30px;
      font-family: Arial;
      font-weight: bold;
      color: #394249;
      margin-top: 148px;
    }

    .sub_title {
      font-size: 19px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4A5156;
      margin-top: 15px;
    }

    .code_box {
      width: 131px;
      height: 131px;
      margin-top: 33px;
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
      min-height: 29px;
      background: #FBFCFF;
      border-radius: 4px;
      padding: 0 14px;
      font-size: 10px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      margin-top: 17px;
    }

    .btn {
      min-height: 31px;
      padding: 0 27px;
      background: #4B95FE;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      margin-top: 17px;
    }

    .refer {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 200px;
      padding: 8px 20px;
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
          text-align: center;
          &:last-child {
            margin-top: 10px;
            font-size: 11px;
            font-family: Arial;
            font-weight: 400;
            color: #4B95FE;
          }
        }
      }
    }
  }
}
</style>
