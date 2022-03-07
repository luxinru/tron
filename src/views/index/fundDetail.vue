<template>
  <div class="item-container ">
    <div class="item-header header">
      <div class="item-header-icon">
        <div class="index-header-title"></div>
        <van-nav-bar
          class="navbar"
          :fixed="true"
          :border="false"
          left-text="返回"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>
    </div>
    <div class="block"></div>
    <img class="benefit_title" src="./image/home/benefit_details_title.png" />
    <div class="item-list-box">
      <div class="item-list-info">
        <img
          class="item-thumbnail"
          :src="'http://api.0551jhw.com/' + data.image"
          alt=""
        />
        <div class="item-text">{{ data.title }}</div>
        <div class="item-title">
          <span class="item-tip"></span>
          项目说明
        </div>
        <div class="content" v-html="data.content"></div>
        <a class="btn" :href="data.url">活动网址</a>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';

export default {
  name: 'fundDetail',
  data() {
    return {
      data: {
        image: '',
      },
      loading: false,
      finished: false,
      num: 9999,
    };
  },
  created() {
    this.$parent.footer(false, 'tree', 'tree');
    this.getCrcreDetail();
  },
  methods: {
    getCrcreDetail() {
      console.log(this.$route);
      Fetch('/crcre/crcreDetails', { crcre_id: this.$route.params.id }).then(
        (res) => {
          this.data = res.data;
          this.finished = true;
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import 'fund';
@import '@/assets/styles/common.less';
.item-list-box {
  height: 560px !important;
  overflow: initial !important;
}
.item-list-info {
  position: relative;
  overflow: hidden !important;
  border-radius: 20px;
  height: 560px  !important;
  .item-title {
    margin-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    .item-tip {
      display: block;
      width: 4px;
      height: 15px;
      float: left;
      margin-left: -10px;
      margin-top: 1px;
      background: rgb(248,100,80);
    }
  }
  .item-thumbnail {
    height: 100px !important;
  }
  .item-text {
    font-size: 16px !important;
    position: absolute;
    left: 15px;
    top: 20px;
  }
  .content {
    height: 340px;
    overflow: scroll;
  }
  overflow: hidden;
  .btn {
    display: block;
    width: 260px;
    height: 40px;
    line-height: 40px;
    margin: 15px auto 0;
    color: #fff;
    border-radius: 18px;
    background: #fdc7a7;
    font-size: 20px;
    text-align: center;
  }
  p {
    word-wrap: break-word;
    word-break: normal;
  }
  img {
    width: 100%;
  }
}
</style>
