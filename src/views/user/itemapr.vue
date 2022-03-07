<template>
  <div class="investment-record-detail-container">

    <div class="header">
      <div class="head">
        <van-icon class="iconLeft" name="arrow-left" @click="$router.back()" />
        <span>投资详情</span>
        <div>
          <!-- <img class="question" src="./image/question.png" alt="" @click="handleGoBaoKugz"> -->
        </div>
      </div>
    </div>

    <div class="record-detail-header-box">
    </div>

    <section class="info_box">
      <div class="header-top">
        <div class="header-top-item">
          <span class="header-title">{{ data.money }}</span>
          <span class="header-time">投资金额(元)</span>
        </div>
        <div class="header-top-item">
          <span class="header-title">{{ data.apr_money }}</span>
          <span class="header-time">预计收益(元)</span>
        </div>
      </div>
      <div class="header-bottom">
        <div>投资时间: {{ data.addtime_date }}</div>
        <div>到期时间: {{ data.end_time_date }}</div>
      </div>
    </section>
    <div class="record-detail-list">
      <div class="record-detail-list-box">
        <div
          class="investment-list-box"
          v-for="item in data.apr_plan"
          :key="item.id"
        >
          <div class="investment-list-info-box">
            <div class="list-info-top">
              <div class="list-info-top-left">{{ item.title }}</div>
              <div class="project-tag">第{{ item.num }}期</div>
              <!-- <div class="list-info-top-right">
                
              </div> -->
            </div>
            <div class="investment-list-info">
              <!-- <div class="project-name-box">
                
                <div class="status-icon" v-if="item.status == 1"></div>
              </div> -->
              <div class="project-money">
                <div class="project-money-left">
                  <span>应收本金(元)</span>
                  <span>{{ item.money2 }}</span>
                </div>
              </div>
              <div class="project-money">
                <div class="project-money-left">
                  <span>应收利息(元)</span>
                  <span>{{ item.money2 }}</span>
                </div>
              </div>
            </div>
            <div class="footer">
              <div> 应收时间：{{ item.time1 }}</div>
              <span class="status">{{ item.time1Copy != "0000-00-00" ? item.time1Copy : "未完成" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="record-detail-list-box"> -->
    <!--<div class="record-detail-list-item" v-for="item in data.apr_plan" :key="item.id">-->
    <!--    <div class="top">-->
    <!--        <div class="top-num">第{{item.num}}期</div>-->
    <!--        <div class="top-title">{{ item.title }}</div>-->
    <!--    </div>-->
    <!--    <div class="middle">-->
    <!--        <p class="middle-time">应收时间:{{item.time1Copy}}</p>-->
    <!--        &lt;!&ndash;<p class="middle-status">{{item.status == 1 ? '已完成' : '未完成'}}</p>&ndash;&gt;-->
    <!--    </div>-->
    <!--    <div class="bottom">-->
    <!--        <div class="bottom-left">-->
    <!--            <p class="bottom-money">{{item.money2}}</p>-->
    <!--            <p class="bottom-title">应收本金(元)</p>-->
    <!--        </div>-->
    <!--        <div class="bottom-right">-->
    <!--            <p class="bottom-money">{{item.money2}}</p>-->
    <!--            <p class="bottom-title">应收利息(元)</p>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--    <div class="list-item-right">{{item.status == 1 ? '已完成' : '未完成'}}</div>-->
    <!-- <div class="list-item-box">
                <div class="list-item-left">期号</div>
                <div class="list-item-right">{{item.num}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">应收本金</div>
                <div class="list-item-right">{{item.money2}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">应收利息</div>
                <div class="list-item-right">{{item.money1}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">应收时间</div>
                <div class="list-item-right">{{item.time1Copy}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">收益时间</div>
                <div class="list-item-right">{{item.time1Copy != '0000-00-00' ? item.time1Copy : '未完成'}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">状态</div>
                <div class="list-item-right">{{item.status == 1 ? '已完成' : '未完成'}}</div>
            </div> -->
    <!--<div class="list-item-title">-->
    <!--    <div class="list-item-title-left">-->
    <!--        <div class="left-num">{{item.num}}</div>-->
    <!--    </div>-->
    <!--    <div class="list-item-title-right">{{item.status == 1 ? '已完成' : '未完成'}}</div>-->
    <!--</div>-->
    <!--<div class="list-item-info">-->
    <!--    <div>-->
    <!--        <div class="list-item-info-top topNum">{{item.money2}}</div>-->
    <!--        <div><span class="list-item-info-name littleBox">应收本金</span></div>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--        <div class="list-item-info-top"><span class="list-item-info-name">应收利息</span>{{item.money1}}</div>-->
    <!--        <div><span class="list-item-info-name">收益时间</span>{{item.time1Copy != '0000-00-00' ? item.time1Copy : '未完成'}}</div>-->
    <!--    </div>-->
    <!--</div>-->
    <!--<div class="bottom-name"><span >应收时间</span>{{item.time1Copy}}</div>-->
    <!--</div>-->
    <!-- </div> -->
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
      www: {},
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/interest", {
        id: this.$router.history.current.params.id,
      }).then((res) => {
        console.log(res.data);
        if (res.data && res.data.apr_plan && res.data.apr_plan.length) {
          res.data.apr_plan.forEach((item) => {
            item.time1Copy = item.time1 ? item.time1.split(" ")[0] : "";
            item.time2Copy = item.time1 ? item.time2.split(" ")[0] : "";
          });
        }
        this.data = res.data;
      });

      Fetch("/user/info").then((res) => {
        this.www = res.data; //res赋值

        console.log("个人信息", this.data); //接口内容打印
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "itemapr";
</style>
