<template>
  <div class="page_root">
    <IHeader :title="$t('trading_list')"></IHeader>

    <section class="search_bar">
      <div class="calendar">
        <img src="@/assets/tron/日历.png" alt="" />
        <span class="value" @click="show = true">{{ date }}</span>
        <div class="icon">
          <van-icon name="search" @click="search()" color="#fff" size="16" />
        </div>
      </div>
    </section>

    <section class="list" v-if="data.list.length">
      <div class="item" v-for="item in data.list" :key="item.id">
        <div class="title">
          <span>{{ $t('quantifying_transaction_revenue') }}</span>
          <img
            v-if="item.type == 2 && Number(item.money) > 0"
            src=""
            alt=""
            @click="receive(item.id)"
          />
          <img v-else src="" alt="" />
        </div>
        <div class="info">
          <span>{{ item.money }}</span>
          <span>{{ item.time }}</span>
        </div>
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
import moment from 'moment'
import Fetch from '../../utils/fetch'
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'TradingList',

  components: {
    IHeader,
  },

  data() {
    return {
      show: false,
      data: {
        list: [],
      },
      date: this.$t('please_select_a_time'),
    }
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.strat()
  },
  methods: {
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
    search() {
      Fetch('/user/getTRXDetailAll', {
        date: this.date,
      }).then((res) => {
        this.data = res.data
      })
    },
    strat() {
      Fetch('/user/getTRXDetailAll').then((res) => {
        this.data = {
          list: [
            {
              id: 123123,
              type: 1,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 2,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 1,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 2,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 1,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 2,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 1,
              money: 123123123,
              time: 123123123,
            },
            {
              id: 123123,
              type: 2,
              money: 123123123,
              time: 123123123,
            },
          ],
        }
      })
    },
    receive(id) {
      Fetch('/user/receiveTRX', {
        id: id,
      }).then((res) => {
        this.$notify({
          background: '#07c160',
          message: res.info,
        })
        if (res.code == 1) {
          this.search()
        }
      })
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
  background: url('~@/assets/tron/波场 2 (2).png') no-repeat;
  background-size: 100% 233px;

  .search_bar {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    margin: 26px 0 16px;

    .calendar {
      flex: 1 0;
      height: 100%;
      background: #ffffff;
      border-radius: 4px;
      padding: 0 12px;
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
      width: 24px;
      height: 24px;
      margin-left: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(237, 102, 8, 1);
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .empty {
    margin-top: 60px;
  }

  .list {
    // margin-top: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;

    .item {
      width: 100%;
      background: #fff;
      box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 20px 18px;
      margin-top: 14px;

      .title {
        width: 100%;
        height: 23px;
        font-size: 15px;
        font-family: Arial;
        font-weight: bold;
        color: #053464;
        display: flex;
        justify-content: space-between;

        img {
          width: 23px;
        }
      }

      .info {
        margin-top: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #4E7091;

          &::after {
            content: 'TRX';
            font-size: 10px;
            font-family: Arial;
            font-weight: 400;
            color: #4E7091;
            line-height: 5px;
            margin-left: 5px;
          }

          &:last-child {
            font-size: 11px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #27519E;
          }
        }
      }
    }
  }
}
</style>
