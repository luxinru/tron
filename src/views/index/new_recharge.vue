<template>
  <div class="page_root">
    <IHeader :title="$t('recharge')"></IHeader>

    <section class="btns">
      <div class="item" @click="$router.push('/transfer_basic')">
        {{ $t('basic_account') }}
      </div>
      <div class="item" @click="$router.push('/transfer_basic')">
        {{ $t('promotion_account') }}
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

      <p>{{ $t('view_notes') }}:</p>
      <p>
        {{ $t('recharge_text3') }}
      </p>
    </section>
  </div>
</template>

<script>
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'NewRecharge',

  components: {
    IHeader,
  },

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
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 0 21px;
  background: url('~@/assets/tron/波场 2 (2).png') no-repeat;
  background-size: 100% 233px;

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 38px;

    .item {
      position: relative;
      width: 152px;
      min-height: 36px;
      background: #FFFFFF;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #224D9B;
    }
  }

  .box {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
    border-radius: 4px;
    margin-top: 22px;
    padding: 20px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #323A45;
    line-height: 22px;

    div {
      margin-bottom: 16px;
    }
  }
}
</style>
