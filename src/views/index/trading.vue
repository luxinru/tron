<template>
	<div class="page_root">
		<section class="header">
			<div class="title">{{ $t('trading') }}</div>

			<div class="total">
				<span class="total_title">{{ $t('cloud_mining_is_working') }}</span>
				<span class="total_value">{{rate}}%</span>
			</div>

			<img class="total_img" src="@/assets/tron/Trading_slices/色相／饱和度 2.png" alt="" />
		</section>

		<section class="contents">
			<div class="title">
				<div class="top">
					<span class="label">{{ $t('trading_profit') }}</span>
					<div class="all" @click="$router.push('/trading_list')">
						{{ $t('view_all') }}
						<img src="@/assets/tron/Trading_slices/返回 拷贝 3.png" alt="" />
					</div>
				</div>
				<div class="tip">( 24-{{ $t('hour_settlement') }} )</div>
			</div>
			<div class="list">
				<div class="item" v-for="item in data.list" :key="item.id">
					<img src="@/assets/tron/Trading_slices/d9dcc6b3346496130c585e608f2d48e2ce65c24220c43-k6M3Yt.png"
						alt="">
					<div class="info">
						<span>{{item.money}}</span>
						<span>{{ $t('quantifying_transaction_revenue') }}</span>
					</div>
					<div v-if="item.type == 2" class="btn" @click="receive(item.id)">
						{{ $t('receive') }}
					</div>
					<div  v-if="item.type == 1" class="btn active">
						{{ $t('receive') }}
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'
	export default {
		name: 'trading',
		data() {
			return {
				data:{
					list:[]
				},
				dataInfo: null,
				vip: 8015,
				rate: ''
			}
		},
		computed: {},
		created() {
			this.$parent.footer(true, 'trading')
		},
		mounted() {
			this.strat()
		},
		
		methods: {
			strat() {
				Fetch('/user/info').then((res) => {
					this.dataInfo = res.data //res赋值
					this.vip = this.dataInfo.vip
					this.rate = this.dataInfo.rate
				})
				
				Fetch('/user/getTRXDetail').then(res => {
				    this.data = res.data;
				})
			},
			receive(id){
				Fetch('/user/receiveTRX', {
				    id: id,
				  }).then((res) => {
					this.$notify({
					  background: '#07c160',
					  message: res.info,
					})
					if(res.code == 1){
						this.strat()
					}
				  })
			},
		},
	}
</script>

<style lang="less" scoped>
	.page_root {
		background-color: rgba(246, 245, 250, 1);
		padding-bottom: 78px;

		.header {
			width: 100%;
			height: 360px;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: url('~@/assets/tron/Home_slices/组 102.png') no-repeat;
			background-size: 100% 100%;
			padding: 0 28px;

			.title {
				position: relative;
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 17px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}

			.total {
				position: relative;
				width: 100%;
				height: 131px;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 13px;
				margin-top: 16px;
				display: flex;
				flex-direction: column;
				padding: 20px;

				.total_title {
					width: 100%;
					font-size: 17px;
					font-family: Arial;
					font-weight: 400;
					color: #ffffff;
					display: flex;
					justify-content: center;
				}

				.total_value {
					width: 100%;
					font-size: 34px;
					font-family: Arial;
					font-weight: bold;
					color: #ffffff;
					display: flex;
					align-items: flex-end;
					justify-content: center;
					margin-top: 24px;

					&::before {
						content: '+';
						font-size: 22px;
						font-family: Arial;
						font-weight: bold;
						color: #ffffff;
						margin-right: 11px;
					}
				}
			}

			.total_img {
				width: 292px;
				height: 191px;
				margin-top: -26px;
			}
		}

		.contents {
			width: 100%;
			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 19px;

				.top {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.label {
						font-size: 17px;
						font-family: Arial;
						font-weight: bold;
						color: #1e253c;
					}

					.all {
						display: flex;
						align-items: center;
						font-size: 12px;
						font-family: Arial;
						font-weight: 400;
						color: rgba(30, 37, 60, 0.5);
						line-height: 5px;

						img {
							width: 5px;
							height: 8px;
							margin-left: 8px;
						}
					}
				}

				.tip {
					font-size: 13px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #7d70e6;
					line-height: 5px;
					margin-top: 9px;
					margin-bottom: 7px;
				}
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				// padding: 0 13px;

				.item {
					width: 100%;
					height: 86px;
					background: #ffffff;
					border-radius: 13px;
					display: flex;
					align-items: center;
					margin-top: 10px;
					padding: 22px 14px;

					img {
						width: 57px;
						height: 43px;
						margin-right: 17px;
					}

					.info {
						flex: 1 0;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;

						span {
							font-size: 17px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #6064E7;

							&:first-child {
								&::after {
									content: 'TRX';
									font-size: 10px;
									font-family: Arial;
									font-weight: 400;
									color: #2A2A2A;
									line-height: 5px;
									margin-left: 4px;
								}
							}

							&:last-child {
								font-size: 11px;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(0, 0, 0, 0.5);
								margin-top: 20px;
							}
						}
					}

					.btn {
						width: 63px;
						height: 24px;
						background: #6767E8;
						border-radius: 12px;
						font-size: 11px;
						font-family: Arial;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: 16px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.active {
					  color: rgba(255, 255, 255, 1);
					  background-color: rgba(177, 155, 249, 1);
					}
				}
			}
		}
	}
</style>
