<template>
    <div class="item-container">
        <div class="item-header">
            <div class="item-notice">
                <van-notice-bar left-icon="volume-o" background="#ffffff" color="#ffffff" :text="horn_msg"></van-notice-bar>
            </div>
            <div class="item-header-swipe">
                <div class="bannerSwp">
                    <van-swipe @change="onChange" :autoplay="5000">
                        <van-swipe-item v-for="(image, index) in banner" :key="index">
                            <a :href="image.url"><img style="width: 100%; height: 100%; border-radius: 7px" :src="image.thumb"/></a>
                        </van-swipe-item>
                        <div ref="dian" class="custom-indicator" slot="indicator">
                            <div v-for="(img, x) in banner" :key="x" :class="x == 0 ? 'selected' : ''"></div>
                        </div>
                    </van-swipe>
                </div>
            </div>
        </div>
        <!--<div>-->
        <!--    <video-player-->
        <!--        class="video-player vjs-custom-skin"-->
        <!--        ref="videoPlayer"-->
        <!--        :playsinline="true"-->
        <!--        :options="playerOptions"-->
        <!--    ></video-player>-->
        <!--</div>-->
        <div class="item-content-box">
            <!-- <div class="item-menu-list-box">
                <div class="list-item-box">
                    <div class="list-item-hint">领2元</div>
                    <div class="list-item" @click="handleTreeListItemClick(1)">
                        <div class="list-item-icon one-icon"></div>
                        <div class="list-item-text">每日签到</div>
                    </div>
                </div>
                <div class="list-item-box">
                    <div class="list-item-hint">赢积分</div>
                    <div class="list-item" @click="handleTreeListItemClick(4)">
                        <div class="list-item-icon two-icon"></div>
                        <div class="list-item-text">看图猜谜</div>
                    </div>
                </div>
                <div class="list-item-box">
                    <div class="list-item-hint">分红包</div>
                    <div class="list-item" @click="handleTreeListItemClick(11)">
                        <div class="list-item-icon three-icon"></div>
                        <div class="list-item-text">邀请好友</div>
                    </div>
                </div>
                <div class="list-item-box">
                    <div class="list-item">
                        <div class="list-item-icon four-icon"></div>
                        <div class="list-item-text">每日福利</div>
                    </div>
                </div>
                <div class="list-item-box">
                    <div class="list-item" @click="handleTreeListItemClick(3)">
                        <div class="list-item-icon five-icon"></div>
                        <div class="list-item-text">运动打卡</div>
                    </div>
                </div>
            </div> -->
            <div class="item-advertise-box">
                <div class="item-advertise-back" @click="handleTreeListItemClick(8)"></div>
            </div>
            <div class="item-list-box">
                <!--<div class="project-item-container">-->
                <!--    <div class="project-item-header">-->
                <!--        <div class="project-name">VIP会员专享活动日项目</div>-->
                <!--        <div class="project-number">期限：30天</div>-->
                <!--    </div>-->
                <!--    <div class="project-tag-box">-->
                <!--        <div class="project-tag-item">每日复利、保本保息</div>-->
                <!--        <div class="project-tag-item">5000起投</div>-->
                <!--    </div>-->
                <!--    <div class="project-info-list">-->
                <!--        <div class="project-info-list-item">-->
                <!--            <div class="project-info-list-item-top">日利率</div>-->
                <!--            <div class="project-info-list-item-bottom one-bottom">1.57%</div>-->
                <!--        </div>-->
                <!--        <div class="project-info-list-item">-->
                <!--            <div class="project-info-list-item-top">每日分红(元)</div>-->
                <!--            <div class="project-info-list-item-bottom">5000</div>-->
                <!--        </div>-->
                <!--        <div class="project-info-list-item">-->
                <!--            <div class="project-info-list-item-top">总分红(元)</div>-->
                <!--            <div class="project-info-list-item-bottom">20000</div>-->
                <!--        </div>-->
                <!--    </div>-->
                <!--    <div class="project-progress-box">-->
                <!--        <div class="project-progress" style="width: 40%;"></div>-->
                <!--    </div>-->
                <!--    <div class="project-footer">-->
                <!--        <div class="project-img-box"></div>-->
                <!--        <div class="project-btn-box">-->
                <!--            <div class="project-size-name">项目规模</div>-->
                <!--            <div class="project-size">800.00万元</div>-->
                <!--            <div class="project-btn">立即投资</div>-->
                <!--        </div>-->
                <!--    </div>-->
                <!--</div>-->
                <template v-for="item in list">
                    <div :key="item.id" @click="goToDetail(item.id)">
                        <InvestItem :invest-info="item"></InvestItem>
                    </div>
                </template>
                <!--<van-tabs-->
                <!--    style="margin-top: 10px"-->
                <!--    v-model="active"-->
                <!--    animated-->
                <!--    offset-top="140px"-->
                <!--    color="#59BB4E"-->
                <!--    title-active-color="#59BB4E"-->
                <!--    @click="filterList"-->
                <!--&gt;-->
                <!--    <van-tab v-for="item in tabStatus" :title="item" :key="item">-->
                <!--        <div class="item-list-box">-->
                <!--            <div-->
                <!--                class="item-list-info"-->
                <!--                v-for="item in list"-->
                <!--                @click="goToDetail(item.id)"-->
                <!--                :key="item.id"-->
                <!--            >-->
                <!--                <InvestItem :invest-info="item"/>-->
                <!--            </div>-->
                <!--        </div>-->
                <!--    </van-tab>-->
                <!--</van-tabs>-->
            </div>
        </div>
    </div>
