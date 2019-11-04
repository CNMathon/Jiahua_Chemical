<template>
  <div class="main">
    <van-sticky>
      <van-nav-bar
        title="维护保养"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <j-filter-bar
        v-model="searchValue"
        @search="getPageData(true)"
        @tap="showFilter = true"
      ></j-filter-bar>
    </van-sticky>
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-search
        v-model="searchValues"
        @search="filterSearch"
      ></j-filter-search>
      <j-filter-item
        title="维修保养类型"
        :actions="sheetActions_1"
        @select="filterSelect_1"
      ></j-filter-item>
      <j-filter-item
        title="任务状态"
        :actions="sheetActions_2"
        @select="filterSelect_2"
      ></j-filter-item>
      <j-filter-item
        title="空间设备"
        :actions="sheetActions_3"
        @select="filterSelect_3"
      ></j-filter-item>
      <j-filter-item
        title="所属分厂"
        :actions="sheetActions_4"
        @select="filterSelect_4"
      ></j-filter-item>
    </j-filter>
    <van-pull-refresh v-model="isLoading" @refresh="getPageData(true)">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="getPageData()"
      >
        <div class="list">
          <div v-for="(item, index) in 3" :key="index">
            <div class="item" @click="toDetail(index)">
              <div class="tag"></div>
              <div class="info">
                <div class="left">
                  <div class="title">任务名称：转动设备润滑油添加</div>
                  <div class="sub-item">
                    <div class="text">设备位号：P2001A</div>
                    <div class="text">所属部门：烧碱厂</div>
                  </div>
                  <div class="sub-item">
                    <div class="text">设备名称：反应釜循环泵A</div>
                  </div>
                  <div class="sub-item">
                    <div class="text">任务执行时间：2019-10-22 14:12:20</div>
                  </div>
                </div>
                <div class="right">
                  <div class="btn">{{ typeList[index] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "wei_hu_bao_yang_index",
  mixins: [mixin],
  data() {
    return {
      isLoading: false, //页面是否正在下拉刷新
      error: false, //加载错误
      loading: false, //页面是否在加载中
      finished: false, //数据是否加载完毕
      pageNow: 1, //当前页数
      pageSize: 20, //每页加载数量
      totalNumber: 10, //总条数
      pageList: [], //页面数据
      typeList: ["计划性检修", "预防性保养", "润滑任务"],
      showFilter: false,
      searchValue: "",
      searchValues: "",
      sheetActions_1: [
        { name: "电器", index: 0 },
        { name: "仪表", index: 1 },
        { name: "机械", index: 2 },
        { name: "特种", index: 3 },
        { name: "化验", index: 4 },
        { name: "安全附件", index: 5 }
      ],
      sheetActions_2: [
        { name: "计划性检修", index: 0 },
        { name: "预防性保养", index: 1 },
        { name: "润滑任务", index: 2 }
      ],
      sheetActions_3: [
        { name: "计划性检修", index: 0 },
        { name: "预防性保养", index: 1 },
        { name: "润滑任务", index: 2 }
      ],
      sheetActions_4: [
        { name: "烧碱", index: 0 },
        { name: "新材料", index: 1 },
        { name: "动力中心", index: 2 },
        { name: "水处理站", index: 3 },
        { name: "硫化厂", index: 4 },
        { name: "脂肪酸厂", index: 5 }
      ]
    };
  },
  methods: {
    // 过滤-搜索
    filterSearch(e) {
      console.log("e: ", e);
    },
    filterSelect_1(e) {
      console.log("e: ", e);
    },
    filterSelect_2(e) {
      console.log("e: ", e);
    },
    filterSelect_3(e) {
      console.log("e: ", e);
    },
    filterSelect_4(e) {
      console.log("e: ", e);
    },
    // 确认筛选
    confirmFilter() {},
    // 获取承包商人员列表
    getPageData(refresh = false) {
      if (refresh) {
        this.pageNow = 1;
        this.loading = true;
        this.finished = false;
      }
      // 数据全部加载完成
      else if (this.pageList.length >= this.totalNumber) {
        this.loading = false;
        this.finished = true;
        this.isLoading = false;
        return;
      }
      let sendData = {
        pageNo: this.pageNow,
        pageSize: this.pageSize,
        empName: this.searchValue,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4
        .htCbsPersonInf(sendData)
        .then(res => {
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          this.pageNow = this.pageNow + 1;
          if (res.list === []) {
            this.finished = true;
            return;
          }
          this.pageList = refresh ? res.list : [...this.pageList, ...res.list];
          this.totalNumber = res.count;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
          this.finished = false;
          this.isLoading = false;
        });
    },
    toDetail(index) {
      let path = ["yu_fang", "bao_yang", "run_hua"];
      this.$router.push({ path: `./${path[index]}/${index}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list {
    padding: 20px 30px;
    .item {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .tag {
        width: 40px;
        height: 40px;
        background: rgba(56, 117, 229, 1);
        border-radius: 50%;
      }
      .info {
        width: calc(100% - 50px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: calc(100% - 170px);
          .title {
            margin-bottom: 30px;
            font-size: 28px;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
          }
          .sub-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .text {
              font-size: 24px;
              color: rgba(102, 102, 102, 1);
              line-height: 33px;
            }
          }
        }
        .right {
          width: 160px;
          .btn {
            font-size: 28px;
            text-align: right;
            color: rgba(51, 51, 51, 1);
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
