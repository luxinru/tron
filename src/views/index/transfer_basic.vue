<template>
  <div class="page_root">
    <div class="header">
      <div class="head" style="background: transparent; color: #fff">
        <van-icon
          name="arrow-left"
          size="23"
          color="#fff"
          @click="$router.go(-1)"
        />
        <!--<router-link :to="path" class="back"></router-link>-->
        <div></div>
        <div></div>
      </div>
    </div>

    <span class="title">{{ $t('transfer_to_promotion_account') }}</span>

    <section class="content">
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
    </section>

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
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard'
import CheckTrans from '../../utils/tron.js'
export default {
  name: 'RechargePromotion',
  data() {
    return {
      qrcode: '',
      address: 'Please wait. Loading...',
      btn_show: false,
      uid: '',
    }
  },
  computed: {},
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
            // console.log(httpRequest.responseText)
            that.address = httpRequest.responseText
            that.creatQrCode()
            that.btn_show = true
            that.uid = res.data.mobile
            if (!that.address) {
              that.$router.refresh()
            }
            Fetch('/user/get_tron_account', {
              account: that.address,
            }).then((res) => {})
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
        width: clientWidth - 20,
        height: clientHeight - 20,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
    },

    copy() {
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', (e) => {
        this.$notify({
          type: 'success',
          message: this.$t('copy_successfully'),
        })
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$notify({
          type: 'danger',
          message: this.$t('copy_failed'),
        })
        // 释放内存
        clipboard.destroy()
      })
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
      this.getTronTrans()
      this.$router.push('/home').catch((err) => {})
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
        this.$router.push('/home').catch((err) => {})
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
  align-items: center;
  padding: 0 13px;
  background: url('~@/assets/tron/组 1.png') no-repeat;
  background-size: 100% 812px;

  .header {
    position: relative;
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

    .arrow {
      position: absolute;
      left: 0;
    }
  }

  .title {
    font-size: 32px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(255, 253, 253, 0.9);
    text-align: center;
    margin-top: 40px;
  }

  .content {
    width: 286px;
    min-height: 303px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 118px;

    .code_box {
      width: 131px;
      height: 131px;
      background: #fff;
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;

      .qrcode {
        width: 112px;
        height: 112px;
        background-color: #fff;
      }
    }

    .sub_title {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #194998;
      margin-top: 18px;
    }

    .url {
      margin-top: 18px;
      width: 244px;
      min-height: 49px;
      background: #FFFFFF;
      border: 1px solid #194998;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      padding: 0 8px;
      word-break: break-all;
    }

    .btn {
      padding: 10px 30px;
      border-radius: 4px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
      margin: 20px 0 25px 0;
      background-color: rgba(31, 76, 154, 1);
    }
  }

  .info {
      width: 286px;
      margin-top: 21px;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);

      span {
        width: 100%;
        text-align: center;

        &:last-child {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(138, 255, 254, 0.7);
          margin-top: 17px;
        }
      }
    }

    .submit {
      position: fixed;
      width: calc(100% - 26px);
      margin: 0 auto;
      height: 47px;
      background: #ED6608;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      bottom: 16px;
    }
}
</style>