</template>

<script>
import Fetch from '../../utils/fetch';
import InvestItem from './compoents/InvestItem';
import {videoPlayer} from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import {Dialog, Swipe, SwipeItem} from 'vant';

export default {
    name: 'index',
    components: {
        VanSwipe: Swipe,
        VanSwipeItem: SwipeItem,
        InvestItem,
        // videoPlayer,
    },
    data() {
        return {
            playerOptions: {
                // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        src: 'https://rcguanjia.com/mp4/zhufu.mp4', // 路径
                        type: 'video/mp4', // 类型
                    },
                ],
                // poster: "https://www.njmbttd.com/upload/dongli.jpg", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true, //全屏按钮
                },
            },
            list: [],
            data: {list: []},
            down_show: true,
            link_width: 0,
            banner: [],
            notice: '',
            links: [],
            ad: {},
            ad_show: false,
            horn_msg: '',
            horn_block: false,
            notice_num: 1,
            currentRate: 0,
            active: 0,
            tabStatus: ['正在进行', '已完成'],
        };
    },
    created() {
        this.$parent.footer(true, 'touzi');
    },
    mounted() {
        this.start();
    },
    methods: {
        onChange(index) {
            let els = this.$refs.dian.querySelectorAll('div');
            for (let i = 0; i < els.length; i++) {
                els[i].className = '';
            }
            els[index].className = 'selected';
        },
        start() {
            // 修复个别手机不能滚动到顶端
            setTimeout(() => {
                var element = document.getElementById('app');
                element.scrollIntoView();
            }, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            Fetch('/index/item').then((res) => {
                this.data = res.data;
                this.filterList();
            });

            Fetch('/index/banner_activity', {
                type: 'banner',
            }).then((res) => {
                this.banner = res.data;
            });

            Fetch('/index/home').then((res) => {
                // 首页公告 图标
                if (res.data.notice && this.notice_num == 1) {
                    this.notice_num = 2;
                    var that = this;
                    this.horn_block = true;
                    this.horn_msg = res.data.notice;
                    // setTimeout(function() {
                    // 	that.move();
                    // }, 1000);
                }
            });
        },
        // schedule(schedule) {
        // 	return {
        // 		width: schedule + '%'
        // 	};
        // },
        filterList() {
            if (this.active) {
                this.list = this.data.list.filter((item) => item.schedule === 100);
            } else {
                this.list = this.data.list.filter((item) => item.schedule < 100);
            }
        },
        goToDetail(id) {
            // this.$router.replace('/item/' + id);
            this.$router.push('/item/' + id);
        },
        move() {
            var m_l = 50;
            var width = document.getElementById('horn_go1').getBoundingClientRect()
                .width;
            var box = document.getElementById('horn_go1');
            var box2 = document.getElementById('horn_go2');
            box2.style.left = width + m_l + 'px';
            box2.style.display = 'block';
            var distance = 10;
            var distance2 = m_l + width;
            // 设置位移
            setInterval(function () {
                distance = distance - 1;
                distance2 = distance2 - 1;
                // 如果位移超过文字宽度，则回到起点
                if (-distance >= width + m_l) {
                    distance = width + m_l;
                }
                if (-distance2 >= width + m_l) {
                    distance2 = width + m_l;
                }
                box.style.left = distance + 'px';
                box2.style.left = distance2 + 'px';
            }, 40);
        },
        schedule_left(schedule) {
            if (schedule > 80) {
                return {
                    left: schedule - 30 + '%',
                    color: '#fff',
                };
            } else {
                return {
                    left: schedule.slice(0, 5) + '%',
                };
            }
        },
        checkin2() {
            Fetch('/user/sign').then((res) => {
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
                }else{
                    this.sign_money = res.data.reward;
                    this.new_sign_ok = true;
                    this.$notify({
                        background: '#07c160',
                        message: '签到成功：已获得现金2元和8积分！'
                    });
                }
            })
        },
        handleTreeListItemClick(type = 1) {
            switch (type) {
                case 1:
                    this.checkin2();
                    break;
                case 2:
                    this.$router.push({name: 'scratch_card'});
                    break;
                case 3:
                    this.$router.push({name: 'sport_event'});
                    break;
                case 4:
                    this.$router.push({name: 'start'});
                    break;
                case 5:
                    this.$router.push({name: 'prize'});
                    break;
                case 6:
                    this.$router.push({name: 'goods'});
                    break;
                case 7:
                    this.$router.push({name: 'item'});
                    break;
                case 8:
                    this.$router.push({name: 'baoku'});
                    break;
                case 9:
                    this.$router.push({name: 'qiandao'});
                    break;
                case 10:
                    this.$router.push({name: 'alipay'});
                    break;
                case 11:
                    this.$router.push({name: 'share'});
                    break;
            }
        }
    },
};
</script>

