<template>
  <div class="page">
    <div class="main">
      <div class="item">
        <span>{{ $t('old_password') }}</span>
        <input
          type="password"
          v-model.trim="passwd"
          :placeholder="$t('old_password')"
        />
      </div>
      <div class="item">
        <span>{{ $t('new_password') }}</span>
        <input
          type="password"
          v-model.trim="npasswd"
          :placeholder="$t('new_password')"
        />
      </div>
      <div class="item">
        <span>{{ $t('confrm_password') }}</span>
        <input
          type="password"
          v-model.trim="snpasswd"
          :placeholder="$t('confrm_password')"
        />
      </div>
    </div>
    <div class="btn" @click="handleSubmit">
      {{ $t('confrm') }}
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

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
        this.$notify(this.$t('login_password_cannot_be_blank'))
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

      Fetch('/user/repasswd', {
        passwd: this.passwd,
        npasswd: this.npasswd,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: this.$t('modified_successfully'),
        })
        this.$router.back()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item {
      width: 100%;
      height: 90px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 21px;
      margin-top: 12px;

      span {
        width: 100%;
        flex: 1 0;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2C3136;
        display: flex;
        align-items: center;
      }
      input {
        width: 100%;
        flex: 1 0;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(44, 49, 54, 0.5);
        display: flex;
        align-items: center;
      }
    }
  }
  .btn {
    width: calc(100% - 26px);
    height: 47px;
    background: #4B95FE;
    border-radius: 4px;
    margin: 18px auto;
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
