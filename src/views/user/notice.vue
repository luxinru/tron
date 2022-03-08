<template>
  <div class="notice-page">
    <div class="notice-cont">
      <template v-if="data.list.length">
        <div
          class="notice-list"
          v-for="(v, k) in data.list"
          :key="k"
          @click="$router.push('/notice/' + v.id)"
        >
          <div class="icon-cont">
            <img
              src="@/assets/tron/图层 12.png"
              class="icon"
            />

            <div class="info">
              <div class="info_box">
                <div class="notice-right">
                  {{ v.title }}
                </div>
                <p class="notice-msg">{{ v.time | dateFormat }}</p>
              </div>

              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </template>

      <van-empty v-else description="no data" />
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
      data: {
        list: [],
      },
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
  font-family: PingFang SC;
  // font-weight: 400;
  min-height: 100%;

  .all-read {
    position: fixed;
    width: 86px;
    line-height: 29px;
    border: 1px solid #e9c58c;
    border-radius: 14px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    color: #e9c58c;
    top: 10px;
    right: 15px;
    z-index: 99;
  }
  .nav-bar {
    width: 100%;
    height: 104px;
    background: #ffffff;
    display: flex;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
    }
    p {
      font-size: 13px;
      font-weight: 500;
      color: #000000;
      margin-top: 10px;
    }
    div {
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .notice-cont {
    .notice-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 13px;
      margin-top: 13px;
      .icon-cont {
        width: 100%;
        height: 70px;
        display: flex;
        margin-top: 12px;
        img {
          width: 41px;
          height: 41px;
          margin-right: 13px;
        }

        .info {
          flex: 1 0;
          height: 100%;
          display: flex;
          padding-top: 12px;
          border-bottom: 1px solid rgba(221, 221, 221, 1);

          .info_box {
            flex: 1 0;
            
            .notice-right {
              font-size: 17px;
              font-family: Arial;
              font-weight: bold;
              color: #1e253c;
            }
            .notice-msg {
              font-size: 11px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.5);
              margin-top: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
