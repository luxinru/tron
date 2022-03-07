<template>
	
    <div class="my-index-container">
        <div class="my-index-header">
            <!--<div class="my-index-header-top">-->
            <!--    <div class="notification_box" >-->
            <!--        <van-notice-bar @click="handleUSernnotice" v-if="data.is_new_notice" background="#0F79FF" mode="link" color="#ffffff" left-icon="volume-o" text="您有新的系统消息."></van-notice-bar>-->
            <!--    </div>-->
            <!--    <div class="line-service-box"><div class="line-service-icon" @click="handleMyService('kefu')"></div></div>-->
            <!--</div>-->
            <div class="my-index-header-info">
                <div class="my-index-header-info-left">
                    <div class="user-icon"></div>
                    <div class="info-left-right">
                        <div class="user-name">{{ data.mobile }}</div>
                        <div class="user-vip">
                        
                            <template  v-if="data.is_auth == 0">
                                <span @click="handleUSerCertification"></span>
                            </template>
                            
                            <template v-else>
                                <i class="vip-icon"></i>
                                <span class="vip-name">{{ data.vip_name }}</span>

                                 <!-- <div class="cheng"><i class=".cheng-icon"></i>  成长值：{{www.value}} </div> -->
                            </template>
                               
                        </div>
                    </div>
                </div>
                <div class="my-index-header-info-right">
                    <div class="line-service-icon" @click="handleMyService('kefu')"></div>
                </div>
            </div>
            <div class="my-user-info-list" style="margin: auto;">
                <div class="my-user-info-list-item" @click="$router.push('/funds')" style="margin: auto;">
                    <div class="item-num">{{data.money}}</div>
                    <div class="item-name">账户余额</div>
                </div>
                <!-- <div class="my-user-info-list-item">
                    <div class="item-num">{{data.ds_money}}</div>
                    <div class="item-name">待收本金</div>
                </div> -->
              <!--  <div class="my-user-info-list-item">
                    <div class="item-num">{{data.ds_apr_money}}</div>
                    <div class="item-name">待收利息</div>
                </div> -->
                <!--<div class="my-user-info-list-item">-->
                <!--    <div class="item-num">{{data.value}}</div>-->
                <!--    <div class="item-name">成长值</div>-->
                <!--</div>-->
                <div class="my-user-info-list-item" @click="$router.push('/integral')" style="margin: auto;">
                    <div class="item-num">{{data.integral}}</div>
                    <div class="item-name">我的积分</div>
                </div>
            </div>
        </div>
        <!--<div style="margin-top:-20px; margin-left:20px;font-size:14px;padding-bottom:10px;">您当前级别：{{ data.vip_name }}</div>-->
        <div class="my-assets-content">
            <!--账号信息-->
            <!--<div class="my-user-info-box">-->
            <!--    <div class="my-user-info-left">-->
            <!--        <div class="my-user-info-top">-->
            <!--            <div class="my-user-info-top-item" @click="$router.push('/funds')">-->
            <!--                <div class="my-user-info-top-item-title">账户余额</div>-->
            <!--                <div class="my-user-info-top-item-number">{{ data.money }}</div>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--    <div class="my-user-info-right">-->
            <!--        <div class="user-icon"></div>-->
            <!--        <div class="user-name">{{ data.mobile }}</div>-->
            <!--        <div class="user-vip">-->
            <!--            <template  v-if="data.is_auth !== 1">-->
            <!--                <span @click="handleUSerCertification">实名认证</span>-->
            <!--            </template>-->
            <!--            <template v-else>-->
            <!--                <i class="vip-icon"></i>-->
            <!--                <span class="vip-name">{{ data.vip_name }}</span>-->
            <!--            </template>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--</div>-->
			<div class="my-user-info-bottom">
			<!-- 	<div class="my-user-info-bottom-btn">
                    <div class="bottom-btn-text" @click="handleRecharge"><span>充值</span> <van-icon name="arrow" size="18" color="#9E6644"/></div>
                    <div class="bottom-btn-icon"></div>
                </div> -->
				<div class="my-user-info-bottom-btn two-btn">
                    <div class="bottom-btn-text" @click="handleWithdraw"><span>提现</span> <van-icon name="arrow" size="18" color="#9E6644"/></div>
                    <div class="bottom-btn-icon"></div>
                </div>
			</div>
            <div class="my-user-record-list">
                <div class="my-user-record-list-title">个人记录</div>
                <div class="my-user-record-list-info">
                   <!-- <div class="list-info-item" @click="handleMyService('invest')">
                        <div class="list-info-item-icon one-icon"></div>
                        <div class="list-info-item-text">充值记录</div>
                    </div>
                    <div class="list-info-item" @click="handleMyService('cost')">
                        <div class="list-info-item-icon two-icon"></div>
                        <div class="list-info-item-text">提现记录</div>
                    </div>
                    <div class="list-info-item" @click="handleMyService('touzi')">
                        <div class="list-info-item-icon three-icon"></div>
                        <div class="list-info-item-text">投资记录</div>
                    </div> -->
                    <div class="list-info-item" @click="handleMyService('funds')">
                        <div class="list-info-item-icon four-icon"></div>
                        <div class="list-info-item-text">资金明细</div>
                    </div>
                </div>
            </div>
            <!--菜单列表-->
            <div class="my-menu-list-box">
                <div class="my-menu-list-title">基础功能</div>
                <div class="my-menu-list-item-box">
                    <template v-for="(item, index) in infoListOne">
                        <div class="my-menu-list-item" :key="item.key" @click="handleMyService(item.key)">
                            <div class="my-menu-list-item-icon" :style="item.style">
                                <img :src="require(`./../../assets/images/shufeng/my/my-list-1-${index + 1}.png`)" alt=""/>
                            </div>
                            <div class="my-menu-list-item-text">{{ item.name }}</div>
                        </div>
                    </template>
                </div>
                <div class="my-menu-list-item-box">
                    <template v-for="(item, index) in infoListTwo">
                        <div class="my-menu-list-item" :key="item.key" @click="handleMyService(item.key)">
                            <div class="my-menu-list-item-icon" :style="item.style">
                                <img :src="require(`./../../assets/images/shufeng/my/my-list-2-${index + 1}.png`)" alt=""/>
                            </div>
                            <div class="my-menu-list-item-text">{{ item.name }}</div>
                        </div>
                    </template>
					<template v-for="(item, index) in infoListThree">
                        <div class="my-menu-list-item" :key="item.key" @click="logout(item.key)">
                            <div class="my-menu-list-item-icon" :style="item.style">
                                <img :src="require(`./../../assets/images/shufeng/my/my-list-3-${index + 1}.png`)" alt=""/>
                            </div>
                            <div class="my-menu-list-item-text">{{ item.name }}</div>
                        </div>
                    </template>
                </div>
                <div class="my-menu-list-item-box">
                    
                </div>
            </div>
            <!--<div class="my-menu-list-box">-->
            <!--    <template v-for="(item, index) in infoListTwo">-->
            <!--        <div class="my-menu-list-item" :key="item.key" @click="handleMyService(item.key)">-->
            <!--            <div class="my-menu-list-item-left">-->
            <!--                <div class="my-menu-list-item-left-icon" :style="item.style">-->
            <!--                    <img :src="require(`./../../assets/images/shufeng/my/my-list-2-${index + 1}.png`)" alt=""/>-->
            <!--                </div>-->
            <!--                <div class="my-menu-list-item-left-text" :style="{'padding-left': (38 - parseInt(item.style.width) + 'px')}">{{ item.name }}</div>-->
            <!--            </div>-->
            <!--            <div class="my-menu-list-item-right">-->
            <!--                <div v-if="item.subTitle" class="right-text">{{item.subTitle}}</div>-->
            <!--                <div><van-icon name="arrow" size="18" color="#ADADAD" /></div>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </template>-->
            <!--</div>-->
            <!--<div class="my-menu-list-box">-->
            <!--    <template v-for="(item, index) in infoListThree">-->
            <!--        <div class="my-menu-list-item" :key="item.key" @click="handleMyService(item.key)">-->
            <!--            <div class="my-menu-list-item-left">-->
            <!--                <div class="my-menu-list-item-left-icon" :style="item.style">-->
            <!--                    <img :src="require(`./../../assets/images/shufeng/my/my-list-3-${index + 1}.png`)" alt=""/>-->
            <!--                </div>-->
            <!--                <div class="my-menu-list-item-left-text" :style="{'padding-left': (38 - parseInt(item.style.width) + 'px')}">{{ item.name }}</div>-->
            <!--            </div>-->
            <!--            <div class="my-menu-list-item-right">-->
            <!--                <div v-if="item.subTitle" class="right-text">{{item.subTitle}}</div>-->
            <!--                <div><van-icon name="arrow" size="18" color="#ADADAD" /></div>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </template>-->
            <!--</div>-->
            <!--<div class="my-menu-list-box">-->
            <!--    <template v-for="(item, index) in infoListFour">-->
            <!--        <div class="my-menu-list-item" :key="item.key" @click="handleMyService(item.key)">-->
            <!--            <div class="my-menu-list-item-left">-->
            <!--                <div class="my-menu-list-item-left-icon" :style="item.style">-->
            <!--                    <img :src="require(`./../../assets/images/shufeng/my/my-list-4-${index + 1}.png`)" alt=""/>-->
            <!--                </div>-->
            <!--                <div class="my-menu-list-item-left-text" :style="{'padding-left': (38 - parseInt(item.style.width) + 'px')}">{{ item.name }}</div>-->
            <!--            </div>-->
            <!--            <div class="my-menu-list-item-right">-->
            <!--                <div v-if="item.subTitle" class="right-text">{{item.subTitle}}</div>-->
            <!--                <div><van-icon name="arrow" size="18" color="#ADADAD" /></div>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </template>-->
            <!--</div>-->
            <!--<div class="my-menu-list-box">-->
            <!--    <template v-for="(item, index) in infoListFive">-->
            <!--        <div class="my-menu-list-item" :key="item.key" @click="logout(item.key)">-->
            <!--            <div class="my-menu-list-item-left">-->
            <!--                <div class="my-menu-list-item-left-icon" :style="item.style">-->
            <!--                    <img :src="require(`./../../assets/images/shufeng/my/my-list-5-${index + 1}.png`)" alt=""/>-->
            <!--                </div>-->
            <!--                <div class="my-menu-list-item-left-text" :style="{'padding-left': (38 - parseInt(item.style.width) + 'px')}">{{ item.name }}</div>-->
            <!--            </div>-->
            <!--            <div class="my-menu-list-item-right">-->
            <!--                <div v-if="item.subTitle" class="right-text">{{item.subTitle}}</div>-->
            <!--                <div><van-icon name="arrow" size="18" color="#ADADAD" /></div>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </template>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
	import Fetch from '../../utils/fetch';
	import Vue from 'vue';
	import {
		NoticeBar
	} from 'vant';

	Vue.use(NoticeBar);

	export default {
		name: "user",
		data() {
			return {
                www:[],
				data: {},
				/* 待删除 */
				bg: '',
                
				config: {},
				/* 待删除 */
                infoListOne: [
                    {key: 'notice', name: '站内消息',  style: {width: '39px', height: '39px'}},
                    {key: 'share', name: '邀请好友', subTitle: '邀请好友获得奖励', style: {width: '39px', height: '39px'}},
                    {key: 'account', name: '账户信息', subTitle: '修改登陆密码和支付密码', style: {width: '39px', height: '39px'}},
                    // {key: 'about', name: '关于我们', style: {width: '39px', height: '39px'}},
                ],
                infoListTwo: [
                    {key: 'quanbao', name: '优惠券', subTitle: '7张', style: {width: '39px', height: '39px'}},
                    // {key: 'baoku', name: '我的宝库',  style: {width: '39px', height: '39px'}},
                    {key: 'protocol', name: '服务协议', style: {width: '39px', height: '39px'}},
                    {key: 'privacy', name: '隐私协议', style: {width: '39px', height: '39px'}},
                ],
                infoListThree: [
                    { key: 'logout', name: '退出登录', style: {width: '39px', height: '39px'}},
                ],
                infoListFour: [
                    {key: 'invest', name: '充值记录', style: {width: '20px', height: '18px'}},
                    {key: 'cost', name: '提现记录', style: {width: '16px', height: '16px'}},
                    {key: 'touzi', name: '投资记录', style: {width: '18px', height: '15px'}},
                    {key: 'funds', name: '资金明细', style: {width: '15px', height: '15px'}},
                ],
                infoListFive: [
                    { key: 'logout', name: '退出登录', style: {width: '16px', height: '16px'}},
                ],
                infoListOther: [
                    {key: 'order', name: '商城订单', style: {width: '14px', height: '16px'}},
                    {key: 'plantTree', name: '种树记录', style: {width: '16px', height: '17px'}},
                    {key: 'shuidi', name: '水滴记录', style: {width: '12px', height: '18px'}},
                    {key: 'strategy', name: '种树攻略', style: {width: '14px', height: '17px'}},
                    {key: 'auth', name: '实名认证', style: {width: '17px', height: '17 px'}},
                    {key: 'alipay', name: '绑定支付宝', style: {width: '15px', height: '15px'}},
                    {key: 'qiandao', name: '签到礼品', style: {width: '16px', height: '14px'}},
                    { key: 'help', name: '帮助中心', style: {width: '18px', height: '18px'}},
                ],
			};
		},
		created() {
			if (this.$parent.getFooterType() === 'n2') {
				this.$router.replace('/user').catch(err => {err});
			}
			this.$parent.footer(true, 'info');
		},
		mounted() {
			this.start();
		},
		methods: {
			start() {
				// 修复个别手机不能滚动到顶端
				setTimeout(() => {
					var element = document.getElementById("app");
					element.scrollIntoView();
				}, 0)
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				Fetch('/user/info').then(res => {
                    this.data = res.data;//res赋值
					this.www = res.data;//res赋值
                    
					console.log('个人信息',this.data)//接口内容打印
				})
				/* 待删除 */
				Fetch('/index/webconfig', {
					type: 'bg'
				}).then(res => {
					this.bg = 'url("' + res.data.login + '")';
				})
				Fetch('/index/webconfig', {
					type: 'web'
				}).then(res => {
                    console.log('未知',res)
					this.config = res.data
				})
				/* 待删除 */
			},
			logout() {
				this.$parent.setFooterType('n1');
				localStorage.removeItem('token');
				this.$router.replace('/login');
			},
			// 实名认证
			handleUSerCertification() {
				this.$router.push({name: 'auth'});
			},
			// 站内信
			handleUSernnotice() {
				this.$router.push({name: 'notice'});
			},
			// 设置
			handleSetting() {
				// auth
				this.$router.push({name: 'account'});
			},
			// 查看明细
			handleGoFunds() {
				this.$router.push({name: 'funds'});
			},
			// 充值
			handleRecharge() {
				this.$router.push({name: 'recharge'});
			},
			// 提现
			handleWithdraw() {
				this.$router.push({name: 'cash'});
			},
			// 我的服务跳转
			handleMyService(name) {
			    if (name === 'protocol') {
			        this.handleGoProtocol(1);
			        return;
			    }
                if (name === 'privacy') {
                    this.handleGoProtocol(2);
                    return;
                }
			    this.$router.push({name: name});
			},
			// 协议
			handleGoProtocol(type) {
				if (type === 1) {
					this.$router.push({path: this.config.user_contract_link});
				}
				if (type === 2) {
					this.$router.push({path: this.config.user_contract_ys_link});
				}
			},
		}
	};
</script>
<style lang="less" scoped>
	@import "index2";
</style>
