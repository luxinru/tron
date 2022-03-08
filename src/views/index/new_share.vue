<template>
  <div class="page_root">
    <section class="content">
      <span class="title">{{ $t('invite_your_contacts') }}</span>
      <span class="sub_title">{{ $t('or_friends_and_earn_rewards') }}</span>

      <div class="info">
        <span>{{ $t('refer_and_earn_rewards') }}</span>
        <span>{{ $t('share_your_referal_link_and_start_earning') }}</span>
      </div>

      <div class="code_box">
        <div class="code">
          <img :src="data.share_image_url" class="qrcode" />
        </div>
      </div>

      <span class="url">{{ data.register_url }}</span>

      <div class="btn" :data-clipboard-text="data.register_url" @click="copy">
        {{ $t('copy_link') }}
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
        this.$notify({ type: 'success', message: this.$t('copy_successfully') })
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$notify({ type: 'danger', message: this.$t('copy_failed') })
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
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('~@/assets/tron/组 31.png') no-repeat;
  background-size: 100% 812px;
  margin-bottom: 80px;

  .content {
    width: 100%;
    padding: 10px 18px;
    border-radius: 13px;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      font-size: 33px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      line-height: 39px;
      margin-top: 96px;
    }

    .sub_title {
      width: 100%;
      font-size: 17px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      line-height: 20px;
      margin-top: 15px;
    }

    .code_box {
      width: 130px;
      height: 130px;
      background: #fff;
      margin-top: 59px;
      display: flex;
      align-items: center;
      justify-content: center;

      .code {
        width: 128px;
        height: 128px;
        background-color: #fff;
        .qrcode {
          width: 128px;
          height: 128px;
        }
      }
    }

    .url {
      width: 158px;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      line-height: 16px;
      margin-top: 24px;
    }

    .btn {
      width: 124px;
      height: 40px;
      background: #FFFFFF;
      border-radius: 3px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #D50A0A;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 21px;
    }

    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 19px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.8);
      line-height: 32px;
      margin-top: 77px;
    }
  }
}
</style>
