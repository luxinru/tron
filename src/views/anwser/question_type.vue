<template>
  <div class="question-type">
    <img src="./image/sf/zsjc.png" @click="goToQuestion(1)" />
    <img src="./image/sf/ktcm.png" @click="goToQuestion(2)" />
  </div>
</template>

<script>
export default {
  name: 'questionType',
  methods: {
    goToQuestion(type) {
      if (type == 1) {
        this.$router.push('/wenjuan')
      } else {
        this.$router.push('/start')
      }
    }
  },
  created() {
    this.$parent.footer(false);
  }
}
</script>

<style lang="less" scoped>
.question-type{
  height: 812px;
  background-image: url('./image/sf/q_bg.png');
  background-size: 100% 100%;
  padding: 35px 13px;
  display: flex;
  justify-content: space-between;
  img{
    width: 169px;
    height: 167px;
  }
}
</style>