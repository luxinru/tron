<template>
  <div class="page_root">
    <section class="content">
      <span class="sub_title">{{ $t('or_friends_and_earn_rewards') }}</span>
      <span class="title">{{ $t('invite_your_contacts') }}</span>

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
  min-height: 812px;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;
  background: url('~@/assets/tron/Share@2x.png') no-repeat;
  background-size: 100% 812px;

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 27px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      margin-top: 16px;
    }

    .sub_title {
      font-size: 17px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 100px;
    }

    .info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      line-height: 13px;
      text-shadow: 0px 1px 5px #5f0602;
      margin-top: 270px;
      text-align: center;

      span {
        &:last-child {
          margin-top: 31px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0px 1px 5px #5f0602;
        }
      }
    }

    .code_box {
      width: 131px;
      height: 131px;
      margin-top: 42px;
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
      margin-top: 16px;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
    }

    .btn {
      padding: 10px 30px;
      background: #ffffff;
      border-radius: 4px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1f4c9a;
      margin-top: 10px;
    }
  }
}
</style>
