<template>
  <div class="class van-hairline--bottom">
    <div class="image">
      <img src="https://i.loli.net/2019/09/28/1LaIqT5rwNkU2Wg.png" alt />
    </div>
    <div class="class-content">
      <div class="tags">
        <div class="tag">讲师{{ info.courseTeacher }}</div>
        <div class="tag">{{ info.courseTime }}学时</div>
      </div>
      <div class="time">{{ info.startTime }}-{{ info.endTime }}</div>
      <div class="progress" v-if="!isStart">
        <div class="title">学习进度：</div>
        <div class="line">
          <van-progress
            :percentage="toNumber(info.schedule)"
            stroke-width="0.375rem"
            :show-pivot="false"
            color="#6096F8"
          />
        </div>
        <div class="number">{{ info.schedule }}%</div>
      </div>
    </div>
    <div class="action" v-if="isStart">继续学习</div>
    <div class="action" v-else @click="toStudyDetail()">开始学习</div>
  </div>
</template>
<script>
export default {
  name: "class",
  props: {
    info: Object,
    isStart: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toStudyDetail() {
      this.$router.push({
        path: `./xue_xi_detail`,
        query: { id: this.info.courseManageId }
      });
    },
    toNumber(num){
      return Number(num)
    }
  }
};
</script>
<style lang="scss" scoped>
.class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  .image {
    width: 210px;
    height: 160px;
    background: rgba(216, 216, 216, 1);
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 210px;
      height: 160px;
    }
  }
  .class-content {
    height: 160px;
    width: calc(100% - 320px);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    margin-left: 20px;
    .tags {
      width: 100%;
      display: flex;
      align-items: center;
      .tag {
        padding: 0 16px;
        margin-right: 20px;
        height: 44px;
        font-size: 24px;
        color: rgba(102, 102, 102, 1);
        line-height: 44px;
        background: rgba(246, 246, 246, 1);
        border-radius: 22px;
      }
    }
    .time {
      width: 100%;
      font-size: 24px;
      color: rgba(102, 102, 102, 1);
    }
    .progress {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      .title {
        font-size: 24px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .line {
        width: 160px;
        height: 12px;
        background: rgba(234, 244, 255, 1);
        border-radius: 11px;
        border: 1px solid rgba(234, 244, 255, 1);
      }
      .number {
        font-size: 24px;
        color: rgba(56, 117, 229, 1);
        margin-left: 20px;
      }
    }
  }
  .action {
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 37px;
    width: 90px;
    height: 90px;
    background: linear-gradient(
      132deg,
      rgba(132, 187, 255, 1) 0%,
      rgba(94, 119, 255, 1) 100%
    );
    box-shadow: 0px 2px 8px 0px rgba(115, 159, 255, 1);
    border-radius: 50%;
  }
}
</style>
