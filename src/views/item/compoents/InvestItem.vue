<template>
  <div class="project-item-container">
    <div class="project-img-box">
      <img :src="investInfo.thumb" alt="" />
      <div class="project-size">
        项目规模：<span>{{ investInfo.total }}万元</span>
      </div>
    </div>
    <div class="project-item-header">
      <div class="project-name">{{ investInfo.title }}</div>
      <div class="project-btn">立即投资</div>
    </div>
    <div class="project-tag-box">
      <div class="project-tag-item">{{ investInfo.type_name }}</div>
      <div class="project-tag-item">{{ investInfo.min }}起投</div>
    </div>
    <div class="project-info-list">
      <div class="project-info-list-item">
        <div class="project-info-list-item-bottom one-bottom">
          {{ investInfo.rate }} <span>%</span>
        </div>
        <div class="project-info-list-item-top" v-if="investInfo.type === 7">
          小时利率
        </div>
        <div class="project-info-list-item-top" v-else>日利率</div>
      </div>
      <div class="project-info-list-item">
        <div class="project-info-list-item-bottom">
          {{ investInfo.apr_money }} <span>元</span>
        </div>
        <div class="project-info-list-item-top" v-if="investInfo.type === 7">
          每小时分红
        </div>
        <div class="project-info-list-item-top" v-else>每日分红</div>
      </div>
      <div class="project-info-list-item">
        <div class="project-info-list-item-bottom">
          {{ investInfo.sun_apr_money }} <span>元</span>
        </div>
        <div class="project-info-list-item-top">总分红</div>
      </div>
    </div>
    <div class="project-progress-warp">
      <div class="project-progress-box">
        <div
          class="project-progress"
          :style="schedule(investInfo.schedule)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    investInfo: {
      type: Object,
      default: () => {},
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    schedule(schedule) {
      return {
        width: schedule + "%",
      };
    },
  },
};
</script>
<style lang="less" scoped>
.project-item-container {
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
  border-radius: 13px;
  margin-top: 13px;
  overflow: hidden;
  font-family: PingFang SC;
  padding: 10px 14px;
  .project-img-box {
    position: relative;
    height: 147px;
    border-radius: 4px;
    overflow: hidden;
    // background-color: yellow;
    // border-radius: 13px;

    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      //border-radius: 7px;
    }

    .project-size {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #121c32;
      background: rgba(252, 219, 180, 1);
      border-radius: 40% 40% 0 0;
    }
  }
  .project-item-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 13px;
    .project-name {
      font-size: 15px;
      font-weight: bold;
      color: #333b4c;
      padding-right: 10px;
      line-height: 20px;
    }

    .project-btn {
      width: 73px;
      height: 29px;
      background: linear-gradient(0deg, #F8564C 0%, #FF776E 100%);
      border-radius: 14px;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .project-tag-box {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 4px;

    .project-tag-item {
      border: 1px solid #FB6501;
      padding: 3px 7px;
      font-size: 11px;
      font-weight: 400;
      color: #F98A0B;
      margin-left: 4px;

      &:first-child {
        margin-left: 0%;
      }
    }
  }

  .project-info-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 13px;

    &-item {
      &-top {
        font-size: 13px;
        font-weight: 500;
        color: #7f848f;
        padding-top: 9px;
      }

      &-bottom {
        font-size: 25px;
        font-weight: bold;
        color: #333b4c;
        > span {
          font-size: 13px;
        }

        &.one-bottom {
          color: rgba(251, 101, 1, 1);
        }
      }
    }
  }

  .project-progress-warp {
    margin-top: 13px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .project-progress-box {
      flex: 1;
      height: 8px;
      border-radius: 5px;
      border: 1px solid rgba(251, 118, 62, 1);;
      background-color: #fff;

      .project-progress {
        height: 6px;
        border-radius: 5px;
        background-color: rgba(251, 118, 62, 1);;
      }
    }
    .progress-value {
      width: auto;
      font-size: 12px;
      font-weight: 500;
      color: #F8F9FB;;
      padding-left: 12px;
    }
  }
}
</style>
