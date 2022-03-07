<template>
  <div class="page_root">
    <div class="header">
      <div class="head">
        <van-icon
          name="arrow-left"
          size="23"
          color="#000"
          @click="$router.back()"
        />
        {{ $t('team') }}
      </div>
    </div>

    <section class="level_box">
      <img src="@/assets/tron/Team_slices/3d9037c087e41cb26e0e35c9b2af4e76438441fc9ec35-QfBCUP.png" alt="">
      <div class="list">
        <div class="item">
          <span>{{ $t('lev') }} 1</span>
          <span>{{team.lev1}}</span>
        </div>
        <div class="item">
          <span>{{ $t('lev') }} 2</span>
          <span>{{team.lev2}}</span>
        </div>
        <div class="item">
          <span>{{ $t('lev') }} 3</span>
          <span>{{team.lev3}}</span>
        </div>
      </div>
    </section>
	<template v-for="item in data">
		<section class="info">
			  <div class="item">
				<span>{{ $t('date') }}</span>
				<span>{{item.time}}</span>
			  </div>
			  <div class="item">
				<span>{{ $t('amount') }}</span>
				<span>{{item.money}} TRX</span>
			  </div>
		</section>
	</template>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
export default {
  name: 'NewInvest',
  data() {
    return {
      active: 1,
	  data: {
		  
	  },
	  team:{}
    }
  },
  computed: {},
  created() {
    this.$parent.footer(false)
  },
  mounted() {
	  this.start();
  },
  methods: {
	  start() {
	      /* setTimeout(() => {
	        var element = document.getElementById("app");
	        element.scrollIntoView();
	      }, 0); */
	      Fetch("/user/my_team").then((res) => {
	  		this.team = res.data.team;
			this.data = res.data.data;
	      });
	  },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  background: rgba(248, 248, 250, 1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .level_box {
    width: 348px;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
    border-radius: 13px;
    padding: 24px 20px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 135px;
      height: 145px;
      margin-top: 20px;
    }

    .list {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 22px;

      .item {
        flex: 1 0;
        display: flex;
        flex-direction: column;

        span {
          font-size: 17px;
          font-family: Arial;
          font-weight: bold;
          color: #1E253C;
          display: flex;
          justify-content: center;

          &:first-child {
            width: 95px;
            height: 36px;
            background: rgba(97, 100, 232, 0.2);
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-family: Arial;
            font-weight: bold;
            color: #5E63E7;
            margin-bottom: 16px;
          }
        }
      }
    }
  }

  .info {
      width: 348px;
      height: 90px;
      background: #FFFFFF;
      box-shadow: 0px 6px 10px 0px rgba(19, 19, 20, 0.06);
      border-radius: 13px;
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 10px 0;
      box-sizing: border-box;

      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 22px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
      }
    }
}
</style>
