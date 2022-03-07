<template>	
	<div class="tree-container">
		<div class="tree-header">
			<div class="tree-header-icon">
                <div class="index-header-title"></div>
				<div class="tree-notice">
                    <van-notice-bar color="#fff" :text="data.notice">
                        <template #left-icon>
                            <img src="../../assets/images/qianhai/index/index-2.png" />
                        </template>
                    </van-notice-bar>
          </div>
				
			<div class="my-index-header">  <div class="my-index-header-info">
				<div @click="handleTreeListItemClick(1)">
					<img src="../../assets/images/qianhai/index/home-top01.png" />
					<p>每日签到</p>
				</div>
				<div @click="handleTreeListItemClick(3)">
					<img src="../../assets/images/qianhai/index/home-top02.png" />
					<p>运动打卡</p>
				</div>
				<div @click="handleTreeListItemClick(10)">
					<img src="../../assets/images/qianhai/index/home-top03.png" />
					<p>思维提升</p>
				</div>
				<div @click="handleTreeListItemClick(6)">
					<img src="../../assets/images/qianhai/index/home-top04.png" />
					<p>积分商城</p>
				</div>
			</div>
			</div>
				
                <div class="tree-header-swipe-box">
                    <div class="tree-header-swipe">
                        <div class="bannerSwp">
                            <van-swipe @change="onChange" :autoplay="5000">
                                <van-swipe-item v-for="(image, index) in banner" :key="index">
                                    <a :href="image.url">
                                        <img style="width:100%;height: 100%;border-radius: 7px;" :src="image.thumb" />
                                    </a>
                                </van-swipe-item>
                                <div ref="dian" class="custom-indicator" slot="indicator">
                                    <div v-for="(img, x) in banner" :key="x" :class="x==0?'selected':''"></div>
                                </div>
                            </van-swipe>
                        </div>
                    </div>
                </div>
                
            </div>
		</div>
        <div class="tree-list-box" style="margin-top:80px;">
		    <div class="tree-list-title">
                <div class="title-name">热门活动</div>
            </div>		    
			
            <div class="tree-list-info">
			    <div class="tree-list-info-item five" @click="handleTreeListItemClick(7)" >
                    <div class="tree-list-info-title"></div>
                </div>
                <div class="tree-list-info-item three" @click="handleTreeListItemClick(8)" >
                    <div class="tree-list-info-title"></div>
                </div>
                <div class="tree-list-info-item four" @click="handleTreeListItemClick(5)">
                    <div class="tree-list-info-title"></div>
                </div>
            </div>
        </div> 


	
		<div class="mask" v-show="ad_show" z-index="999">
			<div class="ops">
				<div class="close">
					<div @click="close()">关闭</div>
				</div>
				<a @click="goAd()">
					<img :src="ad.activity_img" />
				</a>
			</div>
		
		</div>
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
					question: "...",
				}, ]
			};
		},
		created() {
			if (this.$parent.getFooterType() === 'n1') {
				this.$router.push('/home').catch(err => {
					err
				});
				this.$parent.footer(true, 'tree');
			} else {
				this.$parent.footer(true, 'tree');
				this.$data.footer_type = 'n2'
			}
			

		},
		mounted() {
			this.start();
			var that = this;
			var bslua = navigator.userAgent;
			if (bslua.indexOf('bsl') != -1) {
				that.down_show = false;
			}
		},
		methods: {
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
						this.$notify({
							background: '#07c160',
							message: '签到成功：已获得现金2元！'
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
                        this.$router.push({name: 'share'});
                        break;
					case 10:
                        this.$router.push({name: 'start'});
                        break;
				}
			}
		},
	};
</script>

