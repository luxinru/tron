<template>
  <div class="page">
    <div class="header">
      <div class="box">
        <img
          src="@/assets/tron/返回(2)@2x.png"
          alt=""
          @click="$router.go(-1)"
        />
      </div>
      <span class="title">{{ data.title }}</span>
      <span class="time">{{ data.add_time }}</span>
    </div>

    <div class="main" v-html="data.content"></div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
// import { VueEditor } from 'vue2-editor'

export default {
  name: 'nitice_content',
  components: {
    // VueEditor
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      Fetch('/user/notice_view', {
        id: this.$router.history.current.params.id,
      }).then((res) => {
        this.data = res.data.view
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  background-color: #fff;
  font-family: PingFang SC;
  // font-weight: 500;
  min-height: 100%;

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

    .title {
      width: 100%;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
      margin-top: 8px;
    }

    .time {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      margin-top: 25px;
    }
  }

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 21px;

    /deep/ p {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 19px;
      &:first-child {
        margin-top: 0;
      }
      margin-top: 11px;

      img {
        width: 100%;
      }

      a {
        color: rgba(94, 99, 231, 1);
      }
    }
  }
}
</style>
