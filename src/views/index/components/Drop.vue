<template>
  <div class="line-box">
    <div class="line line1">
      <div v-for="i in 3" :key="i" class="drop" :class="{animation_drop: dropLoading}"></div>
    </div>
    <div class="line line2">
      <div v-for="i in 4" :key="i" class="drop" :class="{animation_drop: dropLoading}"></div>
    </div>
    <div class="line line3">
      <div v-for="i in 5" :key="i" class="drop" :class="{animation_drop: dropLoading}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.animation_drop {
  animation-name: drip;
  animation-timing-function: cubic-bezier(1, 0, 0.91, 0.19);
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.line-box {
  position: absolute;
  right: 130px;
  // top: 330px;
  top: 0;
  transform: rotate(50deg);
  .line1,
  .line2,
  .line3 {
    .drop {
      position: relative;
      display: inline-block;
      width: 8px;
      height: 8px;
      // top: -30px;
      margin: 0 3px;
      opacity: 0;
      background: rgb(77, 196, 247);
      border-radius: 20px;

      &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 8px solid rgba(77, 196, 247, 1);
        top: -6px;
      }
    }
  }
  .line1 {
    .drop {
      animation-delay: 2s;
    }
  }
  .line2 {
    .drop {
      animation-delay: 2.2s;
    }
  }
  .line3 {
    .drop {
      animation-delay: 2.3s;
    }
  }
  .line {
    display: flex;
    justify-content: center;
    height: 26px;
  }
}

@keyframes drip {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
