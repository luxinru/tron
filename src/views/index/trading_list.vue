<template>
  <div class="page_root">
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
        @click="search()"
      />
    </section>

    <section class="contents">
      <template v-if="data.list.length">
        <div class="item" v-for="(item, index) in data.list" :key="index">
          <img src="@/assets/tron/图层 11.png" alt="" />
          <div class="info">
            <div class="part">
              <span>{{ $t('quantifying_transaction_revenue') }}</span>
              <van-icon
                v-if="item.type == 2 && Number(item.money) > 0"
                name="arrow"
                @click="receive(item.id)"
              />
            </div>
            <div class="part">
              <span>{{ item.money }} TRX</span>
              <span class="time">{{ item.time }}</span>
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
import moment from 'moment'
import Fetch from '../../utils/fetch'
export default {
  name: 'TradingList',
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
        this.data = res.data
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

  .contents {
    width: 100%;
    margin-top: 23px;
    padding: 0 12px 24px;
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      height: 70px;
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
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #000000;

          &:first-child {
            margin-bottom: 16px;
          }

          span {
            &:first-child {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #000001;
            }
          }

          .time {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #b8b8b8;
          }
        }
      }
    }
  }
}
</style>
