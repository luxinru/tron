<template>
    <div class="abouts-container">
        <div class="abouts-back"></div>
        <!--<div style="text-align: center;"><img src="./images/abouts-001.jpg" alt="" style="display: block; width: 100%; margin: 0 auto 14px auto;"></div>-->
        <!--<div style="font-size:14px;padding:20px;line-height:22px;">-->
        <!--    是一款全网轻松好玩、简单时尚的经营休闲手游。在我的果园游戏里，用户可以种植果树、给果树浇水施肥，并收获自己的果实，另有丰富道具和多种玩法，让用户可以享受种植和收获的乐趣！-->
        <!--</div>-->
        <!--<div style="text-align: center;"><img src="./images/abouts-002.jpg" alt="" style="display: block; width: 100%; margin: 0 auto 14px auto;"></div>-->
    </div>
</template>

<script>
import Fetch from '../../utils/fetch';

export default {
    name: 'index',
    components: {},
    data() {
        return {
            data: {},
        };
    },
    created() {
        this.$parent.footer(true, 'tree');
    },
    mounted() {
        this.start();
    },
    methods: {
        start() {
            Fetch('/index/about').then((res) => {
                this.data = res.data.list;

                if (this.$parent.getFooterType() === 'n1') {
                    this.data = this.data.slice(7, this.data.length);
                }
                // console.log(this.data.slice(7,this.data.length))
            });
        },
        handleAboutJump(id) {
            this.$router.push({path: `/art/${id}`});
        },
    },
};
</script>

<style lang="less" scoped>
@import 'about';
.abouts-container {
    //padding-bottom: 20px;
    .abouts-back {
        height: 812px;
        background-image: url("./../../assets/images/huaguoyuan/abouts/abouts-1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
}
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
