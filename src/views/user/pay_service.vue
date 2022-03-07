<template>
	<div class="kefu_v" id="iframe-box">
		<iframe :src="data.kefu_link" id="ifram"></iframe>
		<!-- <webview id="ifram" :src="data.kefu_link" ></webview> -->
		<!-- <div style="position:absolute;top:-1000px;left:-1000px;"><a href="http://www.365webchat.com/">Online customer Service Software</a></div><script type='text/javascript' src='http://www.365webcall.com/IMMe2.aspx?settings=mw7mm0mmI76XmXz3AI60Ibz3Am0IXNz3A66mmm0&LL=0'></script><div style="position:absolute;top:-1100px;left:-1100px;"><a href="http://www.365webchat.com/">Online Customer service System</a></div> -->
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'

	export default {
		name: "index",
		components: {},
		data() {
			return {
				data: {}
			};
		},
		created() {
			this.$parent.footer(true, 'kefu');
		},
		mounted() {
			this.start();
		},
		methods: {
			start() {
				Fetch("/user/recharge_type", {
					type: this.$route.query.type,
					money: this.$route.query.money
				}).then(res => {
					this.data = res.data;
					//Hbuilder
					if (0 < navigator.userAgent.indexOf("Html5Plus")) {
						var ua = plus.navigator.getUserAgent()
						var isHiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
						if (isHiOS) {
							var w = plus.webview.create(this.data.kefu_link, 'kefu', {}, null);
							let bitmap_menu = new plus.nativeObj.Bitmap("closedmenu");

							bitmap_menu.loadBase64Data(
								"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAA4CAYAAABuQ6+nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYTRlMjlkMC05YWM3LThmNDQtYWI4Yi1iYmNlNzIxNmRiZjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQwNzk3RDk1NTFFMTFFOThFN0NBOUY2MDY2OTQxQkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQwNzk3RDg1NTFFMTFFOThFN0NBOUY2MDY2OTQxQkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjExQTg5NzYzQjRDMTFFOTkzNkJDQjJCOEEzNTI5MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjExQTg5NzczQjRDMTFFOTkzNkJDQjJCOEEzNTI5MDMiLz4gPC9yZGY6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"
							)

							w.setStyle({
								'zindex': 30,
								'titleNView': false,
							})
							let leftPos = (window.screen.width - 80) + 'px';

							var view = new plus.nativeObj.View('webViewClose', {
								top: '40px',
								left: leftPos,
								width: "57px",
								height: "39px"
							});

							view.drawBitmap(bitmap_menu, {
								top: "0",
								left: "0",
								width: "82px",
								height: "56px"
							})

							view.interceptTouchEvent(true);
							view.addEventListener("click", function(e) {

								w.close()
								view.close()
								plus.navigator.setFullscreen(false);
								location.href = "https://" + location.host+'/#/home'

							}.bind(this));

							w.evalJS(
								"plus.key.addEventListener('backbutton',function () {})"
							);
							// 显示窗口
							w.show(); 
							// 显示关闭
							view.show();

						}
					}
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	.kefu_v {
		position: fixed;
		width: 100%;
		height: 100%;
		-webkit-overflow-scrolling: touch;
		overflow-y: scroll;

		iframe {
			padding-bottom: 55px;
			width: 100%;
			height: 100%;
		}
	}

	.kefu {
		width: 90px;
		height: 90px;
		position: fixed;
		z-index: 10;
		right: 13px;
		bottom: 120px;
		transition: all 1s;
		opacity: 1;
		transform: translateX(0);

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
