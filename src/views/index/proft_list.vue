<template>
  <div class="page_root">
    <section class="btns">
      <div class="item">
        <span>{{ $t('basic_income') }}</span>
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

    <section class="search_bar">
      <div class="calendar">
        <img src="@/assets/tron/图层 7.png" alt="" />
        <span class="value" @click="show = true">{{ date }}</span>
        <div class="clear" @click="onClear">
          <van-icon name="cross" />
        </div>
      </div>

      <img
        class="icon"
        src="@/assets/tron/iconfont-chazhao.png"
        alt=""
        @click="start"
      />
    </section>

    <section class="contents">
      <template v-if="data.length">
        <div class="item" v-for="(item, index) in data" :key="index">
          <img src="@/assets/tron/图层 11.png" alt="" />
          <div class="info">
            <div class="part">
              <span>{{ $t('profit_list') }}</span>
              <!-- <span>{{ item.time }}</span> -->
            </div>  
            <div class="part">
              <span>{{ $t('date') }}</span>
              <span>{{ item.time }}</span>
            </div>
            <div class="part">
              <span>{{ $t('amount') }}</span>
              <span>+ {{ item.money }} TRX</span>
            </div>
          </div>
        </div>
      </template>

      <van-empty v-else description="no data" />
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
      data: [],
      show: false,
      date: this.$t('please_select_a_time'),
      basic_income: 0,
      promotion_income: 0,
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
        this.data = res.data.list;
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
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .search_bar {
    width: 100%;
    height: 43px;
    display: flex;
    align-items: center;
    margin-top: 16px;

    .calendar {
      flex: 1 0;
      height: 100%;
      background: #fafafa;
      border: 1px solid #cccccc;
      border-radius: 21px;
      padding: 0 15px;
      display: flex;
      align-items: center;

      img {
        width: 17px;
        height: 17px;
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
        font-size: 14px;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .icon {
      width: 22px;
      height: 22px;
      margin-left: 15px;
    }
  }

  .btns {
    width: 100%;
    height: 122px;
    display: flex;
    justify-content: space-between;
    background: url('~@/assets/tron/a6d8a0db03baa79955316da04c68c9f9f95966de7b6c-k6K16M_fw1200.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 16px;
    padding: 29px 21px;

    .item {
      position: relative;
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #FFFFFF;

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;
        margin-top: 21px;

        span {
          font-size: 34px;
          font-family: Arial;
          font-weight: bold;
          color: #FFFFFF;
          &:last-child {
            width: 39px;
            height: 16px;
            background: #FFC618;
            border-radius: 3px;
            font-size: 11px;
            font-family: Arial;
            font-weight: bold;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 16px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .contents {
    width: 100%;
    margin-top: 24px;
    padding: 0 12px 24px;
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      min-height: 70px;
      display: flex;
      margin-top: 14px;
      overflow: hidden;

      img {
        width: 41px;
        height: 41px;
      }

      .info {
        flex: 1 0;
        height: 100%;
        margin-left: 13px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid rgba(221, 221, 221, 1);
        padding-top: 12px;

        .part {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #575757;
          margin-bottom: 16px;

          span {
            &:first-child {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #000001;
            }
          }
        }
      }
    }
  }
}
</style>
