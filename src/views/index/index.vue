<template>
  <div class="index-container">
    <div class="header-cont">
      <div class="header-cont-number">{{ data.integral || 0 }}</div>
      <div class="header-cont-text">我的积分</div>
    </div>
    <!-- <div class="index-title">做任务领红包</div> -->
    <div class="task-list-box">
      <div class="task-list-item">
        <div class="task-list-item-left">
          <div class="item-icon icon-1"></div>
          <div class="item-title-box">
            <div class="item-title">每日签到</div>
            <div class="item-sub-title">领取2元红包</div>
          </div>
        </div>
        <div
          class="task-list-item-right"
          :class="{ 'active-btn': mission.qiandao_status }"
          @click="checkin2()"
        >
          {{ mission.qiandao_status ? '已完成' : '做任务' }}
        </div>
      </div>

      <div class="task-list-item">
        <div class="task-list-item-left">
          <div class="item-icon icon-2"></div>
          <div class="item-title-box">
            <div class="item-title">邀请好友</div>
            <div class="item-sub-title">互得现金红包</div>
          </div>
        </div>
        <div
          class="task-list-item-right"
          :class="{ 'active-btn': mission.invest_status == true }"
          @click="handleTaskListItem(1)"
        >
          {{ mission.invest_status == true ? '已完成' : '做任务' }}
        </div>
      </div>
      <!--
				<div class="task-list-item-bank"><img src="./../../assets/images/qianhai/task/line.png" width=100% /></div>
				<div class="task-list-item">
					<div class="task-list-item-left">
						<div class="left-icon left-icon-one"></div>
						<div class="left-info">
							<div class="left-info-top">邀请好友</div>
							<div class="left-info-bottom">
								<div class="left-info-bottom-info">获得好友投资的<br>1~3%返点</div>
							</div>
						</div>
					</div>
					<div class="task-list-item-right">
						<div class="right-btn" :class="{'active-btn': mission.invest_status == true}" @click="handleTaskListItem(1)">{{mission.invest_status == true ? '任务完成' : '去做任务'}}</div>
					</div>
				</div>
				<div class="task-list-item-bank"><img src="./../../assets/images/qianhai/task/line.png" width=100% /></div>
				<div class="task-list-item">
					<div class="task-list-item-left">
						<div class="left-icon left-icon-two"></div>
						<div class="left-info">
							<div class="left-info-top">存入宝库</div>
							<div class="left-info-bottom">
								<div class="left-info-bottom-info">每日自动生息<br>额外+2元 +8积分</div>
							</div>
						</div>
					</div>
					<div class="task-list-item-right">
						<div class="right-btn" :class="{'active-btn': mission.yue_bao_status == true}" @click="handleTaskListItem(2)">{{mission.yue_bao_status == true ? '任务完成' : '去做任务'}}</div>
					</div>
				</div>
				-->
      <!-- <div class="task-list-item-bank"><img src="./../../assets/images/qianhai/task/line.png" width=100% /></div> -->

      <div class="task-list-item" v-if="footer_type === 'n2'">
        <div class="task-list-item-left">
          <div class="item-icon icon-3"></div>
          <div class="item-title-box">
            <div class="item-title">存入宝库</div>
            <div class="item-sub-title">灵活存取收益高</div>
          </div>
        </div>
        <div
          class="task-list-item-right"
          :class="{ 'active-btn': mission.yue_bao_status == true }"
          @click="handleTaskListItem(2)"
        >
          {{ mission.yue_bao_status == true ? '已完成' : '做任务' }}
        </div>
      </div>

      <div class="task-list-item">
        <div class="task-list-item-left">
          <div class="item-icon icon-4"></div>
          <div class="item-title-box">
            <div class="item-title">新人认证</div>
            <div class="item-sub-title">领取5元红包</div>
          </div>
        </div>
        <div
          class="task-list-item-right"
          :class="{ 'active-btn': mission.auth_status == true }"
          @click="handleTaskListItem(3)"
        >
          {{ mission.auth_status == true ? '已完成' : '做任务' }}
        </div>
      </div>

      <div class="task-list-item" v-if="footer_type === 'n2'">
        <div class="task-list-item-left">
          <div class="item-icon icon-5"></div>
          <div class="item-title-box">
            <div class="item-title">参与投资</div>
            <div class="item-sub-title">返利丰厚</div>
          </div>
        </div>
        <div class="task-list-item-right" @click="handleTaskListItem(4)">
          做任务
        </div>
      </div>

      <div class="task-list-item">
        <div class="task-list-item-left">
          <div class="item-icon icon-6"></div>
          <div class="item-title-box">
            <div class="item-title">趣味答题</div>
            <div class="item-sub-title">海量红包疯狂送</div>
          </div>
        </div>
        <div
          class="task-list-item-right"
          :class="{ 'active-btn': mission.answer_status }"
          @click="handleTaskListItem(7)"
        >
          {{ mission.answer_status ? '已完成' : '做任务' }}
        </div>
      </div>
      <!--
				<div class="task-list-item-bank"><img src="./../../assets/images/qianhai/task/line.png" width=100% /></div>
				<div class="task-list-item">
					<div class="task-list-item-left">
						<div class="left-icon left-icon-four"></div>
						<div class="left-info">
							<div class="left-info-top">参与投资</div>
							<div class="left-info-bottom">
								<div class="left-info-bottom-info">送大额积分<br>参与金额*项目比例</div>
							</div>
						</div>
					</div>
					<div class="task-list-item-right">
						<div class="right-btn" @click="handleTaskListItem(4)">去做任务</div>
					</div>
				</div>
				-->
      <!-- <div class="task-list-item-bank"><img src="./../../assets/images/qianhai/task/line.png" width=100% /></div>
				<div class="task-list-item">
					<div class="task-list-item-left">
						<div class="left-icon left-icon-five"></div>
						<div class="left-info">
							<div class="left-info-top">思维提升</div>
							<div class="left-info-bottom">
								<div class="left-info-bottom-info">+20~200积分</div>
							</div>
						</div>
					</div>
					<div class="task-list-item-right">
						<div class="right-btn" :class="{'active-btn': mission.answer_status == true}" @click="handleTaskListItem(5)">{{mission.answer_status == true ? '任务完成' : '去做任务'}}</div>
					</div>
				</div>
				<div class="task-list-item-bank"><img src="./../../assets/images/qianhai/task/line.png" width=100% /></div>
				<div class="task-list-item">
					<div class="task-list-item-left">
						<div class="left-icon left-icon-seven"></div>
						<div class="left-info">
							<div class="left-info-top">运动加油站</div>
							<div class="left-info-bottom">
								<div class="left-info-bottom-info">+20~200积分</div>
							</div>
						</div>
					</div>
					<div class="task-list-item-right">
						<div class="right-btn" :class="{'active-btn': mission.answer_status == true}" @click="handleTaskListItem(6)">{{mission.answer_status == true ? '任务完成' : '去做任务'}}</div>
					</div>
				</div> -->
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
// import { Dialog } from 'vant'
export default {
  name: 'info',
  data () {
    return {
      data: {},
      footer_type: 'n1',
      mission: {},
      signInList: [
        { id: 1, name: '周一', isSignIn: true },
        { id: 2, name: '周二', isSignIn: true },
        { id: 3, name: '周三', isSignIn: true },
        { id: 4, name: '周四', isSignIn: false },
        { id: 5, name: '周五', isSignIn: false },
        { id: 6, name: '周六', isSignIn: false },
        { id: 7, name: '周日', isSignIn: false }
      ]
    }
  },
  created () {
    // if (this.$parent.getFooterType() === 'n2') {
    // 	this.$router.replace('/user');
    // }
    this.$parent.footer(true, 'mission')

    var type = localStorage.getItem('footer')
    if (type) {
      this.footer_type = type
    }
  },
  mounted () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.start()
  },
  methods: {
    dati () {
      Fetch('/index/getAnswer').then(() => {
        this.$router.replace('/exam')
      })
    },
    checkin2 () {
      this.$router.push('/qiandao')

      // Fetch('/user/sign').then(res => {
      //   if (res.data.coss == 1) {
      //     Dialog.alert({
      //       title: '提示',
      //       message: res.info,
      //       showCancelButton: true,
      //       confirmButtonText: '去认证'
      //     })
      //       .then(() => {
      //         this.$router.push('/auth')
      //       })
      //       .catch(() => {})
      //   } else {
      //     this.sign_money = res.data.reward
      //     this.new_sign_ok = true
      //     this.$notify({
      //       background: '#07c160',
      //       message: '签到成功：已获得现金2元和8积分！'
      //     })
      //   }
      // })
    },
    start () {
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      Fetch('/user/info').then(res => {
        this.data = res.data
      })

      Fetch('/index/getStstusAll').then(res => {
        this.mission = res.data
        console.log(this.mission)
      })
    },
    logout () {
      this.$parent.setFooterType('n1')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
    handleTaskListItem (type = 1) {
      switch (type) {
        case 1:
          if (this.mission && this.mission.invest_status == false) {
            this.$router.push({ name: 'share' })
          }
          break
        case 2:
          if (this.mission && this.mission.yue_bao_status == false) {
            this.$router.push({ name: 'baoku' })
          }
          break
        case 3:
          if (this.mission && this.mission.auth_status == false) {
            this.$router.push({ name: 'auth' })
          }
          break
        case 4:
          this.$router.push({ name: 'item' })
          break
        case 5:
          this.$router.push({ name: 'start' })
          break
        case 6:
          this.$router.push({ name: 'sport_event' })
          break
        case 7:
          // this.$router.push({name: 'question_type'});
          this.$router.push({ name: 'wenjuan' })

          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import 'mission';
</style>
