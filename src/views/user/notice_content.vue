<template>
  <div class="page">
    <IHeader :title="$t('notifcation')"></IHeader>

    <div class="main">
      <div class="info">
        <span>{{ data.title }}</span>
        <span>{{ data.add_time }}</span>
      </div>
      <div class="content" v-html="data.content">
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'nitice_content',

  components: {
    IHeader
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
  width: 100%;
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 21px;
  background: url('~@/assets/tron/波场 2 (2).png') no-repeat;
  background-size: 100% 233px;

  .main {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px;
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 33px;

    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        color: #053464;

        &:last-child {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          margin-top: 16px;
        }
      }
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 28px;

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
  }
}
</style>
