<template>
	<div class="qiandao-page">
	    <!-- <div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        每日签到
		    </div>
		</div> -->
		<div class="headerBox">
        <div class="header">
            <div class="head" >
                <van-icon class="iconLeft" name="arrow-left" @click="$router.back()"  />
                <span>每日签到</span>
                <div>
                    <!-- <img class="question" src="./image/question.png" alt="" @click="handleGoBaoKugz"> -->
                </div>
            </div>
            
        </div>
    </div>
	<div class="headerminBox"> 
		<div class="cardBox">
			
			<div class="qd-info">
				<!-- <img src="./image/sf/qd_i_3.png" class="left" /> -->
				<div class="centers">
					<p>您已连续签到</p>
					<p><span>{{qiandaoNum}}</span>天</p>
				</div>
				
			</div>
			<div class="title-tips">每日签到领2元红包</div>
		</div>
		
		
		
	</div>
	<div class="middleBox">
		<div class="right" @click="handleTreeListItemClick(1)">立即签到</div>
		<p class="qd-tips">本活动按要求坚持连续打卡签到完成,即可领取以下奖品,请务必填清楚详情收货地址。</p>
	</div>
	<div class="goodsBox">
		
		<div class="qd-list-title">签到好礼</div>
		<div class="qd-list">
			<div class="items" v-for="item in goods"  :key="item.id">
				<img :src="item.goods_pic" />
				<div>
					<p class="name">{{item.goods_name}}</p>
					<p class="qd">连续签到<span>{{item.num}}天</span></p>
					<div class="btn" @click="exchangegoods(item.id)">立即领取</div>
				</div>
			</div>
		</div>
	</div>
		<!-- <div class="mains">
			<img style="width: 100%; z-index: 0;" src="@/assets/images/qiandao-top.png" alt="">
		</div>
		
		<div class="title" style="margin-top:-348px">您已连续签到 <span style="color:#eae7e6; font-size: 26px; font-weight: bold;">{{qiandaoNum}}</span> 天，累计签到 <span style="color:#eae7e6; font-size: 26px; font-weight: bold;">{{qiandaoallNum}}</span> 天</div>
		
		<div class="qiandao-btn" style="margin-top:280px" @click="handleTreeListItemClick(1)">马上签到</div>
		
		<div style="font-size:14px; margin-top:-165px; margin-left:200px; color:#cdcdcd"><span style="color:#ff9500;">{{countNum}}</span> 人已参与</div>
		
		<div style="margin-top:180px">
		
		<div style="margin:auto;font-size:14px;font-weight:bold;color:#404040;padding-left:14px;">奖品预览：有的物品需成长值兑换，详情咨询客服</div>
		
		<div class="listss">
			<div class="my-assets-box">				
				<div class="my-assets-list-box">
					<van-row gutter="16">
						<van-col span="8" style="margin-top:10px;" v-for="item in goods"  :key="item.id">
							<div class="my-assets-list-item" @click="exchangegoods(item.id)">
								<img style="width: 100%;" :src="item.goods_pic" alt="">
								<p style="font-size:12px; text-align:center; padding-top:3px;">{{item.goods_name}}</p>
							</div>
						</van-col>

					</van-row>
				</div>
			</div>
		</div>	
		
		</div>
		

		<div style="height:100px"> </div> -->

	</div>
	
</template>

