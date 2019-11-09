<template>
  <div class="kao-shi">
    <van-sticky>
      <van-nav-bar title="考试" left-text="返回" left-arrow @click-left="pageBack" />
      <van-search v-model="searchValue" placeholder="搜索" shape="round" @search="getPageData(true)"></van-search>
    </van-sticky>

    <div class="content">
      <van-tabs
        v-model="tabActive"
        color="#6096F8"
        :duration="0.5"
        title-active-color="#3875E5"
        title-inactive-color="#4A4A4A"
        animated
      >
        <div v-for="(item,indexs) in pageList" :key="indexs">
          <van-tab :title="item.title">
            <van-pull-refresh
              v-model="item.info.isLoading"
              @refresh="getPageData(true)"
              class="refresh"
            >
              <van-list
                v-model="item.info.loading"
                :finished="item.info.finished"
                finished-text="没有更多了"
                @load="getPageData()"
              >
                <div class="tab-content">
                  <label v-for="(item, index) in item.info.list" :key="index">
                    <class-2 :info="item" :isEnd="indexs===1"></class-2>
                  </label>
                </div>
              </van-list>
            </van-pull-refresh>
          </van-tab>
        </div>
      </van-tabs>
    </div>
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
      pageList: [
        {
          title: "我的考试任务",
          info: {
            list: []
          }
        },
        {
          title: "我的考试历史",
          info: {
            list: []
          }
        }
      ], //页面数据
      searchValue: "",
      tabActive: 0
    };
  },
  mounted() {
    let obj = {
      list: [],
      isLoading: false, //页面是否正在下拉刷新
      error: false, //加载错误
      loading: false, //页面是否在加载中
      finished: false, //数据是否加载完毕
      pageNow: 1, //当前页数
      pageSize: 20, //每页加载数量
      totalNumber: 10 //总条数
    };
    this.pageList[0].info = JSON.parse(JSON.stringify(obj));
    this.pageList[1].info = JSON.parse(JSON.stringify(obj));
  },
  methods: {
    // 获取考试数据
    getPageData(refresh = false) {
      let _this = this.pageList[this.tabActive].info;

      if (refresh) {
        _this.pageNow = 1;
        _this.loading = false;
        _this.finished = false;
      }
      // 数据全部加载完成
      else if (_this.list.length >= _this.totalNumber) {
        _this.loading = false;
        _this.finished = true;
        _this.isLoading = false;
        return;
      }
      let sendData = {
        examCode: this.searchValue,
        __sid: this.$userInfo.sessionId
      };
      if (this.tabActive === 1) {
        sendData.isfinalsubmit = "1";
      }
      this.$api.page_5
        .getMyTestHistory(sendData)
        .then(res => {
          // 加载状态结束
          _this.loading = false;
          _this.isLoading = false;
          _this.pageNow = _this.pageNow + 1;
          if (res.list === []) {
            _this.finished = true;
            return;
          }
          _this.list = refresh ? res.list : [..._this.list, ...res.list];
          _this.totalNumber = res.count;
        })
        .catch(() => {
          _this.error = true;
          _this.loading = false;
          _this.finished = false;
          _this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.tab-content {
  width: 100vw;
  padding: 20px 30px;
}
</style>
