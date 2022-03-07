<template>
  <!-- <div class="page">
        <div class="item" v-for="(item, key) in data.list" :key="key">
        
            <div class="left">
                <div class="top">
                    <span class="channel">{{getTitle(item.channel)}}</span>
                    <span class="status" :style="status(item.status)">{{item.status == '0' ? '待审核' : item.status=='1' ? '已审核' : '提现失败'}}</span>
                </div>
               
                <p class="time">{{item.time | dateFormat}}</p>
                <p v-if="item.reason" class="msg">{{item.reason}}</p>
            </div>
            <span class="money">{{item.money}}</span>
        </div>
        
    </div> -->
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data.list" :key="key">
      <div class="top">
        <div class="time">{{ item.time }}</div>
        <span class="status" :style="status(item.status)">{{
          item.status == '0' ? '待审' : item.status == '1' ? '已审' : '失败'
        }}</span>
      </div>
      <div class="bottom">
        <div class="title">{{ getTitle(item.channel) }}</div>
        <div class="money">
          {{ item.type == 1 ? '+' : '-' }}{{ item.money }}
        </div>
      </div>
      <div v-if="item.errMsg" class="msg">
        {{ item.errMsg }}
      </div>
      <!-- <div class="left">
        <div class="title">{{ getTitle(item.channel) }}</div>
        <span class="status" :style="status(item.status)">{{
          item.status == '0' ? '待审' : item.status == '1' ? '已审' : '失败'
        }}</span>
      </div>
      <div class="textBox">
        <div class="money">
          {{ item.type == 1 ? '+' : '-' }}{{ item.money }}
        </div>
        <div class="time">{{ item.time }}</div>
        <div v-if="item.errMsg" class="msg">
          <div>{{ item.errMsg }}</div>
        </div>
      </div> -->
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
      Fetch('/user/cash_record').then(res => {
        this.data = res.data
      })
    },
    status (v) {
      if (v == '0') {
        //待审
        return 'background: linear-gradient(-90deg, #3A81FF 0%, #68A0FC 100%);'
      }

      if (v == '1') {
        //已审核
        return 'background: linear-gradient(-90deg, #3AFF56 0%, #68FCF3 100%);'
      }

      if (v == '2') {
        //失败
        return 'background: linear-gradient(-90deg, #FF5F3A 0%, #FCB168 100%);'
      }
    },
    getTitle (channel) {
      return '提现至银行卡'
      // switch (channel) {
      //     case 0:
      //         return '提现至微信';
      //     case 1:
      //         return '提现至支付宝';
      //     case 2:
      //         return '提现至银行卡';
      //     case 3:
      //         return '微信转银行卡';
      // }
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
