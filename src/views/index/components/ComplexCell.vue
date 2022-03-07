<template>
  <div class="complex-cell">
    <div class="logo">
        <img :src="require(`./../../../assets/images/huaguoyuan/task/task-icon-${content.key}.png`)" alt=""/>
    </div>
    <div class="content">
      <div class="content_name">
        <div class="name">{{ content.name }}</div>
      </div>
      <div class="desc">{{ content.desc }}</div>
    </div>
    <div>
      <van-button class="button" :color="content.fieldStatus ? '#BFC8C4' : 'linear-gradient(90deg, #91EA74 0%, #5BCF55 100%)'" @click="handleButton(content.fieldStatus)">{{ content.fieldStatus ? '已领取' : '立即领取'}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComplexCell',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    handleButton(status) {
      if (status) return
      this.$emit('button')
    }
  }
};
</script>

<style lang="less" scoped>
.complex-cell {
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
    padding: 19px 0;
    &:last-child {
        border-bottom: none;
    }
  .logo {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    text-align: left;
    flex: 1;
    padding-left: 20px;
    .content_name {
      div {
        display: inline-block;
      }
    }
    .name {
      min-width: 90px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #535353;
    }
  }
  .desc {
    font-size: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #9C9C9C;
      padding-top: 7px;
  }
  .button {
      width: 86px;
      height: 30px;
      border-radius: 15px;
  }
}
</style>
