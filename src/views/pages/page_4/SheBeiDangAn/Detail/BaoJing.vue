<template>
  <div class="qu-shi-tu">
    <van-sticky>
      <van-nav-bar
        title="设备报警"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      ></van-nav-bar>
      <div class="time-filter">
        <div class="time-label">
          <div class="time">
            <SelectTime
              ref="starTime"
              title="开始时间"
              type="date"
              :maxTime="maxStartTime"
              v-model="date_1"
            ></SelectTime>
          </div>
          <div class="line"></div>
          <div class="time">
            <SelectTime
              ref="endTime"
              title="结束时间"
              type="date"
              :minTime="minEndTime"
              :maxTime="maxEndTime"
              v-model="date_2"
            ></SelectTime>
          </div>
        </div>
        <div class="filter-action">筛选</div>
      </div>
    </van-sticky>
    <div class="list">
      <div class="item">
        <div class="top">
          <div class="content">
            报警内容报警内容报警内容报警内报警内容报警内容报警内容报警内报警内容报警内容报警内容报警内报警内容报警内容报警内容报警内报警内容报警内容报警内容报警内
          </div>
          <div class="status">
            <van-icon
              class-prefix="iconfont"
              name="jinggao"
              color="#D81E06"
              size="2.2rem"
            />
            <div class="status-text">警告</div>
          </div>
        </div>
        <div class="bottom">
          <div class="type">报警类型</div>
          <div class="time">2019.09.20.11:14:35至2019.09.20.11:14:35</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { mixin } from "@/mixin/mixin";
import SelectTime from "@/components/SelectTime";
export default {
  name: "qu_shi_tu",
  mixins: [mixin],
  components: {
    SelectTime
  },
  data() {
    return {
      date_1: "",
      date_2: "",
      maxEndTime: new Date()
    };
  },
  computed: {
    maxStartTime() {
      let date = dayjs(dayjs(this.date_2 || new Date())).format("YYYY-MM-DD");
      return new Date(
        dayjs(date).get("year"),
        dayjs(date).get("month"),
        dayjs(date).get("date")
      );
    },
    minEndTime() {
      let date = dayjs(dayjs(this.date_1)).format("YYYY-MM-DD");
      return new Date(
        dayjs(date).get("year"),
        dayjs(date).get("month"),
        dayjs(date).get("date")
      );
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.time-filter {
  width: 100vw;
  height: 100px;
  padding: 18px 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time-label {
  width: calc(100% - 90px);
  height: 66px;
  background: rgba(246, 246, 246, 1);
  border-radius: 33px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time {
    width: calc(50% - 8px);
  }
  /deep/ .select-time {
    font-size: 24px;
    text-align: center;
    color: rgba(109, 109, 109, 1);
    line-height: 66px;
  }
  .line {
    width: 16px;
    height: 2px;
    background-color: #6d6d6d;
  }
}
.filter-action {
  width: 80px;
  text-align: right;
  font-size: 28px;
  color: rgba(96, 150, 248, 1);
  line-height: 66px;
}
.list {
  margin-top: 20px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.item {
  width: 690px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box;
}
.top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .content {
    width: 500px;
    font-size: 28px;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
  }
  .status {
    .status-text {
      margin-top: 20px;
      font-size: 34px;
      text-align: center;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
    }
  }
}
.bottom {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .type {
    font-size: 28px;
    color: rgba(102, 102, 102, 1);
  }
  .time {
    font-size: 20px;
    color: rgba(102, 102, 102, 1);
    line-height: 28px;
  }
}
</style>
