<template>
  <!-- <div class="page"> -->
  <!-- <div class="item" v-for="(item, key) in data.list" :key="key"> -->
  <!-- <div class="color-line"></div> -->
  <!-- <div class="statusBox" :class="item.status == '1'?'statusB':item.status == '2'?'statusC':''">
                {{item.status == '0' ? '待审核' : item.status=='1' ? '已审核' : '失败'}}
            </div> -->
  <!-- <div class="type-icon" :class="'recharge_' + item.pay_type"></div> -->
  <!-- <div class="info">

                <div class="top">
                    <span class="channel">{{item.type}}</span>
                    <span :style="status(item.status)" class="status">{{item.status == '0' ? '待审核' : item.status=='1' ? '已审核' : '失败'}}</span>
                </div>
                <p class="time">{{item.time | dateFormat}}</p>
                
            </div>
            <span class="money">{{item.money}}</span> -->
  <!-- </div> -->

  <!-- </div> -->
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data.list" :key="key">
      <div class="top">
        <div class="time">{{ item.time }}</div>
        <span class="status" :style="status(item.status)">{{
          item.status == '0' ? '待审' : item.status == '1' ? '已审' : '失败'
        }}</span>
      </div>
      <div class="bottom">
        <div class="title">{{ item.type }}</div>
        <div class="money">
          {{ item.type == 1 ? '-' : '+' }}{{ item.money }}
        </div>
      </div>
      <div v-if="item.errMsg" class="msg">
        {{ item.errMsg }}
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import moment from 'moment'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.$parent.footer(false)
  },
  filters: {
    dateFormat (time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      Fetch('/user/recharge_record').then(res => {
        this.data = res.data
      })
    },
    status (v) {
      if (v == '0') {
        return 'background-color: #E1AF6A;'
      }

      if (v == '1') {
        return 'background-color: #0F79FF;'
      }

      if (v == '2') {
        return 'background-color: #E42612;'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './styles/cost';

// .fund_wrap .table tr {
//     width: 100%;
// }

// .fund_wrap .table .header {
//     width: 100%;
//     height: 34px;
//     background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
//     background-image: -o-linear-gradient(left, #666666, #262627);
//     background-image: linear-gradient(to right, #666666, #262627);
//     border: 0;
// }

// .fund_wrap .table tr .first {
//     border-radius: 10px 0 0 10px;
// }

// .fund_wrap .table tr .last {
//     border-radius: 0 10px 10px 0;
//     border: 0;
// }

// .fund_wrap .table tr th {
//     font-size: 14px;
//     color: #e8c27d;
//     width: 33.333%;
//     border-right: 1px solid #666666;
// }

// .fund_wrap .table .tab.tab_2 {
//     border-left: 1px solid #7B7B7B;
//     border-right: 1px solid #7B7B7B;
// }

// .fund_wrap .table {
//     table-layout: fixed;
//     width: 92%;
//     margin: 15px auto;
// }

// .fund_wrap .table tbody tr {
//     margin: 0 auto;
//     border-bottom: 1px solid #EDEDED;
// }

/*.fund_wrap .table tbody tr td:first-child {*/
/*    text-align: left;*/
/*}*/

/*.fund_wrap .table tbody tr td:last-child {*/
/*    text-align: left;*/
/*}*/

// .fund_wrap .table tbody tr td {
//     padding: 0 4px;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     width: 25%;
//     text-align: center;
//     font-size: 14px;
//     line-height: 26px;
//     padding-bottom: 10px;
//     padding-top: 24px;
//     color: #333333;
// }

// .fund_wrap .table tbody tr .td_3 {
//     color: #dfba7b;
// }
</style>
