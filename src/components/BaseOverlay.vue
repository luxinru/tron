<template>
  <van-overlay :show="show" @click="show = false" z-index="100">
    <div class="wrapper" style="margin-top:30px;">
      <img class="close_img" src="@/assets/icons/close.png" @click="closeDialog" />
      <img src="@/assets/images/seed_bg3.png" class="t_img" alt="" />
      <div class="title">{{ title }}</div>
      <div class="center" @click.stop>
        <slot />
      </div>
      <img src="@/views/index/image/seed_bg2.png" class="b_img" alt="" />
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'BaseOverlay',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    this.showDialog()
  },
  methods: {
    showDialog() {
      this.show = true
    },
    closeDialog() {
      this.show = false
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 320rpx;
  position: relative;
  .close_img {
    position: absolute;
    right: 20px;
    top: 55px;
    z-index: 100;
    width: 40px;
    height: 40px;
  }
  .title {
    font-family: PingFang SC;
    font-size: 20px;
    color: #fef1c7;
    height: 50px;
    margin: -55px auto 0;
  }
  .center {
    width: 320px;
    height: auto;
    background: #d3843b;
    opacity: 1;
  }
  .t_img {
    width: 320px;
    height: auto;
  }
  .b_img {
    width: 320px;
    height: auto;
    margin-top: -2px;
  }
}
</style>
