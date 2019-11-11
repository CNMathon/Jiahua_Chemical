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
      @search="getPageData"
      @tap="showFilter = true"
    />
    <j-filter v-model="showFilter" @confirm="getPageData">
      <j-filter-search v-model="searchValues" @search="testFun"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
      <j-filter-time title="创建时间"></j-filter-time>
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
          <div class="donghuo-list-card donghuo-list-card-nolast">
            <div class="left">
              <div class="left-line left-line-notlast">设备管道名称：{{item.pipe}}</div>
              <div class="left-line left-line-notlast">盲板抽堵编号：{{item.mbzypCode}}</div>
              <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.applyDept}}</div>
              <div class="left-line left-line-notlast left-line-hor">申请人：{{item.applyer}}</div>
              <div class="left-line left-line-notlast">生活部门产品负责人：{{item.scMan}}</div>
              <div class="left-line">作业部门负责人：{{item.zyMan}}</div>
            </div>
            <div
              class="right"
              @click.stop="()=>{$router.push({path:'/page_3/mangban/index',query:{id:item.id}})}"
              v-if="item.htStatus == 1"
            >编辑</div>
            <div class="right" v-if="item.htStatus == 2">提交资料</div>
            <div
              class="right"
              @click.stop="()=>{$router.push({path:'/page_3/mangban/index2',query:{id:item.id}})}"
              v-if="item.htStatus == 3"
            >初审</div>
            <div class="right" v-if="item.htStatus == 4">审核</div>
            <div class="right" v-if="item.htStatus == 5">有效</div>
            <div class="right" v-if="item.htStatus == 6">结束</div>
          </div>
        </label>
      </div>
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
        // 作业票状态列表
        { name: "编辑", index: 1 },
        { name: "提交资料", index: 2 },
        { name: "初审", index: 3 },
        { name: "审核", index: 4 },
        { name: "有效", index: 5 },
        { name: "结束", index: 6 }
      ],
      searchStatus: "",
      isLoading: true,
      listData: []
    };
  },
  mixins: [mixin],
  methods: {
    onClickRight() {
      this.$router.push({
        path: "../mangban"
      });
    },
    // initData() {
    //   this.$api.page_3
    //     .htHseMbzypListData({
    //       __sid: localStorage.getItem("JiaHuaSessionId")
    //     })
    //     .then(res => {
    //       this.listData = res.list;
    //       this.isLoading = false;
    //       console.log(this.listData);
    //     });
    // },
    testFun() {
      console.log(123)
    },
    getPageData(where) {
      // console.log(123)
      // if ((where = "refresh")) {
      //   // this.pageNow = 1;
      //   this.isRefreshLoading = true;
      // }

      this.$api.page_3
        .htHseMbzypListData({
          pipe: this.searchValue,
          htStatus: this.searchStatus,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
          this.listData = res.list;
          this.isFirstLoading = false;
          console.log(this.listData);

          if ((where = "refresh")) {
            // this.pageNow = 1;
            this.isRefreshLoading = false;
          }
          if ((where = "list")) {
            // this.pageNow = 1;
            this.isListLoading = false;
          }
        });
    },
    confirmFilter() {},
    filterSearch() {},
    filterSelect_1(e) {
      this.filterStatus = e.name
    }
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
  created() {
    this.getPageData();
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
</style>


<!-- listData样式 -->
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
  width: 150px;
  text-align: center;
  // color: red;
}

.skeleton {
  margin-bottom: 10px;
}

.left-line-hor {
  display: inline;

  &:nth-child(4) {
    margin-left: 50px;
  }
}
</style>
