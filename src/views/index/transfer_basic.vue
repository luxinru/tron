<template>
	<div class="page_root">
		<div class="header">
			<div class="head" style="background: transparent; color: #fff">
				<van-icon name="arrow-left" size="23" color="#fff" @click="$router.go(-1)" />
				<!--<router-link :to="path" class="back"></router-link>-->
				<div>{{ $t('recharge') }}</div>
				<div></div>
			</div>
		</div>

		<section class="content">
			<img class="logo" src="@/assets/tron/Recharge2_slices/image-removebg-preview (12).png" alt="" />

			<!-- <span class="title">{{ $t('transfer_to_promotion_account') }}</span> -->

			<div class="code_box" ref="codeBox">
				<div class="qrcode" ref="qrCodeUrl"></div>
			</div>

			<span class="sub_title">{{ $t('trx_address') }}</span>

			<span class="url">
				{{ address }}
			</span>

			<div class="btn" :data-clipboard-text="address" v-if="btn_show" @click="copy">
				{{ $t('copy_address') }}
			</div>

			<div class="info">
				<span>
					{{ $t('recharge_other_text') }}
				</span>
				<span>
					{{ $t('investment_text') }}
				</span>
			</div>

			<div class="submit" v-if="btn_show" @click="tgHistory">
				<div class="kuai">
					<img src="@/assets/tron/长箭头2@2x.png" alt="" />
				</div>
				{{ $t('recharge_completed') }}
			</div>
		</section>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'
	import QRCode from 'qrcodejs2'
	import Clipboard from 'clipboard'
	import CheckTrans from '../../utils/tron.js'
	export default {
		name: 'RechargePromotion',
		data() {
			return {
				qrcode: '',
				address: 'Please wait. Loading...',
				btn_show: false,
				uid: '',
			}
		},
		computed: {},
		created() {
			this.$parent.footer(false)
		},
		mounted() {
			this.start()
		},
		methods: {
			start() {
				setTimeout(() => {}, 0)

				// 获取钱包地址
				let that = this
				Fetch('/user/info').then((res) => {
					// that.$router.refresh();
					// this.dataInfo = res.data //res赋值
					var httpRequest = new XMLHttpRequest() //第一步：建立所需的对象
					httpRequest.open(
						'GET',
						'https://tron1688.com/api/createAccount?uid=' + res.data.mobile,
						true
					) //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
					httpRequest.send() //第三步：发送请求  将请求参数写在URL中
					/**
					 * 获取数据后的处理程序
					 */
					httpRequest.onreadystatechange = function() {
						if (httpRequest.readyState == 4 && httpRequest.status == 200) {
							// var json = httpRequest.responseText; //获取到json字符串，还需解析
							// console.log(httpRequest.responseText)
							that.address = httpRequest.responseText
							that.creatQrCode()
							that.btn_show = true
							that.uid = res.data.mobile
							if (!that.address) {
								that.$router.refresh()
							}
							Fetch('/user/get_tron_account', {
								account: that.address
							}).then((res) => {})
						}
					}
				})

				Fetch('/index/int').then((res) => {
					console.log('res.data :>> ', res.data)
					this.ad = res.data.ad
					this.data = res.data

					if (res.data.ad.activity_status == 1) {
						this.ad_show = true
					} else {
						this.ad_show = false
					}
				})

				// 兑换信息
				// this.category_data = []
				// Fetch('/index/goods_list').then((res) => {
				//   const { category } = res.data
				//   if (category.length && category[0].list && category[0].list.length) {
				//     this.category_data = category[0].list.splice(0, 2)
				//   }

				//   for (var i = 0; i < res.data.category.length; i++) {
				//     this.dh_num.push([])
				//     for (var j = 0; j < res.data.category[i].list.length; j++) {
				//       this.dh_num[i].push(1)
				//     }
				//   }
				//   console.log('this.category_data', this.category_data)
				// })

				/* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

				// Fetch('/index/banner', {
				//   type: 'banner',
				// }).then((res) => {
				//   this.banner = res.data
				// })
			},

			creatQrCode() {
				const {
					clientWidth,
					clientHeight
				} = this.$refs.codeBox
				new QRCode(this.$refs.qrCodeUrl, {
					text: this.address,
					width: clientWidth - 20,
					height: clientHeight - 20,
					colorDark: '#000000',
					colorLight: '#ffffff',
					correctLevel: QRCode.CorrectLevel.H,
				})
			},

			copy() {
				var clipboard = new Clipboard('.btn')
				clipboard.on('success', (e) => {
					this.$notify({
						type: 'success',
						message: this.$t('copy_successfully')
					})
					//  释放内存
					clipboard.destroy()
				})
				clipboard.on('error', (e) => {
					// 不支持复制
					this.$notify({
						type: 'danger',
						message: this.$t('copy_failed')
					})
					// 释放内存
					clipboard.destroy()
				})
			},
			tronCallback(t) {
				if (!t['data']) {
					return
				}
				let data = t['data']
				let sortArr = []
				let totalAmount = 0
				let value = null
				for (let i = 0; i < data.length; i++) {
					value = data[i]['raw_data']["contract"][0]["parameter"]['value']
					let amount = value['amount'] ? value['amount'] : 0
					let txID = data[i]['txID']
					// 处理激活1TRX造成的回调失败,激活账户的数据要去掉
					if (amount > 100000) {
						value['txID'] = txID
						sortArr.push(value)
						// 总充值
						totalAmount += amount
					}
				}

				// 对账
				Fetch('/user/get_sum_recharge', {}, null, false).then((ret) => {
					let recharge = ret.data.sum_recharge
					// console.log(totalAmount / 1000000 , value)
					// 有新订单了
					if (Math.abs((totalAmount / 1000000) - recharge) > 1) {
						// 查询钱包后台
						const options = {
							method: 'GET',
							headers: {
								'Accept': 'application/json'
							},
						};

						fetch('https://tron1688.com/api/GetTransactionBytxId?phone=' + ret.data.phone + '&txid=' +
								sortArr[0]['txID'] + '&amount=' + sortArr[0]['amount'], options)
							.then(response => (response.json()))
							.then(response => (response))
							.catch(err => (err));
					}
				})
			},
			getTronTrans() {
				let that = this
				Fetch('/user/get_address', {}, null, false).then((ret) => {
					//地址不为空的时候继续往下查
					if (ret.data) {
						// 获取apikey
						Fetch('/user/get_api_key', {}, null, false).then((res) => {
							if (!res.data) {
								return
							}
							CheckTrans(ret.data, res.data, that.tronCallback)
						})
					}
				})
			},
			tgHistory() {
				// 查询历史订单
				this.getTronTrans()
				this.$router.push('/home').catch((err) => {})
			},
			submit(trx, txID) {
				Fetch('/user/trx_apply', {
					trx: trx,
					remark: '',
					txID: txID,
					rid: 0,
				}).then(() => {
					this.$notify({
						background: '#07c160',
						message: this.$t('submitted_successfully'),
					})
					this.$router.push('/home').catch((err) => {})
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.page_root {
		background: linear-gradient(40deg, #5e63e7 0%, #be92fe 100%);
		width: 100%;
		min-height: 100vh;
		height: max-content;
		display: flex;
		flex-direction: column;
		padding: 0 13px;

		.header {
			position: relative;
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 17px;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			background-color: transparent;

			.arrow {
				position: absolute;
				left: 0;
			}
		}

		.content {
			width: 100%;
			padding: 10px 18px;
			background: #ffffff;
			box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
			border-radius: 13px;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20px;

			.logo {
				width: 167px;
				height: 125px;
				margin: 24px 0 0 0;
			}

			.title {
				font-size: 21px;
				font-family: Arial;
				font-weight: bold;
				color: #394249;
				margin-top: 24px;
			}

			.code_box {
				width: 131px;
				height: 131px;
				background: rgba(180, 140, 255, 0.5);
				border-radius: 7px;
				margin-top: 25px;
				display: flex;
				align-items: center;
				justify-content: center;

				.qrcode {
					width: 112px;
					height: 112px;
					background-color: #fff;
				}
			}

			.sub_title {
				font-size: 14px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #8a07e7;
				margin-top: 18px;
			}

			.url {
				margin-top: 18px;
				font-size: 11px;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.5);
			}

			.btn {
				height: 35px;
				padding: 0 16px;
				background: #5e63e7;
				border-radius: 17px;
				font-size: 17px;
				font-family: PingFang SC;
				font-weight: 600;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 20px;
			}

			.info {
				width: 100%;
				margin-top: 18px;
				display: flex;
				flex-direction: column;
				font-size: 13px;
				font-family: PingFang SC;
				font-weight: 600;
				color: #323a45;
				line-height: 16px;

				span {
					width: 100%;
					text-align: center;

					&:last-child {
						font-size: 11px;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(0, 0, 0, 0.5);
						margin-top: 11px;
					}
				}
			}

			.submit {
				position: relative;
				width: 282px;
				height: 51px;
				margin: 24px auto;
				background-color: rgba(138, 7, 231, 1);
				border-radius: 25px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 17px;
				font-family: PingFang SC;
				font-weight: 600;
				color: #ffffff;
				padding-left: 40px;
				box-sizing: border-box;

				.kuai {
					position: absolute;
					width: 37px;
					height: 37px;
					left: 8px;
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
