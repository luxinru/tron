<template>
  <div class="balance-container" style="background: #fff">
    <div class="recharge-header-box" style="background: #fff;">
      <div class="recharge-header">
        <img class="recharge-header-bg" src="./images/bg_4.png" />
        <div class="recharge-header-money">
          <img class="recharge-header-money-icon" src="./images/user/money.png" />
          <p style="padding-left:10px;">{{ total }}</p>
        </div>
        <div class="recharge-header-title">账户余额(元)</div>
      </div>
    </div>

    <div class="boxFun" style="padding: 10px 14px">

      <div class="container" v-for="(item, key) in data.list" :key="key">
        <div class="box">
          <div class="content">
            <div class="desc">
              <span>{{ item.reason }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
          <div class="money">
            <span :style="item.type == 2 ? 'color:#FE324B' : 'color:#59BB4E'"
              >{{ item.type == 1 ? '+' : '-' }}{{ item.money }}</span
            >
          </div>
        </div>
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
        // list: [{ reason: '1', time: '2', money: '123', type: '1' }],
      },
      info: {},
      total: '0',
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format('YYYY.MM.DD hh:mm');
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch('/user/getUserMoneys').then(res => {
        this.total = res.data.money;
      })
      Fetch('/user/funds').then((res) => {
        this.data = res.data;
      });
      Fetch('/user/info').then(res => {
        this.info = res.data;
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/common.less';

.balance-container {
  .recharge-header {
    height: 160px;
    .recharge-header-money {
      padding-top: 30px;
      margin-bottom: 20px;
    }
    .balance_collected {
      width: 100%;
      justify-content: space-around;
      text-align: center;
      .balance-text {
        font-size: 14px;
      }
      .balance-money {
        font-size: 18px;
        margin-top: 6px;
        img {
          margin-top: -3px;
        }
      }
    }
  }
}

.balance-container {
  font-family: PingFang SC;
  background-color: #f4f4f7;
  overflow: auto;
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0 15px;
  }
  .integral-header {
    margin-top: 13px;
    margin-left: 13px;
    width: 350px;
    height: 116px;
    background-image: url('./images/integral_bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    padding-left: 29px;
    color: #ffffff;
    font-weight: 500;
    .title {
      margin-top: 30px;
      font-size: 15px;
    }
    .total {
      margin-top: 20px;
      font-size: 26px;
    }
  }
  .integral-list-box {
    margin-top: 13px;
    padding: 0 13px;
    background: #ffffff;
    border-radius: 13px 13px 0px 0px;
    .integral-list-item {
      padding-top: 23px;
      padding-bottom: 21px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.14);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      .left-title {
        font-size: 16px;
        color: #000000;
      }
      .left-date {
        font-size: 13px;
        color: #635f62;
        margin-top: 14px;
      }
      .integral-list-item-right {
        font-size: 16px;
        font-weight: bold;
        color: #2e98fd;
      }
      .type-two {
        color: #e7c899;
      }
    }
  }
}
</style>
