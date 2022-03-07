<template>
  <div class="page">
    <div class="header">
      <div class="head">
        <van-icon
          name="arrow-left"
          size="23"
          color="#000"
          @click="$router.back()"
        />
        {{ $t('notifcation') }}
      </div>
    </div>
    <div class="main">
      <div class="info">
        <div class="value">
          <span>{{ data.title }}</span>
          <span>{{ data.add_time }}</span>
        </div>
        <img
          src="@/assets/tron/Notifcation2_slices/135c032a6d99ee8c3e7ada5c43a1ae0b6a71d50219afd-VqFSc3_fw1200.png"
          alt=""
        />
      </div>
      <div class="content">
        <span class="title">www.trxbbg.com</span>
        <div class="box" v-html="data.content"></div>

        <img src="@/assets/tron/Notifcation2_slices/024ec4ef7ffa4e2fbc2ffc6fa56804acda1189461c7dd-tXq24N_fw1200.png" alt="">
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
  background-color: #f5f5f5;
  font-family: PingFang SC;
  // font-weight: 500;
  min-height: 100%;
  .main {
    margin: 12px auto;
    width: 348px;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 13px;
    padding: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .info {
      width: 100%;
      height: 78px;
      display: flex;

      .value {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        span {
          font-size: 16px;
          font-family: Arial;
          font-weight: bold;
          color: #4b4d59;

          &:last-child {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            margin-top: 24px;
          }
        }
      }

      img {
        width: 106px;
        height: 78px;
        margin-left: 16px;
      }
    }

    .content {
      .title {
        width: 100%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #8a07e7;
        display: flex;
        justify-content: center;
        margin-top: 16px;
      }

      .box {
        font-size: 15px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
        line-height: 27px;
        margin-top: 19px;
      }

      img {
        width: 147px;
        height: 118px;
        margin-top: 16px;
      }
    }
  }
}
</style>
