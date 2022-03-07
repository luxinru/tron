<template>
  <div class="page_root">
    <section class="btns">
      <div class="item" @click="$router.push('/transfer_basic')">
        {{ $t('transfer_to_basicaccount') }}
        <img
          src="@/assets/tron/Recharge_slices/962929918b12a94bb3a821a6fee272e43b91553f55294-KVmuGU.png"
          alt=""
        />
      </div>
      <div class="item" @click="$router.push('/transfer_basic')">
        {{ $t('transfer_to_promotion_account') }}
        <img
          src="@/assets/tron/Recharge_slices/89c6e8f2051c2766d51883acbe8542826b23865114d9a-sFm7ce.png"
          alt=""
        />
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
  background: rgba(248, 248, 250, 1);
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
    height: 190px;
    margin-top: 16px;

    .item {
      position: relative;
      width: 167px;
      height: 100%;
      background: url('~@/assets/tron/Recharge_slices/椭圆 1 拷贝 5.png')
        no-repeat;
      background-size: 100% 100%;
      display: flex;
      padding: 30px 22px;
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      color: #ffffff;

      img {
        position: absolute;
      }

      &:first-child {
        img {
          width: 70px;
          height: 88px;
          bottom: 7px;
          right: 30px;
        }
      }

      &:last-child {
        img {
          width: 89px;
          height: 86px;
          bottom: 3px;
          right: 9px;
        }
      }
    }
  }

  .box {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 13px;
    margin-top: 16px;
    padding: 25px 22px;

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #323a45;
    line-height: 22px;

    div {
      margin-bottom: 16px;
    }
  }
}
</style>
