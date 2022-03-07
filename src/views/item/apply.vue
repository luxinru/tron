<template>
  <div class="apply-container">
    <div class="apply-header"></div>

    <div class="header">
      <div class="head">
        <van-icon class="iconLeft" name="arrow-left" @click="$router.back()" />
        <span>立即投标</span>
        <div>
          <!-- <img class="question" src="./image/question.png" alt="" @click="handleGoBaoKugz"> -->
        </div>
      </div>
    </div>

    <div class="user_money">
      <div>账户余额(元)</div>
      <div class="available-money">{{ data.user_money }}</div>
    </div>
    <div class="apply-form-container">
      <div class="apply-form-box">
        <!-- <div class="apply-form-money">
          <div class="apply-form-money-title">投资金额</div>
          <div class="apply-form-money-sub-title">
            {{ data.min }} 元起投，项目可投 {{ data.kt_money }} 元
          </div>
          <div class="apply-form-money-input">
            <p class="jian" @click="jian()">-</p>
            <van-field
              v-model="money"
              readonly
              @input="changeInput()"
              type="text"
              label-class="transaction-input"
              placeholder="请输入金额"
            />
            <p class="add" @click="add()">+</p>
          </div>
        </div> -->
        <!-- <div class="apply-form-item">
           <div class="apply-form-item-title">项目名称</div>
           <div class="apply-form-item-info">{{data.title}}</div>
        </div> -->
        <div class="apply-form-item">
          <div class="apply-form-item-title">项目可投</div>
          <div class="apply-form-item-info">{{ data.kt_money }}</div>
        </div>
        <div class="apply-form-item">
          <div class="apply-form-item-title">起投金额</div>
          <div class="apply-form-item-info">{{ data.min }}</div>
        </div>
        <div class="apply-form-item">
          <div class="apply-form-item-title">结息时间</div>
          <div class="apply-form-item-info" v-if="data.type === 7">
            满1小时自动结息
          </div>
          <div class="apply-form-item-info" v-else>满24小时自动结息</div>
        </div>
        <div class="apply-form-item">
          <div class="apply-form-item-title">代金券</div>
          <div
            class="apply-form-item-info"
            style="color: rgba(233, 197, 140, 1)"
          >
            -{{ j_money }}
          </div>
        </div>
        <!--<div class="apply-form-item">-->
        <!--    <div class="apply-form-item-title">获得积分</div>-->
        <!--    <div class="apply-form-item-info">{{real_jifen}}</div>-->
        <!--</div>-->
        <div class="apply-form-item">
          <div class="apply-form-item-title">投资金额</div>
          <div class="apply-form-item-info">
            <div class="item-info">
              <van-stepper
                v-model="money"
                @input="changeInput()"
                :min="0"
                integer
                :step="data.min"
                disable-input="false"
                theme="round"
                button-size="18"
              />
            </div>
          </div>
        </div>
        <!-- <div class="apply-form-item">
          <div class="apply-form-item-title">实际支付</div>
          <div class="apply-form-item-info">{{ real_money }}</div>
        </div> -->
      </div>

      <div class="transaction-box">
        <div class="transaction-title">交易密码</div>
        <div class="transaction-prompt">
          <van-field
            v-model="passwd"
            type="password"
            label-class="transaction-input"
            placeholder="请输入交易密码"
          />
        </div>
        <div class="transaction-sub-title" @click="handleForgetPassword">
          忘记密码
        </div>
      </div>
      <!--<div class="apply-form-prompt">*最低起投{{data.min}}元，加一次为{{data.min}}元</div>-->
      <!--<div class="transaction-box">-->
      <!--    <div class="transaction-prompt">-->
      <!--        <van-field v-model="passwd" label-width="1.7rem" type="password" label-class="transaction-input" label="交易密码" placeholder="请输入交易密码" />-->
      <!--    </div>-->
      <!--</div>-->
      <!--<div class="transaction-forget-password" @click="handleForgetPassword">忘记密码？</div>-->
      <div class="transaction-btn" @click="handleSubmit">确认投资</div>
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
      money: 0,
      passwd: "",
      id: 0,
      j_money: 0,
      real_money: 0,
      real_jifen: 0,
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.id = this.$router.history.current.params.id;
    this.start();
  },
  methods: {
    add() {
      this.money = Number(this.money) + Number(this.data.min) + ".00";
    },
    jian() {
      var nummoney = Number(this.money);

      if (nummoney <= this.data.min) {
        console.log(Number(this.money));
        this.money = this.data.min;
      } else {
        this.money = Number(this.money) - Number(this.data.min) + ".00";
      }
    },
    setNum(num) {
      this.money = Number(this.money) + num;
    },
    start() {
      Fetch("/index/item_view", {
        id: this.id,
      }).then((res) => {
        this.data = res.data.view;
        this.money = res.data.view.min;
        Fetch("/user/get_item_voucher", {
          id: this.id,
        }).then((r) => {
          // 优惠券
          this.j_money = r.data.voucher_money;
          this.real_money = this.money - this.j_money;
        });
      });
    },
    back() {
      this.$router.push("/item/" + this.id).catch((err) => {
        err;
      });
    },
    getClass(channel) {
      return "recharge_online_" + channel;
    },
    handleSubmit() {
      if (!this.money) {
        this.$notify("请输入投入金额");
        return;
      }

      if (!this.passwd) {
        this.$notify("请输入交易密码");
        return;
      }

      Fetch("/index/item_apply", {
        id: this.id,
        money: this.money,
        pwd: this.passwd,
        vid: this.j_money == 0 ? 1 : 2,
      }).then(() => {
        this.$notify({
          background: "#07c160",
          message: "投资成功",
        });
        this.$router.replace("/touzi");
      });
    },
    changeInput() {
      if (this.money > 0) {
        this.real_money = this.money - this.j_money;
        this.real_jifen = Math.floor(this.money * this.data.jfbl);
      } else {
        this.money += this.data.min;
      }
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ name: "resetpaypwd" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "apply";
/*html,*/
/*body {*/
/*	background: #f3f4f4;*/
/*}*/

/*.forgetpay {*/
/*	padding: 30px 0 0 0;*/
/*	height: 30px;*/

/*	.lbtn {*/
/*		float: right;*/
/*		font-size: 14px;*/
/*		color: #00A0E9;*/
/*	}*/
/*}*/

/*::-moz-placeholder {*/
/*	color: #9e9ea0;*/
/*}*/

/*::-webkit-input-placeholder {*/
/*	color: #9e9ea0;*/
/*}*/

/*:-ms-input-placeholder {*/
/*	color: #9e9ea0;*/
/*}*/

/*.mt0 {*/
/*	padding: 20px 0 0 0;*/
/*	background: #544b5e;*/
/*	position: relative;*/
/*	z-index: 1;*/
/*}*/

/*.mt0 .mt0_main {*/
/*	width: 92%;*/
/*	margin: 0 auto;*/
/*	padding: 1px 0 50px 0;*/
/*	background: #e8c27d;*/
/*	border-radius: 12px;*/
/*	overflow: hidden;*/
/*	position: relative;*/
/*	z-index: 1;*/

/*}*/

/*.mt0 .mt0_main .mt0_title {*/
/*	height: 46px;*/
/*	line-height: 46px;*/
/*	color: #544b5e;*/
/*	font-size: 24px;*/
/*	text-align: center;*/
/*	border-bottom: 1px solid #544b5e;*/
/*}*/

/*.mt0 .mt0_main .mt0_content {*/
/*	padding: 16px 2.2%;*/
/*	padding-bottom: 44px;*/
/*	display: -webkit-box;*/
/*	display: -ms-flexbox;*/
/*	display: flex;*/
/*	-webkit-box-pack: justify;*/
/*	-ms-flex-pack: justify;*/
/*	justify-content: space-between;*/
/*	-webkit-box-align: center;*/
/*	-ms-flex-align: center;*/
/*	align-items: center;*/

/*}*/

/*.mt0 .mt0_main .mt0_content .mt0_item {*/
/*	display: -webkit-box;*/
/*	display: -ms-flexbox;*/
/*	display: flex;*/
/*	-webkit-box-orient: vertical;*/
/*	-webkit-box-direction: normal;*/
/*	-ms-flex-direction: column;*/
/*	flex-direction: column;*/
/*	-webkit-box-pack: start;*/
/*	-ms-flex-pack: start;*/
/*	justify-content: flex-start;*/
/*}*/

/*.mt0 .mt0_main .mt0_content .mt0_item .mt0_item_title {*/
/*	height: 20px;*/
/*	line-height: 20px;*/
/*	border-radius: 20px;*/
/*	padding: 0 4px 0 8px;*/
/*	color: #e8c27d;*/
/*	font-size: 12px;*/
/*	background: #473e51;*/
/*	text-align: left;*/
/*	margin-bottom: 10px;*/
/*}*/

/*.mt0 .mt0_main .mt0_content .mt0_item .mt0_item_money {*/
/*	font-size: 17px;*/
/*	color: #333333;*/
/*	text-align: left;*/
/*	padding-left: 8px;*/
/*}*/

/*.mt0 .mt0_main .mt0_content .mt0_item_last .mt0_item_money {*/

/*	text-align: right;*/
/*	padding-right: 8px;*/
/*}*/

/*.mt0 .mt0_main .mt0_content .mt0_item_last .mt0_item_title {*/

/*	text-align: right;*/

/*}*/

/*.mt0 .mt0_bottom {*/
/*	display: block;*/
/*	width: 100%;*/
/*	max-width: 100%;*/
/*	position: absolute;*/
/*	bottom: 0;*/
/*	z-index: 2;*/
/*}*/

/*.form {*/
/*	padding: 1px 0;*/
/*	width: 92.4%;*/
/*	margin: -20px auto 0 auto;*/
/*	border-radius: 12px;*/
/*	position: relative;*/
/*	-webkit-box-shadow: 0 3px 4px 1px #e7e8e8;*/
/*	box-shadow: 0 3px 4px 1px #e7e8e8;*/
/*	z-index: 4;*/
/*}*/

/*.form .top {*/
/*	padding: 13px 4.8% 0 4.8%;*/
/*	background: #fff;*/
/*	border-radius: 12px 12px 0 0;*/
/*}*/

/*.form .top .form_item {*/
/*	display: -webkit-box;*/
/*	display: -ms-flexbox;*/
/*	display: flex;*/
/*	-webkit-box-align: center;*/
/*	-ms-flex-align: center;*/
/*	align-items: center;*/
/*	-webkit-box-pack: justify;*/
/*	-ms-flex-pack: justify;*/
/*	justify-content: space-between;*/
/*	color: #37383b;*/
/*	font-size: 15px;*/
/*	height: 30px;*/
/*	border-radius: 30px;*/
/*	padding: 0 14px;*/
/*	margin-top: 15px;*/
/*	background: #eeeeee;*/
/*}*/

/*.form .top .form_item .yellow {*/
/*	color: #e8c27d;*/
/*}*/

/*.form .top .form_item .form_item_left {*/
/*	color: #5c5c5f;*/
/*}*/

/*.form .top .form_item1 {*/
/*	display: -webkit-box;*/
/*	display: -ms-flexbox;*/
/*	display: flex;*/
/*	color: #333333;*/
/*	font-size: 15px;*/
/*	font-weight: 600;*/
/*	padding-left: 14px;*/
/*	margin: 10px auto 13px auto;*/
/*}*/

/*.form .top .form_item2 {*/
/*	display: -webkit-box;*/
/*	display: -ms-flexbox;*/
/*	display: flex;*/
/*	-webkit-box-orient: horizontal;*/
/*	-webkit-box-direction: reverse;*/
/*	-ms-flex-direction: row-reverse;*/
/*	flex-direction: row-reverse;*/
/*	padding-right: 20px;*/
/*	padding-bottom: 15px;*/
/*}*/

/*.form .top .form_item2>div {*/
/*	display: -webkit-box;*/
/*	display: -ms-flexbox;*/
/*	display: flex;*/

/*	-webkit-box-align: center;*/

/*	-ms-flex-align: center;*/

/*	align-items: center;*/
/*}*/

/*.form .top .form_item2>div .money_btn {*/
/*	display: inline-block;*/
/*	width: 14px;*/
/*	height: 14px;*/
/*	border-radius: 14px;*/
/*	color: #fff;*/
/*	background: #473e51;*/
/*	text-align: center;*/
/*	font-weight: bold;*/
/*	font-size: 16px;*/
/*	line-height: 10px;*/
/*}*/

/*.form .top .form_item2>div .increase {*/
/*	color: #333333;*/
/*	background: #e8c27d;*/
/*}*/

/*.form .top .form_item2>div .bid_money {*/
/*	color: #333333;*/

/*	width: 76px;*/
/*	font-size: 18px;*/
/*	padding: 0 6px;*/
/*	text-align: center;*/
/*}*/

/*.form .box {*/
/*	border-top: 1px solid #d5d5d5;*/
/*	border-bottom: 1px solid #d5d5d5;*/
/*	padding: 10px 4.8% 10px 4.8%;*/
/*	background: #f5f5f5;*/
/*}*/

/*.form .box .remian_money {*/

/*	text-align: right;*/
/*	padding-right: 20px;*/
/*	font-size: 12px;*/
/*	color: #544b5e;*/

/*}*/

/*.form .box .remian_money>span {*/

/*	display: inline-block;*/
/*	color: #e8c27d;*/
/*	padding: 0 6px;*/
/*	vertical-align: top;*/
/*	line-height: 18px;*/
/*}*/

/*.form .box .remian_money>span {*/
/*	font-size: 14px;*/
/*}*/

/*.form .box3 {*/
/*	padding: 20px 4.8% 28px 4.8%;*/
/*	background: #fff;*/
/*	border-radius: 0 0 12px 12px;*/
/*}*/

/*.form .box3 .item .icon {*/
/*	float: left;*/
/*	width: 18px;*/
/*	height: 18px;*/
/*	background-repeat: no-repeat;*/
/*	background-position: center;*/
/*	background-size: contain;*/
/*	background-image: url(images/withdraw_pwd.png);*/
/*	margin-right: 10px;*/
/*}*/

/*.form .box3 .item .pwd {*/
/*	float: left;*/
/*	width: 50%;*/
/*	font-size: 15px;*/
/*	color: #544b5e;*/
/*	height: 18px;*/
/*	line-height: 18px;*/

/*}*/

/*.form .box3 .item .right {*/
/*	float: right;*/
/*	width: 16px;*/
/*	height: 18px;*/
/*	background: url(images/withdraw_hide.png) no-repeat center;*/
/*	background-size: contain;*/
/*}*/

/*.form .box3 .item .show {*/
/*	background: url(images/withdraw_show.png) no-repeat center;*/
/*	background-size: contain;*/
/*}*/

/*.form .btn {*/
/*	display: block;*/
/*	width: 60%;*/
/*	height: 36px;*/
/*	line-height: 36px;*/
/*	color: #333333;*/
/*	text-align: center;*/
/*	border-radius: 36px;*/
/*	background: #e8c27d;*/
/*	font-size: 18px;*/
/*	position: absolute;*/
/*	bottom: -100px;*/
/*	left: 50%;*/
/*	-webkit-transform: translateX(-50%);*/
/*	-ms-transform: translateX(-50%);*/
/*	transform: translateX(-50%);*/
/*	z-index: 1;*/
/*}*/

/*.body_bottom {*/
/*	height: 200px;*/
/*}*/
</style>