<style lang="less" scoped>
@import "index";
/*.horn_box {*/
/*	width: 76.8%;*/
/*	height: 26px;*/
/*	background: rgba(255, 255, 255, 0.26);*/
/*	border-radius: 13px;*/
/*	// position: absolute;*/
/*	line-height: 26px;*/
/*	font-size: 12px;*/
/*	padding-left: 39px;*/

/*	.horn_icon {*/
/*		display: block;*/
/*		float: left;*/
/*		width: 19px;*/
/*		height: 19px;*/
/*		// position: absolute;*/
/*		left: 6px;*/
/*		top: 4px;*/
/*		background: url(../index/image/home/horn.png) no-repeat center center;*/
/*		background-size: 100% 100%;*/
/*	}*/

/*	.horn_tips {*/
/*		width: 95%;*/
/*		white-space: nowrap;*/
/*		height: 26px;*/
/*		overflow: hidden;*/
/*		line-height: 26px;*/
/*		position: relative;*/

/*		.horn_go {*/
/*			left: 0;*/
/*			position: absolute;*/
/*			top: 0;*/
/*		}*/
/*	}*/
/*}*/

/*.item_body .head {*/
/*	background: #fff;*/
/*	color: #212121;*/
/*	box-shadow: 0 0.0625rem 0.15625rem #eee;*/
/*	-webkit-box-shadow: 0 0.0625rem 0.15625rem #eee;*/
/*	-ms-box-shadow: 0 .0625rem .15625rem #eee;*/
/*}*/

/*.top {*/
/*	padding: 30px 0 24px 0;*/
/*	background: #544b5e;*/
/*}*/

/*.outer_wrap {*/
/*	margin-bottom: 40px;*/
/*	padding: 5px 0px 15px 0;*/
/*}*/

/*.pro_wrap {*/
/*	width: 100%;*/
/*	position: relative;*/
/*	height: 17px;*/
/*	line-height: 17px;*/
/*	margin-top: 10px;*/
/*}*/

/*.top .title {*/
/*	width: 55.4%;*/
/*	height: 36px;*/
/*	line-height: 36px;*/
/*	border-radius: 36px;*/
/*	background: #e8c27d;*/
/*	margin: 0 auto;*/
/*	text-align: center;*/
/*	color: #333333;*/
/*	font-size: 18px;*/
/*}*/

/*.mt0 {*/
/*	position: relative;*/
/*	background: #fff;*/
/*	box-shadow: 0.03125rem 0.125rem 0.34375rem 0.03125rem rgba(0, 0, 0, 0.09);*/
/*	border-radius: 0.15625rem;*/
/*	overflow: hidden;*/
/*	width: 90.66%;*/
/*	margin: 0 auto;*/
/*	padding-bottom: 0.21875rem;*/
/*	margin-top: 0.4375rem;*/
/*}*/

/*.mt0 .img_box {*/

/*	//padding-bottom: 38px;*/
/*}*/

/*.mt0 .img_box img {*/
/*	width: 100%;*/
/*	max-width: 100%;*/
/*}*/

