<template>
  <div class="page_root">
    <section class="search_bar">
      <div class="calendar">
        <img src="@/assets/tron/Trading list_slices/日历-内容页.png" alt="" />
        <span class="value" @click="show = true">{{ date }}</span>
        <div class="clear" @click="onClear">x</div>
      </div>

      <div class="icon">
        <van-icon name="search" @click="search" color="#fff" size="16" />
      </div>
    </section>

    <section class="btns">
      <div class="item">
        <span style="width: 50%">{{ $t('basic_income') }}</span>
        <div class="value">
          <span>{{basic_income}}</span>
          <span>TRX</span>
        </div>
      </div>
      <div class="item">
        {{ $t('promotion_income') }}
        <div class="value">
          <span>{{promotion_income}}</span>
          <span>TRX</span>
        </div>
      </div>
    </section>

    <section class="list">
      <div class="item" v-for="item in data" :key="index">
        <div class="info">
          <span>{{ $t('date') }}</span>
          <span>{{item.time}}</span>
        </div>
        <div class="info">
          <span>{{ $t('amount') }}</span>
          <span style="color: rgba(138, 7, 231, 1);">+ {{item.money}}</span>
        </div>
        <span class="tip">{{ $t('interest_reward') }}</span>
      </div>
    </section>

    <van-calendar v-model="show" :show-title="false" :show-confirm="false" type="range" @confirm="onConfirm" />
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
import moment from 'moment'

export default {
  name: 'TradingList',
  data() {
    return {
      show: false,
      date: this.$t('please_select_a_time'),
	  basic_income:0,
	  promotion_income:0,
    }
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  mounted() {
	  this.start();
	  },
  methods: {
	start() {
		Fetch("/user/proft_list").then((res) => {
			this.data = res.data.list;
			this.basic_income = res.data.basic_income;
			this.promotion_income = res.data.promotion_income;
		});
	},
	search(){
		Fetch('/user/proft_list', {
		    date: this.date,
		  }).then((res) => {
			this.data = res.data.list;
			this.basic_income = res.data.basic_income;
			this.promotion_income = res.data.promotion_income;
		  })
	},
    onConfirm(date) {
      const [start, end] = date
      this.show = false
      this.date = `${moment(start).format('YYYY-MM-DD')} - ${moment(end).format(
        'YYYY-MM-DD'
      )}`
    },
    onClear() {
      this.date = this.$t('please_select_a_time')
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  background: rgba(248, 248, 250, 1);
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .search_bar {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-top: 16px;

    .calendar {
      flex: 1 0;
      height: 100%;
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 4px;
      padding: 0 10px;
      display: flex;
      align-items: center;

      img {
        width: 13px;
        height: 13px;
      }

      .value {
        flex: 1 0;
        padding: 0 16px;
        text-align: left;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8d8b98;
      }

      .clear {
        font-size: 12px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    }

    .icon {
      width: 31px;
      height: 31px;
      margin-left: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(138, 7, 231, 1);
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 119px;
    margin-top: 16px;

    .item {
      position: relative;
      width: 167px;
      height: 100%;
      background: url('~@/assets/tron/Transfer to basic_slices/椭圆 1 拷贝 5.png')
        no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        span {
          &:last-child {
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }

  .list {
    margin-top: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
      width: 100%;
      background: #fff;
      box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 16px;
      margin-top: 16px;

      .info {
        margin-top: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;

        &:first-child {
          margin-top: 0;
        }
      }

      .tip {
        margin-top: 9px;
        font-size: 11px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
