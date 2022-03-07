<template>
  <!--<div>-->
  <!--    <div class="headerBox" >-->
  <!--        <img src="@/assets/icons/logo.png" alt="">-->
  <!--        <p>当前版本1.01</p>-->
  <!--    </div>-->
  <!--    <div class="mainBox">-->
  <!--        <div class="main">-->
  <!--            <router-link :to="'/art/' + item.id" class="item clearfix" v-for="(item, key) in data" :key="key">-->
  <!--                &lt;!&ndash; <span class="icon icon ico_notice"></span> &ndash;&gt;-->
  <!--                <span class="info">{{item.title}}</span>-->
  <!--                <span class="right"></span>-->
  <!--            </router-link>-->
  <!--        </div>-->
  <!--    </div>-->
  <!--</div>-->
  <div class="about-container">
    <div class="about-header">
      <!-- <div class="about-header-icon"></div> -->
      <img src="@/assets/xinguang/图层 523@2x.png" class="logo" />
      <!-- <div class="about-header-version">当前版本1.01</div> -->
    </div>
    <div class="about-list-box">
      <div
        class="about-list-item"
        v-for="(item, key) in data"
        :key="key"
        @click="handleAboutJump(item.id)"
      >
        <div>{{ item.title }}</div>
        <div><van-icon name="arrow" size="18" color="#C3C3C6" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.$parent.footer(true, 'tree')
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      Fetch('/index/about').then(res => {
        console.log(res.data)
        this.data = res.data.list
        // if (this.$parent.getFooterType() === "n1") {
        // this.data = this.data.splice(7,this.data.length)
        // this.data = this.data.splice(7,"")
        // }
        // console.log(this.data.slice(7,this.data.length))
      })
    },
    handleAboutJump (id) {
      this.$router.push({ path: `/art/${id}` })
    }
  }
}
</script>

<style lang="less" scoped>
@import 'about';
/*.headerBox{*/
/*    text-align: center;*/
/*    padding-top: 32px;*/
/*    img{*/
/*        width: 69px;*/
/*        height: 69px;*/
/*        border-radius: 20px;*/
/*    }*/
/*    p{*/
/*        font-size: 15px;*/
/*        font-family: PingFang SC;*/
/*        font-weight: 400;*/
/*        color: #000000;*/
/*        margin-top: 20px;*/
/*    }*/
/*}*/
/*.mainBox{*/
/*    margin-top: 24px;*/
/*}*/
/*.main {*/
/*   height: 50px;*/
/*   padding: 0 12px;*/
/*}*/

/*html,*/
/*body {*/
/*    background: #ededed;*/
/*}*/

/*.top {*/
/*    padding: 22px;*/
/*    background: #554b5f;*/

/*}*/

/*.top .title {*/
/*    width: 55.4%;*/
/*    margin: 0 auto;*/
/*    height: 35px;*/
/*    line-height: 35px;*/
/*    text-align: center;*/
/*    color: #333333;*/
/*    font-size: 18px;*/
/*    background: #e8c27d;*/
/*    border-radius: 35px;*/
/*}*/

/*.main .item {*/
/*    display: block;*/
/*    height: 56px;*/
/*    line-height: 56px;*/
/*    border-bottom: 1px solid #dcdcdc;*/
/*    font-size: 15px;*/
/*    font-family: PingFang SC;*/
/*    font-weight: 400;*/
/*    color: #000000;*/
/*}*/

/*.main .item_last {*/
/*    border: none;*/
/*}*/

/*.main .item .icon {*/
/*    float: left;*/
/*    width: 18px;*/
/*    height: 18px;*/
/*    background-repeat: no-repeat;*/
/*    background-position: center;*/
/*    background-size: contain;*/
/*    margin-right: 5px;*/

/*}*/

/*.main .item .ico_notice {*/
/*    background-image: url(images/more_icon_notice.png);*/

/*}*/

/*.main .item .ico_company {*/
/*    background-image: url(images/more_icon_company.png);*/

/*}*/

/*.main .item .ico_user {*/
/*    background-image: url(images/more_icon_user.png);*/

/*}*/

/*.main .item .ico_safe {*/
/*    background-image: url(images/more_icon_safe.png);*/

/*}*/

/*.main .item .ico_tel {*/
/*    background-image: url(images/more_icon_tel.png);*/

/*}*/

/*.main .item .ico_photo {*/
/*    background-image: url(images/more_icon_photo.png);*/

/*}*/

/*.main .item .ico_pay {*/
/*    background-image: url(images/more_icon_pay.png);*/

/*}*/

/*.main .item .ico_help {*/
/*    background-image: url(images/more_icon_help.png);*/

/*}*/

/*.main .item .info {*/
/*    float: left;*/

/*}*/

/*.main .item .right {*/
/*    float: right;*/
/*    width: 6px;*/
/*    height: 18px;*/
/*    background-repeat: no-repeat;*/
/*    background-position: center;*/
/*    background-size: contain;*/
/*    background-image: url(images/more_right.png);*/
/*    margin-right: 5px;*/
/*    margin-top: 22px;*/

/*}*/
</style>
