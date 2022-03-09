<template>
  <div class="IHeader_root">
    <div class="back">
      <van-icon
        v-if="isback"
        name="arrow-left"
        @click="$router.go(-1)"
        :color="color"
        size="18"
      />
    </div>
    <span>{{ title }}</span>
  </div>
</template>
 
<script>
export default {
  name: 'IHeader',

  props: {
    isback: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'title',
    },
    color: {
      type: String,
      default: 'rgba(255, 255, 255, 1)',
    },
  },

  data() {
    return {}
  },

  methods: {},
}
</script>
 
<style lang='less' scoped>
.IHeader_root {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  .back {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 36px;
  }

  span {
    width: 100%;
    font-size: 26px;
    font-family: Arial;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>