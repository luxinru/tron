<template>
	<div>
	    <div class="header">
	        <div class="head">
	            <a @click="$router.back()" class="back"></a>
	            转入
	        </div>
	    </div>
	    <div class ="bgimg">
			<div class="save_yue_bao_content">
				<div class = "sumMoneys" style="position: relative;top: 8vw;font-size: 4vw;padding-left: 4.2vw;">转入金额</span></div>
				<div class = "sumMoneys"><span style="font-size: 3vw;">￥</span><input class="ins" type="number" v-model="money" placeholder="0.00"></div>
				<div class = "sumMoneys" style="position: relative;top: 8vw;font-size: 4vw;padding-left: 4vw;">账号余额：￥{{data.moneys}}元</span></div>
				<div @click="saveFc()" class="butsave">确认转入</div>
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
					moneys: 0, //余额
				},
				money:'',
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
				Fetch('/user/getUserMoneys').then(res => {
				    //this.data = res.data;
				    this.data.moneys = res.data.money;
				});
			},
			saveFc(){
				Fetch('/user/save_yue_bao',{money:this.money}).then(res => {
				    if(res.code == 1){
						this.start();
						this.money = '';
				    	this.$notify({
				    	    background: '#07c160',
				    	    message: '存入成功'
				    	});
						
				    }
				});
			},
		},
	};
</script>

<style>
	input{
		display: block;
		    height: 100%;
		    background: none;
		    color: inherit;
		    opacity: 1;
		    -webkit-text-fill-color: currentcolor;
		    font: inherit;
		    line-height: inherit;
		    letter-spacing: inherit;
		    text-align: inherit;
		    text-indent: inherit;
		    text-transform: inherit;
		    text-shadow: inherit;
	}
	.ins{
		position: relative;
		font-size: 10vw;
		left: 37vw;
		top: -9vw;
		width: 30vw;
	}
	.bgimg{
		background: url(./image/yue_bao/user_bg.png) no-repeat center center;
		background-size: 100% 100%;
		height: 55vw;
	}
	.save_yue_bao_content{
		position: relative;
		color: #FFFFFF;
		text-align: center;
	}
	.sumMoneys{
		position: relative;
		top: 15vw;
		font-size: 2.5vw;
	}
	.sumMoneys span{
		position: relative;
		left: -14vw;
		top: 2vw;
	}
	.butsave{
		position: relative;
		top: 13vw;
		left: 22vw;
		width: 60vw;
		height: 12vw;
		line-height: 13vw;
		text-align: center;
		border-radius: 6vw;
		background-color: #FFA500;
	}
</style>
