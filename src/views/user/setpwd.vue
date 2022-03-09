<template>
  <div class="page_root">
    <IHeader :title="$t('change_password')"></IHeader>
    <div class="main">
      <div class="item">
        <input
          type="password"
          v-model.trim="passwd"
          :placeholder="$t('old_password')"
        />
      </div>
      <div class="item">
        <input
          type="password"
          v-model.trim="npasswd"
          :placeholder="$t('new_password')"
        />
      </div>
      <div class="item">
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
import IHeader from '@/components/IHeader.vue'

export default {
  name: 'index',
  components: {
    IHeader,
  },
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
.page_root {
  min-height: 100vh;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  background: url('~@/assets/tron/波场 2.png') no-repeat;
  background-size: 100%;
  .main {
    margin-top: 60px;
    padding: 0 21px;
    .item {
      width: 100%;
      height: 45px;
      background: #ffffff;
      box-shadow: 0px 7px 13px 0px rgba(34, 78, 155, 0.16);
      border-radius: 4px;
      margin-top: 16px;
      padding: 0 22px;

      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 500;
        color: #c4c5d1;
        background-color: transparent;
      }
    }
  }
  .btn {
    position: relative;
    width: calc(100% - 42px);
    height: 47px;
    background: #ed6608;
    border-radius: 4px;
    margin: 31px auto 0;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
