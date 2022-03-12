<template>
  <div class="page_root">
    <section class="btns">
      <div
        class="item"
        @click="$router.push({ path: '/transfer_basic', query: { type: 1 } })"
      >
        {{ $t('basic_account') }}
      </div>
      <div
        class="item"
        @click="$router.push({ path: '/transfer_basic', query: { type: 2 } })"
      >
        {{ $t('promotion_account') }}
      </div>
    </section>

    <div class="title">{{ $t('investment_is_divided_into_two_modes') }}</div>

    <section class="box">
      <div>
        <p>
          {{ $t('recharge_text1') }}
        </p>
        <p>
          {{ $t('recharge_text2') }}
        </p>
      </div>

      <div style="margin-bottom: 0">{{ $t('view_notes') }}:</div>
      <div>
        {{ $t('recharge_text3') }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NewRecharge',
  data() {
    return {}
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.page_root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px 24px;

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 162px;
    margin-top: 16px;

    .item {
      position: relative;
      width: 167px;
      height: 100%;
      display: flex;
      padding: 24px 22px;
      font-size: 20px;
      font-family: Arial;
      font-weight: bold;
      line-height: 24px;
      color: #ffffff;

      &:first-child {
        background: url('~@/assets/tron/组 139.png') no-repeat;
        background-size: 100% 100%;
      }

      &:last-child {
        background: url('~@/assets/tron/组 139 拷贝.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .title {
    width: 100%;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #d50a0a;
    margin-top: 20px;
  }

  .box {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 7px;
    margin-top: 20px;
    padding: 25px;

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #2c3136;
    line-height: 22px;

    div {
      margin-bottom: 16px;
    }
  }
}
</style>
