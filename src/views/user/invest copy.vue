<template>
  <div class="page">
    <div class="item" v-for="(item, key) in data.list" :key="key">
      <!-- <div class="color-line"></div> -->
      <div
        class="statusBox"
        :class="
          item.status == '1' ? 'statusB' : item.status == '2' ? 'statusC' : ''
        "
      >
        {{
          item.status == '0' ? '待审核' : item.status == '1' ? '已审核' : '失败'
        }}
      </div>
      <div class="info">
        <img class="logo" src="./images/recharge_alipay.png" />
        <div style="width: 190px;">
          <span class="channel">{{ item.type }}</span>
          <p class="time">充值时间：{{ item.time | dateFormat }}</p>
        </div>
        <span class="money">+{{ item.money }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';
import moment from 'moment';

export default {
  name: 'index',
  components: {},
  data() {
    return {
      data: {
        list: [
            // { type: 0, money: '300', status: '1', time: '20012'}
        ]
      },
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format('YYYY-MM-DD');
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch('/user/recharge_record').then((res) => {
        this.data = res.data;
      });
    },
    status(v) {
      if (v == '0') {
        return 'color: #FACB58;';
      }

      if (v == '1') {
        return 'color:#E6A23C';
      }

      if (v == '2') {
        return 'color:#E85420';
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  font-family: PingFang SC;
  background-color: #f7f7fa;
  border: 1px solid transparent;
  box-sizing: border-box;
  .statusBox {
    position: absolute;
    top: 8px;
    right: -30px;
    width: 100px;
    height: 20px;
    line-height: 20px;
    background-color: #2487fe;
    text-align: center;
    transform: rotate(45deg);
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff !important;
  }
  .statusB {
    background-color: #fab101;
  }
  .statusC {
    background-color: #fe5656;
  }
  .item {
    margin-top: 13.8px;
    padding: 17px 23px 18px 20px;
    display: flex;
    width: 348px;
    height: 84px;
    margin-left: 13px;
    position: relative;
    border-radius: 7px;
    overflow: hidden;
    background-color: white;
    .color-line {
      position: absolute;
      width: 5px;
      height: 100%;
      background: #fed874;
      top: 0;
      left: 0;
    }
    .type-icon {
      width: 38px;
      height: 38px;
      margin-right: 13px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      &.recharge_bank {
        background-image: url('images/recharge_online.png');
      }

      &.recharge_wx_bank {
        background-image: url('images/recharge_online.png');
      }

      &.recharge_alipay_bank {
        background-image: url('images/recharge_online.png');
      }

      &.recharge_gz_bank {
        background-image: url('images/recharge_online.png');
      }

      &.recharge_alipay {
        background-image: url('images/recharge_alipay.png');
      }

      &.recharge_wx {
        background-image: url('images/wx.png');
      }

      &.recharge_online_wechat {
        background-image: url('images/wx.png');
      }
      &.recharge_alipay_app {
        background-image: url('images/recharge_alipay.png');
      }

      &.recharge_pay_service {
        background-image: url('images/pay_service.png');
      }
    }
    .info {
      width: 0;
      flex-grow: 1;
      display: flex;
      // margin-top: 11px;
      font-weight: 500;
      // border-bottom: 1px solid #F0F0F0;
      // padding-bottom: 22px;
      justify-content: space-between;
      align-items: center;
      .logo {
        width: 38px;
        height: 38px;
      }
      .channel {
        font-size: 14px;
        color: #000000;
		padding-left: 15px;
      }
      .time {
        font-size: 12px;
        font-weight: 500;
        color: #d8d8d8;
        margin-top: 12px;
		padding-left: 15px;
      }
      .money {
        font-size: 14px;
        font-weight: bold;
        color: #e85420;
        margin-right: 20px;
      }
    }
  }
}
// .fund_wrap .table tr {
//     width: 100%;
// }

// .fund_wrap .table .header {
//     width: 100%;
//     height: 34px;
//     background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
//     background-image: -o-linear-gradient(left, #666666, #262627);
//     background-image: linear-gradient(to right, #666666, #262627);
//     border: 0;
// }

// .fund_wrap .table tr .first {
//     border-radius: 10px 0 0 10px;
// }

// .fund_wrap .table tr .last {
//     border-radius: 0 10px 10px 0;
//     border: 0;
// }

// .fund_wrap .table tr th {
//     font-size: 14px;
//     color: #e8c27d;
//     width: 33.333%;
//     border-right: 1px solid #666666;
// }

// .fund_wrap .table .tab.tab_2 {
//     border-left: 1px solid #7B7B7B;
//     border-right: 1px solid #7B7B7B;
// }

// .fund_wrap .table {
//     table-layout: fixed;
//     width: 92%;
//     margin: 15px auto;
// }

// .fund_wrap .table tbody tr {
//     margin: 0 auto;
//     border-bottom: 1px solid #EDEDED;
// }

/*.fund_wrap .table tbody tr td:first-child {*/
/*    text-align: left;*/
/*}*/

/*.fund_wrap .table tbody tr td:last-child {*/
/*    text-align: left;*/
/*}*/

// .fund_wrap .table tbody tr td {
//     padding: 0 4px;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     width: 25%;
//     text-align: center;
//     font-size: 14px;
//     line-height: 26px;
//     padding-bottom: 10px;
//     padding-top: 24px;
//     color: #333333;
// }

// .fund_wrap .table tbody tr .td_3 {
//     color: #dfba7b;
// }
</style>
