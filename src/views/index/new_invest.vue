<template>
  <div class="page_root">
    <IHeader :isback="false" :title="$t('invest')"></IHeader>

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

    <section class="list">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toDetail(item.id)"
      >
        <img src="@/assets/tron/项目.png" alt="" />
        <div class="info">
          <span class="title">{{ item.day }}-day {{ item.title }}</span>
          <div class="labels">
            <div></div>
            <span>{{ $t('daily_rate') }} : {{ item.rate }}%</span>
            <div></div>
            <span>{{ $t('cycle') }} : {{ item.day }} Day</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'NewInvest',

  components: {
    IHeader,
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
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px 76px;
  background: url('~@/assets/tron/波场 2 拷贝 2.png') no-repeat;
  background-size: 100% 175px;

  .header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #1e253c;
    background-color: #fff;
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
    margin-top: 100px;

    .item {
      width: 100%;
      min-height: 76px;
      display: flex;
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
      border-radius: 4px;
      padding: 13px 19px;
      margin-top: 12px;

      img {
        width: 51px;
        // height: 85px;
        margin-right: 18px;
      }

      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 16px;
          font-family: Arial;
          font-weight: bold;
          color: #0a3867;
          line-height: 24px;
        }

        .labels {
          margin-top: 12px;
          display: flex;
          align-items: center;

          div {
            width: 3px;
            height: 3px;
            background: #ff2400;
            border-radius: 50%;
            margin-right: 7px;
          }

          span {
            flex: 1 0;
            font-size: 11px;
            font-family: Arial;
            font-weight: 400;
            color: #4e7091;
          }
        }
      }
    }
  }
}
</style>
