<template>
	<div>
		<div class="main">
			<!--<img style="width: 100%;" src="@/assets/images/sport.jpg" alt="">-->
			<!-- <div class = "ddates">倒计时：<span style="color: red;font-weight: 700; font-size: 4vw;">{{minutes}}:{{seconds}}</span></div> -->
			<div class="lists-box" v-for="(item, key) in data" :key="key">
                <div class="lists">
                    <img :src="item.image" class="iocs" >
                    <div>
                        <div class="sport_infos-box">
                            <p class="sport_infos">{{item.title}}</p>
                            <p class="dates">完成时间{{item.date}}分钟</p>
                        </div>
                        <div class="buts-box" >
                            <div class="buts actions" v-if="item.status=='0'|| item.status_text=='开始参与'" @click="takeExercises(item.id)" > 开始运动</div>
                            <div class="buts receive" v-else-if="item.status=='1'" @click="receiveRewardsExercises(item.id)" > {{item.status_text}}</div>
                            <div class="buts noaction" v-else-if="item.status=='2'" > {{item.status_text}}</div>
                            <div class="buts nowaction" v-else-if="item.status=='3'" > {{item.status_text}}</div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
		<!-- <div @click="qqq"> 1233211234567</div> -->
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
			mounted() {
			// this.qwe()
// this.qqq()
		    // 倒计时
			this.start();
		  },
		methods: {
			start() {
				Fetch('/index/getSportEventList').then((res) => {
					console.log('个人信息',res)

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
				qqq(){
				Fetch('/index/takeExercises',{}).then((res) => {
					console.log('112233',res)
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

<style scoped lang="less">
	/* .ddates{
		width: 100%;
		text-align: center;
		margin: 2vw 0;
	} */
	.main{
        display: flex;
        flex-wrap: wrap;
		width: 100%;
		margin: 0;
		padding: 14px 14px 30px;
		height: 100%;
        background-color: #F5F5F5;
        font-family: PingFang SC;
	}
    .lists-box {
       width: 348px;
		height: 118px;
		background: #FFFFFF;
		border-radius: 7px;
        overflow: hidden;
		margin-bottom: 13px;
        // &:nth-of-type(2n) {
        //     padding-right: 0;
        //     padding-left: 6px;
        // }
    }
	.lists{
		position: relative;
        height: 100%;
        border-radius: 7px;
	}
	.iocs{
		position: absolute;
		width: 175px;
		height: 100%;
        // border-radius: 7px;
		right: 0;
	}
    .sport_infos-box {
        position: absolute;
        top: 20px;
        left: 18px;
        .sport_infos{
            font-size: 16px;
            font-weight: bold;
            color: #050505;
            line-height: 20px;
            padding-bottom: 10px;
        }
        .dates{
            font-size: 13px;
            font-weight: 500;
            color: #CCCCCC;
        }
    }
    .buts-box {
        position: absolute;
        bottom: 18px;
        right: 25px;
        left: 25px;
    }
    .buts {
        text-align: center;
        line-height: 29px;
        border-radius: 19px;
        text-align: center;
        font-size: 15px;
        font-weight: 500;
        color: #FFFFFF;
		width: 103px;
		height: 29px;
		background: #023EFE;
		border-radius: 15px;

    }
	.actions{
		//background-color: #FFFFFF;
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
