<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="受限空间安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar
      v-model="searchValue"
      placeholder="请输入作业内容名称"
      @search="getPageData('refresh')"
      @tap="showFilter = true"
    ></j-filter-bar>
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton
          title
          :row="3"
          :loading="isLoading"
          class="skeleton"
          v-for="(item, index) in 3"
          :key="index"
        ></van-skeleton>
        <label v-for="(item, index) in listData" :key="index">
          <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
          <div class="donghuo-list-card donghuo-list-card-nolast" @click="jumpToMorePage(item.htStatus)">
            <div class="left">
              <div class="left-line left-line-notlast">作业内容：{{item.sxkjNeurogen}}</div>
              <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.applyDept}}</div>
              <div class="left-line left-line-notlast left-line-hor">申请人：{{item.applyRen}}</div>
              <div class="left-line left-line-notlast">作业开始时间：{{item.zyStarttime}}</div>
              <div class="left-line">作业结束时间：{{item.zyEndtime}}</div>
            </div>
            <div class="right" v-if="item.htStatus == 1">编辑</div>
            <div class="right" v-if="item.htStatus == 2">初审</div>
            <div class="right" v-if="item.htStatus == 3">审核</div>
            <div class="right" v-if="item.htStatus == 4">审批</div>
            <div class="right" v-if="item.htStatus == 5">有效</div>
            <div class="right" v-if="item.htStatus == 6">终结</div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
// import ListCard from "@/views/pages/page_3/components/KongJianListCard";
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
      ], // 作业票状态列表
      listData: [],
      isLoading: true
    };
  },
  mixins: [mixin],
  methods: {
    selectKongJianZyp() {
      this.$api.page_3
        .htHseSxkjzypListData({
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.listData = res.list;
          this.isLoading = false;
          console.log(this.listData);
        });
    },
    onClickRight() {
      this.$router.push({
        path: "../kongjian"
      });
    },
    // 跳转至详情页
    jumpToMorePage(status) {
      if (status == 1) {
        this.$router.push({
          path: "./index"
          
        })
      }
      console.log(status)
    },
    getPageData() {},
    confirmFilter() {},
    filterSearch() {},
    filterSelect_1() {}
  },
  created() {
    this.selectKongJianZyp()
  },
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

<style lang="scss" scoped>
.donghuo-list-card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #6096f8;
  padding: 22px 31px 15px 34px;
  color: #ffffff;
  border-radius: 10px;
}

.donghuo-list-card-nolast {
  margin-bottom: 20px;
}

.left-line-notlast {
  margin-bottom: 7px;
}

.left {
  font-size: 0.8rem;
  font-family: PingFangSC-Regular, PingFang SC;
}

.right {
  line-height: 80 * 2px;
  font-size: 34px;
  width: 112px;
  text-align: center;
  // color: red;
}

.skeleton {
  margin-bottom: 10px
}

.left-line-hor {
  display: inline;
  &:nth-child(3) {
    margin-left: 50px;
  }
}
</style>