<style lang="less" scoped>
	@import "tree";
	/*.project {*/
	/*	width: 100%;*/

	/*}*/

	/*/deep/ .marquee_outer .van-notice-bar {}*/

	/*/deep/ .marquee_outer {*/
	/*	box-shadow: none;*/
	/*	background: none;*/
	/*}*/

	/*/deep/ .marquee_outer .van-icon-volume-o::before {*/
	/*	content: '';*/
	/*	width: 22px;*/
	/*	height: 23px;*/
	/*	background: url(./image/home/horn.png) no-repeat center center;*/
	/*	background-size: 100% 100%;*/
	/*	margin-right: 6px;*/
	/*}*/

	/*/deep/ .van-notice-bar__content {*/
	/*	color: #202020;*/
	/*}*/

	/*/deep/ .van-notice-bar {*/
	/*	padding: 0 7px;*/
	/*}*/

	/*.mask {*/
	/*	position: fixed;*/
	/*	top: 0;*/
	/*	left: 0;*/
	/*	right: 0;*/
	/*	bottom: 0;*/
	/*	background: rgba(0, 0, 0, 0.6);*/
	/*}*/

	/*.list_outer {*/
	/*	// margin-top: .2rem;*/
	/*	margin-bottom: .4rem*/
	/*}*/

	/*.list_outer .outer_wrap {*/
	/*	padding: 0 10px;*/
	/*}*/

	/*.list_outer .message li {*/
	/*	// position: relative;*/
	/*	float: left;*/
	/*	display: block;*/
	/*	background: #fff;*/
	/*	box-shadow: 1px 4px 11px 1px rgba(0, 0, 0, 0.09);*/
	/*	border-radius: 5px;*/
	/*	overflow: hidden;*/
	/*	width: 100%;*/
	/*	margin: 0 auto;*/
	/*	// padding-bottom: 7px;*/
	/*	// margin-top: 14px;*/
	/*	// margin-left: 1.3%;*/
	/*}*/

	/*.list_outer ul li {*/
	/*	// position: relative;*/
	/*	float: left;*/
	/*	display: block;*/
	/*	background: #fff;*/
	/*	box-shadow: 1px 4px 11px 1px rgba(0, 0, 0, 0.09);*/
	/*	border-radius: 5px;*/
	/*	overflow: hidden;*/
	/*	width: 48%;*/
	/*	margin: 0 auto;*/
	/*	margin-bottom: 20px;*/
	/*	margin-top: 14px;*/
	/*	margin-left: 1.3%;*/
	/*}*/

	/*.list_outer ul li a img {*/
	/*	width: 100%;*/
	/*	!*height:3.2rem;*!*/
	/*}*/

	/*.list_outer ul li a h1 {*/
	/*	color: #000;*/
	/*	font-size: 16px;*/
	/*	line-height: 22px;*/
	/*	font-weight: bold;*/
	/*	margin: 8px 0 2px 0;*/
	/*}*/

	/*.list_outer ul li .list_cont {*/
	/*	width: 100%;*/
	/*	color: #999;*/
	/*	font-size: 13px;*/
	/*	line-height: 18px;*/
	/*	overflow: hidden;*/
	/*	text-overflow: ellipsis;*/
	/*	display: -webkit-box;*/
	/*	-webkit-box-orient: vertical;*/
	/*	-webkit-line-clamp: 3;*/
	/*}*/

	/*.list_outer ul .list_lab {*/
	/*	display: none;*/
	/*	margin: .25rem 0 .15rem 0;*/
	/*	font-size: 12px;*/
	/*	color: #D2A775;*/
	/*}*/

	/*.list_outer ul li .list_lab span {*/
	/*	background: rgba(239, 239, 239, 1);*/
	/*	padding: 0 .2rem;*/
	/*	font-size: 12px;*/
	/*	line-height: 18px;*/
	/*	margin-right: 4px;*/
	/*}*/

	/*.list_outer ul li .list_tip span {*/
	/*	color: #999;*/
	/*	font-size: 12px;*/
	/*	line-height: 17px;*/
	/*	margin-top: 3px;*/
	/*}*/

	/*.list_outer ul li a img.over {*/
	/*	position: absolute;*/
	/*	width: 2rem;*/
	/*	height: 2rem;*/
	/*	bottom: .3rem;*/
	/*	right: .3rem;*/
	/*}*/

	/*.indexnav {*/
	/*	width: 100%;*/
	/*	background: #fff;*/
	/*	overflow: hidden;*/
	/*	line-height: 40px;*/
	/*	font-size: 12px;*/
	/*	margin-top: 24px;*/

	/*	.nav_top,*/
	/*	.nav_bottom {*/
	/*		width: 100%;*/
	/*		margin: 0 auto;*/
	/*		display: flex;*/
	/*		justify-content: space-around;*/
	/*		flex-wrap: nowrap;*/
	/*		margin-bottom: 14px;*/
	/*	}*/
	/*}*/

	/*.indexnav a {*/
	/*	text-align: center;*/
	/*	width: 23.466%;*/
	/*	font-size: 12px;*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*}*/

	/*.indexnav a span {*/
	/*	width: 100%;*/
	/*	display: block;*/
	/*	line-height: 16px;*/
	/*	margin-top: 4px;*/
	/*}*/

	/*.indexnav a img {*/
	/*	width: 50%;*/
	/*	margin: 0 auto;*/
	/*	display: block;*/
	/*	overflow: hidden;*/
	/*}*/

	/*.marquee_outer {*/
	/*	clear: both;*/
	/*	// width: 90.66%;*/
	/*	margin: 0 auto;*/
	/*	box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.06);*/
	/*	background: #fff;*/
	/*	height: 40px;*/
	/*	line-height: 28px;*/
	/*	border-radius: 4px;*/
	/*}*/

	/*.marquee_outer img {*/
	/*	float: left;*/
	/*	width: 24px;*/
	/*	margin-top: .1rem;*/
	/*}*/

	/*!*首页样式*!*/
	/*.header {*/
	/*	width: 100%;*/
	/*	height: 40px;*/
	/*	text-align: center;*/
	/*	background: #fff;*/
	/*	position: relative;*/
	/*	top: 0;*/
	/*	z-index: 99;*/
	/*	box-shadow: 0px 2px 5px #eee;*/
	/*	-webkit-box-shadow: 0px 2px 5px #eee;*/
	/*	-ms-box-shadow: 0px 2px 5px #eee;*/
	/*	line-height: .9rem;*/
	/*	font-size: .3rem;*/
	/*	color: #000;*/
	/*}*/

	/*.header img {*/
	/*	height: 32px;*/
	/*	margin: 4px auto;*/
	/*}*/

	/*.header a {*/
	/*	position: absolute;*/
	/*	right: 0;*/
	/*	left: 0;*/
	/*	margin: 0 auto;*/
	/*	font-size: 16px;*/
	/*	color: #212121;*/
	/*	line-height: 40px;*/
	/*	letter-spacing: 1px;*/
	/*}*/

	/*.header-nbsp {*/
	/*	width: 100%;*/
	/*	height: .9rem;*/
	/*}*/

	/*.indexbanner {*/
	/*	width: 100%;*/
	/*	margin: 0 auto;*/
	/*	position: relative;*/
	/*	display: block;*/
	/*	overflow: hidden;*/
	/*}*/


	/*.mobile {*/
	/*	overflow-x: hidden;*/
	/*	width: 100%;*/
	/*	margin: 0 auto;*/
	/*	padding: 0;*/
	/*	font-size: 16px;*/
	/*	height: 100%;*/

	/*	.pro_wrap {*/
	/*		display: none;*/
	/*		width: 100%;*/
	/*		position: relative;*/
	/*		height: 17px;*/
	/*		line-height: 17px;*/
	/*		margin-top: 10px;*/
	/*	}*/

	/*	.progressBox {*/
	/*		background: #3960e81c;*/
	/*		border: 1px solid #2bb8ee78;*/
	/*		;*/
	/*		width: 80%;*/
	/*		height: 17px;*/
	/*		line-height: 17px;*/
	/*		border-radius: 9px;*/
	/*		display: inline-block;*/
	/*		overflow: hidden;*/
	/*		position: relative;*/
	/*	}*/

	/*	.progressBox .progress {*/
	/*		height: 100%;*/
	/*		background: linear-gradient(270deg, rgba(64, 164, 242, 1) 0%, rgba(61, 103, 232, 1) 100%);*/
	/*	}*/

	/*	.progressNum {*/
	/*		position: absolute;*/
	/*		top: 0;*/
	/*		left: 80%;*/
	/*		line-height: 17px;*/
	/*		color: #3582b3;*/
	/*		margin-left: 10px;*/
	/*		font-size: 14px;*/
	/*	}*/

	/*	.appdown {*/
	/*		width: 100%;*/
	/*		max-width: 750px;*/
	/*		height: 56px;*/
	/*		background-color: rgba(0, 0, 0, 0.5);*/
	/*		position: fixed;*/
	/*		font-size: 12px;*/
	/*		bottom: 55px;*/

	/*		.down {*/
	/*			width: 65px;*/
	/*			height: 100%;*/
	/*			float: right;*/
	/*			margin-right: 18px;*/
	/*			display: flex;*/
	/*			justify-content: center;*/
	/*			align-items: center;*/

	/*			a {*/
	/*				display: block;*/
	/*				width: 100%;*/
	/*				height: 26px;*/
	/*				line-height: 26px;*/
	/*				text-align: center;*/
	/*				border-radius: 3px;*/
	/*				background-color: #FE8000;*/
	/*				color: #fff;*/
	/*				font-size: 12px;*/
	/*			}*/
	/*		}*/

	/*		.close_down {*/
	/*			width: 15px;*/
	/*			float: right;*/
	/*			height: 100%;*/
	/*			font-size: .6rem;*/

	/*			a {*/
	/*				display: block;*/
	/*				width: 15px;*/
	/*				font-size: 14px;*/
	/*				cursor: pointer;*/
	/*				color: #FE8000;*/
	/*				line-height: 25px;*/
	/*				text-align: center;*/
	/*			}*/
	/*		}*/

	/*		.mark {*/
	/*			float: left;*/
	/*			height: 100%;*/
	/*			color: #fff;*/
	/*			line-height: 0.5rem;*/
	/*			margin-left: 9px;*/
	/*			display: flex;*/
	/*			flex-wrap: wrap;*/
	/*			flex-direction: column;*/
	/*			justify-content: center;*/
	/*			align-items: flex-start;*/
	/*		}*/

	/*		.mark p:nth-of-type(1) {*/
	/*			line-height: 17px;*/
	/*			font-size: 13px;*/
	/*		}*/

	/*		.mark p:nth-of-type(2) {*/
	/*			line-height: 14px;*/
	/*			font-size: 12px;*/
	/*		}*/

	/*		.logo {*/
	/*			width: 32px;*/
	/*			height: 32px;*/
	/*			float: left;*/
	/*			margin-left: 8px;*/
	/*			margin-top: 12px;*/

	/*			img {*/
	/*				max-height: 100%;*/
	/*				border-radius: 6px;*/
	/*			}*/
	/*		}*/
	/*	}*/

	/*	.ops {*/
	/*		position: relative;*/
	/*		display: flex;*/
	/*		flex-direction: column;*/
	/*		align-items: center;*/
	/*		justify-content: center;*/
	/*		height: 100%;*/
	/*		max-width: 80%;*/
	/*		margin: -25px auto 0 auto;*/

	/*		.close {*/

	/*			font-size: 20px;*/
	/*			color: #fff;*/
	/*			margin-bottom: 5px;*/
	/*			height: 20px;*/

	/*			div {*/
	/*				float: right;*/
	/*			}*/
	/*		}*/

	/*		.close::after {*/
	/*			clear: both;*/
	/*			content: '';*/
	/*		}*/

	/*		a {*/
	/*			img {*/
	/*				width: 100%;*/
	/*				max-width: 750px;*/
	/*				height: 100%;*/
	/*			}*/
	/*		}*/
	/*	}*/

	/*	.bannerSwp {*/

	/*		width: 100%;*/
	/*		max-width: 100%;*/
	/*		min-height: 100px;*/

	/*		.van-swipe {*/
	/*			width: 100%;*/

	/*			.van-swipe-item {*/
	/*				img {*/
	/*					width: 100%;*/
	/*					max-height: 150px;*/
	/*				}*/
	/*			}*/

	/*			.custom-indicator {*/
	/*				position: absolute;*/
	/*				left: 50%;*/
	/*				bottom: 5px;*/
	/*				padding: 2px 5px;*/
	/*				color: #fff;*/
	/*				font-size: 12px;*/
	/*				background: rgba(0, 0, 0, 0.1);*/

	/*				div {*/
	/*					display: inline-block;*/
	/*					margin: 0 2px;*/
	/*					width: 0.1rem;*/
	/*					height: 0.13rem;*/
	/*					vertical-align: middle;*/
	/*					background: #ddd;*/
	/*					cursor: pointer;*/
	/*					!*border-radius: 50%;*!*/
	/*					!*-webkit-border-radius: 50%;*!*/
	/*					transform: skewX(-29deg);*/
	/*				}*/

	/*				.selected {*/
	/*					width: 0.3rem;*/
	/*					background: #3582b3;*/
	/*				}*/
	/*			}*/
	/*		}*/
	/*	}*/

	/*	.contact {*/
	/*		margin-top: .5rem;*/
	/*		border-top: 1px solid #ccc;*/
	/*		border-bottom: 1px solid #ccc;*/
	/*		padding: 0 .2rem;*/
	/*		line-height: .8rem;*/
	/*	}*/

	/*	.contact .tel {*/
	/*		font-size: 16px;*/
	/*		font-weight: bold;*/
	/*	}*/

	/*	.contact .tel strong {*/
	/*		font-size: 16px;*/
	/*		color: red;*/
	/*	}*/

	/*	.contact .kef {*/
	/*		float: right;*/
	/*		font-size: 16px;*/
	/*		color: #000;*/
	/*	}*/

	/*	.footer {*/
	/*		text-align: center;*/
	/*		margin-top: .2rem;*/
	/*		padding: 0 .2rem*/
	/*	}*/

	/*	.footer p {*/
	/*		font-weight: bold;*/
	/*		line-height: .8rem;*/
	/*		font-size: 16px;*/
	/*	}*/

	/*	.footer .zhenjian {*/
	/*		width: 100%;*/
	/*		text-align: center;*/
	/*		font-size: 0;*/
	/*		padding-bottom: 5px*/
	/*	}*/

	/*	.footer .zhenjian img {*/
	/*		width: 32%;*/
	/*		margin: 10px .05rem .1rem .05rem;*/
	/*		padding: 0 10px*/
	/*	}*/
	/*}*/

	/*.friend_link {*/
	/*	width: 100%;*/
	/*	height: 32px;*/
	/*}*/

	/*.link_swipe {*/
	/*	width: 90.666%;*/
	/*	height: 32px;*/
	/*	margin: 10px auto;*/
	/*	overflow-x: scroll;*/
	/*	-webkit-overflow-scrolling: touch;*/
	/*}*/

	/*.link_swipe .van-swipe-item {*/
	/*	width: 23%;*/
	/*	height: 32px;*/

	/*}*/

	/*.link_list {*/
	/*	float: left;*/
	/*	height: 32px;*/
	/*	margin-right: 2%;*/
	/*}*/

	/*.link_swipe img {*/
	/*	height: 32px;*/
	/*	width: 100%;*/
	/*}*/

	/*.slide_div {*/
	/*	height: 100%;*/
	/*	display: flex;*/
	/*	flex-wrap: nowrap;*/
	/*}*/

	/*.modal {*/
	/*	display: none;*/
	/*	position: fixed;*/
	/*	z-index: 1;*/
	/*	left: 0;*/
	/*	top: 0;*/
	/*	height: 100%;*/
	/*	width: 100%;*/
	/*	overflow: auto;*/
	/*	background-color: rgba(0, 0, 0, 0.5);*/
	/*}*/

	/*.modal-content {*/
	/*	overflow: auto;*/
	/*	background-color: #f4f4f4;*/
	/*	margin: 15% auto;*/
	/*	width: 100%;*/
	/*	height: 100%;*/
	/*	box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);*/
	/*	animation-name: modalopen;*/
	/*	animation-duration: 1s;*/
	/*}*/

	/*.modal-header h2,*/
	/*.modal-footer h3 {*/
	/*	margin: 0;*/
	/*}*/

	/*.modal-header {*/
	/*	background-color: coral;*/
	/*	padding: 15px;*/
	/*	color: #fff;*/
	/*}*/

	/*.closeBtn {*/
	/*	color: #fff;*/
	/*	float: right;*/
	/*	font-size: 30px;*/
	/*}*/

	/*.closeBtn:hover,*/
	/*.closeBtn:focus {*/
	/*	color: #000;*/
	/*	text-decoration: none;*/
	/*	cursor: pointer;*/
	/*}*/

	/*.modal-body {*/
	/*	padding: 10px 20px;*/
	/*}*/

	/*.modal-footer {*/
	/*	color: #fff;*/
	/*	background-color: coral;*/
	/*	padding: 10px;*/
	/*	text-align: center;*/
	/*}*/

	/*.body-box {*/
	/*	line-height: 1.8;*/
	/*}*/

	/*@keyframes modalopen {*/
	/*	from {*/
	/*		opacity: 0*/
	/*	}*/

	/*	to {*/
	/*		opacity: 1*/
	/*	}*/
	/*}*/
</style>
