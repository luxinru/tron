<template>
  <div class="headerBox">
    <div class="header">
      <div class="head">
        <van-icon class="iconLeft" name="arrow-left" @click="routerFun()" />
        <span>{{ title }}</span>
        <div>
          <!-- <img class="question" src="./image/question.png" alt="" @click="handleGoBaoKugz"> -->
        </div>
      </div>
    </div>
    <!-- <div class="money">{{ money }}</div>
      <div class="tips">
        {{ title == '充值详情' ? '充值金额(元)' : '账户余额(元）' }}
      </div> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    money: {
      type: String,
      default: ''
    }
  },
  methods: {
    routerFun () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.item-header-icon {
  /deep/ .van-icon {
    color: #000;
  }
}

.headerBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 243px;
  background: rgba(39, 40, 50, 1);
  // background-repeat: no-repeat;
  // background-size: cover;
  margin: 0 auto 0;
  // padding: 32px;
  text-align: center;
  .head span {
    width: 100px;
  }
  .money {
    font-size: 33px;
    font-family: DIN Alternate;
    font-weight: bold;
    color: #ffffff;
    margin-top: 40px;
  }
  .tips {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-top: 16px;
  }
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 0 13px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #fff;
  .iconLeft {
    position: relative;
    top: 12px;
    font-size: 22px;
  }

  .question {
    width: 19px;
  }
  > div,
  > i,
  > span {
    width: 50px;
    text-align: center;
  }
  > i {
    text-align: left;
  }
}
</style>
