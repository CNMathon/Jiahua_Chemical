<template>
  <div class="home">
    <van-nav-bar title="工单列表" left-text="返回" right-text="新增工单" left-arrow @click-left="pageBack" @click-right="toDetail"/>
    <j-filter-bar
      v-model="searchValue"
      placeholder="请输入作业名称"
      @search="getPageData('refresh')"
      @tap="showFilter = true"
    ></j-filter-bar>
    <j-filter v-model="showFilter" @confirm="getPageData('refresh')">
      <j-filter-search v-model="searchValue" @search="filterSearch" placeholder="请输入作业名称" ></j-filter-search>
      <j-filter-item title="工作票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-time title="完成时间"></j-filter-time>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title :row="5" :loading="isFirstLoading" class="skeleton">
          <van-pull-refresh v-model="isRefreshLoading" @refresh="getPageData('refresh')">
            <!-- <van-list
              v-model="isListLoading"
              :finished="isListMore"
              :error.sync="isListLoadingError"
              error-text="请求失败，点击重新加载"
              finished-text="没有更多了"
              @load="getPageData('list')"
            >-->
            <gongdanguanliList></gongdanguanliList>
          </van-pull-refresh>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import gongdanguanliList from "./components/List.vue";
export default {
  name: 'gongdanguanli_list',
  mixins: [mixin],
  components: {gongdanguanliList},
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
      ] // 作业票状态列表
    };
  },
  mounted () {
    this.isFirstLoading = false; // 是否首次获取数据
    this.isRefreshLoading = true; // 全局刷新状态 - 是否完成
  },
  methods: {
    toDetail(){
      this.$router.push({ path: "/page_3/gongdanguanli/details" });
    },
    getPageData(type) {},
    filterSearch(e) {},
    filterSelect_1(e) {
      this.selectZypzt = e.name;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>