<template>
  <div class="page_root">
    <div class="header">
      <van-icon
        name="arrow-left"
        size="23"
        color="#fff"
        @click="$router.go(-1)"
      />
      <div :style="`color: #fff`">{{ $t('proft_list') }}</div>
    </div>

    <section class="btns">
      <div class="item">
        <span style="width: 50%">{{ $t('basic_income') }}</span>
        <div class="value">
          <span>{{ basic_income }}</span>
          <span>TRX</span>
        </div>
      </div>
      <div class="item">
        {{ $t('promotion_income') }}
        <div class="value">
          <span>{{ promotion_income }}</span>
          <span>TRX</span>
        </div>
      </div>
    </section>

    <section class="list">
      <section class="search_bar">
        <div class="calendar">
          <img src="@/assets/tron/Trading list_slices/日历-内容页.png" alt="" />
          <span class="value" @click="show = true">{{ date }}</span>
          <van-icon name="close" @click="onClear" size="14"/>
        </div>

        <div class="icon">
          <van-icon name="search" @click="search" color="#fff" size="16" />
        </div>
      </section>
      <div class="item" v-for="(item, index) in data" :key="index">
        <div class="title">
          <span>{{ $t('proft_list') }}</span>
          <span>{{ $t('interest_reward') }}</span>
        </div>
        <div class="info">
          <span>{{ $t('date') }}</span>
          <span>{{ $t('amount') }}</span>
        </div>
        <div class="info2">
          <span>{{ item.time }}</span>
          <span>+ {{ item.money }}</span>
        </div>
      </div>
    </section>

    <van-calendar
      v-model="show"
      :show-title="false"
      :show-confirm="false"
      type="range"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import moment from 'moment'

export default {
  name: 'TradingList',
  data() {
    return {
      show: false,
      date: this.$t('please_select_a_time'),
      basic_income: 0,
      promotion_income: 0,
      data: [],
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
      Fetch('/user/proft_list').then((res) => {
        this.data = res.data.list
        this.basic_income = res.data.basic_income
        this.promotion_income = res.data.promotion_income
      })
    },
    search() {
      Fetch('/user/proft_list', {
        date: this.date,
      }).then((res) => {
        this.data = res.data.list
        this.basic_income = res.data.basic_income
        this.promotion_income = res.data.promotion_income
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
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: url('~@/assets/tron/波场 2 拷贝 3.png') no-repeat;
  background-size: 100% 292px;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px;

  .header {
    position: relative;
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #1e253c;

    i {
      position: absolute;
      left: 0;
    }
  }

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
    }

    .icon {
      width: 31px;
      height: 31px;
      margin-left: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #4B95FE;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    .item {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 17px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      margin-top: 27px;

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;

        span {
          font-size: 27px;
          font-family: Arial;
          font-weight: bold;
          color: #ffffff;
          margin-top: 11px;

          &:last-child {
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #ffffff;
            margin-bottom: 3px;
            margin-left: 5px;
          }
        }
      }
    }
  }

  .list {
    margin-top: 16px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
      width: 100%;
      min-height: 109px;
      display: flex;
      flex-direction: column;
      padding: 20px;

      .title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-family: Alibaba PuHuiTi;
        font-weight: 500;
        color: #2C3136;

        span {
          &:last-child {
            padding: 9px 16px;
            background: #4B95FE;
            border-radius: 3px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
          }
        }
      }

      .info {
        margin-top: 14px;
        width: 100%;
        display: flex;
        align-items: center;

        span {
          flex: 1 0;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #C7C7C8;
        }
      }
      .info2 {
        margin-top: 15px;
        width: 100%;
        display: flex;
        align-items: center;

        span {
          flex: 1 0;
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #87888A;
        }
      }
    }
  }
}
</style>
