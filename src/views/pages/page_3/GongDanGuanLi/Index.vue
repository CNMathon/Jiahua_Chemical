<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar
        title="工单列表"
        left-text="返回"
        right-text="新增工单"
        left-arrow
        @click-left="jumpTo('/page_3')"
        @click-right="toDetail"
      />
      <j-filter-bar
        v-model="searchValue"
        placeholder="请输入作业名称"
        @search="getPageData('refresh')"
        @tap="showFilter = true"
      ></j-filter-bar>
    </van-sticky>
    <j-filter v-model="showFilter" @confirm="getPageData('refresh')">
      <j-filter-search v-model="searchValue" @search="filterSearch" placeholder="请输入作业名称"></j-filter-search>
      <j-filter-item title="工作票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-time title="完成时间"></j-filter-time>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title avatar :row="3" :loading="isLoading">
          <gongdanguanliList v-for="(item, index) in listData" :key="index" :item="item"></gongdanguanliList>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import gongdanguanliList from "./components/List.vue";
export default {
  name: "gongdanguanli_list",
  mixins: [mixin],
  components: { gongdanguanliList },
  data() {
    return {
      searchValue: "",
      showFilter: false,
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
      ], // 作业票状态列表
      listData: [],
      searhParams: {
        //查询参数
      },
      isLoading: false
    };
  },
  // mounted() {
  //   this.isFirstLoading = false; // 是否首次获取数据
  //   this.isRefreshLoading = true; // 全局刷新状态 - 是否完成
  // },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isLoading = true;
      this.$api.page_3
        .deviceWorkOrderListData({
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
          console.log(res);
          this.listData = res.list;
        });
    },
    toDetail() {
      this.$router.push({ path: "./details1" });
    },
    getPageData(type) {
      console.log(111);
    },
    filterSearch(e) {
      console.log(222);
    },
    filterSelect_1(e) {
      console.log(333);
      this.selectZypzt = e.name;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>