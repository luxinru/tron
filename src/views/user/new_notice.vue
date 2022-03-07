<template>
  <div>
    <div class="header">
      <div class="head">
        <van-icon
          name="arrow-left"
          size="23"
          color="#000"
          @click="$router.back()"
        />
        <!--<router-link :to="path" class="back"></router-link>-->
        <div>{{ title }}</div>
        <div></div>
      </div>
    </div>
    <div class="main" v-html="content">
    </div>
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
    Fetch('/index/new_notice', {}).then((res) => {
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
