<template>
  <div class="page_root">
    <HeaderBar></HeaderBar>

    <section class="header">
      <span class="total_title">{{ $t('cloud_mining_is_working') }}</span>
      <span class="total_value">+{{ rate }}%</span>
    </section>

    <section class="contents">
      <div class="title">
        <div class="top">
          <span class="status"></span>
          <span class="label">{{ $t('trading_profit') }}</span>
          <div class="all" @click="$router.push('/trading_list')">
            {{ $t('view_all') }}
            <img src="@/assets/tron/Trading_slices/返回 拷贝 3.png" alt="" />
          </div>
        </div>
        <!-- <div class="tip">( 24-{{ $t('hour_settlement') }} )</div> -->
      </div>
      <div class="list">
        <div class="item" v-for="item in data.list" :key="item.id">
          <div class="title">
            {{ $t('quantifying_transaction_revenue') }}
          </div>
          <div class="info">
            <span>{{ item.money }}</span>
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
      </div>
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
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px 128px;

  .header {
    width: 100%;
    height: 161px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: url('~@/assets/tron/矢量智能对象 (2).png') no-repeat;
    background-size: 100% 161px;
    padding: 33px 26px;

    .total_title {
      width: max-content;
      font-size: 15px;
      font-family: Arial;
      font-weight: bold;
      color: transparent;
      background: linear-gradient(
        90deg,
        rgba(39, 88, 201, 1) 0%,
        rgba(39, 88, 201, 1) 50%,
        #fff 50%,
        #fff 100%
      );
      -webkit-background-clip: text;
    }

    .total_value {
      width: 100%;
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #285cca;
    }
  }

  .contents {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 35px;

    .title {
      width: 100%;
      display: flex;
      flex-direction: column;

      .top {
        width: 100%;
        display: flex;
        align-items: center;

        .status {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(75, 149, 254, 1);
          margin-right: 8px;
        }

        .label {
          flex: 1 0;
          font-size: 15px;
          font-family: Arial;
          font-weight: bold;
          color: #2c3136;
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

      // .tip {
      //   font-size: 13px;
      //   font-family: PingFang SC;
      //   font-weight: 500;
      //   color: #7d70e6;
      //   line-height: 5px;
      //   margin-top: 9px;
      //   margin-left: 18px;
      // }
    }

    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      // padding: 0 13px;

      .item {
        width: 100%;
        min-height: 101px;
        background: #ffffff;
        border-radius: 7px;
        display: flex;
        flex-direction: column;
        margin-top: 13px;
        padding: 12px 23px;

        .title {
          flex: 1 0;
          display: flex;
          font-size: 13px;
          font-family: Alibaba PuHuiTi;
          font-weight: 500;
          color: #2c3136;
          border-bottom: 1px solid rgba(221, 221, 221, 0.7);
        }

        .info {
          flex: 1 0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #868789;

            &::after {
              content: 'TRX';
              font-size: 9px;
              font-family: Arial;
              font-weight: 400;
              color: #868789;
              line-height: 5px;
              margin-left: 10px;
            }
          }

          .btn {
            padding: 9px 16px;
            background: #4b95fe;
            border-radius: 3px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
          .active {
            background-color: rgba(190, 190, 190, 1);
          }
        }
      }
    }
  }
}
</style>
