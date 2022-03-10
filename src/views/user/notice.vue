<template>
  <div class="notice-page">
    <IHeader :title="$t('notifcation')"></IHeader>

    <div class="notice-cont" v-if="data.list.length">
      <div
        class="icon-cont"
        v-for="(v, k) in data.list"
        :key="k"
        @click="$router.push('/notice/' + v.id)"
      >
        <img src="@/assets/tron/消息通知.png" class="icon" />

        <div class="info">
          <div class="notice-right">
            {{ v.title }}
          </div>
          <p class="notice-msg">{{ v.time | dateFormat }}</p>
        </div>
        <van-icon name="arrow" size="12" />
      </div>
    </div>

    <van-empty class="empty" v-else description="no data" />
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import moment from 'moment'
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'login',

  components: {
    IHeader,
  },

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
  width: 100%;
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 21px;
  background: url('~@/assets/tron/波场 2 (2).png') no-repeat;
  background-size: 100% 233px;

  .notice-cont {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 34px;
    background: #ffffff;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px;
    padding: 13px 20px;

    .icon-cont {
      width: 100%;
      height: 51px;
      display: flex;
      align-items: center;
      margin-top: 30px;

      &:first-child {
        margin-top: 0;
      }

      img {
        width: 51px;
        height: 51px;
        margin-right: 16px;
      }

      .info {
        flex: 1 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .notice-right {
          font-size: 16px;
          font-family: Arial;
          font-weight: bold;
          color: #0a3867;
        }
        .notice-msg {
          font-size: 11px;
          font-family: Arial;
          font-weight: 400;
          color: #4e7091;
          margin-top: 16px;
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
  }
}
</style>
