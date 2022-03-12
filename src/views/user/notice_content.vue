<template>
  <div class="page">
    <div class="main">
      <div class="info">
        <span>{{ data.title }}</span>
        <span>{{ data.add_time }}</span>
      </div>
      <div class="content">
        <span class="title">www.trxbbg.com</span>
        <div class="box" v-html="data.content"></div>
      </div>
    </div>
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
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px;
  .main {
    margin: 16px auto;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    padding: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 20px;
        font-family: Arial;
        font-weight: bold;
        color: #2c3136;

        &:last-child {
          margin-top: 23px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .content {
      .title {
        width: 100%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4b95fe;
        display: flex;
        justify-content: center;
        margin-top: 16px;
      }

      .box {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 36px;

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
            color: #4b95fe;
          }
        }
      }
    }
  }
}
</style>
