<template>
  <div class="detail-container">
    <div class="project-item-container">
      <div class="project-img-box">
        <img :src="data.thumb" alt="" />
      </div>
      <div class="project-info-warp">
        <div class="project-item-header">
          <div class="project-name">{{ data.title }}</div>
          <!-- <div class="project-number" v-if="data.type === 7">
            期限：{{ data.day }}小时
          </div>
          <div class="project-number" v-else>期限：{{ data.day }}天</div> -->
        </div>
        <!--<div class="project-progress-box">-->
        <!--    <div class="project-progress-wrap">-->
        <!--        <div class="project-progress" :style="schedule(data.schedule)">-->
        <!--            <div class="project-progress-icon"></div>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--    <div class="project-progress-value">{{data.schedule}}%</div>-->
        <!--</div>-->
        <div class="project-tag-box">
          <div class="project-tag-item">{{ data.type_name }}</div>
          <div class="project-tag-item">{{ data.min }}起投</div>
        </div>
        <div class="project-info-list">
          <div class="project-info-list-item">
            <div class="project-info-list-item-bottom one-bottom">
              {{ data.rate }} <span>%</span>
            </div>
            <div class="project-info-list-item-top" v-if="data.type === 7">
              小时利率
            </div>
            <div class="project-info-list-item-top" v-else>日利率</div>
          </div>
          <div class="project-info-list-item">
            <div class="project-info-list-item-bottom">
              {{ data.apr_money }} <span>元</span>
            </div>
            <div class="project-info-list-item-top" v-if="data.type === 7">
              每小时分红
            </div>
            <div class="project-info-list-item-top" v-else>每日分红</div>
          </div>
          <div class="project-info-list-item">
            <div class="project-info-list-item-bottom">
              {{ data.sun_apr_money }} <span>元</span>
            </div>
            <div class="project-info-list-item-top">总分红</div>
          </div>
        </div>
      </div>
    </div>

    <div class="project-other-info-box">
       <img v-if="data.thumb" :src="data.thumb" alt="" srcset="">
       <img v-if="data.thumb2" :src="data.thumb2" alt="" srcset="">
       <!-- <img v-if="data.thumb3" :src="data.thumb3" alt="" srcset="">
       <img v-if="data.thumb4" :src="data.thumb4" alt="" srcset="">
       <img v-if="data.thumb5" :src="data.thumb5" alt="" srcset=""> -->
    </div>

    <!-- <div class="project-rule-box">
      <div class="project-rule-item">
        <div class="project-rule-item-left one-icon"></div>
        <div class="project-rule-item-right">
          <div class="right-title">随时购买</div>
          <div class="right-sub-title">每个自然日都能买</div>
        </div>
      </div>
      <div class="project-rule-item">
        <div class="project-rule-item-left two-icon"></div>
        <div class="project-rule-item-right">
          <div class="right-title">灵活申赎</div>
          <div class="right-sub-title">T+0到账,项目到期后交易日内到账</div>
        </div>
      </div>
      <div class="project-rule-item">
        <div class="project-rule-item-left three-icon"></div>
        <div class="project-rule-item-right">
          <div class="right-title">安全保障</div>
          <div class="right-sub-title">平台资金由中国太平洋保险公司保障</div>
        </div>
      </div>
    </div> -->
    <!--产品详情-->
    <div class="project-investment-box">
      <div class="project-info-item-title">产品详情</div>
      <div class="project-investment-info-box">
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">项目名称</div>
          <div class="project-investment-info-item-right">{{ data.title }}</div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">项目总额</div>
          <div class="project-investment-info-item-right">
            {{ data.total }}万元人民币
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">每日分红</div>
          <div
            class="project-investment-info-item-right"
            v-if="data.type === 7"
          >
            按每小时{{ data.rate }}%的收益（保本保息）
          </div>
          <div class="project-investment-info-item-right" v-else>
            按每日{{ data.rate }}%的收益（保本保息）
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">项目期限</div>
          <div class="project-investment-info-item-right" v-if="data.type != 7">
            {{ data.day }}个自然日；（一个自然日为一天包含节假日）
          </div>
          <div class="project-investment-info-item-right" v-else>
            {{ data.day }}小时
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">开放时间</div>
          <div class="project-investment-info-item-right">{{ data.time }}</div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">收益计算</div>
          <div class="project-investment-info-item-right" v-if="data.type != 7">
            每日分红{{ data.apr_money }}元*{{ data.day }}天=总收益{{
              data.sun_apr_money
            }}元
          </div>
          <div class="project-investment-info-item-right" v-else>
            每小时分红{{ data.apr_money }}元*{{ data.day }}小时=总收益{{
              data.sun_apr_money
            }}元
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">分红方式</div>
          <div class="project-investment-info-item-right">
            {{ data.type_name }}
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">担保机构</div>
          <div class="project-investment-info-item-right">
            {{ data.guarantee }}
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">项目概述</div>
          <div class="project-investment-info-item-right" v-if="data.type != 7">
            本项目筹集资金{{ data.total }}万元人民币，投资本项目（按每日分红{{
              data.apr_money
            }}元/天）项目周期为{{
              data.day
            }}个自然日，所筹集资金用于该项目直投运作，作为投资者分红固定且无任何风险，所操作一切风险都由公司与担保公司一律承担，投资者不需要承担任何风险。
          </div>
          <div class="project-investment-info-item-right" v-else>
            本项目筹集资金{{ data.total }}万元人民币，投资本项目（按每小时分红{{
              data.apr_money
            }}元/小时）项目周期为{{
              data.day
            }}个小时，所筹集资金用于该项目直投运作，作为投资者分红固定且无任何风险，所操作一切风险都由公司与担保公司一律承担，投资者不需要承担任何风险。
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">安全保障</div>
          <div class="project-investment-info-item-right">
            {{
              data.guarantee
            }}对平台上的每一笔投资提供100%本金保障，平台设立风险备用金，对本金承诺全额垫付
          </div>
        </div>
        <div class="project-investment-info-item">
          <div class="project-investment-info-item-left">推荐奖励</div>
          <div class="project-investment-info-item-right">
            在会员中心最下面(邀请好友)转发到您朋友圈里,只要您朋友通过邀请二维码注册的为一级,充值并成功投资一次性还款项目,您就可以得到按投资金额{{
              data.invest1
            }}%的奖励,注册成功后，系统自动赠送 ！
          </div>
        </div>
      </div>
    </div>
    <!--发展规划-->
    <!-- <div class="project-other-info-box">
            <div class="project-info-item-title">发展规划</div>
            <div class="project-other-info-text">项目包括 “永不落幕的跨境红酒商贸中心”、世界名庄跨贸园、主题别墅酒店、葡萄种植体验区、康养中心等。世界名庄跨贸园包含26个独立的展示、办公、经营的场所，总地上建筑面积约为22000平方米。红酒产业商务商业区规划包括一片建筑面积为13,000平方米的世界名品跨贸园南区，由20多家代表法式生活艺术的葡萄酒店、食品店、装饰品店、酒吧、餐馆等。</div>
            <div class="project-other-info-img">

            </div>
        </div> -->
    <!--资金方案-->
    <!-- <div class="project-other-info-box">
            <div class="project-info-item-title">资金方案</div>
            <div class="project-other-info-text">项目总投资约257亿元，其中，资本金185亿元，占总投资的71.98%，由项目单位以企业资金出资；资本金以外的72亿元，采用银</div>
        </div> -->
    <!--施工方案-->
    <!-- <div class="project-other-info-box">
            <div class="project-info-item-title">施工方案</div>
            <div class="project-other-info-text">国际葡萄酒小镇一期项目位于房山区城关街道，总建筑面积28124.17平方米，其中地上建筑面积19705.26平方米，地下建筑面积8418.91平方米。工作室的设计遵循环境保护、因地制宜和可持续发展的原刚，同时充分融入法国的生活艺术、文化遗产和美食文化。</div>
            <div class="project-other-info-img">

            </div>
        </div> -->
    <!--市场优势-->
    <!-- <div class="project-other-info-box">
            <div class="project-info-item-title">市场优势</div>
            <div class="project-other-info-text">随着中国葡萄酒产业的发展，粗放式的葡萄酒文化建设已经不能满足市场的需求，葡萄酒小镇的建设是中国葡萄酒产业推行精细化种植，打造集生产、文化、旅游等为一体的综合性产业的需要，也响应了国家实施乡村振兴战略，促进农村一二三产业融合发展。</div>
            <div class="project-other-info-img">

            </div>
        </div> -->
    <!--本项目为什么要众筹-->
    <!-- <div class="project-other-info-box">
            <div class="project-info-item-title">本项目为什么要众筹</div>
            <div class="project-other-info-text">为了响应房山区政府旅游“国际化”的规划要求，搭建国内外葡萄酒双向交易平台，发挥桥梁纽带作用，推动国际商贸与文化交流，满足项目快速上线的工期需求，需要长（短）期社会资本（资源）投入，现面向全社会开启众筹，加速北京葡萄酒世界博览馆开发进度。</div>
        </div> -->
    <!--<div><iframe frameborder="0" height="300" :src="data.desc" width="100%"></iframe></div>-->
    <!--<div style="margin-top:-60px;"><img :src="data.thumb2" alt="" style="width:100%;"></div>-->
    <!--<div style="margin-top:20px;margin-bottom:20px;"><img :src="data.thumb3" alt="" style="width:100%;"></div>-->
    <!--投资按钮-->
    
    <div class="investment-btn" @click="handleInvestment">确认购买</div>
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
      id: 0,
      details: false,
      showInvestmentAction: false,
      passwd: "",
      money: "",
      imgPre: "",
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.id = this.$router.history.current.params.id;
    this.start();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    start() {
      setTimeout(() => {
        var element = document.getElementById("app");
        element.scrollIntoView();
      }, 0);
      Fetch("/index/item_view", { id: this.id }).then((res) => {
        console.log(res.data.view);
        this.data = res.data.view;
      });
    },

    getApply() {
      return "/item/apply/" + this.id;
    },
    // 立即投资
    handleInvestment() {
      this.$router.push({ name: "apply", params: { id: this.id } });
      // this.showInvestmentAction = true;
    },
    handleSubmit() {
      if (!this.money) {
        this.$notify("请输入投入金额");
        return;
      }

      if (!this.passwd) {
        this.$notify("请输入交易密码");
        return;
      }

      Fetch("/index/item_apply", {
        id: this.id,
        money: this.money,
        pwd: this.passwd,
      }).then(() => {
        this.$notify({
          background: "#07c160",
          message: "投资成功",
        });
        this.showInvestmentAction = false;
        this.start();
      });
    },
    show_detail() {
      this.details = !this.details;
    },
    gotop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      const timeTop = setInterval(() => {
        document.body.scrollTop =
          document.documentElement.scrollTop =
          top -=
            30;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ name: "resetpaypwd" });
    },
    schedule(schedule) {
      return {
        width: schedule + "%",
      };
    },
  },
};
</script>

<style lang="less" scoped>
@import "details";
</style>
