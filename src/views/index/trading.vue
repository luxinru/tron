<template>
  <div class="page_root">
    <HeaderBar></HeaderBar>

    <section class="header">
      <span class="total_title">{{ $t('cloud_mining_is_working') }}</span>
      <span class="total_value">{{ rate }}%</span>

      <img
        class="total_img"
        src="@/assets/tron/image-removebg-preview.png"
        alt=""
      />
    </section>

    <section class="contents">
      <div class="title" @click="$router.push('/trading_list')">
        <div class="top">
          <span class="line"></span>
          <span class="label">{{ $t('trading_profit') }}</span>
          <span class="line"></span>
        </div>
        <div class="tip">24-{{ $t('hour_settlement') }}</div>
      </div>
      <div class="list" v-if="data.list.length">
        <div class="item" v-for="item in data.list" :key="item.id">
          <img src="@/assets/tron/图层 10.png" alt="" />
          <div class="info">
            <span>{{ $t('quantifying_transaction_revenue') }}</span>
            <span>{{ item.money }}</span>
            <div
              v-if="item.type == 2 && Number(item.money) > 0"
              class="btn active"
              @click="receive(item.id)"
            >
              {{ $t('receive') }}
            </div>
            <div v-else class="btn">
              {{ $t('receive') }}
            </div>
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
          this.strat()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  padding: 0 13px 124px 13px;

  .header {
    position: relative;
    width: 100%;
    height: 122px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #d50a0a;
    border-radius: 7px;
    overflow: hidden;

    .total_title {
      width: 100%;
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      padding: 0 21px;
      margin-top: 29px;
    }

    .total_value {
      width: 100%;
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;
      padding: 0 21px;
      margin-top: 17px;

      &::before {
        content: '+';
      }
    }

    .total_img {
      position: absolute;
      width: 134px;
      height: 107px;
      right: 5px;
      bottom: -2px;
    }
  }

  .contents {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    .title {
      width: 100%;
      display: flex;
      flex-direction: column;

      .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .line {
          width: 23px;
          height: 1px;
          background-color: rgba(213, 10, 10, 1);
        }

        .label {
          font-size: 15px;
          font-family: Arial;
          font-weight: bold;
          color: #212121;
          margin: 0 20px;
        }
      }

      .tip {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 9px;
      }
    }

    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 13px;

      .item {
        width: 100%;
        min-height: 70px;
        display: flex;
        margin-top: 19px;

        img {
          width: 41px;
          height: 41px;
          margin-right: 13px;
        }

        .info {
          position: relative;
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid rgba(221, 221, 221, 1);
          padding: 12px 0 0 0;

          span {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #131313;

            &:nth-child(1) {
            }

            &:nth-child(2) {
              margin: 22px 0 24px 0;
              &::after {
                content: 'TRX';
                font-size: 9px;
                font-family: Arial;
                font-weight: 400;
                color: #252525;
                line-height: 5px;
                margin-left: 10px;
              }
            }
          }

          .btn {
            position: absolute;
            width: 76px;
            height: 26px;
            background-color: #313131;
            border-radius: 3px;
            right: 0;
            bottom: 17px;
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .active {
            background-color: rgba(213, 10, 10, 1);
          }
        }
      }
    }
  }
}
</style>
