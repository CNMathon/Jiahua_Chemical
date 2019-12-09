<template>
  <div class="app">
    <van-nav-bar left-text="返回" :title="tagsNameShow + '历史值'" left-arrow @click-left="pageBack" />
    <div class="title">
      <div class="cn">{{tagsNameShow}}</div>
      <div class="en">{{tagsName}}</div>
    </div>
    <div class="content">
      <!-- 作业开始时间 -->
      <van-cell title="作业开始时间" :value="getTimeStr(begin)" required @click="beginShow = true"/>
      <!-- 作业结束时间 -->
      <van-cell title="作业结束时间" :value="getTimeStr(end)" required @click="endShow = true"/>
      <LineCharts
      class="linchats"
      :title="unit"
      :data="linerdata"
      ></LineCharts>
    </div>
    <van-popup v-model="beginShow" position="bottom">
      <van-datetime-picker
        ref="beginShow-datetime-picker"
        :value="begin"
        type="datetime"
        @cancel="beginShow = false"
        @confirm="timeVerify($event,'begin')"
        :max-date="new Date()"
      />
    </van-popup>
    <van-popup v-model="endShow" position="bottom">
      <van-datetime-picker
        ref="endShow-datetime-picker"
        :value="begin"
        type="datetime"
        @cancel="endShow = false"
        @confirm="timeVerify($event,'end')"
        :max-date="new Date()"
      />
    </van-popup>
  </div>
</template>

<script>
import LineCharts from "./LineCharts";
export default {
  name: "tagNameHistory",
  data() {
    return {
      unit: "",
      tagsName: "",
      tagsNameShow: "",
      endShow: false,
      beginShow: false,
      daYMs: 86400000,
      begin: new Date(new Date().getTime() - this.daYMs),
      end: new Date(),
      interval: 172,
      httpStatua: false,
      linerdata: [],
    };
  },
  watch: {
  },
  components: { LineCharts },
  created() {
    this.unit = this.$route.query.unit;
    this.tagsName = this.$route.query.tagsName;
    this.tagsNameShow = this.$route.query.tagsNameShow;
    let today = new Date().getTime();
    this.begin = new Date(today - this.daYMs);
    this.getTagsHistory();
  },
  methods: {
    getTimeStr (time) {
      return time.toLocaleString();
    },
    timeVerify (value, name) {
      this[name] = value;
      let start = this.begin;
      let end = this.end;
      let timeMs = new Date(start);
      let endTimeMs = new Date(end);
      let space = endTimeMs.getTime() - timeMs.getTime();
      if (space > 0 && space / this.daYMs < 5) {
        this.getTagsHistory();
      } else {
        this.$notify('时间间隔小于5天，并且开始时间不能大于结束时间');
      }
      this.endShow = false;
      this.beginShow = false;
    },
    getTagsHistory() {
      console.log('this.begin', this.begin);
      console.log('this.end', this.end);
      if (this.httpStatua) {
        return;
      }
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.httpStatua = true;
      this.$api.common
        .tasHistory({
          tagNames: this.tagsName,
          begin: this.begin,
          end: this.end,
          interval: this.interval,
          __sid: this.$userInfo.sessionId
        })
        .then(res => {
          this.$Toast.clear();
          this.httpStatua = false;
          let data = res.replace('(', '').replace(')', '');
          this.linerdata = JSON.parse(data)[this.tagsName]
        }) .catch(() => this.$Toast.clear());
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  .title {
    margin-top: 30px;
    text-align: center;
    .cn {
      font-size: 40px;
    }
    .en {
      margin-top: 10px;
      font-size: 20px;
    }
  }
}
.content {
  width: 100%;
  margin-top: 24px;
  background: #ffffff;
}
.linchats{
  margin-top: 30px;
}
</style>