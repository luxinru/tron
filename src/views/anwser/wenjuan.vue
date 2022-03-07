<template>
  <div class="wenjuanBox">
    <div class="headerBox">
      <div class="header">
        <div class="head">
          <van-icon
            class="iconLeft"
            name="arrow-left"
            @click="$router.back()"
          />
          <span></span>
          <div>
            <!-- <img class="question" src="./image/question.png" alt="" @click="handleGoBaoKugz"> -->
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <!-- <div style="text-align: center;" ><img class="logo" src="./image/wenjuan.png" alt=""></div>         -->
      <!-- <div class="tips">
            欢迎参加学霸奖金挑战游戏，挑战成功将会立即获得现金红包，一秒到账支付宝账户，百万奖金等你来！
        </div> -->
      <!-- <div class="top">
        <img src="./image/beijing_top.png" alt="" />
      </div> -->

      <div class="index">
        <div class="mt3">
          答题倒计时:
          <van-count-down
            class="mm"
            :time="data.m"
            @finish="stop"
            ref="countDown"
          >
            <template v-slot="timeData">
              <span class="item">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
          秒
        </div>
        <div class="rule_box">
          <div class="rule_title">{{ data.title }}</div>
          <div class="rule_info_box">
            <!-- <div class="anwser_item">
                    威威微
                </div> -->

            <div
              ref="anwser"
              class="anwser_item"
              v-for="(v, k) in data.values"
              :key="k"
              @click="apply(v.id, $event)"
            >
              {{ v.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { CountDown } from "vant";
import { Dialog } from "vant";

Vue.use(CountDown);

export default {
  name: "index",
  data() {
    return {
      data: {
        askid: 0,
        title: "",
        values: [],
        m: 60 * 1000,
        type: 1,
        images: "",
      },
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.$refs.countDown.pause();
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/getask").then((res) => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "去认证",
          }).then(() => {
            this.$router.push("/auth");
          });
        } else if (res.data.alipay == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "绑定支付宝",
          })
            .then(() => {
              this.$router.push("/alipay");
            })
            .catch(() => {});
        } else {
          this.data.askid = res.data.id;
          this.data.title = res.data.title;
          this.data.values = res.data.values;
          this.data.images = res.data.image;
          this.$refs.countDown.reset();
          Dialog.alert({
            message: (res.data.status = res.info),
          });
        }
      });
    },
    apply(key, event) {
      this.setStyle();
      event.target.style.background = "rgba(242, 90, 7, 1)";
      event.target.style.color = "#fff";
      this.stop(key);
    },
    setStyle() {
      this.$refs.anwser.forEach((v) => {
        v.style.background = "rgba(255, 180, 63, 0.15)";
        v.style.color = "rgba(242, 90, 7, 1)";
      });
    },
    stop(key = 0) {
      let id = this.data.askid;
      this.$refs.countDown.pause();
      Fetch("/index/getask", { id: id, key: key }).then((res) => {
        this.data.askid = res.data.id;
        this.data.title = res.data.title;
        this.data.values = res.data.values;
        this.data.images = res.data.image;
        this.$refs.countDown.reset();
        Dialog.alert({
          message: (res.data.status = res.info),
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  padding: 0 13px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #fff;
  .iconLeft {
    position: relative;
    top: 12px;
    font-size: 22px;
  }

  .question {
    width: 19px;
  }
  > div,
  > i {
    width: 50px;
    text-align: center;
  }
  > i {
    text-align: left;
  }
}
.wenjuanBox {
  background-image: url("~@/assets/xinguang/1104答题ui_slices/BG@2x.png");
  background-size: 100% 100%;
  width: 100%;
  height: 812px;
  display: flex;
  flex-direction: column;
}
.main {
  // padding: 39px 25px 0;
  // margin-top: 115px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 313px;
  .mt3 {
    width: 149px;
    height: 29px;
    background: linear-gradient(-90deg, #f5d70d, #ef6c08);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
    margin-top: 22px;

    .mm {
      margin-left: 8px;

      .item {
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .index {
    width: 337px;
    background: #fff;
    border-radius: 7px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rule_box {
    // position: absolute;
    // background-image: url('./image/hgy/q_bg.png');
    // background-size: 100% 100%;
    width: 100%;
    overflow-y: scroll;
    // left: 20px;
    // right: 20px;
    // top: 300px;
    background-color: #ffffff;
    border-radius: 7px;
    padding: 25px 30px;
    .rule_title {
      font-size: 17px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
    }
    .rule_info_box {
      // padding: 0 20px;
      // margin-top: 30px;
      margin-top: 35px;
      .anwser_item {
        width: 291px;
        height: 44px;
        background: rgba(255, 180, 63, 0.15);
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 400;
        color: #F25A07;
        margin-top: 12px;
      }
      // .select{
      //     background: #6CD75E;
      //     color: #FFFFFF;
      // }
    }
  }
}
</style>