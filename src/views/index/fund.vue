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
    <img class="benefit_title" src="./image/home/benefit_title.png" />
    <div class="item-list-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="item-list-info"
          v-for="item in data.data"
          @click="goToDetail(item.id)"
          :key="item.id"
        >
          <img
            class="item-thumbnail"
            :src="'http://api.0551jhw.com/' + item.thumbnail"
            alt=""
          />
          <div class="item-text">{{ item.title }}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';

export default {
  name: 'fund',
  data() {
    return {
      data: {
        list: [],
      },
      loading: false,
      finished: false,
      num: 9999,
    };
  },
  created() {
    this.$parent.footer(false, 'tree', 'tree');
    this.getCrcreList();
  },
  mounted() {
    // this.start();
  },
  methods: {
    onLoad() {

    },
    getCrcreList() {
      Fetch('/crcre/crcreList', { num: this.num }).then((res) => {
        this.data = res.data;
        this.finished = true
      });
    },
    goToDetail(id) {
      this.$router.push(`/crcre/${id}`)
    },
  },
};
</script>

<style lang="less" scoped>
@import 'fund';
@import '@/assets/styles/common.less';
</style>
