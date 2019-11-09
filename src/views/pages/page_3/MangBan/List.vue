<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="盲板抽堵安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar
      v-model="searchValue"
      placeholder="请输入设备管道名称"
      @search="getPageData('refresh')"
      @tap="showFilter = true"
    ></j-filter-bar>
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
      <j-filter-time title="创建时间"></j-filter-time>
    </j-filter>
    <div class="list-card-area">
      <list-card></list-card>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import ListCard from "@/views/pages/page_3/components/MangBanListCard";
export default {
  data() {
    return {
      showFilter: false,
      searchValue: "",
      searchValues: "",
      zypztList: [
        {
          name: "编辑",
          idnex: 1
        },
        {
          name: "初审",
          idnex: 2
        },
        {
          name: "有效",
          idnex: 3
        },
        {
          name: "已验票",
          idnex: 4
        },
        {
          name: "已终结",
          idnex: 5
        }
      ] // 作业票状态列表
    };
  },
  mixins: [mixin],
  methods: {
    onClickRight() {
      this.$router.push({
        path: "../mangban"
      });
    },
    getPageData() {},
    confirmFilter() {},
    filterSearch() {},
    filterSelect_1() {}
    // selectDonghuoZyp() {
    //   this.$api.page_3
    //     .userSelect({
    //       __sid: localStorage.getItem("JiaHuaSessionId")
    //     })
    //     .then(res => {
    //       console.log(111111111)
    //       console.log(res)
    //     })
    // }
  },
  // created() {
  //   this.selectDonghuoZyp()
  // },
  components: {
    ListCard
  }
};
</script>

<style lang="scss" scoped>
.donghuo {
  background-color: #f5f5f5;
}

.list-card-area {
  width: 90%;
  margin: 0 auto;
}
</style>
