<template>
  <div class="tempalta">
    <van-nav-bar :title="tagsName" left-text="返回" left-arrow @click-left="pageBack" />
    <div class="content">
      <!-- 作业开始时间 -->
      <cell-time title="作业开始时间" type="date" v-model="begin" :maxTime="new Date()" required></cell-time>
      <!-- 作业结束时间 -->
      <cell-time title="作业结束时间"  type="date" v-model="end"  :maxTime="new Date()" required></cell-time>
      <LineCharts
      :title="unit"
      :data="linerdata"
      ></LineCharts>
    </div>
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
      begin: new Date(),
      end: new Date(),
      interval: 172,
      linerdata: [],
    };
  },
  watch: {
    begin (val) {
      this.getTagsHistory();
    },
    end (val) {
      this.getTagsHistory();
    }
  },
  components: { LineCharts },
  created() {
    this.unit = this.$route.query.unit;
    this.tagsName = this.$route.query.tagsName;
    let today = new Date();
    this.begin = new Date(today.getFullYear()+ '/'+(today.getMonth() + 1) + '/'+ today.getDay()),
    this.getTagsHistory();
  },
  methods: {
    getTagsHistory() {
      this.$api.common
        .tasHistory({
          tagNames: this.tagsName,
          begin: this.begin,
          end: this.end,
          interval: this.interval,
          __sid: this.$userInfo.sessionId
        })
        .then(res => {
          let data = res.replace('(', '').replace(')', '');
          this.linerdata = JSON.parse(data)[this.tagsName]
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 24px;
  background: #ffffff;
}
</style>