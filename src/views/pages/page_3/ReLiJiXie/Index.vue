<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="热力机械工作票" left-text="返回" left-arrow @click-left="pageBack" />
      <j-filter-bar
        v-model="searchValue"
        placeholder="请输入作业名称"
        @search="getPageData('refresh')"
        @tap="showFilter = true"
      ></j-filter-bar>
    </van-sticky>

    <j-filter v-model="showFilter" @confirm="getPageData()">
      <j-filter-search v-model="searchValue" @search="filterSearch" placeholder="请输入作业名称"></j-filter-search>
      <j-filter-item title="工作票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-time title="完成时间"></j-filter-time>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title :row="5" :loading="isFirstLoading" class="skeleton">
          <van-pull-refresh v-model="isRefreshLoading" @refresh="getPageData()">
            <div v-for="(item,index) in pageList" :key="index">
              <ReLiJiXieListCase :info="item"></ReLiJiXieListCase>
            </div>
          </van-pull-refresh>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import ReLiJiXieListCase from "./components/List.vue";
export default {
  name: "relijixie_list",
  mixins: [mixin],
  components: { ReLiJiXieListCase },
  data() {
    return {
      searchValue: "",
      showFilter: false,
      pageList: [],
      isFirstLoading: true, // 是否首次获取数据
      isRefreshLoading: false, // 全局刷新状态 - 是否完成
      zypztList: [
        {
          name: "未提交",
          index: 1
        },
        {
          name: "审核中",
          index: 2
        },
        {
          name: "执行中",
          index: 3
        },
        {
          name: "等待确认",
          index: 4
        },
        {
          name: "等待评价",
          index: 5
        },
        {
          name: "完成",
          index: 6
        },
        {
          name: "已撤销",
          index: 7
        },
        {
          name: "已终止",
          index: 8
        }
      ] // 作业票状态列表
    };
  },
  mounted() {
    this.isFirstLoading = false; // 是否首次获取数据
    this.isRefreshLoading = true; // 全局刷新状态 - 是否完成
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0
      });
      this.$api.page_3
        .GetUnDoApproveList({
          PageSize: 10,
          PageIndex: 1,
          UserCode: localStorage.getItem("JiaHuaSessionId"),
          PostList: [localStorage.getItem("JiaHuaOfficeCode")]
        })
        .then(res => {
          let list = res.Result;
          let newList = list.filter(item => {
            return item.Type === "热力机械工作票";
          });
          this.$toast.clear();
          this.isRefreshLoading = false;
          this.pageList = newList;
        })
        .catch(() => {
          this.isRefreshLoading = false;
          this.$toast.clear();
        });
    },
    filterSearch(e) {},
    filterSelect_1(e) {
      this.selectZypzt = e.name;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>