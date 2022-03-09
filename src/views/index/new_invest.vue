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

    <section class="list" >
      <div class="item" v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
        <img src="@/assets/tron/Home_slices/色相／饱和度 1.png" alt="" />
        <div class="info">
          <span class="title">{{item.day}}-day {{ item.title }}</span>
          <div class="labels">
            <span>{{ $t('daily_rate') }} : {{item.rate}}%</span>
            <span>{{ $t('cycle') }} : {{item.day}} Day</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
export default {
  name: 'NewInvest',
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
	  this.start();
  },
  methods: {
    toDetail(id) {
      this.$router.push("/invest_product/" + id);
    },
	start() {
		Fetch("/index/item").then((res) => {
			
			console.log(this.list);
			
		  this.list = res.data.list;
		});
	},
  },
}
</script>

<style lang="less" scoped>
.page_root {
  background-color: rgba(246, 245, 250, 1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

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
    padding: 0 13px;

    .item {
      width: 100%;
      height: 110px;
      display: flex;
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
      border-radius: 13px;
      padding: 13px 15px;
      margin-top: 10px;

      img {
        width: 85px;
        // height: 85px;
        margin-right: 17px;
      }

      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #323A45;
        }

        .labels {
          margin-top: 14px;
          display: flex;
          flex-direction: column;

          span {
            font-size: 11px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
