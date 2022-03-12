<template>
  <div class="page_root">
    <section class="list">
      <section class="search_bar">
        <div class="calendar">
          <img src="@/assets/tron/Trading list_slices/日历-内容页.png" alt="" />
          <span class="value" @click="show = true">{{ date }}</span>
          <van-icon name="close" @click="onClear" size="14" />
        </div>

        <div class="icon">
          <van-icon name="search" @click="search()" color="#fff" size="16" />
        </div>
      </section>
      <div class="item" v-for="item in data.list" :key="item.id">
        <span class="title">{{ $t('quantifying_transaction_revenue') }}</span>
        <div class="info">
          <div class="left">
            <span>{{ item.money }} TRX</span>
            <span>{{ item.time }}</span>
          </div>
          <div
            v-if="item.type == 2 && Number(item.money) > 0"
            class="btn"
            @click="receive(item.id)"
          >
            {{ $t('receive') }}
          </div>
          <div v-else class="btn active">
            {{ $t('receive') }}
          </div>
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
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px 24px;

  .list {
    margin-top: 16px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    .search_bar {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 16px;

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
        background-color: #4b95fe;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding: 16px 0;

      .title {
        font-size: 16px;
        font-family: Alibaba PuHuiTi;
        font-weight: 500;
        color: #2C3136;
      }

      .info {
        margin-top: 16px;
        width: 100%;
        display: flex;
        align-items: center;

        .left {
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;

          span {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #87888A;
          }
        }

        .btn {
          padding: 9px 16px;
          background: rgba(75, 149, 254, 1);
          border-radius: 3px;
          margin-left: 16px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        .active {
          background-color: rgba(190, 190, 190, 1);
        }
      }
    }
  }
}
</style>
