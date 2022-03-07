<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
    <a :href="item.url">
      <img :src="item.thumb">
    </a>
    </van-swipe-item>
  </van-swipe>
</template>
 
<script>
export default {
  props: {
    list: Array
  },
  methods: {
   
  }
}
</script>
 
<style lang='less' scoped>
  .my-swipe {
	  display: flex;
	  flex-shrink: 0;
	  flex-wrap: wrap;
	  width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>