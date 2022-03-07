<template>
    <div class="bg">
        <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                截图分享朋友圈
            </div>
        </div>
    
	<div><img src="./image/share.jpg" alt="" style="width:100%"></div>
	<div class="btn"><a @click="kaifa">任务说明</a></div>
	<div style="height:20px"></div>
	</div>
</template>

<script>

    import Fetch from '../../utils/fetch'
    import {Swipe, SwipeItem} from "vant";
	import { Dialog, Overlay } from 'vant';

    export default {
        name: "index",
        components: {
            VanSwipe: Swipe,
            VanSwipeItem: SwipeItem,
        },
        
        created() {
            this.$parent.footer(false);
        },
        methods: {
		
		kaifa() {
      Dialog.alert({
        title: '任务说明',
        message: '截图海报分享到微信朋友圈2小时并获得10个点赞，即可联系在线客服领取100g水滴，每个用户每天限领一次。',
        showCancelButton: false,
        confirmButtonText: '确定',
      })
        .then(() => {
          // this.$router.push('/auth');
        })
        .catch(() => {});
      },
	  },
	  
    };
</script>

<style>
    .bg {
        background: #2f7b23;
     }
    .logo {
        width: 100%;
    }
	.btn {
			height: 43px;
			width: 60%;
			margin: 0 auto 14px auto;
            line-height: 43px;
            text-align: center;
            background: linear-gradient(0deg, #f5a414, #f7eb33);
            border-radius: 24px;
            font-size: 16px;
            font-weight: bold;
            color: #7b1506;
    }
	
</style>


