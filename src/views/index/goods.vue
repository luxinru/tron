<template>
  <div class="mobile">
    <meta name="referrer" content="no-referrer" />
    <div class="header">
      <div class="head">
        <div @click="$router.push('/home')">
          <van-icon
            name="arrow-left"
            size="20"
            color="#ffffff"
            style="vertical-align: middle"
          />
        </div>
        <!--<span class="back" @click="$router.push('/home')"></span>-->
        <div>积分商城</div>
        <div></div>
      </div>
    </div>
    <div class="goods-header-box"></div>
    <div class="goods-content-box">
      <!-- <div class="goods-content-img"><div class="goods-content-img-back"></div></div> -->
      <div class="my-integral-info-box">
        <img
          class="giftImg"
          src="./../../assets/images/shufeng/goods/gift.png"
          alt=""
          srcset=""
        />
        <div class="integral-info">
          <span>总积分</span>{{ mydata.integral }}
        </div>
        <div class="address-btn-box">
          <div class="address-btn" @click="$router.push('/order')">
            我的订单
          </div>
          <div class="address-btn" @click="$router.push('/address')">
            收货地址
          </div>
        </div>
      </div>
      <div class="goods_list">
        <div
          v-for="(item, j) in category_data.category"
          v-bind:style="{ display: j === dh_index ? 'block' : 'none' }"
          :key="j"
        >
          <van-row gutter="5" type="flex">
            <van-col
              span="12"
              v-for="(item2, j_num) in item.list"
              :key="j_num"
              style="margin-bottom: 10px"
            >
              <div class="right_list">
                <div class="shop_pic" align="center">
                  <a :href="'/#/goods_details/' + item2.id"
                    ><img
                      :src="item2.img"
                      style="width: 30vw; height: 30vw; border-radius: 10px"
                      alt=""
                  /></a>
                </div>
                <div class="shop_detail">
                  <!-- <p class="list_title" style="font-weight: 700;margin-top: 5px;font-size: 3.5vw;">{{item2.title}}</p> -->
                  <!--<div class="shop_gb">-->
                  <!--    <div class="vip_icon">-->
                  <!--        <span>{{item2.integral}} 积分</span>-->
                  <!--    </div>-->
                  <!-- <div class="vip_icon" :class="`vip${item2.level}`">
                            <span>{{item2.price}}积分</span>
                          </div> -->
                  <!-- <div class="vip_icon2 vip_icon" :class="`vip${item2.next_level}`">
                            <span>{{item2.next_level_price}}积分</span>
                          </div> -->
                  <!--</div>-->
                  <div
                    class="list-footer"
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: space-around;
                      height: 100px;
                    "
                  >
                    <!-- <div class="add_del">
                            <span @click="del(j,j_num)">-</span>
                            <span class="num">{{dh_num[j][j_num]}}</span>
                            <span @click="add(j,j_num)">+</span>
                          </div> -->
                    <!-- <div class="dh_btn" :class="[{'dh_yes':item2.status==1},{'dh_no':item2.status==2},{'dh_over':item2.status==3},]" @click="category_btn(item2.id,dh_num[j][j_num])">{{dh_status(item2.status)}}</div> -->
                    <div class="list_title">{{ item2.title }}</div>
                    <div class="list-integral">{{ item2.integral }} 积分</div>
                    <div
                      class="dh_btn"
                      @click="category_btn(item2.id, dh_num[j][j_num])"
                    >
                      立即兑换
                    </div>
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "shop",
  data() {
    return {
      mydata: {},
      data: {},
      dh_index: 0,
      horn_block: false,
      category_data: {},
      is_sleep: false,
      show_water: true,
      show_manure: true,
      treeImg: "",
      dh_num: [],
      only_num: 1,
      sign_ok: false,
      new_sign_ok: false,
      shop_show: false,
      show_apple: false,
      rule_mask: false,
      add_res: false,
      only_money: false,
      money_icon_show: false,
      show_delay_animate: "",
      level_lc: "lv2",
      horn_msg: "",
      jump_url: "/item",
      fly_go: "",
      hide_tree: [],
      progress: "0%",
      notice_num: 1,
      mp3: "",
      sign_money: 0,
      dh_btn_type: "",
      water_time: "每日0点—24点",
      water_rule: "cs2",
      rule_dh: false,
      rule_msg: "cs",
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    setTimeout(function () {
      document.getElementById("app").style.marginBottom = 0;
    }, 100);
    this.mp3 = require("./image/didi.mp3");
    this.start();

    if (location.href.indexOf("openshop") != -1) {
      this.shop_show = true;
    }

    // $(window).resize(function(){
    // 	set();
    // });

    // set();
    // this.start();
  },
  methods: {
    start() {
      Fetch("/user/info").then((res) => {
        this.mydata = res.data;
      });
      // 兑换信息
      Fetch("/index/goods_list").then((res) => {
        this.category_data = res.data;
        console.log("好", res.data);
        for (var i = 0; i < res.data.category.length; i++) {
          this.dh_num.push([]);
          for (var j = 0; j < res.data.category[i].list.length; j++) {
            this.dh_num[i].push(1);
          }
        }
        if (res.data.exchange_rules.content || res.data.exchange_rules.title) {
          this.rule_msg =
            res.data.exchange_rules.content || res.data.exchange_rules.title;
        }
      });
    },
    category_btn(id, num) {
      Fetch("/index/shop_exchange", {
        gid: id,
        num: num,
      }).then((res) => {
        this.$notify({
          background: "#07c160",
          message: res.info,
        });
        this.start();
      });
    },
  },
};
</script>

