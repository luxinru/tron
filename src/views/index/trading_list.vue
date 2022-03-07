<template>
  <div class="page_root">
    <section class="search_bar">
      <div class="calendar">
        <img src="@/assets/tron/Trading list_slices/日历-内容页.png" alt="" />
        <span class="value" @click="show = true">{{ date }}</span>
        <div class="clear" @click="onClear">x</div>
      </div>

      <div class="icon">
        <van-icon name="search" @click="search()" color="#fff" size="16" />
      </div>
    </section>

    <section class="list">
      <div class="item" v-for="item in data.list" :key="item.id">
        <span class="title">{{ $t('quantifying_transaction_revenue') }}</span>
        <div class="info">
          <div class="left">
            <span>{{ item.money }} TRX</span>
            <span>{{ item.time }}</span>
          </div>
			<div v-if="item.type == 2" class="btn" @click="receive(item.id)">
				{{ $t('receive') }}
			</div>
			<div  v-if="item.type == 1" class="btn active">
				{{ $t('receive') }}
			</div>
        </div>
      </div>
    </section>

    <van-calendar v-model="show" :show-title="false" :show-confirm="false" type="range" @confirm="onConfirm" />
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
	search(){
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
	receive(id){
		Fetch('/user/receiveTRX', {
		    id: id,
		  }).then((res) => {
			this.$notify({
			  background: '#07c160',
			  message: res.info,
			})
			if(res.code == 1){
				this.search()
			}
		  })
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

  .list {
    // margin-top: 16px;
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
      padding: 22px;
      margin-top: 16px;

      .title {
        font-size: 17px;
        font-family: Arial;
        font-weight: bold;
        color: #1e253c;
      }

      .info {
        margin-top: 20px;
        width: 100%;
        display: flex;
        align-items: center;

        .left {
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;

          span {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #8a07e7;

            &:last-child {
              font-size: 11px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.5);
              margin-top: 14px;
            }
          }
        }

        .btn {
          width: 102px;
          height: 32px;
          background: #5e63e7;
          border-radius: 16px;
          margin-left: 16px;
          font-size: 17px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
		.active {
		  color: rgba(255, 255, 255, 1);
		  background-color: rgba(177, 155, 249, 1);
		}
      }
    }
  }
}
</style>
