<template>
  <div class="kao-shi">
    <van-sticky>
      <van-nav-bar
        title="考试"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <van-search
        v-model="searchValue"
        placeholder="搜索"
        shape="round"
        @search="getPageData(true)"
      ></van-search>
    </van-sticky>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="getPageData()"
      class="refresh"
    >
      <div class="content">
        <van-tabs
          v-model="tabActive"
          color="#6096F8"
          :duration="0.5"
          title-active-color="#3875E5"
          title-inactive-color="#4A4A4A"
          animated
        >
          <van-tab title="我的考试任务">
            <div class="tab-content">
              <label v-for="(item, index) in pageList.studyTask" :key="index">
                <class-2 :info="item"></class-2>
              </label>
            </div>
          </van-tab>
          <van-tab title="我的考试历史">
            <div class="tab-content">
              <label v-for="(item, index) in pageList.historyTask" :key="index">
                <class-2 :info="item" isEnd></class-2>
              </label>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
import Class2 from "../Index/components/Class_2";
export default {
  name: "kao_shi",
  mixins: [mixin],
  components: {
    Class2
  },
  data() {
    return {
      isLoading: false, //页面是否正在下拉刷新
      pageList: [], //页面数据
      searchValue: "",
      tabActive: 0
    };
  },
  mounted() {
    // 获取学习数据
    this.getPageData();
  },
  methods: {
    // 获取学习数据
    getPageData() {
      let sendData = {
        courseName: this.searchValue,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getMyStudy(sendData)
        .then(res => {
          // 加载状态结束
          this.isLoading = false;
          this.pageList = res[0];
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.tab-content {
  padding: 20px 30px;
}
</style>
