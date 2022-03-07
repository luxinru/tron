<template>
    <div class="main">
		<!-- <div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        看图猜成语
		    </div>
		</div> -->
        <div class="rule_box">
            <!-- <div class="rule_title">{{data.title}}</div>			
            <div class="mt3">
                答题倒计时:
                <span>
                    <van-count-down class="mm" :time="data.m" @finish="stop" ref="countDown">
                        <template v-slot="timeData">
                            <span class="item">{{timeData.seconds}}</span>
                        </template>
                    </van-count-down>
                </span>
                秒
            </div> -->
            <div class="rule_info_box">
                <div class="img-cont">
                    <img :src="data.images" alt="">
                </div>
                <div ref="anwser" class="anwser_item" v-for="(v, k) in data.values" :key="k"
                     @click="apply(v.id, $event)">{{v.value}}
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
    import Vue from 'vue';
    import Fetch from '../../utils/fetch'
    import {CountDown} from 'vant';
    import {Dialog} from 'vant';

    Vue.use(CountDown);

    export default {
        name: "index",
        data() {
            return {
                data: {
                    askid:0,
                    title: '',
                    values: [],
                    m: 60 * 1000,
					type: 1,
					images: '',
					cid : '',
                }
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.$refs.countDown.pause();
            this.start();
        },
        methods: {
            start() {
                Fetch('/index/getask', {type: this.data.type}).then(res => {
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
                    }else if(res.data.alipay == 1){
                                Dialog.alert({
                    			    title: '提示',
                    			    message: res.info,
                    			    showCancelButton: true,
                    			    confirmButtonText: "绑定支付宝",
                    			}).then(() => {
                    			    this.$router.push('/alipay');
                    			}).catch(() => {
                    			    
                    			})
                    }else{
                    	this.data.askid = res.data.id;
                    	this.data.title = res.data.title;
                    	this.data.values = res.data.values;
                    	this.data.images = res.data.image;
                    	this.$refs.countDown.reset();
                    	Dialog.alert({
                    	    message: res.data.status = res.info,
                    	})
                    }
                });
            },
            apply(key, event) {
                this.setStyle();
                event.target.style.background = '#EAA46A';
                event.target.style.color = '#fff';
                this.stop(key)
            },
            setStyle(){
                this.$refs.anwser.forEach((v) => {
                    v.style.background = '#fff';
                    v.style.color = '#4E4E4E';
                });
            },
            stop(key = 0) {
				let id = this.data.askid;
                this.$refs.countDown.pause();
                Fetch('/index/getask', {id:id,key:key}).then(res => {
                    this.data.askid = res.data.id;
                    this.data.title = res.data.title;
                    this.data.values = res.data.values;
                    this.data.images = res.data.image;
                    this.$refs.countDown.reset();
                    Dialog.alert({
                        message: res.data.status = res.info,
                    })
                });
            }
        }
    };
</script>

<style lang="less" scoped>
.main {
    height: 812px;
    background-image: url(./image/sf/ktcm_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .rule_box{
        padding: 220px 19px 0 18px;
        .rule_info_box{
            width: 338px;
            height: 559px;
            background-image: url('./image/sf/ktcm_c_bg.png');
            background-size: 100% 100%;
            padding: 47px 39px 0;
            .img-cont{
                height: 221px;
                margin-bottom: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .anwser_item{
                width: 261px;
                line-height: 43px;
                background-color: #fff;
                border-radius: 4px;
                text-align: center;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #4E4E4E;
                margin-bottom: 15px;
            }
        }
    }
}

</style>


