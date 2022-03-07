<template>
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data" :key="key">
      <div class="box">
        <div class="content">
          <!-- getXin.png getGua.png -->
          <div class="desc">
            <span>{{ fruitType[item.seed_id] }}</span>
          </div>
          <div class="time">{{ item.updated_at }}</div>
        </div>
        <div class="money">
          <span :style="{'color': statusColors[item.seed_status]}">{{ fruitStatus[item.seed_status] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';
import moment from 'moment';

export default {
  name: 'index',
  components: {},
  data() {
    return {
      fruitType: ['橙子', '苹果', '香蕉', '草莓', '芒果', '葡萄', '菠萝', '樱桃'],
      fruitStatus: ['种植申请未通过', '种植中', '任务成功', '任务失败', '水滴数达到'],
      statusColors: ['#FB8747', '#59BB4E', '#59BB4E', '#F9424B', '#999'],
      data: {},
      num: 10000,
      page: 1,
      columns: ['全部'],
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format('YYYY.MM.DD hh:mm');
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast('取消');
    },
    start() {
      Fetch('/home/PlantTreesList', { num: this.num, page: this.page }).then((res) => {
        this.data = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/common.less';
.boxFun {
  padding: 10px;
  background: #ffffff;
  margin: 10px auto;
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0 15px;
  }
}

.fund_wrap .table tr {
  width: 100%;
}

.fund_wrap .table .header {
  width: 100%;
  height: 34px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#666666),
    to(#262627)
  );
  background-image: -o-linear-gradient(left, #666666, #262627);
  background-image: linear-gradient(to right, #666666, #262627);
  border: 0;
}

.fund_wrap .table tr .first {
  border-radius: 10px 0 0 10px;
}

.fund_wrap .table tr .last {
  border-radius: 0 10px 10px 0;
  border: 0;
}

.fund_wrap .table tr th {
  font-size: 14px;
  color: #e8c27d;
  width: 33.333%;
  border-right: 1px solid #666666;
}

.fund_wrap .table .tab.tab_2 {
  border-left: 1px solid #7b7b7b;
  border-right: 1px solid #7b7b7b;
}

.fund_wrap .table {
  table-layout: fixed;
  width: 92%;
  margin: 15px auto;
}

.fund_wrap .table tbody tr {
  margin: 0 auto;
  border-bottom: 1px solid #ededed;
}

/*.fund_wrap .table tbody tr td:first-child {*/
/*    text-align: left;*/
/*}*/

/*.fund_wrap .table tbody tr td:last-child {*/
/*    text-align: left;*/
/*}*/

.fund_wrap .table tbody tr td {
  padding: 0 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 33.333%;
  text-align: center;
  font-size: 14px;
  line-height: 26px;
  padding-bottom: 10px;
  padding-top: 24px;
  color: #333333;
}

.fund_wrap .table tbody tr .td_3 {
  color: #dfba7b;
}
</style>
