<template>
  <div class="integral-container" style="background: #fff">
    <!-- <div class="integral-header">
      <p class="title">可用积分</p>
      <p class="total">{{ total }}</p>
    </div> -->
    <div class="recharge-header-box" style="background: #fff;">
      <div class="recharge-header">
        <img class="recharge-header-bg" src="./images/bg_3.png" />
        <div class="recharge-header-money">
          <img
            class="recharge-header-money-icon"
            src="./images/user/shui.png"
          />
          <p style="padding-left:10px;">{{ total }}</p>
        </div>
        <div class="recharge-header-title">水滴数</div>
      </div>
    </div>

    <div class="boxFun" style="padding: 10px 14px">

      <div class="container" v-for="(item, key) in data.list" :key="key">
        <div class="box">
          <div class="content">
            <!-- getXin.png getGua.png -->
            <div class="desc">
              <span>{{ item.reason }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
          <div class="money">
            <span :style="item.type == 2 ? 'color:#FE324B' : 'color:#59BB4E'"
              >{{ item.type == 1 ? '+' : '-' }}{{ item.money }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="integral-list-box">
      <div
        class="integral-list-item"
        v-for="(item, key) in data.list"
        :key="key"
      >
        <div>
          <div class="left-title">{{ item.reason }}</div>
          <div class="left-date">{{ item.time }}</div>
        </div>
        <div
          class="integral-list-item-right"
          :class="{ 'type-two': item.type == 2 }"
        >
          {{ item.type == 1 ? '+' : '-' }}{{ item.money }}
        </div>
      </div>
    </div> -->
    <!-- <div class="integral-header">
			<div class="integral-header-back">
				<div>可用积分</div>
				<div class="integral-num">{{total}}</div>
			</div>
		</div>
		<div class="integral-title-box">
			<div class="integral-title-line"></div>
			<div>积分明细</div>
		</div>
		<div class="integral-list-box">
			<div class="integral-list-item" v-for="(item, key) in data.list" :key="key">
				<div class="integral-list-item-left">
					<div class="left-title">{{item.reason}}</div>
					<div class="left-date">{{item.time}}</div>
				</div>
				<div class="integral-list-item-right" :class="{'type-two': item.type == 2}">{{item.type == 1 ? '+' : '-'}}{{item.money}}</div>
			</div>
		</div> -->
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';
import moment from 'moment';

export default {
  name: 'index',
  components: {},
  data() {
    return {
      data: {
        // list: [{ reason: '1', time: '2', money: '123', type: '1' }],
      },
      total: '0',
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format('YYYY.MM.DD hh:mm');
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch('/user/getShuidi').then((res) => {
        this.data = res.data;
        this.total = res.data.integral;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/common.less';

.integral-container {
  font-family: PingFang SC;
  background-color: #f4f4f7;
  overflow: auto;
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0 15px;
  }
  .integral-header {
    margin-top: 13px;
    margin-left: 13px;
    width: 350px;
    height: 116px;
    background-image: url('./images/integral_bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    padding-left: 29px;
    color: #ffffff;
    font-weight: 500;
    .title {
      margin-top: 30px;
      font-size: 15px;
    }
    .total {
      margin-top: 20px;
      font-size: 26px;
    }
  }
  .integral-list-box {
    margin-top: 13px;
    padding: 0 13px;
    background: #ffffff;
    border-radius: 13px 13px 0px 0px;
    .integral-list-item {
      padding-top: 23px;
      padding-bottom: 21px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.14);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      .left-title {
        font-size: 16px;
        color: #000000;
      }
      .left-date {
        font-size: 13px;
        color: #635f62;
        margin-top: 14px;
      }
      .integral-list-item-right {
        font-size: 16px;
        font-weight: bold;
        color: #2e98fd;
      }
      .type-two {
        color: #e7c899;
      }
    }
  }
}
// .integral-container {
// 	padding-bottom: 30px;
// 	.integral-header {
// 		padding: 30px 13px 11px;
// 		background-color: #fff;
// 		.integral-header-back {
// 			display: flex;
// 			flex-direction: column;
// 			justify-content: center;
// 			align-items: center;
// 			height: 129px;
// 			background-image: url("./../../assets/images/integral/integral-1.png");
// 			background-size: cover;
// 			background-repeat: no-repeat;
// 			color: #E7C899;
// 			font-size: 15px;
// 			.integral-num {
// 				font-size: 29px;
// 				font-weight: bold;
// 				margin-top: 16px;
// 			}
// 		}
// 	}
// 	.integral-title-box {
// 		display: flex;
// 		align-items: center;
// 		padding: 15px 13px;
// 		background-color: #F4F4F4;
// 		font-size: 15px;
// 		color: #676767;
// 		.integral-title-line {
// 			width: 3px;
// 			height: 10px;
// 			background-color: #D9A973;
// 			margin-right: 10px;
// 		}
// 	}
// 	.integral-list-box {
// 		padding: 0 14px;
// 		background-color: #fff;
// 		.integral-list-item {
// 			display: flex;
// 			justify-content: space-between;
// 			align-items: center;
// 			padding: 24px 0 20px;
// 			border-bottom: 1px solid rgba(0, 0, 0, .14);
// 			font-size: 16px;
// 			&:last-child {
// 				border-bottom: none;
// 			}
// 			&-left {
// 				.left-title {
// 					color: #000000;
// 					margin-bottom: 14px;
// 					font-weight: 500;
// 				}
// 				.left-date {
// 					font-size: 13px;
// 					color: #635F62;
// 					font-weight: 400;
// 				}
// 			}
// 			&-right {
// 				color: #2E98FD;
// 				&.type-two {
// 					color: #E7C899;
// 				}
// 			}
// 		}
// 	}
// }
/*.headerBox{*/
/*	width: 100%;*/
/*	position: relative;*/
/*	.imgBac{*/
/*		width: 100%;*/
/*		position: absoulte;*/
/*	}*/
/*	.jifenContent{*/
/*		position: absolute;*/
/*		top: 0;*/
/*		left: 0;*/
/*		padding: 35px 29px;*/
/*		display: flex;*/
/*		justify-content: flex-start;*/
/*		img{*/
/*			width: 80px;*/
/*			height: 80px;*/
/*		}*/
/*		.jifenTit{*/
/*			font-size: 15px;*/
/*			font-family: PingFang SC;*/
/*			font-weight: 500;*/
/*			color: #FFFFFF;*/
/*			margin: 10px 0 0 14px;*/

/*		}*/
/*		.headerNum{*/
/*			font-size: 26px;*/
/*			font-family: PingFang SC;*/
/*			font-weight: 500;*/
/*			color: #FFFFFF;*/
/*			margin: 16px 0 0 14px;*/
/*		}*/
/*	}*/
/*}*/
/*.everyBox{*/
/*	padding: 0 16px;*/
/*}*/

/*	.desc {*/
/*		// width: 72%;*/
/*		word-wrap: break-word;*/
/*		span{*/
/*			font-size: 16px;*/
/*			font-family: PingFang SC;*/
/*			font-weight: 500;*/
/*			color: #000000;*/
/*		}*/
/*	}*/

/*	.time {*/
/*		// width: 72%;*/
/*		// color: #aaa;*/
/*		font-size: 13px;*/
/*		font-family: PingFang SC;*/
/*		font-weight: 500;*/
/*		color: #635F62;*/
/*		margin-top: 14px;*/
/*	}*/

/*	.money {*/
/*		padding-right: 10px;*/
/*		font-size: 16px;*/
/*	}*/

/*	.content {*/
/*    width: 70%;*/
/*    font-size: 12px;*/
/*    line-height: 17px;*/
/*    color: #252525;*/
/*    font-family: Helvetica Neue, Helvetica, sans-serif;*/
/*    flex: 1;*/
/*	}*/

/*	.box {*/
/*		border-bottom: 0.2px solid #927777b8!important;*/
/*		align-items: center;*/
/*		justify-content: space-between;*/
/*		position: relative;*/
/*		display: flex;*/
/*		min-height: 50px;*/
/*		background-color: #fff;*/
/*		font-size: 13px;*/
/*		padding: 22px 0;*/
/*	}*/

/*	.container {*/
/*		display: block;*/
/*		font-size: 13px;*/
/*		width: 100%;*/
/*		height: 100%;*/
/*		overflow: hidden;*/
/*	}*/

/*	.fund_wrap .table tr {*/
/*		width: 100%;*/
/*	}*/

/*	.fund_wrap .table .header {*/
/*		width: 100%;*/
/*		height: 34px;*/
/*		background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));*/
/*		background-image: -o-linear-gradient(left, #666666, #262627);*/
/*		background-image: linear-gradient(to right, #666666, #262627);*/
/*		border: 0;*/
/*	}*/

/*	.fund_wrap .table tr .first {*/
/*		border-radius: 10px 0 0 10px;*/
/*	}*/

/*	.fund_wrap .table tr .last {*/
/*		border-radius: 0 10px 10px 0;*/
/*		border: 0;*/
/*	}*/

/*	.fund_wrap .table tr th {*/
/*		font-size: 14px;*/
/*		color: #e8c27d;*/
/*		width: 33.333%;*/
/*		border-right: 1px solid #666666;*/
/*	}*/

/*	.fund_wrap .table .tab.tab_2 {*/
/*		border-left: 1px solid #7B7B7B;*/
/*		border-right: 1px solid #7B7B7B;*/
/*	}*/

/*	.fund_wrap .table {*/
/*		table-layout: fixed;*/
/*		width: 92%;*/
/*		margin: 15px auto;*/
/*	}*/

/*	.fund_wrap .table tbody tr {*/
/*		margin: 0 auto;*/
/*		border-bottom: 1px solid #EDEDED;*/
/*	}*/

/*	!*.fund_wrap .table tbody tr td:first-child {*!*/
/*	!*    text-align: left;*!*/
/*	!*}*!*/

/*	!*.fund_wrap .table tbody tr td:last-child {*!*/
/*	!*    text-align: left;*!*/
/*	!*}*!*/

/*	.fund_wrap .table tbody tr td {*/
/*		padding: 0 5px;*/
/*		white-space: nowrap;*/
/*		text-overflow: ellipsis;*/
/*		overflow: hidden;*/
/*		width: 33.333%;*/
/*		text-align: center;*/
/*		font-size: 14px;*/
/*		line-height: 26px;*/
/*		padding-bottom: 10px;*/
/*		padding-top: 24px;*/
/*		color: #333333;*/
/*	}*/

/*	.fund_wrap .table tbody tr .td_3 {*/
/*		color: #dfba7b;*/
/*	}*/
</style>
