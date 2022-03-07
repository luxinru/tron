<template>
    <div class="goods-detail-container">
        <div class="goods-img-box">
            <img :src="image" alt="">
        </div>
        <div class="goods-info-box">
            <div class="goods-info">
                <div class="goods-integral"><span>{{integral}}</span>积分</div>
                <div class="goods-name">{{title}}</div>
            </div>
        </div>
        <div class="goods_d_content" v-html="content" style="padding:20px;"></div>
        <div class="dh-btn-box">
            <div class="dh-btn">立即兑换</div>
        </div>
        <!--<div class="play">-->
        <!--    <div class="num-s">-->
        <!--        剩余：{{ num }} 件-->
        <!--    </div>-->
        <!--    <div class="integral-s">-->
        <!--        积分：<span style="color: red;">{{ integral }} </span>-->
        <!--    </div>-->
        <!--    <div class="dh_btns" @click="$router.back()">返回列表中兑换</div>-->
        <!--</div>-->
    </div>
</template>

<script>
import Fetch from '../../utils/fetch';

export default {
    name: 'shop',
    components: {},
    data() {
        return {
            title: '',
            content: '',
            num: '',
            image: '',
            integral: '',
        };
    },
    created() {
        this.$parent.footer(false);
    },
    mounted() {
        Fetch('/index/goods_detail', {
            id: this.$router.history.current.params.id,
        }).then(res => {
            this.title = res.data.title;
            this.image = res.data.img;
            this.content = res.data.content;
            this.num = res.data.num;
            this.integral = res.data.integral;
        });
    },
    methods: {
        start() {
            Fetch('/user/info').then(res => {
                this.mydata = res.data;
            });
            // 兑换信息
            Fetch('/index/goods_list').then(res => {

                this.category_data = res.data;
                for (var i = 0; i < res.data.category.length; i++) {
                    this.dh_num.push([]);
                    for (var j = 0; j < res.data.category[i].list.length; j++) {
                        this.dh_num[i].push(1);
                    }
                    ;
                }
                ;
                if (res.data.exchange_rules.content || res.data.exchange_rules.title) {
                    this.rule_msg = res.data.exchange_rules.content || res.data.exchange_rules.title;
                }
            });

        },
        category_btn(id, num) {
            Fetch('/index/shop_exchange', {
                gid: id,
                num: num,
            }).then((res) => {
                this.$notify({
                    background: '#07c160',
                    message: res.info,
                });
                this.start();
            });
        },
    },
};
</script>

<style scoped lang="less">
.goods-detail-container {
    height: 100%;
    background-color: #F5F5F5;
    .goods-img-box {
        height: 306px;
        text-align: center;
        > img {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
    .goods-info-box {
        padding: 12px 13px;
        .goods-info {
            background: #FFFFFF;
            border-radius: 7px;
            padding: 18px 17px;
            .goods-integral {
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                > span {
                    padding-right: 5px;
                    font-size: 20px;
                    font-family: DIN Alternate;
                    font-weight: bold;
                    color: #FD4A28;
                }
            }
            .goods-name {
                font-size: 17px;
                font-weight: bold;
                color: #333333;
                line-height: 18px;
                padding-top: 13px;
            }
        }
    }
    .dh-btn-box {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 19px 43px;
        background: #FFFFFF;
        .dh-btn {
            height: 44px;
            line-height: 44px;
            text-align: center;
            background: #0F79FF;
            border-radius: 22px;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
}

.goods_d_content {
    margin-top: 3vw;

}

.line {
    width: 100%;
    text-align: center;
    margin: 1px 0;
    padding: 4vw 0;
    line-height: 7vw;
    font-size: 4.5vw;
    font-weight: 700;
    height: 15vw;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    background-color: #FFFFFF;
}

.play {
    box-shadow: 0px -1px 5px rgba(89, 125, 172, .4);
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 3.5vw;
    background-color: #FFFFFF;
}

.dh_btns {
    position: relative;
    float: right;
    width: 43%;
    height: 13vw;
    text-align: center;
    line-height: 13vw;
    color: #FFFFFF;
    background-color: #e54d42;
}

.num-s {
    position: relative;
    float: left;
    left: 3vw;
    top: 4vw;
}

.integral-s {
    position: relative;
    float: left;
    left: 6vw;
    top: 4vw;
}
</style>
