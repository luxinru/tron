<template>
  <div class="page">
    <div class="main">
      <div class="item">
        <input
          type="password"
          v-model.trim="passwd"
          :placeholder="$t('old_security_password')"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model.trim="npasswd"
          :placeholder="$t('new_security_password')"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model.trim="snpasswd"
          :placeholder="$t('confrm_security_password')"
        />
      </div>
    </div>
    <div class="btn" @click="handleSubmit">
      {{ $t('confrm') }}
    </div>
  </div>
</template>

<script>
// import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      passwd: '',
      npasswd: '',
      snpasswd: '',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    //this.start();
  },
  methods: {
    handleSubmit() {
      if (!this.passwd) {
        this.$notify(this.$t('please_enter_your_security_password'))
        return
      }

      if (!this.npasswd) {
        this.$notify(this.$t('new_password_cannot_be_blank'))
        return
      }

      if (!this.snpasswd) {
        this.$notify(this.$t('confirm_password_can_not_be_blank'))
        return
      }

      if (this.npasswd !== this.snpasswd) {
        this.$notify(this.$t('does_not_match'))
        return
      }

      // Fetch('/user/repasswd', {
      //   passwd: this.passwd,
      //   npasswd: this.npasswd
      // }).then(() => {
      //   this.$notify({
      //     background: '#07c160',
      //     message: this.$t('modified_successfully')
      //   })
      //   this.$router.back()
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  .main {
    padding: 0 21px;
    .item {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      margin-top: 14px;
      padding: 0 16px;
      background: #FAFAFA;
      border: 1px solid #CCCCCC;
      border-radius: 4px;
      input {
        width: 100%;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8d8b98;
      }
    }
  }
  .btn {
    width: calc(100% - 42px);
    height: 47px;
    margin: 32px auto 0;
    background: #D50A0A;
    border-radius: 4px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
