<template>
  <div class="page">
    <template v-if="data.list && data.list.length > 0">
      <div
        :class="['card-item', select == k ? 'select' : '']"
        v-for="(v, k) in data.list"
        :key="k"
        @click="selectCard(k)"
      >
        <div class="bank-info">
          <img class="bank-icon" src="../../assets/bank/icon.png" />
          <span class="bank-name">{{ v.bank }}</span>
          <span class="edit" @click.stop="delBank(v.id)"></span>
        </div>
        <p class="card">{{ editCardNum(v.account) }}</p>
      </div>
      <div class="add-bank-btn has-card" @click="addBank">+ 添加银行卡</div>
    </template>
    <template v-else>
      <img src="@/assets/xinguang/千库网_立体金融理财场景_元素编号12549209@2x.png" class="none-bank-icon" />
      <!-- <p class="none-bank-text">暂无银行卡</p> -->
      <div class="add-bank-btn" @click="addBank">+ 添加银行卡</div>
    </template>
    <!-- <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                银行卡
            </div>
        </div>
        <div class="bank_wrap">
            <div class="bank_title">
                <span class="info1">我的卡</span>
                <span class="info2">共{{data.count}}张</span>
            </div>
            <div class="ctn">
                <div class="item" v-for="(v,k) in data.list" :key="k">
                    <div class="logo bc"></div>
                    <div class="bank_info">
                        <div class="bank_name">{{v.bank}}</div>
                        <div class="bank_card">
                            <span class="bank_type">储蓄卡</span>
                            <span class="bank_number">{{v.account}}</span>
                        </div>
                    </div>
                    <span class="delete_btn" @click="delBank(v.id)">删除此卡</span>
                    <div class="big_logo bc"></div>
                </div>
            </div>
            <div class="addbank_box" @click="showAdd()">
                <span class="add_icon">+</span>
                <span class="add_info">新增卡</span>
            </div>
        </div>
        <div class="dock" v-if="is_show"></div>
        <div class="addbank_popup" v-if="is_show">
            <form method="post" class="form" @submit.prevent="handleSubmit">
                <div class="item">
                    <span class="icon icon_name"></span>
                    <input type="text" class="inp inp_name" v-model.trim="bank.bank" placeholder="请输入银行名称">
                </div>
                <div class="item">
                    <span class="icon icon_name"></span>
                    <input type="text" class="inp inp_number" v-model.trim="bank.area" placeholder="请输入支行名称">
                </div>
                <div class="item">
                    <span class="icon icon_number"></span>
                    <input type="text" class="inp inp_number" v-model.trim="bank.card" placeholder="请输入储蓄卡号">
                </div>

                <div class="btn_box">
                    <button type="submit" class="btn sbtn">提交</button>
                    <button type="button" class="btn cancel" @click="close">取消</button>
                </div>
            </form>
        </div> -->
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  data () {
    return {
      data: {},
      select: 0
      // bank: {
      //     card: '',
      //     area: '',
      //     bank:'',
      // },
      // is_show: false,
    }
  },
  created () {
    this.$parent.footer(false)
  },
  mounted () {
    this.start()
  },
  methods: {
    delBank (id) {
      Fetch('/user/bank_remove', { id: id }).then(() => {
        this.start()
      })
    },
    // close() {
    //     this.is_show = false
    // },
    // showAdd() {
    //     this.is_show = true;
    // },
    start () {
      Fetch('/user/bank').then(res => {
        this.data = res.data
      })
    },
    selectCard (i) {
      this.select = i
    },
    editCardNum (id) {
      id = id + ''
      const len = id.length
      const reLastNum = `${id.charAt(len - 1)}${id.charAt(len - 2)}${id.charAt(
        len - 3
      )}${id.charAt(len - 4)}`
      const newId = reLastNum.padEnd(len, '*').replace(/(.{4})/g, '$1 ')
      return newId
        .split('')
        .reverse()
        .join('')
    },
    // handleSubmit() {
    //     if (!this.bank.bank.replace(/\s/g, "")) {
    //         this.$notify("请输入银行名称");
    //         return;
    //     }
    //     // if (!this.bank.area.replace(/\s/g, "")) {
    //     //     this.$notify("请输入支行名称");
    //     //     return;
    //     // }
    //     if (!this.bank.card.replace(/\s/g, "")) {
    //         this.$notify("请输入银行卡号");
    //         return;
    //     }
    //     Fetch("/user/bank_add", {
    //         ...this.bank
    //     }).then(() => {
    //         this.$notify({
    //             background: '#07c160',
    //             message: '添加成功'
    //         });
    //         this.is_show = false;
    //         this.start();
    //     })
    // },
    addBank () {
      this.$router.push('/bank_add')
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: rgba(243, 247, 249, 1);
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  .none-bank-icon {
    width: 179px;
    height: 137px;
    margin: 164px auto 0;
  }
  .none-bank-text {
    font-size: 18px;
    font-weight: 500;
    color: #bfbfbf;
    text-align: center;
    margin-top: 31px;
  }
  .card-item {
    position: relative;
    margin-top: 16px;
    width: 347px;
    padding: 22px 24px 27px 17px;
    font-weight: bold;
    color: #ffffff;
    background: url('~@/assets/xinguang/我的银行卡_slices/银联 (1)@2x.png') no-repeat;
    background-size: 100% 100%;
    .bank-info {
      display: flex;
      align-items: center;
      .bank-icon {
        width: 36px;
        // height: 36px;
        // border-radius: 50%;
      }
      .bank-name {
        margin-left: 10px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
      .edit {
        position: absolute;
        top: 25px;
        right: 16px;
        width: 16px;
        height: 16px;
        background: url('~@/assets/xinguang/我的银行卡_slices/组 481@2x.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .card {
      margin-top: 25px;
      margin-right: 8px;
      text-align: left;
      font-size: 24px;
      font-family: inpinheiti;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .select {
    height: 134px;
    // border-radius: 13px 13px 0px 0px;
  }
  .add-bank-btn {
    width: 299px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #DBAA5A;
    margin: 24px auto;
  }
}
</style>
