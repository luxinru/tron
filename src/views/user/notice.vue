<template>
  <div class="notice-page">
    <div class="header">
      <div class="head">
        <van-icon
          name="arrow-left"
          size="23"
          color="#000"
          @click="$router.back()"
        />
        Notifcation
      </div>
    </div>
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
              src="@/assets/tron/Notifcation_slices/5128d9072170e2b6d8df31c3e1bacfdc0872453d4efe-1LfzeQ_fw1200.png"
              class="icon"
            />

            <div class="info">
              <div class="notice-right">
                {{ v.title }}
              </div>
              <p class="notice-msg">{{ v.time | dateFormat }}</p>
            </div>
          </div>
        </div>
      </template>

      <van-empty v-else description="no data" />
    </div>
    <!-- <div class="fund_wrap">
            <table class="table">
                <tbody>
                <tr class="header">
                    <th class="first">状态</th>
                    <th>主题</th>
                    <th>时间</th>
                    <th class="last">操作</th>
                </tr>
                <tr v-for="(v,k) in data.list" :key="k">
                    <td v-if="!v.is_read" style="color: #00C800">未读</td>
                    <td v-if="v.is_read" style="color: #cccccc">已读</td>
                    <td>{{v.title}}</td>
                    <td>{{v.time|dateFormat}}</td>
                    <td>
                        <router-link class="button" :to="'/notice/' + v.id">查看</router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div> -->
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
  background-color: rgba(248, 248, 250, 1);
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
    // .select{
    //     font-size: 15px;
    //     font-weight: 500;
    //     color: #000000;
    //     position: relative;
    //     &::before{
    //         position: absolute;
    //         content: ' ';
    //         display: block;
    //         width: 50px;
    //         height: 2px;
    //         background-color: #0F79FF;
    //         border-radius: 1px;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         top: 27px;
    //     }
    // }
  }
  .notice-cont {
    // width: 349px;
    // background-color: #FFFFFF;
    // border-radius: 7px;
    // margin-left: 13px;
    .notice-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 13px;
      .icon-cont {
        width: 100%;
        height: 96px;
        background: #ffffff;
        box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
        border-radius: 13px;
        display: flex;
        align-items: center;
        padding: 20px 25px;
        margin-top: 12px;
        img {
          width: 66px;
          height: 54px;
          margin-right: 20px;
        }

        .info {
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
