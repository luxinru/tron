<template>
  <div class="page">
    <!-- <div class="main">
            <van-field class="vantField" v-model.trim="bank.bank" :left-icon='leftImg' label="所属银行" placeholder="请填写所属银行" />
            <van-field class="vantField" v-model.trim="bank.card" :left-icon='leftBank'  label="卡号" placeholder="请填写账号"/>
            <van-field  class="vantField employee-input" v-model.trim="employeeName" :left-icon='leftMine' label="持卡人" readonly placeholder="请填写持卡人" />
            <van-field class="vantField" v-model.trim="bank.area" :left-icon='leftMine' label="开户地址" placeholder="请填写开户地址"/>
        </div> -->
    <div class="main">
      <div class="item">
        <span>所属银行</span>
        <input v-model.trim="bank.bank" placeholder="请填写所属银行" />
      </div>
      <div class="item">
        <span>卡号</span>
        <input v-model.trim="bank.card" placeholder="请输入银行卡号" />
      </div>
      <div class="item">
        <span>持卡人</span>
        <input
          v-model.trim="employeeName"
          readonly
          placeholder="请输入持卡人姓名"
        />
      </div>
      <div class="item">
        <span>开户地址</span>
        <input v-model.trim="bank.area" placeholder="请填写开户行" />
      </div>
    </div>
    <div class="btn" @click="handleSubmit">提交</div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import leftImgs from '../../assets/bank/banks.png'
import leftBanks from '../../assets/bank/card.png'
import leftMines from '../../assets/bank/mine.png'
export default {
  name: 'index',
  data () {
    return {
      bank: {
        bank: '',
        area: '',
        card: ''
      },
      employeeName: '',
      leftImg: leftImgs,
      leftBank: leftBanks,
      leftMine: leftMines
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      Fetch('/User/getUserBankName', {}).then(res => {
        this.employeeName = res.data && res.data.name ? res.data.name : ''
      })
    },
    handleSubmit () {
      if (!this.bank.bank.replace(/\s/g, '')) {
        this.$notify('请输入所属银行')
        return
      }
      if (!this.bank.card.replace(/\s/g, '')) {
        this.$notify('请输入银行卡号')
        return
      }
      /* if (!this.bank.area.replace(/\s/g, "")) {
                this.$notify("请输入持卡人姓名");
                return;
            } */
      Fetch('/user/bank_add', {
        ...this.bank
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '添加成功'
        })
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100%;
  background-color: #f8f8f8;
  font-family: PingFang SC;
  padding: 14px 0;
  font-size: 16px;
  .main {
    background-color: #ffffff;
    border-radius: 13px;
    padding: 0 20px;
    .item {
      padding: 21px 0;
      border-bottom: solid 1px #e9eaec;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      span {
        width: 100px;
        font-weight: 500;
        color: #383838;
      }
      input {
        font-weight: 400;
        // color: #B7B7B7;
      }
    }
  }
  .btn {
    width: 299px;
    height: 45px;
    background: #E9C58C;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    margin: 16px auto 0;
  }
}
</style>
