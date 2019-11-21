<template>
  <div class="tempalta">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="content">
      <div class="content-title">实时视频</div>
      <Video></Video>
      <div class="panel-list">
        <div class="panel-list-item" v-for="index in 3" :key="index">
          <Panel size="big"></Panel>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-title">液位历史曲线</div>
      <LineCharts></LineCharts>
    </div>
  </div>
</template>
<script>
import Panel from "../../page_1/components/Panel";
import LineCharts from "../../page_1/Index/components/LineCharts";
import Video from "./components/Video";
export default {
  name: "tempaltaPage",
  components: {
    Panel,
    LineCharts,
    Video
  },
  data() {
    return {
      title: "加载中"
    };
  },
  created() {
    this.title = this.$route.query.title;
  },
  methods: {
    pageBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.tempalta {
  background-color: #f5f5f5;
  .content {
    width: 100%;
    margin-top: 24px;
    background: #ffffff;
    .content-title {
      padding: 16px 30px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 42px;
      border-bottom: 1px solid #fafafa;
    }
    .panel-list {
      box-sizing: border-box;
      padding: 0 30px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px 30px;
      align-items: center;
      margin-top: 40px;
      padding-bottom: 40px;
      .panel-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .panel-list-item:nth-child(3n + 1) {
        margin-left: auto;
      }
      .panel-list-item:nth-child(3n + 3) {
        margin-right: auto;
      }
    }
  }
}
</style>
