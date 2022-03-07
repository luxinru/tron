<template>
  <div>
    <div class="main3">
      <!-- <img style="width: 100%;" src="@/assets/images/shiping-bg.png" alt="" /> -->
      
      <div style="margin:0px auto;">
        <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :webkit-playsinline="true"
          autoplay
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @timeupdate="onPlayerTimeupdate($event)"
        >
        </video-player>
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
            src: 'https://yuguoyuan.oss-cn-beijing.aliyuncs.com/mp4/%E5%BE%A1%E6%9E%9C%E5%9B%AD%E5%91%A8%E9%9F%A6%E5%BD%A43.mp4',
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
      // Fetch('/home/getVideo').then((res) => {
      //   this.videoData = res.data;
      //   this.$set(this.playerOptions.sources, 0, {
      //     type: 'video/mp4',
      //     src: 'http://api.0551jhw.com/' + this.videoData.video_path,
      //   });
      //   this.playerOptions.poster =
      //     'http://api.0551jhw.com/' + this.videoData.video_img;
      // });

      // http://admin.0551jhw.com/%E5%BE%A1%E6%9E%9C%E5%9B%AD%E5%91%A8%E9%9F%A6%E5%BD%A43.mp4
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
.vjs-custom-skin{
  /deep/ .video-js{
  width: 375px;
  height: 100vh;
  }
  
}
.btn {
  width: 300px;
  height: 47px;
  line-height: 47px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  // background: linear-gradient(-90deg, #ff621d, #ff621d);
  border-radius: 24px 24px 24px 24px;
  margin: 0px auto;
  margin-top: 240px;
}
.main3 {
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0 0 30px;
  height: 800px;
  background-color: #fbfbfb;
  align-items: center;
  text-align: center;
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
</style>
