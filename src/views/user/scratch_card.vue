<template>

	<div class="container" id="top">
		<div class="header">
			<div class="head">
				<a @click="$router.back()" class="back"></a>
				刮刮卡
			</div>
		</div>
		<div class="award_box">
			<div class="award" v-if="showPrize">
				<div class="card_title" v-model="prize_content">
					{{prize_content}}
				</div>
			</div>
			<!-- <div class="surface"></div> -->
			<canvas id="c1" class="canvas" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend" v-show="!isScratch"></canvas>
		</div>

	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'
	export default {
		name: "scratchCard",
		data() {
			return {
				c1: "", //画布
				ctx: "", //画笔
				ismousedown: false, //标志用户是否按下鼠标或开始触摸
				fontem: "", // 获取html字体大小
				isScratch: false, // 是否刮过卡
				showPrize: false, // 显示奖品
				prize_content: "无刮刮卡",
			};
		},
		mounted() {
			// 修复个别手机不能滚动到顶端
			setTimeout(() => {
				var element = document.getElementById("app");
				element.scrollIntoView();
			}, 0)
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			Fetch('/index/doScratchCard').then(res => {
				console.log(res.info);
				this.prize_content = res.info;
			});
			this.fontem = parseInt(
				window.getComputedStyle(document.documentElement, null)["font-size"]
			);
			//这是为了不同分辨率上配合@media自动调节刮的宽度
			this.c1 = document.getElementById("c1");
			//这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
			//最好设置成跟画布在页面中的实际大小一样
			//不然canvas中的坐标跟鼠标的坐标无法匹配
			this.c1.width = this.c1.clientWidth + 15
			this.c1.height = this.c1.clientHeight;
			this.ctx = this.c1.getContext("2d");
			this.initCanvas();
		},
		methods: {
			// 画刮刮卡
			initCanvas() {
				this.ctx.globalCompositeOperation = "source-over";
				this.ctx.fillStyle = "#e5e5e5";
				this.ctx.fillRect(0, 0, this.c1.clientWidth, this.c1.clientHeight);
				this.ctx.fill();
				this.ctx.font = "Bold 24px Arial";
				this.ctx.textAlign = "center";
				this.ctx.fillStyle = "#a0a0a0";
				this.ctx.fillText("刮开有奖", this.c1.width / 2, 55);
				//有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
				this.ctx.globalCompositeOperation = "destination-out";
			},
			touchstart(e) {
				e.preventDefault();
				this.ismousedown = true;
			},
			// 操作刮卡
			touchend(e) {
				sessionStorage.setItem('isScratch', true)
				e.preventDefault();
				//得到canvas的全部数据
				var a = this.ctx.getImageData(0, 0, this.c1.width, this.c1.height);
				var j = 0;
				for (var i = 3; i < a.data.length; i += 4) {
					if (a.data[i] == 0) j++;
				}
				//当被刮开的区域等于一半时，则可以开始处理结果
				if (j >= a.data.length / 8) {
					this.isScratch = true;
					this.$notify(this.prize_content);
				}
				this.ismousedown = false;

			},
			touchmove(e) {
				this.showPrize = true
				e.preventDefault();
				if (this.ismousedown) {
					if (e.changedTouches) {
						e = e.changedTouches[e.changedTouches.length - 1];
					}
					var topY = document.getElementById("top").offsetTop;
					var oX = this.c1.offsetLeft,
						oY = this.c1.offsetTop + topY;
					var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
						y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;
					//画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
					//画出来是透明的
					this.ctx.beginPath();
					this.ctx.arc(x, y, this.fontem * 0.5, 0, Math.PI * 2, true); // 调整画笔的大小
					//下面3行代码是为了修复部分手机浏览器不支持destination-out
					//我也不是很清楚这样做的原理是什么
					// this.c1.style.display = 'none';
					// this.c1.offsetHeight;
					// this.c1.style.display = 'inherit';
					this.ctx.fill();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		background: url(../index/image/huanbao/ggkbg.png) no-repeat center top;
		background-size: 100%;
		padding: 100% 0;

		.award_box {


			.award {
				width: 85%;
				height: 180px;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 68%;

				.card_title {
					color: rgba(3, 45, 97, 1);
					font-size: 32px;
					font-weight: 800;
					line-height: 12vw;
					margin-top: -18vw;
					margin-left: 3vw;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

					span {
						color: #cc162d;
					}
				}
			}

			.surface {
				position: absolute;
				z-index: 98;
				width: 95%;
				height: 160px;
				margin: 150px auto;
				// background: url() no-repeat center/100%;
				padding-top: 70px;
			}

			.canvas {
				position: relative;
				top: -24vw;
				left: 14.7vw;
				width: 69.7vw;
				height: 36.8vw;
			}
		}

		.map_box {
			margin-top: 200px;
			width: 100%;
			height: 500px;
			padding: 10px;
			bottom: 5px solid orange;
			box-sizing: border-box;
		}
	}
</style>
