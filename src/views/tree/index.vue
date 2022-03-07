<template>	
	<div class="contant">
		<div class="top">
			<img src="../index/image/baoku-top.png" alt="">
			<div class="name">王者归来</div>
			<div class="tip"><span>LV2</span><span>成长值：456</span></div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';
	import Vue from 'vue';
	// import {
	// 	NoticeBar,
	// 	Dialog
	// } from 'vant';

	// Vue.use(NoticeBar);

	export default {
		name: "tree_index",
		data() {
			return {
				
			};
		},
		created() {
			// if (this.$parent.getFooterType() === 'n2') {
			// 	this.$router.replace('/user').catch(err => {err});
			// }
			this.$parent.footer(true, 'tree_index');
		},
		mounted() {
			// this.start();
		},
	
	};
</script>

<style lang="less">
	.contant{
		background: url(../../assets/images/home_bg.png) no-repeat;
		background-size: 100%;
		width: 375px;
		height: 667px;
	}
	#app {
		background-color: #f6f6f6;
	}
	.top{
		display: flex;
		align-items: center;
		.name{
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 20px;
			color: #000000;
		}
	}
</style>

