<template>
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data.list" :key="key">
      <div class="time" >{{item.time}}</div>
      <div class="textBox">
          <!-- <div class="money" v-if="item.money =='18.00'" >{{ item.type == 1 ? "+" : "-" }}200</div> -->
          <div class="title">{{ item.reason }}</div>
          <div class="money">{{ item.type == 1 ? "+" : "-" }} {{item.money}}</div>
      </div>
      
      <!-- <div class="box">
        <div class="content">

          <div class="desc">
            <span>{{ item.reason }}</span>
          </div>
          <div class="time">{{ item.time }}</div>
        </div>
        <div class="money">
          <span :style="item.type == 2 ? 'color:#E85420' : 'color:#6AAF99'"
            >{{ item.type == 1 ? "+" : "-" }}{{ item.money }}</span
          >
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
import moment from "moment";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format("YYYY.MM.DD hh:mm");
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/user/funds").then((res) => {
        this.data = res.data;
        console.log(this.data);
        console.log('隔热',res)
      });
    },
  },
};
</script>

<style lang="less" scoped>
  @import './styles/mingxiItem';
</style>
