<template>
  <div class="page_root">
    <HeaderBar></HeaderBar>

    <section class="header">{{ $t('invest') }}</section>

    <!-- <section class="bar">
      <span :class="{ active: active === 1 }" @click="active = 1"
        >{{ $t('product_list') }}</span
      >
      <span :class="{ active: active === 2 }" @click="$router.push('transfer_basic')"
        >{{ $t('recharge') }}</span
      >
      <span :class="{ active: active === 3 }" @click="active = 3"
        >{{ $t('product_list') }}</span
      >
    </section> -->

    <section class="list">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toDetail(item.id)"
      >
        <div class="info">
          <span class="title">{{ item.day }}-day {{ item.title }}</span>
          <div class="labels">
            <div>
              <span>{{ $t('daily_rate') }}</span>
              <span>{{ item.rate }}%</span>
            </div>
            <div>
              <span>{{ $t('cycle') }}</span>
              <span>{{ item.day }} Day</span>
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
  name: 'NewInvest',

  components: {
    HeaderBar,
  },

  data() {
    return {
      data: {},
      list: [],
      active: 1,
    }
  },
  computed: {},
  created() {
    this.$parent.footer(true, 'new_invest')
  },
  mounted() {
    this.start()
  },
  methods: {
    toDetail(id) {
      this.$router.push('/invest_product/' + id)
    },
    start() {
      Fetch('/index/item').then((res) => {
        console.log(this.list)

        this.list = res.data.list
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    position: absolute;
    left: 24px;
    top: 0;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 26px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }

  .bar {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #a3a8b2;
    background-color: #fff;

    span {
      flex: 1 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .active {
      color: rgba(103, 103, 232, 1);
      border-bottom: 2px solid rgba(103, 103, 232, 1);
    }
  }

  .list {
    width: 100%;
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 13px;

    .item {
      width: 100%;
      min-height: 121px;
      background: #ffffff;
      border-radius: 7px;
      display: flex;
      align-items: center;
      background: #ffffff;
      padding: 20px 25px;
      margin-top: 12px;

      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 13px;
          font-family: Alibaba PuHuiTi;
          font-weight: 500;
          color: #2c3136;
          border-bottom: 1px solid rgba(221, 221, 221, 1);
          padding-bottom: 16px;
          line-height: 16px;
        }

        .labels {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;

          div {
            display: flex;
            flex-direction: column;
            span {
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #87888A;

              &:first-child {
                margin-bottom: 10px;
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #C7C7C8;
              }
            }
          }
        }
      }
    }
  }
}
</style>
