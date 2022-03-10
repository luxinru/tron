<template>
  <div class="page_root">
    <IHeader :title="$t('team')"></IHeader>

    <section class="level_box">
      <div class="list">
        <div class="item" :class="{ active: active === 1 }" @click="active = 1">
          <span>{{ $t('lev') }} 1</span>
          <span>{{ team.lev1 }}</span>
        </div>
        <div class="item" :class="{ active: active === 2 }" @click="active = 2">
          <span>{{ $t('lev') }} 2</span>
          <span>{{ team.lev2 }}</span>
        </div>
        <div class="item" :class="{ active: active === 3 }" @click="active = 3">
          <span>{{ $t('lev') }} 3</span>
          <span>{{ team.lev3 }}</span>
        </div>
      </div>
    </section>
    <template v-if="data.length">
      <template v-for="(item, index) in data">
        <section class="info" :key="index">
          <div class="item">
            <span>{{ $t('date') }}</span>
            <span>{{ item.time }}</span>
          </div>
          <div class="item">
            <span>{{ $t('amount') }}</span>
            <span>{{ item.money }} TRX</span>
          </div>
        </section>
      </template>
    </template>

    <van-empty v-else class="empty" description="no data" />
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
      active: 1,
      data: {},
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
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 21px;
  background: url('~@/assets/tron/波场 2 (2).png') no-repeat;
  background-size: 100% 233px;

  .level_box {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px 4px 0 0;
    padding: 20px 16px;
    margin-top: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .list {
      width: 100%;
      display: flex;
      align-items: center;

      .item {
        flex: 1 0;
        display: flex;
        flex-direction: column;

        span {
          font-size: 17px;
          font-family: Arial;
          font-weight: bold;
          color: #1e253c;
          display: flex;
          justify-content: center;
          align-items: center;

          &:first-child {
            height: 32px;
            border: 1px solid #254f9c;
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #254f9c;
            margin-bottom: 14px;
          }
        }
      }
      .active {
        span {
          &:first-child {
            background-color: #254f9c;
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }

  .info {
    width: 100%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 22px 0;
    box-sizing: border-box;
    border-top: 1px solid rgba(230, 230, 230, 0.6);

    &:first-child {
      margin-top: -1px;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
      margin-bottom: 24px;
    }

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #0a3867;
      &:last-child {
        margin-top: 21px;
      }

      span {
        &:last-child {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4e7091;
        }
      }
    }
  }
}
</style>
