<template>
  <div class="water-drop" @click="getDrop">
    <!-- <img :src="require(`../image/home/home_water_${status}.png`)" alt="" /> -->
    <img :src="require(`../image/hgy/sd.png`)" alt="" />
    <p v-if="countDown <= 0">水滴<br />5g</p>
    <p v-else>
      <span>还剩</span>
      <span style="font-size:12px;">{{ minute || '00' }}:{{ second || '00' }}</span>
    </p>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  props: {
    time: {
      // 最后领取时间
      type: Number,
      default: 0,
    },
  },
  watch: {
    time(newVal) {
      if (newVal > 0) {
        this.createTimer();
      }
    },
  },

  created() {},
  data() {
    return {
      defaultTime: 3600, // 默认30分钟
      countDown: 0,
      currTime: parseInt(new Date().getTime() / 1000),
      timer: null, // 定时器
      status: 'broad', // 水滴领取状态
      minute: null,
      second: null,
    };
  },
  methods: {
    getDrop() {
      if (this.countDown === 0) {
        this.$emit('getDrop');
      } else {
        Toast({
          message: `${this.minute }:${this.second }后才能领取`,
          position: 'bottom',
        });
      }
    },
    createTimer() {
      const differTime = parseInt(this.currTime - this.time); //时间戳差转换成秒
      this.countDown = 3600 - differTime; // 30分钟换算成1800秒
      if (this.countDown < 0) {
        this.countDown = 0;
        return;
      }
      const timer = window.setInterval(() => {
        if (this.minute === '00' && this.second === '00') {
          window.clearInterval(timer);
        } else {
          this.countDown = this.countDown - 1;
          this.minute = this.checkFigure(parseInt(this.countDown / 60));
          this.second = this.checkFigure(parseInt(this.countDown % 60));
        }
      }, 1000);
    },
    checkFigure(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    },
  },
};
</script>

<style lang="less">
.water-drop {
  position: relative;
  width: 60px;
  height: 60px;
  animation: container 2s linear infinite;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    width: 40px;
    height: 35px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    color: #048c00;
    font-size: 14px;
    font-weight: bold;
  }
}

@keyframes container {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -10px);
  }
  50% {
    transform: translate(0, -20px);
  }

  75% {
    transform: translate(0, -10px);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
