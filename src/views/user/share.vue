<template>
  <div class="page">
    <img src="@/views/user/images/sf/back.png" class="back" @click="$router.back()" />
    <!-- <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                邀请好友
            </div>
        </div>
        <div class="top">
            <div class="avator_box">
                <div class="avatar" v-bind:style="{'background-image':'url(' + data.avatar + ')'}"></div>
                <div class="invite_btn" @click="showShare">点击获取邀请二维码</div>
            </div>
        </div>
        <div class="main">
            <span class="my_invite">我推荐的会员</span>
            <div class="content">
                <div class="item clearfix">
                    <div class="left title">推广会员</div>
                    <div class="right title">注册时间</div>
                </div>
                <div class="item clearfix" v-for="(item, key) in data.share_user" :key="key">
                    <div class="left 1">{{item.phone}}</div>
                    <div class="right">{{item.time}}</div>
                </div>
            </div>

        </div>
        <div class="qrcode_box" v-if="is_show_share">
            <div class="qrcode" :style="'background-image: url(' + data.share_image_url + ')'"></div>
            <p class="qrcode_info">好友扫描以上专属二维码可直接注册</p>
            <button type="button" class="qrcode_btn" @click="close">我知道啦</button>
        </div>
        <div class="mask_c" v-if="is_show_share"></div> -->

    <!-- <img src="../../assets/icons/back_white.svg" @click="$router.back()" class="back"> -->
    <!-- <img src="../../assets/share/share.jpg" width="100%"> -->

    <div class="main-cont">
      <!-- <p class="my_invite">我的邀请</p> -->
      <div class="title">
        <div class="left">推广会员</div>
        <div class="right">注册时间</div>
      </div>
      <div class="item-cont">
        <div class="item" v-for="(item, key) in data.share_user" :key="key">
          <div class="left">{{ item.phone }}</div>
          <div class="right">{{ item.time }}</div>
        </div>
      </div>
    </div>

    <div class="btn" @click="showShare">点击获取邀请二维码</div>

    <div class="qrcode_box" v-if="is_show_share">
      <div class="content">
        <img :src="data.share_image_url" class="qrcode" />
        <p class="qrcode_tips">好友扫描以上专属二维码<br />可直接注册</p>
        <div class="qrcode_btn" @click="close">确定</div>
      </div>
    </div>

    <!-- <div class="qrcode_box" v-if="is_show_share">
            <div class="qrcode" :style="'background-image: url(' + data.share_image_url + ')'"></div>
            <p class="qrcode_info">好友扫描以上专属二维码可直接注册</p>
            <button type="button" class="qrcode_btn" @click="close">我知道啦</button>
        </div>
        <div class="mask_c" v-if="is_show_share"></div> -->
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
      is_show_share: false,
      uid: "test_data",
      img: "test_data",
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.start();
  },
  methods: {
    close() {
      this.is_show_share = false;
    },
    showShare() {
      this.is_show_share = true;
    },
    start() {
      Fetch("/user/share").then((res) => {
        this.data = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  position: relative;
  width: 100%;
  height: 812px;
  background-image: url("~@/assets/xinguang/邀请_slices/微信图片_20211203164153.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;

  .back {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 8px;
    height: 15px;
    // margin-top: 32px;
  }
}
.main-cont {
  width: 338px;
  height: 268px;
  background: #ffffff;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 465px;
  .title {
    margin-top: 33px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 500;
    color: #7b5d46;

    div {
      flex: 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .item-cont {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    .item {
      display: flex;
      margin-top: 16px;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #939393;
      div {
        flex: 1 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.btn {
  width: 285px;
  height: 49px;
  background: #e9c58c;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 16px;
}

.qrcode_box {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 294px;
    // height: 438px;
    box-sizing: border-box;
    border-radius: 7px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .qrcode {
      width: 173px;
      height: 173px;
      margin-top: 49px;
    }
    .qrcode_tips {
      text-align: center;
      line-height: 20px;
      margin-top: 46px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .qrcode_btn {
      width: 253px;
      height: 42px;
      background: #e9c58c;
      border-radius: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin: 32px 0;
    }
  }
}

// .top {
//     padding: 25px 0 85px 0;
//     background: #554b5f;

// }

// .top .title {
//     width: 55.4%;
//     margin: 0 auto;
//     height: 35px;
//     line-height: 35px;
//     text-align: center;
//     color: #333333;
//     font-size: 18px;
//     background: #e8c27d;
//     border-radius: 35px;
// }

// .top .avator_box {
//     width: 51.8%;
//     margin: 0 auto;
//     position: relative;
//     background: #e8c27d;
//     border-radius: 15px;
//     padding: 1px 0;
// }

// .top .avator_box .avatar {
//     background-size: contain;
//     //background-image: url(images/code.png);
//     width: 96px;
//     height: 96px;
//     margin: 0 auto;
//     border-radius: 50%;
//     /*#background: #fff;*/
//     background-repeat: no-repeat;
//     background-position: center;

// }

// .top .avator_box .invite_btn {
//     height: 22px;
//     line-height: 22px;
//     color: #fefefe;
//     font-size: 12px;
//     border-radius: 22px;
//     width: 140px;
//     text-align: center;
//     background: #544b5e;
//     margin: 7px auto 10px auto;
// }

// .top .avator_box .invite_title {
//     height: 30px;
//     line-height: 30px;
//     color: #fefefe;
//     font-size: 18px;
//     border-radius: 30px;
//     width: 115px;
//     text-align: center;
//     background: #544b5e;
//     margin: -16px auto 10px auto;
//     border: 1px solid #e8c27d;
// }

// .main {
//     width: 89%;
//     padding: 38px 6% 0 6%;
//     background: #fff;
//     border-radius: 15px;
//     margin: -72px auto 0 auto;
//     position: relative;
// }

// .main .my_invite {
//     position: absolute;
//     z-index: 10;
//     color: #fff;
//     text-indent: 5px;
//     width: 90px;
//     height: 16px;
//     line-height: 16px;
//     font-size: 12px;
//     background: #e8c27d;
//     border-radius: 0 16px 16px 0;
//     top: 14px;
//     left: 0;
// }

// .main .content {
//     padding-bottom: 10px;
// }

// .main .content .item {
//     border-bottom: 1px solid #edebeb;
//     color: #999999;
//     font-size: 12px;
//     padding: 1rem 0;
// }

// .main .content .item:last-child {
//     border-bottom: none;
// }

// .main .content .item .title {
//     font-size: 14px;
// }

// .main .content .item .left {
//     float: left;
//     width: 90px;
//     text-align: center;
// }

// .main .content .item .right {
//     float: right;
//     width: 140px;
//     text-align: center;
// }

// .mask_c {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     background: #000;
//     opacity: 0.7;
//     z-index: 11;
// }

// .qrcode_box {
//     width: 258px;
//     height: 260px;
//     background-image: url(images/invite_qrcode_box.png);
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     -webkit-transform: translate(-50%, -50%);
//     -ms-transform: translate(-50%, -50%);
//     transform: translate(-50%, -50%);
//     z-index: 12;
//     overflow: hidden;
// }

// .qrcode_box .qrcode {
//     width: 134px;
//     height: 134px;
//     background-image: url(images/qrcode.png);
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//     margin: 15px auto;
// }

// .qrcode_box .qrcode_info {
//     text-align: center;
//     color: #fff;
//     font-size: 13px;
//     margin: 20px auto 12px auto;

// }

// .qrcode_box .qrcode_btn {
//     display: block;
//     width: 128px;
//     height: 36px;
//     line-height: 36px;
//     text-align: center;
//     border-radius: 36px;
//     font-size: 16px;
//     color: #544b5e;
//     background: #e8c27d;
//     margin: 0 auto;

// }
</style>