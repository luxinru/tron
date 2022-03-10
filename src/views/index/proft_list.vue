<template>
  <div class="page_root">
    <IHeader :title="$t('proft_list')"></IHeader>

    <section class="btns">
      <div class="item">
        <div class="value">
          <span>{{ basic_income }}</span>
          <span>TRX</span>
        </div>
        <span>{{ $t('basic_income') }}</span>
      </div>
      <div class="item">
        <div class="value">
          <span>{{ promotion_income }}</span>
          <span>TRX</span>
        </div>
        <span>{{ $t('promotion_income') }}</span>
      </div>
    </section>

    <section class="search_bar">
      <div class="calendar">
        <img src="@/assets/tron/日历.png" alt="" />
        <span class="value" @click="show = true">{{ date }}</span>
        <div class="icon">
          <van-icon name="search" @click="search" color="#fff" size="16" />
        </div>
      </div>
    </section>

    <section class="list" v-if="data.length">
      <div class="item" v-for="(item, index) in data" :key="index">
        <span class="title">
          {{ $t('proft_list') }}
        </span>
        <div class="info">
          <span>{{ $t('date') }}</span>
          <span>{{ item.time }}</span>
        </div>
        <div class="info">
          <span>{{ $t('amount') }}</span>
          <span>+ {{ item.money }}</span>
        </div>
        <span class="tip">{{ $t('interest_reward') }}</span>
      </div>
    </section>

    <van-empty v-else class="empty" description="no data" />

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
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'TradingList',

  components: {
    IHeader
  },

  data() {
    return {
      show: false,
      date: this.$t('please_select_a_time'),
      basic_income: 0,
      promotion_income: 0,
      data: []
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
  width: 100%;
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;
  background: url('~@/assets/tron/波场 2 (3).png') no-repeat;
  background-size: 100% 264px;

  .search_bar {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    margin-top: 42px;

    .calendar {
      flex: 1 0;  
      height: 100%;
      background: #FFFFFF;
      box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
      border-radius: 4px;
      padding: 0 10px;
      display: flex;
      align-items: center;

      img {
        width: 18px;
        height: 18px;
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
      width: 25px;
      height: 25px;
      margin-left: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(237, 102, 8, 1);
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 39px;

    .item {
      position: relative;
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      font-size: 17px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);

      .value {
        width: 100%;
        display: flex;
        align-items: flex-end;
        font-size: 34px;
        font-family: Arial;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 23px;

        span {
          &:last-child {
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #FFFFFF;
            margin: 0 0 3px 13px;
          }
        }
      }
    }
  }

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;

    .item {
      width: 100%;
      min-height: 151px;
      background: #FFFFFF;
      box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 20px;
      margin-top: 13px;

      .title {
        font-size: 15px;
        font-family: Arial;
        font-weight: bold;
        color: #053464;
      }

      .info {
        margin-top: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0A3867;

        span {
          :last-child {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #4E7091;
          }
        }
      }

      .tip {
        width: max-content;
        margin-top: 16px;
        padding: 7px 15px;
        background: rgba(34, 78, 155, 0.6);
        border-radius: 4px;
        font-size: 11px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #224E9B;
      }
    }
  }
}
</style>
