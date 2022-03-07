<template>
  <div class="investment-container">
    <div class="investment-list-box" v-for="item in data" :key="item.id">

      <div class="investment-list-info">
        <div class="project-name">
          {{ item.apr_plan[0].title }}
          <div class="project-tag-box">
            <div class="project-tag">每日复利、保本保息</div>
            <van-icon
              name="arrow"
              size="16"
              color="RGBA(254, 111, 0, 1)"
              @click="handleGoDetail(item)"
            />
          </div>
        </div>
        <div class="project-money">
          <div class="item">
            <div class="item_box">
              <span class="label">投资金额(元)</span>
              <span class="value">{{ item.money }}</span>
            </div>
            <div class="item_box">
              <span class="label">预计收益(元)</span>
              <span class="value">{{ item.apr_money }}</span>
            </div>
          </div>
          <span class="btn" @click="handleGocontract(item)">合同查询</span>
        </div>
      </div>
    </div>
    <!-- <div class="investment-list-box"> -->
    <!--<div v-for="item in data" :key="item.id" class="investment-list-item" @click="handleGoDetail(item)">-->
    <!--	&lt;!&ndash;<div class="investment-date-box">&ndash;&gt;-->
    <!--	&lt;!&ndash;	<div class="investment-date-left">投资时间：{{item.addtime_date}}</div>&ndash;&gt;-->
    <!--	&lt;!&ndash;	<div>到期时间：{{item.end_time_date}}</div>&ndash;&gt;-->
    <!--	&lt;!&ndash;</div>&ndash;&gt;-->
    <!--	<div class="top">-->
    <!--		<p class="title">{{item.apr_plan[0].title}}</p>-->
    <!--		&lt;!&ndash; <p class="type">第{{item.num}}期</p> &ndash;&gt;-->
    <!--	</div>-->
    <!--	<div class="bottom">-->
    <!--		<div>-->
    <!--			<p class="info-money">{{item.money}}</p>-->
    <!--			<p class="info-title">投资金额(元)</p>-->
    <!--		</div>-->
    <!--		<div>-->
    <!--			<p class="info-money">{{item.apr_money}}</p>-->
    <!--			<p class="info-title">预计收益(元)</p>-->
    <!--		</div>-->
    <!--		<div class="investment-btns" @click.stop="handleGocontract(item)">合同</div>-->
    <!--	</div>-->
    <!-- <div class="investment-list-item">
				<div class="list-info-title">
					<div class="project-name">{{item.apr_plan[0].title}}</div>
					<div class="list-info-title-sub" @click="handleGoDetail(item)">详情<van-icon name="arrow" size="18" color="#fff" style="margin-left: 9px;vertical-align: middle;"/></div>
				</div>
				<div class="project-info">
					<div class="project-info-left">
						<div class="project-info-left-bottom">预期收益</div>
						<div class="project-info-left-top">{{item.apr_money}}<span class="info-unit">元</span></div>
					</div>
					<div class="project-info-left" style="margin-left: 49px;">
						<div class="project-info-left-bottom">投资金额</div>
						<div class="project-info-left-top">{{item.money}}<span class="info-unit">元</span></div>
					</div>
				</div>
				<div class="investment-btn-box">
					<div class="investment-btn-tag">{{item.type_name}}</div>
					<div class="investment-btns" @click="handleGocontract(item)">合同</div>
				</div>
			</div> -->
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
      data_detail: [],
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
      Fetch("/user/invest").then((res) => {
        this.data = res.data;
        console.log("返回", this.data);
        var data_d = [];
        for (let data in this.data.list) {
          let rid = this.data.list[data].id;
          Fetch("/index/interest", {
            id: this.data.list[data].id,
          }).then((res1) => {
            res1.data["id"] = rid;
            data_d.push(res1.data);
          });
        }
        this.data = data_d;
        console.log("this.data", this.data);
      });
    },
    // 详情
    handleGoDetail(item) {
      this.$router.push({ name: "itemapr", params: { id: item.id } });
    },
    // 合同
    handleGocontract(item) {
      this.$router.push({ name: "contract", params: { id: item.id } });
    },
  },
};
</script>

<style lang="less" scoped>
@import "touzi";
</style>
