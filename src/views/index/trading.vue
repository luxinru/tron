<template>
  <div class="page_root">
    <HeaderBar></HeaderBar>

    <section class="header">
      <span class="total_value">+{{ rate }}%</span>
      <span class="total_title">{{ $t('cloud_mining_is_working') }}</span>
      <img
        class="total_img"
        src="@/assets/tron/Trading_slices/image-removebg-preview (14).png"
        alt=""
      />
    </section>

    <section class="contents">
      <div class="title">
        <div class="top">
          <span class="label">{{ $t('trading_profit') }}</span>
          <div class="all" @click="$router.push('/trading_list')">
            {{ $t('view_all') }}
            <img src="@/assets/tron/Trading_slices/返回 拷贝 3.png" alt="" />
          </div>
        </div>
        <div class="tip">( 24-{{ $t('hour_settlement') }} )</div>
      </div>
      <div class="list" v-if="data.list.length">
        <div class="item" v-for="item in data.list" :key="item.id">
          <img
            src="@/assets/tron/Trading_slices/image-removebg-preview (15).png"
            alt=""
          />
          <div class="info">
            <span class="value">{{ item.money }}</span>
            <span class="unit">TRX</span>
            <span class="label">{{ $t('quantifying_transaction_revenue') }}</span>
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
      <van-empty v-else description="no data" />
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import HeaderBar from '@/components/header-bar.vue'

export default {
  name: 'trading',

  components: {
    HeaderBar,
  },

  data() {
    return {
      data: {
        list: [],
      },
      dataInfo: null,
      vip: 8015,
      rate: '',
    }
  },
  computed: {},
  created() {
    this.$parent.footer(true, 'trading')
  },
  mounted() {
    this.strat()
  },

  methods: {
    strat() {
      Fetch('/user/info').then((res) => {
        this.dataInfo = res.data //res赋值
        this.vip = this.dataInfo.vip
        this.rate = this.dataInfo.rate
      })

      Fetch('/user/getTRXDetail').then((res) => {
        this.data = res.data;
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
          this.strat()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  background-color: rgba(246, 245, 250, 1);
  padding: 0 13px 76px;
  background: url('~@/assets/tron/Trading_slices/组 111.png') no-repeat;
  background-size: 100% 203px;

  .header {
    position: relative;
    width: 100%;
    height: 153px;
    display: flex;
    flex-direction: column;
    padding: 0 21px;

    .total_value {
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #FFFFFF;
      display: flex;
      margin-top: 20px;
    }

    .total_title {
      height: 16px;
      font-size: 17px;
      font-family: Arial;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 16px;
    }

    .total_img {
      position: absolute;
      width: 106px;
      height: 114px;
      right: 14px;
      bottom: -12px;
    }
  }

  .contents {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 34px;

    .title {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 10px;

      .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .label {
          font-size: 18px;
          font-family: Arial;
          font-weight: bold;
          color: #053464;
        }

        .all {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: rgba(30, 37, 60, 0.5);
          line-height: 5px;

          img {
            width: 5px;
            height: 8px;
            margin-left: 8px;
          }
        }
      }

      .tip {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #4E7091;
        line-height: 5px;
        margin-top: 9px;
        margin-bottom: 7px;
      }
    }

    .list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 10px;
      padding: 0 10px;

      .item {
        width: 158px;
        min-height: 216px;
        background: #FFFFFF;
        box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 14px;
        padding: 13px;

        img {
          width: 51px;
          height: 54px;
          margin-top: 10px;
        }

        .info {
          width: 100%;
          flex: 1 0;
          display: flex;
          flex-direction: column;
          margin-top: 17px;

          .value {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #4E7091;
          }

          .unit {
            font-size: 10px;
            font-family: Arial;
            font-weight: 400;
            color: #4E7091;
            margin-top: 8px;
          }

          .label {
            font-size: 11px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #27519E;
            margin-top: 14px;
            text-align: center;
          }
        }

        .btn {
          padding: 9px 30px;
          background: #204D9B;
          border-radius: 4px;
          margin-top: 16px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        .active {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
