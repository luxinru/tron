<template>
  <div>
    <div class="main3">
      <img class="my-sp-bg" src="./images/hgy/shiping_bg.png" alt="" />
      <p class="my-sp-title">看广告 领水滴</p>
      <div class="videoBox">
        <!-- <div class="maskBox">御果园广告合作商</div> -->
        <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :webkit-playsinline="true"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @timeupdate="onPlayerTimeupdate($event)"
        >
        </video-player>
      </div>
	  <div v-if="videoData.download !== ''">
      <van-button
        class="btn down"
        round
        size="small"
        @click="downFun"
 >
        {{videoData.miaoshu}}
      </van-button>
	  </div>
      <van-button
        class="btn my-d"
        round
        size="small"
        :color="videoPlayer.load === 'ended' ? '#59BB4E' : '#ff621d'"
        @click="handleSubmit"
      >
        {{ videoPlayer.load === 'play' ? `观看${videoPlayer.times}s后可领取水滴` : videoPlayer.text }}
      </van-button>

      <div class="bottom-tips">
        <p>视频有礼规则:</p>
        <p>·广告播放完毕即可领取水滴奖励</p>
        <p>·系统随机播放广告</p>
        <p>·相同广告每天限领一次</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import { Dialog } from 'vant';

export default {
  name: 'index',
  components: { videoPlayer },
  data() {
    return {
      playerOptions: {
        height: '240',
        autoplay: false,
        muted: false,
        language: 'zh-CN',
        fullScreen: {
          navigationUI: 'hide'
        },
        sources: [
          {
            type: 'video/mp4',
            src: '',
          },
        ],
        poster: '',
      },
      videoData: {},
      videoPlayer: {
        load: 'wait',
        times: 0,
        finish: false,
        text: '开始播放'
      }
    };
  },
  created() {
    this.$parent.footer(false)
  },
  methods: {
    //点击下载
    downFun(){
		window.location.href = this.videoData.download;
		
		console.log("这里是点击下载函数")
    },
    // listen event
    onPlayerPlay() {
      this.videoPlayer.load = 'play'
    },
    onPlayerPause() {
      this.videoPlayer.load = 'wait'
      this.videoPlayer.text = '开始播放'
    },
    onPlayerEnded() {
      if (!this.videoPlayer.finish) {
        this.videoPlayer.text = '领取水滴'
        this.videoPlayer.load = 'ended'
      } else {
        this.videoPlayer.text = '开始播放'
        this.videoPlayer.load = 'wait'
      }
    },
    onPlayerTimeupdate(player) {
      this.videoPlayer.times = this.videoData.times - parseInt(player.currentTime())
    },
    start() {
      Fetch('/home/getVideo').then((res) => {
        this.videoData = res.data;
        this.$set(this.playerOptions.sources, 0, {
          type: 'video/mp4',
          src: this.videoData.video_path,
        });
        this.playerOptions.poster = this.videoData.video_img;
      });
    },
    handleSubmit() {
      switch (this.videoPlayer.load) {
        case 'play':
          this.player.pause()
          break
        case 'wait':
          this.player.play()
          break
        case 'ended':
          Fetch('/home/getIntegralByVideo', { id: this.videoData.id }).then(
            (res) => {
              Dialog.alert({
                title: '提示',
                message: res.info
              });
              this.videoPlayer.finish = true
            }
          );
          break
      }
    },
  },
  mounted() {
    // 倒计时
    this.start();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
};
</script>

<style lang="less" scoped>
@import 'shiping';
/* .ddates{
		width: 100%;
		text-align: center;
		margin: 2vw 0;
  } */
.videoBox{
  // position: relative;
  position: absolute;
  // width: 335px;
  height: 149px;
  top: 417px;
  left: 20px;
  right: 20px;
  border-radius: 7px;
  overflow: hidden;
}
.maskBox{
  position: absolute;
  color: white;
  bottom: 8px;
  right: 8px;
  z-index: 100;
  font-size: 14px;
}
.btn {
  position: absolute;
  width: 291px;
  height: 44px;
  background: linear-gradient(0deg, #FFA600 0%, #FEF77C 100%);
  border-radius: 22px;
  font-size: 16px;
  color: #FB4901;
  text-align: center;
  left: 50%;
  transform: translate(-50%);
}
.down{
  // margin-top: 200px;
  // background-color: #fdac3e;
  top: 588px;
}
.main3 {
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0 0 30px;
  height: 900px;
  background-color: #fbfbfb;
  align-items: center;
  text-align: center;
  position: relative;
  .my-sp-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .my-sp-title{
    padding-top: 18px;
    text-align: center;
    font-size: 41px;
    font-family: FZZhengHeiS-EB-GB;
    font-weight: 400;
    color: #FFFFFF;
    text-shadow: 0px 3px 0px #F2010A;
    background: linear-gradient(0deg, #FEEAC7 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.lists {
  position: relative;
  width: 94%;
  margin: 13px 14px 0 14px;
  /* font-size: 3.5vw; */
  /* box-shadow: 0px -1px 5px rgba(89,125,172,.4); */
}
.iocs3 {
  position: relative;
  align-items: center;
  width: 140px;
  height: 140px;
}
.sport_infos {
  position: absolute;
  top: 30px;
  left: 23px;
  font-size: 23px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
}
.dates {
  position: absolute;
  top: 77px;
  left: 23px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.buts3 {
  position: absolute;
  width: 100%;
  align-items: center;
  text-align: center;
  margin-top: -80px;

  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #fff;
}
.actions3 {
  color: #fff;
}
.noaction3 {
  color: #fff;
}
.receive3 {
  color: #fff;
}
.nowaction3 {
  color: #fff;
}
.my-d{
  top: 650px
}
.bottom-tips{
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  position: absolute;
  left: 24px;
  top: 757px;
  text-align: left;
  p{
    line-height: 20px;
  }
}
</style>