<script>
	import Fetch from '../../utils/fetch'
	import {Dialog} from 'vant';
	export default {
		name: "index",
		components: {},
		data() {
			return {
				footer_type: 'n1',
				data: {
					app: {},
					notice: '',
				},
				down_show: true,
				link_width: 0,
				banner: [],
				notice: '',
				links: [],
				type: 'n1',
				ad: {},
				ad_show: false,
				examinationData: [{
					id: "1",
					name: "one",
					question: "",
				}, ],
				qiandaoNum:0,
				qiandaoallNum:0,
				countNum:0,
				goods:[]
			};
		},
		created() {
			if (this.$parent.getFooterType() === 'n1') {
				// this.$router.push('/home').catch(err => {
				// 	err
				// });
				// this.$parent.footer(true, 'tree');
			} else {
				// this.$parent.footer(true, 'tree');
				this.$data.footer_type = 'n2'
			}

			// this.$parent.footer(false);
		},
		mounted() {
			this.start();
			var that = this;
			var bslua = navigator.userAgent;
			if (bslua.indexOf('bsl') != -1) {
				that.down_show = false;
			}
			this.get_num()
		},
		methods: {
			get_num(){
				Fetch('/user/info').then(res => {
					Fetch("/user/qiandaonum", {
					username: this.data.username,
					password: this.data.password
				}).then(res=>{
					console.log('未知',res)
						this.qiandaoNum=res.data.qdnum,	
                        this.qiandaoallNum= res.data.allqdnum,	
                        this.countNum= res.data.countnum	 					
					})
					// console.log(this.data)
				})
				
			},
			getIputValue(index) {
				// console.log(index + 1 + "题" + this.radio);
				this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
				console.log(this.allRadio);
				// console.log(this.radio)
			},
			toBox(title = '', contain = '') {
				var newsBox = document.getElementsByClassName("modal")[0];
				newsBox.style.display = "block";

				var bodyBox = document.getElementsByClassName("body-box")[0];
				bodyBox.innerHTML = contain;
				var newsTitle = document.getElementsByClassName("news-title")[0];
				newsTitle.innerText = title;
			},
			checkin2() {
				Fetch('/user/sign').then((res) => {
					if(res.data.coss == 1){
								Dialog.alert({
								    title: '提示',
								    message: res.info,
								    showCancelButton: true,
								    confirmButtonText: "去认证",
								}).then(() => {
								    this.$router.push('/auth');
								}).catch(() => {

								})
					}else{
						this.sign_money = res.data.reward;
						this.new_sign_ok = true;
						this.get_num()
						this.$notify({
							background: '#07c160',
							message: '签到成功 +' + res.data.reward + '元，8积分'
						});
					}
				})
			},
			checkin3() {
				Fetch('/user/sign3').then((res) => {
					if(res.data.coss == 1){
								Dialog.alert({
								    title: '提示',
								    message: res.info,
								    showCancelButton: true,
								    confirmButtonText: "去认证",
								}).then(() => {
								    this.$router.push('/auth');
								}).catch(() => {

								})
					}else{
						this.sign_money = res.data.reward;
						this.new_sign_ok = true;
						this.get_num()
						this.$notify({
							background: '#07c160',
							message: '连续签到3天送现金28元.'
						});
					}
				})
			},
			checkin7() {
				Fetch('/user/sign7').then((res) => {
					if(res.data.coss == 1){
								Dialog.alert({
								    title: '提示',
								    message: res.info,
								    showCancelButton: true,
								    confirmButtonText: "去认证",
								}).then(() => {
								    this.$router.push('/auth');
								}).catch(() => {

								})
					}else{
						this.sign_money = res.data.reward;
						this.new_sign_ok = true;
						this.get_num()
						this.$notify({
							background: '#07c160',
							message: '连续签到7天送现金68元.'
						});
					}
				})
			},
			closeBox() {
				var newsBox = document.getElementsByClassName("modal")[0];
				newsBox.style.display = "none";
			},

			appdown_close() {
				this.data.app.is_disable = 'N';
			},
			goAd() {
				// this.close();
				// this.$router.push(this.ad.url).catch(err => {err});
				this.close();
				this.$router.push(this.ad.url);
			},
			close() {
				this.ad_show = false
			},
			start() {
				setTimeout(() => {
					var element = document.getElementById("app");
					element.scrollIntoView();
				}, 0)
				this.type = this.$parent.getFooterType();
				Fetch('/index/int').then(res => {
					this.ad = res.data.ad;
					this.data = res.data;

					if (res.data.ad.activity_status == 1) {
						this.ad_show = true
					} else {
						this.ad_show = false
					}
				});

				/* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

				Fetch('/index/banner', {
					type: 'banner'
				}).then(res => {
					this.banner = res.data;
				})
				Fetch('/user/qiandaogoodslist').then(res => {
					console.log('签到好礼',res)
					this.goods = res.data.list;
				})
			},
			onChange(index) {
				let els = this.$refs.dian.querySelectorAll("div");
				for (let i = 0; i < els.length; i++) {
					els[i].className = "";
				}
				els[index].className = "selected";
			},
			schedule(schedule) {
				return {
					width: schedule + '%'
				};
			},
			schedule_left(schedule) {
				if (schedule > 80) {
					return {
						left: (schedule - 30) + '%',
						color: '#fff'
					}
				} else {
					return {
						left: schedule.slice(0, 5) + '%'
					}
				}
			},
			exchangegoods(id = 1){
				Fetch('/user/qiandao', {
					type: id
				}).then(res => {
					if(res.code == 1){
						Dialog.alert({
							title: '提示',
							message: res.info,
							showCancelButton: false,
							confirmButtonText: '确定',
						})
					}
				})
			},
			handleTreeListItemClick(type = 1) {
				switch (type) {
					case 1:
						this.checkin2();
						break;
					case 2:
						this.$router.push({name: 'scratch_card'});
						break;
					case 3:
						this.$router.push({name: 'sport_event'});
						break;
					case 4:
						this.$router.push({name: 'start'});
						break;
					case 5:
						this.$router.push({name: 'prize'});
						break;
					case 6:
						this.$router.push({name: 'goods'});
						break;
                    case 7:
                        this.$router.push({name: 'item'});
                        break;
                    case 8:
                        this.$router.push({name: 'baoku'});
                        break;
					case 9:
                        this.$router.push({name: 'index'});
                        break;
					case 10:
                        this.$router.push({name: 'share'});
                        break;
					case 11:
                        this.$router.push({name: 'heshui_event'});
                        break;
					case 12:
                        this.$router.push({name: 'qiandao'});
                        break;
					case 13:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得10元话费，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 17:
						this.checkin7();
						break;
					case 93:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得体重秤，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 94:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得电动牙刷，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 95:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得剃须刀，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 96:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得石化油卡2000元，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 97:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得按摩椅，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 98:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得笔记本电脑，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 99:
						Dialog.alert({
                        title: '提示',
                        message: '您的连续签到天数不够，请继续签到！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 100:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得宏光MINI，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;

					case 1003:
						Fetch('/user/qiandao', {
							type: '1003'
						}).then(res => {
							console.log(res.data);
						})



						
                         break;
					case 1006:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得支付宝红包，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 10028:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得博皓电动牙刷，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 10042:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得北极绒四件套，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
					case 10060:
						Dialog.alert({
                        title: '提示',
                        message: '恭喜您获得五粮液，请联系客服发货！',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        })
                         .then(() => {
                         // this.$router.push('/auth');
                        })
                          .catch(() => {});
                         break;
				}
			}
		},
	};
</script>

<style lang="less" scoped>
.middleBox{
	width: 100%;
	height: 301px;
	background-image: url('./image/sf/qiandao_md.png');
	background-size: 100% 589px;
	background-repeat: no-repeat;
	margin-top: -180px;
	padding-top: 80px;
	.right{
		width: 306px;
		height: 52px;
		background: #2587FD;
		border-radius: 26px;
		font-size: 18px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 52px;
		margin: 0 auto;
	}
}
.goodsBox{
	// width: 375px;
	// height: 437px;
	background: #F6F8FD;
	border-radius: 13px 13px 0px 0px;
	margin-top: -100px;
	padding-top: 23px;
}
.cardBox{
	margin: 0 auto;
	width: 259px;
	height: 142px;
	background: linear-gradient(43deg, #E1C091 0%, #F3D5AB 56.99999999999999%, #E9C69A 100%);
	border-radius: 7px;
	text-align: center;
	padding-top: 1px;
}
.headerminBox{
	width: 375px;
	height: 290px;
	background: #224197;
	padding-top: 20px;
}
.headerBox{
	background: #224197;
}
.head{
    display: flex;
    justify-content: space-between;
    padding: 0 13px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: #fff;
    .iconLeft{
        position: relative;
        top: 12px;
        font-size: 22px;
    }
    
    .question{
        width: 19px;
    }
    >div,>i{
        width: 50px;
        text-align: center;
    }
    >i{
        text-align: left;
    }

}
.qiandao-page{
	min-height: 100vh;
	// background-image: url('./image/sf/qiandao_bg.png');
	background-size: 100% 589px;
	background-repeat: no-repeat;
	.title-tips{
		// width: 232px;
		// height: 37px;
		// background-image: url('./image/sf/qd_i_1.png');
		background-size: 100% 100%;
		// margin-left: 71px;
		margin-top: -1px;
		font-size: 13px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #3765D9;
		text-align: center;
		line-height: 30px;
	}
	.qd-info{
		// width: 344px;
		// height: 104px;
		// background-image: url('./image/sf/qd_i_2.png');
		background-size: 100% 100%;
		// margin-top: 11px;
		// display: flex;
		.left{
			width: 42px;
			height: 48px;
			margin-top: 29px;
			margin-left: 35px;
			flex-shrink: 0;
		}
		.centers{
			margin-top: 24px;
			text-align: center;
			p:first-child{
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #A46C1A;
				text-align: center;
				
			}
			p:last-child{
				font-size: 13px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #A46C1A;
				margin: 11px 0;
				span{
					font-size: 35px;
					font-family: DIN Alternate;
					font-weight: bold;
					color: #A46C1A;
				}
			}
		}
		.right{
			width: 84px;
			height: 37px;
			margin-top: 36px;
			margin-left: 34px;
			flex-shrink: 0;
			background-image: url('./image/sf/qd_i_4.png');
			background-size: 100% 100%;
			line-height: 32px;
			font-size: 14px;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
	}
	.qd-tips{
		font-size: 13px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 20px;
		padding: 16px 38px 0 36px;
	}
	.qd-list-title{
		font-size: 17px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #111C31;
		text-align: left;
		padding-left: 16px;
		// margin-top: 58px;
		position: relative;
		&::before, &::after{
			position: absolute;
			display: block;
			content: " ";
			width: 18px;
			height: 3px;
			background: #FFFFFF;
			opacity: 0.8;
			border-radius: 1px;
			top: 8px;
		}
		&::before{
			left: 117px;
		}
		&::after{
			left: 239px;
		}
	}
	.qd-list{
		margin-top: 24px;
		padding: 0 27px 80px;
		display: flex;
		flex-wrap: wrap;
		.items{
			width: 100%;
			// height: 224px;
			background: #FFFFFF;
			box-shadow: 0px 3px 5px 0px rgba(44, 106, 231, 0.2);
			border-radius: 5px;
			padding-top: 28px;
			padding-bottom: 16px;
			padding: 28px 13px 16px;
			margin-bottom: 12px;
			display: flex;
			// &:nth-child(2n) {
			// 	margin-left: 7px;
			// }
			img{
				width: 75px;
				height: 93px;
				margin-right: 20px;
				// margin-left: 50%;
				// transform: translateX(-50%);
			}
			.name{
				margin-top: 13px;
				font-size: 15px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #121D31;
			}
			.qd{
				font-size: 13px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #387BE4;
				margin-top: 10px;
				// span{
				// 	color: #3A7CFF;
				// 	margin-left: 7px;
				// }
			}
			.btn{
				width: 84px;
				line-height: 27px;
				background-color: #0489FF;
				border-radius: 13px;
				margin-top: 13px;
				margin-left: 100px;
				font-size: 11px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
}
	/* .ddates{
		width: 100%;
		text-align: center;
		margin: 2vw 0;
	} */
	// .mains{
	// 	width: 100%;
	// 	margin: 0;
	// 	padding: 0 0 30px;
	// 	height: 100%;
	// 	background-color:#f8f8f8;
	// }
	// .title{
	// 	position: relative;
	// 	width: 100%;
	// 	margin: auto;
	// 	width: 280px;
    //     height: 40px;
    //     line-height: 40px;
    //     font-size: 16px;
	// 	font-weight: bold;
    //     color: #fff;
    //     text-align: center;
    // }
	// .qiandao-btn{
	// 	position: relative;
	// 	width: 100%;
	// 	margin: auto;
	// 	width: 280px;
    //     height: 47px;
    //     line-height: 47px;
    //     background: linear-gradient(-0deg, #ffc000, #ffc000);
	// 	box-shadow: 0px -1px 5px rgba(251,236,159,.4);
    //     border-radius: 24px;
    //     font-size: 16px;
    //     color: #fff;
    //     text-align: center;
    // }
	// .listss{
	// 	position: relative;
	// 	width: 94%;
	// 	margin: 13px 14px 0 14px;
		
	// 	/* font-size: 3.5vw; */
	// 	/* box-shadow: 0px -1px 5px rgba(251,236,159,.4); */
	// }
	// .iocss{
	// 	position: relative;
	// 	width: 100%;
	// 	height: 120px;
	// }
	// .sport_infoss{
	// 	position: absolute;
	// 	top: 30px;
	// 	left: 23px;
	// 	font-size: 23px;
	// 	font-family: PingFang SC;
	// 	font-weight: bold;
	// 	color: #FFFFFF;
	// }
	// .datess{
	// 	position: absolute;
	// 	top: 77px;
	// 	left: 23px;
	// 	font-size: 13px;
	// 	font-family: PingFang SC;
	// 	font-weight: 500;
	// 	color: #FFFFFF;
	// }
	// .buts{
	// 	position: absolute;
	// 	bottom: 20px;
	// 	right: 23px;
	// 	text-align: center;
	// 	width: 81px;
	// 	height: 29px;
	// 	line-height: 29px;
	// 	border-radius: 15px;

	// 	font-size: 13px;
	// 	font-family: PingFang SC;
	// 	font-weight: 500;
	// 	color: #ffffff;

	// }
	// .actions{
	// 	background-color: #e50020;
	// }
	// .noaction{
	// 	background-color: #d3d3d3;
	// }
	// .receive{
	// 	background-color: #CC0001;
	// }
	// .nowaction{
	// 	background-color: #808A87;
	// }	

</style>
