<template>
  <div class="page_root">
    <section class="list">
      <div class="item">
        <span>{{ $t('lev') }} 1</span>
        <span>{{ team.lev1 }}</span>
      </div>
      <div class="item">
        <span>{{ $t('lev') }} 2</span>
        <span>{{ team.lev2 }}</span>
      </div>
      <div class="item">
        <span>{{ $t('lev') }} 3</span>
        <span>{{ team.lev3 }}</span>
      </div>
    </section>

    <section class="contents">
      <template v-if="data.length">
        <div class="item" v-for="(item, index) in data" :key="index">
          <img src="@/assets/tron/图层 11.png" alt="" />
          <div class="info">
            <div class="part">
              <span>{{ $t('date') }}</span>
              <span>{{ item.time }}</span>
            </div>
            <div class="part">
              <span>{{ $t('amount') }}</span>
              <span>+ {{ item.money }} TRX</span>
            </div>
          </div>
        </div>
      </template>

      <van-empty v-else description="no data" />
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
export default {
  name: 'NewInvest',
  data() {
    return {
      active: 1,
      data: [],
      team: {},
    }
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      /* setTimeout(() => {
	        var element = document.getElementById("app");
	        element.scrollIntoView();
	      }, 0); */
      Fetch('/user/my_team').then((res) => {
        this.team = res.data.team
        this.data = res.data.data
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
  align-items: center;

  .list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
    padding: 0 25px;

    .item {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      &:first-child {
        margin-left: 0;
      }

      span {
        font-size: 17px;
        font-family: Arial;
        font-weight: bold;
        color: #1e253c;
        display: flex;
        justify-content: center;

        &:first-child {
          width: 100%;
          height: 28px;
          background-color: rgba(213, 10, 10, 1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 14px;
        }
      }
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
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #575757;

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
        }
      }
    }
  }
}
</style>
