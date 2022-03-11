<template>
  <div class="page_root">
    <div class="header">
      <van-icon
        name="arrow-left"
        size="23"
        color="#fff"
        @click="$router.go(-1)"
      />
      <div>{{ $t('team') }}</div>
    </div>

    <section class="level_box">
      <div class="list">
        <div class="item" :class="{ active: active === 1 }" @click="active = 1">
          <span>{{ $t('lev') }} 1</span>
          <span>{{ team.lev1 || 0 }}</span>
        </div>
        <div class="item" :class="{ active: active === 2 }" @click="active = 2">
          <span>{{ $t('lev') }} 2</span>
          <span>{{ team.lev2 || 0 }}</span>
        </div>
        <div class="item" :class="{ active: active === 3 }" @click="active = 3">
          <span>{{ $t('lev') }} 3</span>
          <span>{{ team.lev3 || 0 }}</span>
        </div>
      </div>
    </section>
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
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
export default {
  name: 'NewInvest',
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
        this.data = [
          { 
            time: 'asdajhsdjkasd',
            money: 'adjahsd'
          },
          { 
            time: 'asdajhsdjkasd',
            money: 'adjahsd'
          },
          { 
            time: 'asdajhsdjkasd',
            money: 'adjahsd'
          },
          { 
            time: 'asdajhsdjkasd',
            money: 'adjahsd'
          },
          { 
            time: 'asdajhsdjkasd',
            money: 'adjahsd'
          }
        ]
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
  background: url('~@/assets/tron/矢量智能对象 (1).png') no-repeat;
  background-size: 100% 292px;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px;

  .header {
    position: relative;
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fff;

    i {
      position: absolute;
      left: -3px;
    }
  }

  .level_box {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px 7px 0 0;
    padding: 25px 18px;
    margin-top: 182px;
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
          color: #4b95fe;
          display: flex;
          justify-content: center;

          &:first-child {
            width: 100%;
            height: 32px;
            border: 1px solid rgba(75, 149, 254, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-family: Arial;
            font-weight: 400;
            color: #4b95fe;
            margin-bottom: 18px;
          }
        }
      }

      .active {
        span {
          &:first-child {
            background-color: rgba(75, 149, 254, 1);
            color: #fff;
          }
        }
      }
    }
  }

  .info {
    width: 100%;
    height: 76px;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    display: flex;
    align-items: center;
    padding: 0 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    .item {
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;

      span {
        font-size: 11px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #87888A;

        &:first-child {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #C7C7C8;
        }
      }
    }
  }
}
</style>
