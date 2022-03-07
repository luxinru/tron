<template>
	<div>
	    <div class="header">
	        <div class="head">
	            <a @click="$router.back()" class="back"></a>
	            余额宝库
	        </div>
	    </div>
	    <div class ="bgimg">
			<div class="yue_bao_content">
				<div class = "sumMoney">￥<span>{{data.sumMoney}}</span></div>
				<div class = "sumMoney" style="font-size: 4vw;margin-top: 6.5vw;">总金额（元）</span></div>
			</div>
			<div class="bgimg2">
				<div class="yueboInfo">
					<div class="boxsInfo">
						<div>{{data.todayIncome}}</div>
						<div class="boxsInfo2">今日收益（元）</div>
					</div>
					<div class="boxsInfo">
						<div>{{data.todayIncome}}</div>
						<div class="boxsInfo2">累计收益（元）</div>
					</div>
					<div class="boxsInfo">
						<div>{{data.todayIncome}}%</div>
						<div class="boxsInfo2">24小时利率（%）</div>
					</div>
				</div>
				<div class="butDiv">
					<div><router-link class="router_links" style="background-color: #FFFFFF;" to="/out_yue_bao"><span>转出</span></router-link></div>
					<div><router-link class="router_links" style="background-color: #FFA500;color: #FFFFFF;" to="/save_yue_bao"><span>转入</span></router-link></div>
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
	            data: {
					interestRate: 0, //利率
					sumMoney: 0, //宝库金额
					todayIncome: 0,//今日收益
					sumIncome: 0,//总收益
				},
	        };
	    },
	    created() {
	        this.$parent.footer(false);
	    },
	    mounted() {
	        this.start();
	    },
		methods: {
			start(){
				Fetch('/user/get_yue_bao_info').then(res => {
				    //this.data = res.data;
				    this.data.interestRate = res.data.interestRate;
				    this.data.sumMoney = res.data.sumMoney;
				    this.data.todayIncome = res.data.todayIncome;
					this.data.sumIncome = res.data.sumIncome;
				});
			},
		},
	};
</script>

<style>
	.bgimg{
		background: url(./image/yue_bao/user_bg.png) no-repeat center center;
		background-size: 100% 100%;
		height: 55vw;
	}
	.bgimg2{
		position: relative;
		top:21vw;
		background: url(./image/yue_bao/yuebao_box_bg.png) no-repeat center center;
		background-size: 100% 100%;
		height: 50vw;
		width: 90%;
		left: 4.8vw;
	}
	.yue_bao_content{
		position: relative;
		color: #FFFFFF;
		text-align: center;
	}
	.sumMoney{
		position: relative;
		top: 15vw;
		font-size: 3vw;
	}
	.sumMoney span{
		font-size: 10vw;
	}
	.yueboInfo{
		color: #FFFFFF;
	}
	.boxsInfo{
		text-align: center;
		font-size: 4.5vw;
		padding: 0 2vw;
		position: relative;
		top:10vw;
		float: left;
		width: 33.333%;
	}
	.boxsInfo2{
		margin-top: 2vw;
		font-size: 3vw;
	}
	.butDiv{
		text-align: center;
	}
	.butDiv div{
		position: relative;
		float: left;
		top: 25vw;
		width: 50%;
	}
	.router_links{
		font-size: 3vw;
		padding: 2vw 14vw;
		border-radius: 5vw;
	}
</style>
