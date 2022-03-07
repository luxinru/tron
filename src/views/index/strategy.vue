<template>
    <div class="bg">
        <div class="header">
            <div class="head">
                <router-link to="/home" class="back"></router-link>
                种树攻略
            </div>
        </div>

            <div class="content">
                <img src="./image/rule-001.jpg" width="100%" style="display:block;"/>
				<a href="https://yuguoyuan.oss-cn-beijing.aliyuncs.com/mp4/strategy.mp4"><img src="./image/rule-002.jpg" width="100%" style="display:block;"/></a>
				<img src="./image/rule-003.jpg" width="100%" style="display:block;"/>
            </div>            

    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'
    import {Swipe, SwipeItem} from "vant";

    export default {
        name: "index",
        components: {
            VanSwipe: Swipe,
            VanSwipeItem: SwipeItem,
        },
        data() {
            return {
                apr: '',
                days: '',
                type: 'A',
                money: '',
            };
        },
        created() {
            this.$parent.footer(false);
        },
        methods: {
            submit() {

                if (!this.money) {
                    this.$notify('请输入金额');
                    return;
                }

                if (!this.days) {
                    this.$notify('请输入天数');
                    return;
                }

                if (!this.apr) {
                    this.$notify('请输入利息');
                    return;
                }

                this.$router.replace({
                    path: 'cal_result',
                    query: {
                        money: this.money,
                        type: this.type,
                        days: this.days,
                        apr: this.apr
                    }
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .bg {
        height: 100%;
        width: 100%;

        .title {
            text-align: center;
            color: #e8c27d;
            font-size: 28px;
            padding: 50px 0 32px 0;

        }

        .form {
            width: 85.2%;
            margin: 0 auto 0 auto;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            position: relative;
            padding-top: 20px;
        }

        .form .content {
            padding: 1px 4.3% 20px 4.3%;
            background-color: #fff;
            border-radius: 6px;
            position: relative;
        }

        .form .item_box {
            margin-bottom: 22px;
            padding-top: 22px;
        }

        .form .item_box .item_title {
            width: 64px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 18px;

            color: #fff;
            font-size: 12px;
            background: #E8C27D;
        }

        .form .item_box .item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-bottom: 7px;
            border-bottom: 1px solid #edebeb;
            margin-top: 10px;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            font-size: 14px;

        }

        .form .item_box .item .inp {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            font-size: 14px;
            color: #544b5e;
            padding: 0 4px;
        }

        .form .item_box .item .right {
            display: inline-block;
            width: 20px;
            height: 20px;
            color: #999;

        }

        .form .content .ball {
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 24px;
            background: #544b5e;
            position: absolute;
        }

        .form .content .ball1 {
            left: -12px;
            top: 43.8%;
        }

        .form .content .ball2 {
            right: -12px;
            top: 43.8%;
        }

        .form .btn_box {
            margin-top: 35px;
            padding: 0 5.2%;
        }

        .form .btn_box .btn {
            width: 41.2%;
            height: 40px;
            line-height: 40px;
            border-radius: 40px;
            text-align: center;

            font-size: 18px;
        }

        .form .btn_box .btn1 {
            float: left;
            background: #e8c27d;
            color: #333;
        }

        .form .btn_box .btn2 {
            float: right;
            background: #8b8b8b;
            color: #fff;
        }
    }
</style>


