<template>
  <div class="page_root">
    <!-- <section class="header">{{ $t('invest') }}</section>

    <section class="bar">
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

    <section class="header">
      <HeaderBar></HeaderBar>
      <span>{{ $t('invest') }}</span>
    </section>

    <template v-if="list.length">
      <section
        class="notice-list"
        v-for="(v, k) in list"
        :key="k"
        @click="toDetail(v.id)"
      >
        <div class="icon-cont">
          <img src="@/assets/tron/图层 11.png" class="icon" />

          <div class="info">
            <div class="notice-right">{{ v.day }}-day {{ v.title }}</div>
            <p class="notice-msg">
              <span>{{ $t('daily_rate') }} : {{ v.rate }}%</span>
              <span>{{ $t('cycle') }} : {{ v.day }} Day</span>
            </p>
          </div>
        </div>
      </section>
    </template>

    <van-empty v-else description="no data" />
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
        console.log(111)
        console.log(this.list)
        console.log(111)
        this.list = res.data.list
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 124px;

  .header {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: 0 22px 14px;

    span {
      width: 100%;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
      margin-top: 8px;
    }
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

  .notice-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 13px;
    margin-top: 13px;
    .icon-cont {
      width: 100%;
      min-height: 70px;
      height: max-content;
      display: flex;
      margin-top: 12px;
      img {
        width: 41px;
        height: 41px;
        margin-right: 13px;
      }

      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 12px;
        border-bottom: 1px solid rgba(221, 221, 221, 1);
        overflow: hidden;

        .notice-right {
          font-size: 17px;
          font-family: Arial;
          font-weight: bold;
          color: #1e253c;
          width: 100%;
          line-height: 24px;
          // overflow: hidden;
          // white-space: nowrap;
          // text-overflow: ellipsis;
        }
        .notice-msg {
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          margin: 12px 0;
          display: flex;
          span {
            flex: 1 0;
          }
        }
      }
    }
  }
}
</style>
