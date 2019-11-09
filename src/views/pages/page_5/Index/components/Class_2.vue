<template>
  <div class="class van-hairline--bottom">
    <div class="image">
      <img src="https://i.loli.net/2019/09/28/BPOvqIpLQomWn1r.png" alt />
    </div>
    <div class="class-content">
      <div class="tags" v-if="isEnd">
        总分{{info.totalScore}}分 | 及格分60 |
        <span>考试得分：{{info.passScore}}</span>
      </div>
      <div class="tags" v-else>总分100分 | 及格分60</div>
      <div class="bottom">
        <div class="times">
          <div class="time">
            考试时间：
            <br />
            {{day(info.startDate)}}-{{day(info.endDate)}}
          </div>
          <div class="time">考试时长：60分钟</div>
        </div>
        <div class="action" v-if="isEnd" @click="toAnalysis()">查看试卷</div>
        <div class="action" v-else @click="toAnswer()">开始考试</div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "class",
  props: {
    isEnd: {
      type: Boolean,
      default: false
    },
    info: Object
  },
  created() {
    console.log(this.info);
  },
  methods: {
    day(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm");
    },
    toAnswer() {
      this.$router.push({
        path: "./kao_shi_answer",
        query: { id: this.info.id }
      });
    },
    toAnalysis() {
      this.$router.push({
        path: "./kao_shi_analysis",
        query: { id: this.info.id }
      });
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
    min-height: 160px;
    width: calc(100% - 230px);
    .tags {
      font-size: 24px;
      color: rgba(102, 102, 102, 1);
      line-height: 44px;
      span {
        color: #3875e5;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      .times {
        max-width: 70%;
      }
      .time {
        width: 100%;
        font-size: 24px;
        color: rgba(102, 102, 102, 1);
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
          rgba(254, 208, 80, 1) 0%,
          rgba(255, 146, 96, 1) 100%
        );
        box-shadow: 0px 2px 8px 0px rgba(255, 156, 93, 1);
        border-radius: 50%;
      }
    }
  }
}
</style>
