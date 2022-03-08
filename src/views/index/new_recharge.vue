<template>
  <div class="page_root">
    <section class="btns">
      <div class="item" @click="$router.push({path: '/transfer_basic', query: { type: 1 } })">
        <img src="@/assets/tron/icon.png" alt="" />
        {{ $t('transfer_to_basicaccount') }}
      </div>
      <div class="item" @click="$router.push({path: '/transfer_basic', query: { type: 2 } })">
        <img src="@/assets/tron/icon 拷贝.png" alt="" />
        {{ $t('transfer_to_promotion_account') }}
      </div>
    </section>

    <section class="box">
      <div class="title">{{ $t('investment_is_divided_into_two_modes') }}</div>

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
  width: 100%;
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 13px;

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    .item {
      position: relative;
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 13px;
      font-family: Arial;
      font-weight: 400;
      color: #252525;

      img {
        width: 41px;
        height: 41px;
        margin-bottom: 12px;
      }
    }
  }

  .box {
    width: 100%;
    margin-top: 16px;
    padding: 25px 13px;

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(50, 58, 69, 1);
    line-height: 22px;

    .title {
      color: rgba(213, 10, 10, 1);
    }

    div {
      margin-bottom: 16px;
    }
  }
}
</style>
