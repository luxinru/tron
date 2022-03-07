<template>
  <div class="line-box">
      <div class="box box1" :class="{ animation_drop: dropLoading }"></div>
      <div class="box box2" :class="{ animation_drop: dropLoading }"></div>
      <div class="box box3" :class="{ animation_drop: dropLoading }"></div>
      <div class="box box4" :class="{ animation_drop: dropLoading }"></div>
      <div class="box box5" :class="{ animation_drop: dropLoading }"></div>
  </div>
</template>

<script>
export default {
  props: {
    dropLoading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
.animation_drop {
  animation-name: drip;
  animation-timing-function: ease-in-out;
  animation-duration: .9s;
  animation-iteration-count: 1;
}
.line-box {
  position: absolute;
  right: 130px;
  top: 300px;
  .box {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    box-shadow: 0px 0px 13px 6px rgba(255, 216, 132, 0.911);
    background: linear-gradient(-90deg, #aa6703, #ffc46c);
    margin-right: 10px;
    opacity: 0;
  }

  .box1 {
    animation-delay: .2s;
  }
  .box2 {
    animation-delay: .6s;
  }
  .box3 {
    animation-delay: 1s;
  }
  .box4 {
    animation-delay: 1.4s;
  }
  .box5 {
    animation-delay: 1.8s;
  }
}

@keyframes drip {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(40px);
  }
}
</style>
