<template>
  <div class="page_root">
    <img
      class="back"
      src="@/assets/tron/返回 (2).png"
      alt=""
      @click="$router.go(-1)"
    />

    <section class="content">
      <span class="title">{{ type === '1' ? $t('transfer_to_basicaccount') : $t('transfer_to_promotion_account') }}</span>

      <div class="code_box" ref="codeBox">
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>

      <span class="sub_title">{{ $t('trx_address') }}</span>

      <span class="url">
        {{ address }}
      </span>

      <div
        class="btn"
        :data-clipboard-text="address"
        v-if="btn_show"
        @click="copy"
      >
        {{ $t('copy_address') }}
      </div>

      <div class="info">
        <span>
          {{ $t('recharge_other_text') }}
        </span>
        <span>
          {{ $t('investment_text') }}
        </span>
      </div>

      <div class="submit" v-if="btn_show" @click="tgHistory">
        {{ $t('recharge_completed') }}
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard'

export default {
  name: 'RechargePromotion',
  data() {
    return {
      qrcode: '',
      address: 'TUxsZ8Uh4E5ittAP2VKajGMQmVR3iihnT2',
      btn_show: false,
      uid: '',
    }
  },
  computed: {
    type () {
      return this.$route.query.type || '1'
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      setTimeout(() => {}, 0)

      // 获取钱包地址
      let that = this
      Fetch('/user/info').then((res) => {
        // that.$router.refresh();
        // this.dataInfo = res.data //res赋值
        var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
        httpRequest.open(
          'GET',
          'https://tron1688.com/api/createAccount?uid=' + res.data.mobile,
          true
        ) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send() //第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            // var json = httpRequest.responseText; //获取到json字符串，还需解析
            console.log(httpRequest.responseText)
            that.address = httpRequest.responseText
            that.creatQrCode()
            that.btn_show = true
            that.uid = res.data.mobile

            if (!that.address) {
              that.$router.refresh()
            }
          }
        }
      })

      Fetch('/index/int').then((res) => {
        console.log('res.data :>> ', res.data)
        this.ad = res.data.ad
        this.data = res.data

        if (res.data.ad.activity_status == 1) {
          this.ad_show = true
        } else {
          this.ad_show = false
        }
      })

      // 兑换信息
      // this.category_data = []
      // Fetch('/index/goods_list').then((res) => {
      //   const { category } = res.data
      //   if (category.length && category[0].list && category[0].list.length) {
      //     this.category_data = category[0].list.splice(0, 2)
      //   }

      //   for (var i = 0; i < res.data.category.length; i++) {
      //     this.dh_num.push([])
      //     for (var j = 0; j < res.data.category[i].list.length; j++) {
      //       this.dh_num[i].push(1)
      //     }
      //   }
      //   console.log('this.category_data', this.category_data)
      // })

      /* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

      // Fetch('/index/banner', {
      //   type: 'banner',
      // }).then((res) => {
      //   this.banner = res.data
      // })
    },

    creatQrCode() {
      const { clientWidth, clientHeight } = this.$refs.codeBox
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.address,
        width: clientWidth - 10,
        height: clientHeight - 10,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
    },

    copy() {
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', (e) => {
        console.log('e :>> ', e);
        this.$notify({ type: 'success', message: this.$t('copy_successfully') })
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        console.log('e :>> ', e);
        // 不支持复制
        this.$notify({ type: 'danger', message: this.$t('copy_failed') })
        // 释放内存
        clipboard.destroy()
      })
    },
    tgHistory() {
      var that = this
      var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
      httpRequest.open(
        'GET',
        'https://tron1688.com/api/triggerRecharge?uid=' + this.uid,
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
          let trx = res['trx']
          let txID = res['txID']
          if (!trx) {
            return
          }

          that.submit(trx, txID)
        }
      }

      this.$router.push('/home').catch((err) => {
        console.log('err :>> ', err);
      })
    },
    submit(trx, txID) {
      Fetch('/user/trx_apply', {
        trx: trx,
        remark: '',
        txID: txID,
        rid: 0,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: this.$t('submitted_successfully'),
        })
        this.$router.push('/home').catch((err) => {
          console.log('err :>> ', err);
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  position: relative;
  width: 100%;
  min-height: 812px;
  height: max-content;
  display: flex;
  flex-direction: column;
  background: url('~@/assets/tron/波场 2 拷贝 2.png') no-repeat;
  background-size: 100% 100%;

  .back {
    position: absolute;
    left: 23px;
    top: 24px;
    width: 18px;
    z-index: 1;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 34px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #fffdfd;
      margin-top: 150px;
      text-align: center;
    }

    .code_box {
      width: 135px;
      height: 135px;
      background: #fff;
      margin-top: 35px;
      display: flex;
      align-items: center;
      justify-content: center;

      .qrcode {
        width: 125px;
        height: 125px;
        background-color: #fff;
      }
    }

    .sub_title {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-top: 20px;
    }

    .url {
      margin-top: 14px;
      background: #fafafa;
      border: 1px solid #cccccc;
      border-radius: 4px;
      padding: 10px 24px;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #d50a0a;
      word-break: break-all;
    }

    .btn {
      height: 35px;
      padding: 0 16px;
      background: rgba(157, 31, 35, 1);
      border-radius: 4px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 14px;
    }

    .info {
      width: 291px;
      min-height: 146px;
      margin-top: 26px;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 16px;
      background: url('~@//assets/tron/组 3.png') no-repeat;
      background-size: 100% 100%;
      padding: 22px 20px;

      span {
        width: 100%;
        text-align: center;

        &:last-child {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 17px;
        }
      }
    }

    .submit {
      width: calc(100% - 42px);
      height: 47px;
      background: #ffffff;
      border-radius: 4px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d50a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px auto 0;
    }
  }
}
</style>
