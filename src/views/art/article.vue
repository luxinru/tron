<template>
  <div>
    <div class="header">
      <div class="box">
        <img
          src="@/assets/tron/返回(2)@2x.png"
          alt=""
          @click="$router.go(-1)"
        />
      </div>
      <span>{{ title }}</span>
    </div>
    <div class="main" v-html="content"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import Fetch from '../../utils/fetch'
import { NavBar } from 'vant'

Vue.use(NavBar)

export default {
  components: {},
  data() {
    return {
      title: '',
      content: '',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    Fetch('/index/activity_detail', {}).then((res) => {
      console.log('res :>> ', res)
      this.title = res.data.title
      this.content = res.data.content
    })
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    back() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 22px 14px;

  .box {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    img {
      width: 18px;
      height: 16px;
    }
  }

  span {
    width: 100%;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #000000;
    margin-top: 8px;
  }
}

.main {
  width: 100%;
  // min-height: 100vh;
  height: max-content;
  // background-color: #f8f8f8;
  padding: 16px 13px;
  overflow: hidden;

  /deep/ p {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 19px;
    &:first-child {
      margin-top: 0;
    }
    margin-top: 8px;

    img {
      width: 100%;
    }

    a {
      color: rgba(94, 99, 231, 1);
    }
  }
}
</style>
