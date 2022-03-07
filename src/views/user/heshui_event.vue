<template>
	<div>
		<div class="mains">
			<img style="width: 100%;" src="@/assets/images/heshui-bg.jpg" alt="">
			<!-- <div class = "ddates">倒计时：<span style="color: red;font-weight: 700; font-size: 4vw;">{{minutes}}:{{seconds}}</span></div> -->
			<div v-for="(item, key) in data" :key="key" class = "listss">
				<img :src="item.image" class="iocs" >
				<div>
					<p class="sport_infos">{{item.title}}</p>
					<p class="dates">完成时间{{item.date}}分钟</p>
					<div class="buts actions" v-if="item.status=='0'" @click="takeExercises(item.id)" > {{item.status_text}}</div>
					<div class="buts receive" v-else-if="item.status=='1'" @click="receiveRewardsExercises(item.id)" > {{item.status_text}}</div>
					<div class="buts noaction" v-else-if="item.status=='2'" > {{item.status_text}}</div>
					<div class="buts nowaction" v-else-if="item.status=='3'" > {{item.status_text}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'

	export default {
		name: "index",
		components: {},
		data() {
			return {
				data: {},
				minutes: 0, //分
				seconds: 0, //秒
				status: false,
				action: false,
			};
			},
		created() {
			this.$parent.footer(false);
			},
		methods: {
			start() {
				Fetch('/index/getHeshuiEventList').then((res) => {
					this.data = res.data.list;
					this.minutes = res.data.m;
					this.seconds = res.data.s;
					if(this.seconds > 0 || this.minutes > 0){
						this.seconds = this.seconds+1;
						this.status = true;
						if(this.action == false){
							this.timer(true);
						}
					}else{
						this.action = false;
					}
	            })
	        },
			takeExercises(id){
				Fetch('/index/takeExercises',{sid:id}).then((res) => {
					this.$notify({
					    background: '#07c160',
					    message: res.info
					});
					this.start();
				})
			},
			receiveRewardsExercises(id){
				Fetch('/index/receiveRewardsExercises',{sid:id}).then((res) => {
					this.$notify({
					    background: '#07c160',
					    message: res.info
					});
					this.start();
				})
			},
			// 倒计时
			    num(n) {
			      if (this.minutes === 0 && this.seconds === 0 && this.status == true) {
						this.start();
						this.status = false;
			      }
			      return n < 10 ? '0' + n : '' + n;
			    },
			    // 倒计时
			    timer(is_action = false) {
				  if(is_action){
					  this.action = true;
				  }
			      var _this = this;
			      var time = window.setInterval(function() {
			        if (_this.seconds === 0 && _this.minutes !== 0) {
			          _this.seconds = 59;
			          _this.minutes -= 1;
			        } else if (_this.minutes === 0 && _this.seconds === 0) {
			          _this.seconds = 0;
			          window.clearInterval(time);
			        } else {
			          _this.seconds -= 1;
			        }
			      }, 1000);
			    },
	    },
		mounted() {
		    // 倒计时
			this.start();
		  },
		  watch: {
		    // 倒计时
		    second: {
		      handler(newVal) {
		        this.num(newVal);
		      },
		    },
		    // 倒计时
		    minute: {
		      handler(newVal) {
		        this.num(newVal);
		      },
		    },
		  },
		  computed: {
		    // 倒计时
		    second: function() {
		      return this.num(this.seconds);
		    },
		    minute: function() {
		      return this.num(this.minutes);
		    },
		  },

	};
</script>

<style>
	/* .ddates{
		width: 100%;
		text-align: center;
		margin: 2vw 0;
	} */
	.mains{
		width: 100%;
		margin: 0;
		padding: 0 0 30px;
		height: 100%;
	}
	.listss{
		position: relative;
		width: 94%;
		margin: 13px 14px 0 14px;
		margin-top: -210px;
		/* font-size: 3.5vw; */
		/* box-shadow: 0px -1px 5px rgba(89,125,172,.4); */
	}
	.iocs{
		position: relative;
		width: 100%;
		height: 120px;
	}
	.sport_infos{
		position: absolute;
		top: 30px;
		left: 23px;
		font-size: 23px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}
	.dates{
		position: absolute;
		top: 77px;
		left: 23px;
		font-size: 13px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.buts{
		position: absolute;
		bottom: 20px;
		right: 23px;
		text-align: center;
		width: 81px;
		height: 29px;
		line-height: 29px;
		border-radius: 15px;

		font-size: 13px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #494949;

	}
	.actions{
		background-color: #FFFFFF;
	}
	.noaction{
		background-color: #d3d3d3;
	}
	.receive{
		background-color: #CC0001;
	}
	.nowaction{
		background-color: #808A87;
	}
</style>