<style scoped lang="less">
.mobile {
  height: 100%;
  font-size: 16px;
  padding-bottom: 30px;
  font-family: PingFang SC;
  background-color: #f5f5f5;
}
.header .head {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  z-index: 10;
  height: 50px;
  text-align: center;
  background-color: #1e3ff6;
  line-height: 50px;
  color: #fff;
  font-weight: 550;
  font-size: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 13px;
}
.header .head .back {
  display: inline-block;
  width: 18px;
  height: 18px;
  /*background: url(../index/image/back.png) no-repeat center;*/
  /*background-size: contain;*/
  background-image: none;
  position: absolute;
  top: 27px;
  left: 20px;
  z-index: 2;
}
.goods-header-box {
  height: 100px;
  background: #1e3ff6;
  border-radius: 0 0 40px 40px;
}
.goods-content-box {
  padding: 0 13px;
  margin-top: -50px;
  .goods-content-img {
    height: 150px;
    overflow: hidden;
    border-radius: 7px;
    margin-bottom: 14px;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 7px;
    }
    &-back {
      height: 150px;
      background-image: url("./../../assets/images/shufeng/goods/goods-1.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .my-integral-info-box {
    width: 348px;
    height: 90px;
    background: #ffffff;
    box-shadow: 0px 3px 12px 0px rgba(39, 52, 125, 0.1);
    border-radius: 7px;
    padding: 18px 18px 21px;
    position: relative;

    .giftImg {
      position: absolute;
      top: -45px;
      right: 10px;
      width: 81px;
    }
    .integral-info {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #f63931;
      > span {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #1d1d1d;
        padding-right: 10px;
        vertical-align: middle;
      }
    }
    .address-btn-box {
      display: flex;
      align-items: center;
      padding-top: 20px;
      .address-btn {
        width: 82px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        margin-right: 16px;
        border: 1px solid #5a5b5d;
        border-radius: 12px;
        font-size: 11px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #868686;
      }
    }
  }
  .goods_list {
    background: #f8f9fc;
    border-radius: 7px;
    margin-top: 13px;
    padding: 4px 4px;
  }
}
.right_list {
  position: relative;
  height: 100%;
  border-radius: 7px;
  // padding-bottom: 55px;
  background: #ffffff;
  overflow: hidden;
  padding-top: 10px;
}

.shop_pic img {
  //width: 95%;
}

.shop_detail {
  text-align: center;
  .list_title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #232323;
    line-height: 18px;
    padding: 4px 16px;
    text-align: left;
  }
}
.list-footer {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // right: 0;
  .list-integral {
    padding: 0 16px;
    // background: #F5D81A;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ed1920;
    text-align: left;
  }
}

.dh_btn {
  // height: 32px;
  line-height: 29px;
  text-align: center;
  // background: #0F79FF;
  border-radius: 0 0 7px 7px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  width: 103px;
  height: 29px;
  background: #023efe;
  border-radius: 15px;
  margin: 13px auto;
}
</style>
