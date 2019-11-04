<template>
  <div class="qu-shi-tu">
    <van-sticky>
      <van-nav-bar
        title="趋势图"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
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
              :maxTime="maxEndTime"
              v-model="date_2"
            ></SelectTime>
          </div>
        </div>
        <div class="filter-action">筛选</div>
      </div>
    </van-sticky>
    <div class="charts">
      <div class="charts-title van-hairline--bottom">巴拉巴拉曲线</div>
      <LineCharts></LineCharts>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { mixin } from "@/mixin/mixin";
import SelectTime from "@/components/SelectTime";
import LineCharts from "./components/LineCharts";
export default {
  name: "qu_shi_tu",
  mixins: [mixin],
  components: {
    SelectTime,
    LineCharts
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
      let date = dayjs(
        dayjs(this.date_2 || new Date()).subtract(7, "day")
      ).format("YYYY-MM-DD");
      return new Date(
        dayjs(date).get("year"),
        dayjs(date).get("month"),
        dayjs(date).get("date")
      );
    }
  },
  methods: {},
  watch: {
    date_1(value) {
      let val = dayjs(value).add(7, "day");
      let date = dayjs(val).format("YYYY-MM-DD");
      this.$refs.endTime.value = date;
    },
    date_2(value) {
      let val = dayjs(value).subtract(7, "day");
      let date = dayjs(val).format("YYYY-MM-DD");
      this.$refs.starTime.value = date;
    }
  }
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
.charts {
  margin-top: 20px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  .charts-title {
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 30px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 75px;
  }
}
</style>
