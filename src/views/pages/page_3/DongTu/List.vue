<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="动土安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar
      v-model="searchValue"
      placeholder="请输入作业地点名称"
      @search="getPageData"
      @tap="showFilter = true"
    ></j-filter-bar>
    <j-filter v-model="showFilter" @confirm="getPageData">
      <j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title :row="3" :loading="isLoading" class="skeleton">
          <label v-for="(item, index) in listData" :key="index">
            <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
            <div class="donghuo-list-card donghuo-list-card-nolast" @click="jumpToMorePage(item.htStatus, item.dtzypCode)">
              <div class="left">
                <div class="left-line left-line-notlast">动土作业票编号：{{item.dtzypCode}}</div>
                <div class="left-line left-line-notlast">作业地点：{{item.dtSite}}</div>
                <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.applyDept}}</div>
                <div class="left-line left-line-notlast left-line-hor">申请人：{{item.applyer}}</div>
                <div class="left-line left-line-notlast">动土开始时间：{{item.dtStarttime}}</div>
                <div class="left-line">动土结束时间：{{item.dtEndtime}}</div>
              </div>
              <div class="right" v-if="item.htStatus == 1">编辑</div>
              <div class="right" v-if="item.htStatus == 2">初审</div>
              <div class="right" v-if="item.htStatus == 3">审核</div>
              <div class="right" v-if="item.htStatus == 4">有效</div>
              <div class="right" v-if="item.htStatus == 5">已终结</div>
            </div>
          </label>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
// import ListCard from "@/views/pages/page_3/components/DongTuListCard";
export default {
  data() {
    return {
      showFilter: false,
      searchValue: "",
      searchValues: "",
      zypztList: [
        {index: -1, name: "请选择"},
        {index: 1, name: "编辑"},
        {index: 2, name: "初审"},
        {index: 3, name: "有效"},
        {index: 4, name: "已验票"},
        {index: 5, name: "已终结"}
      ], // 作业票状态列表
      listData: [],
      isLoading: true,
      status: "",
    };
  },
  mixins: [mixin],
  methods: {
    onClickRight() {
      this.$router.push({
        path: "../dongtu"
      });
    },
    getPageData() {
      this.isLoading = true;
      this.$api.page_3
        .htHseDtzypListData({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          htStatus: this.status,
          dtSite: this.searchValue
        })
        .then(res => {
          this.listData = res.list;
          this.isLoading = false;
          console.log(this.listData);
        });
    },
    // tap(info) {
    //   console.log("info: ", info);
    //   let dtzypCode = info.dtzypCode;
    //   this.$router.push({
    //     path: "../dongtu",
    //     query: { id: dtzypCode }
    //   });
    // },
    jumpToMorePage(status, code) {
      const that = this;
      function todo(statusList, path, moreInfo = null) {
        if (status == statusList) {
          that.$router.push({
            path: path,
            query: {
              status: status,
              code: code,
              moreInfo: moreInfo
            }
          })
        }
      }

      // todo 参数
      // 参数1 => 需要指定的 status
      // 参数2 => 跳转页面
      // 参数3 => 其他需要通过 router 传输的数据
      todo(1, './index', {isInitData: true})
      todo(2, './Index2', {isInitData: true})
      todo(3, './Index2', {isInitData: true})
      todo(4, './Index2', {isInitData: true})
      todo(5, './Index2', {isInitData: true})
    },
    filterSelect_1(e) {
      console.log(e)
      if (e.index == -1) {
        this.status = "";
      } else {
        this.status = e.index;
      }
    },
    confirmFilter() {},
    filterSearch() {},
  },
  created() {
    this.getPageData();
  }
  // components: {
  //   ListCard
  // }
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

<!-- ListCard -->
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
  margin-bottom: 10px;
}

.left-line-hor {
  display: inline;
  &:nth-child(4) {
    margin-left: 50px;
  }
}
</style>

