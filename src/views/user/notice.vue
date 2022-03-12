<template>
  <div class="notice-page">
    <div class="list">
      <template v-if="data.list.length">
        <div
          class="item"
          v-for="(v, k) in data.list"
          :key="k"
          @click="$router.push('/notice/' + v.id)"
        >
          <div class="info">
            <div class="notice-right">
              {{ v.title }}
            </div>
            <p class="notice-msg">{{ v.time | dateFormat }}</p>
          </div>
          <div class="btn">{{ $t('details') }}</div>
        </div>
      </template>

      <van-empty
        v-else
        description="no data"
      />
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import moment from 'moment'

export default {
  name: 'login',
  data() {
    return {
      data: [],
      selectIndex: 0,
      footer: '',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  filters: {
    dateFormat(time) {
      return moment(time).format('YYYY-MM-DD')
    },
  },
  mounted() {
    this.start()
    this.footer = localStorage.getItem('footer')
  },
  methods: {
    start() {
      Fetch('/user/notice').then((r) => {
        this.data = r.data
      })

      console.log(this.data)
    },
    onClickLeft() {
      this.$router.back()
    },
    back() {
      this.$router.back()
    },
    changeBar(index) {
      this.selectIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
.notice-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px;

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 18px;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    margin: 16px 0;
    .item {
      width: 100%;
      height: 83px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .notice-right {
          font-size: 16px;
          font-family: Alibaba PuHuiTi;
          font-weight: 500;
          color: #2C3136;
        }
        .notice-msg {
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          margin-top: 20px;
        }
      }

      .btn {
        padding: 9px 16px;
        background: #4B95FE;
        border-radius: 3px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
</style>
