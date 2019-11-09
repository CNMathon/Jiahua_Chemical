<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="断路安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <div class="filter">
      <j-filter-item :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <div class="icon" @click="showFilter = true">
        <van-icon name="wap-nav" />
      </div>
    </div>
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
    </j-filter>
    <div class="list-card-area">
      <list-card></list-card>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import ListCard from "@/views/pages/page_3/components/DuanLuListCard";
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
        path: "../duanlu"
      });
    },
    getPageData() {},
    confirmFilter() {},
    filterSearch() {},
    filterSelect_1() {}
  },
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
.filter {
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /deep/ .cell-sheet {
    width: 680px;
  }
}
</style>