/*.img_info {*/
/*	background-color: #0f51a0;*/
/*	color: #fff;*/
/*	line-height: 38px;*/
/*	border-radius: 3px;*/
/*	text-align: center;*/
/*	height: 38px;*/
/*	!* background-color: bisque; *!*/
/*	width: 100%;*/
/*	font-weight: 700;*/
/*	font-size: 13px;*/
/*}*/

/*.mt0 .mt0_intro {*/
/*	padding: 5px;*/
/*	width: 100%;*/
/*	color: #999;*/
/*	font-size: 12px;*/
/*	line-height: 12px;*/
/*	overflow: hidden;*/
/*	text-overflow: ellipsis;*/
/*	display: -webkit-box;*/
/*	-webkit-box-orient: vertical;*/
/*	-webkit-line-clamp: 3;*/
/*}*/

/*.mt0 .mt0_detail {*/
/*	padding-left: 5px;*/
/*	margin: .25rem 0 .15rem 0;*/
/*	font-size: 12px;*/
/*	color: #D2A775;*/

/*}*/

/*.mt0 .mt0_detail .mt0_detail_item {*/
/*	background: rgba(239, 239, 239, 1);*/
/*	padding: 0 .2rem;*/
/*	border-radius: 3px;*/
/*	font-size: 12px;*/
/*	line-height: 18px;*/
/*	margin-right: 4px;*/

/*}*/

/*.mt0 .mt0_type {*/
/*	padding-left: 5px;*/
/*	color: #999;*/
/*	font-size: 12px;*/
/*	line-height: 17px;*/
/*	margin-top: 3px;*/

/*}*/

/*.mt0 .process {*/
/*	background: #3960e81c;*/
/*	border: 1px solid #2bb8ee78;*/
/*	width: 80%;*/
/*	height: 17px;*/
/*	line-height: 17px;*/
/*	border-radius: 1rem;*/
/*	display: inline-block;*/
/*	overflow: hidden;*/
/*	position: absolute;*/
/*	top: 0;*/
/*	left: 0;*/
/*}*/

/*.mt0 .process .percent_box {*/
/*	-webkit-box-flex: 1;*/
/*	-ms-flex: 1;*/
/*	flex: 1;*/
/*	height: 15px;*/
/*	border-radius: 8px;*/
/*	border: 1px solid #e8c27d;*/
/*	background: #e2e2e2;*/
/*}*/

/*.mt0 .process .percent {*/
/*	height: 100%;*/
/*	background: linear-gradient(270deg, #40a4f2 0%, #3d67e8 100%);*/
/*}*/

/*.percent_num {*/
/*	position: absolute;*/
/*	top: 0;*/
/*	left: 80%;*/
/*	line-height: 17px;*/
/*	color: #3582b3;*/
/*	margin-left: 10px;*/
/*	font-size: 14px;*/
/*}*/

/*@media (max-width: 360px) {*/
/*	.mt0 .img_box .img_info {*/
/*		font-size: 18px;*/
/*	}*/

/*	.mt0 .mt0_type {*/
/*		text-indent: 16px;*/
/*	}*/
/*}*/

/*@media (min-width: 400px) {*/
/*	.mt0 .img_box .img_info {*/

/*		bottom: 8px;*/
/*	}*/
/*}*/

/*.bannerSwp {*/

/*	width: 100%;*/
/*	max-width: 100%;*/
/*	min-height: 100px;*/

/*	.van-swipe {*/
/*		width: 100%;*/

/*		.van-swipe-item {*/
/*			img {*/
/*				width: 100%;*/
/*				max-height: 150px;*/
/*			}*/
/*		}*/

/*		.custom-indicator {*/
/*			position: absolute;*/
/*			left: 50%;*/
/*			bottom: 5px;*/
/*			padding: 2px 5px;*/
/*			color: #fff;*/
/*			font-size: 12px;*/
/*			background: rgba(0, 0, 0, 0.1);*/

/*			div {*/
/*				display: inline-block;*/
/*				margin: 0 2px;*/
/*				width: 0.1rem;*/
/*				height: 0.13rem;*/
/*				vertical-align: middle;*/
/*				background: #ddd;*/
/*				cursor: pointer;*/
/*				!*border-radius: 50%;*!*/
/*				!*-webkit-border-radius: 50%;*!*/
/*				transform: skewX(-29deg);*/
/*			}*/

/*			.selected {*/
/*				width: 0.3rem;*/
/*				background: #3582b3;*/
/*			}*/
/*		}*/
/*	}*/
/*}*/
</style>
