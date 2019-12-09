<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="动火安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar
      v-model="searchValue"
      placeholder="请输入动火地点及内容名称"
      @search="getPageData('refresh')"
      @tap="showFilter = true"
    ></j-filter-bar>
    <j-filter v-model="showFilter" @confirm="getPageData('refresh')">
      <j-filter-search v-model="searchValue" @search="getPageData('refresh')" />
      <j-filter-item title="作业票状态" v-model="zypztValue" :actions="zypztList" @select="filterSelect_1" />
      <j-filter-item title="动火等级" v-model="dhLevelValue" :actions="dhLevelColumns" @select="filterSelect_2" />
      <!-- <j-filter-cell title="申请部门" /> -->
      <!-- <cell-select-department title="申请部门" no-padding /> -->
      <select-department
        title="申请部门"
        radio
        :storeModule="storeModule"
        storeKey="sqbm"
        v-model="sqbm"
        no-padding
      />
      <!-- <j-filter-cell title="申请人" /> -->
      <select-organization 
        title="申请人"
        max="9"
        :storeModule="storeModule"
        storeKey="dhzyRen"
        v-model="dhzyRen"
        no-padding
      />
      <!-- 清空搜索条件 -->
      <div class="clear-button"  @click="clearfilter">清空条件</div>
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
            <label v-for="(item, index) in listData" :key="index">
              <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
              <div class="donghuo-list-card donghuo-list-card-nolast" @click="tap(item)">
                <div class="left">
                  <div class="left-line left-line-notlast">动火地点及内容：{{item.siteContent}}</div>
                  <div class="left-line left-line-notlast">动火级别：{{dhLevelColumns[item.dhLevel].name}}</div>
                  <div
                    class="left-line left-line-notlast"
                  >申请部门：{{item.office?item.office.officeName:''}}</div>
                  <div class="left-line left-line-notlast">申请人：{{item.user?item.user.userName:''}}</div>
                  <div class="left-line left-line-notlast">动火开始时间：{{item.dhStarttime}}</div>
                  <div class="left-line">动火结束时间：{{item.dhEndtime}}</div>
                </div>
                <div class="right" v-if="item.htStatus == 1">编辑</div>
                <div class="right" v-if="item.htStatus == 2">初审</div>
                <div class="right" v-if="item.htStatus == 3">有效</div>
                <div class="right" v-if="item.htStatus == 4">已验票</div>
                <div class="right" v-if="item.htStatus == 5">已终结</div>
              </div>
            </label>
            <!-- </van-list> -->
          </van-pull-refresh>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mixin } from "@/mixin/mixin";
export default {
  name: 'donghuoList',
  data() {
    return {
      storeModule: 'donghuo',
      dhLevelValue: "", // Value - 动火等级
      zypztValue: "", // Value - 作业票状态
      searchValue: "", // 外层搜索框数据
      searchValues: "", // 筛选搜索框数据
      listData: [], // 列表数据
      showPopup: true,
      isFirstLoading: true, // 是否首次获取数据
      isRefreshLoading: false, // 全局刷新状态 - 是否完成
      isListLoading: false, // 瀑布流加载状态 - 是否完成加载
      isListMore: false, // 瀑布流加载状态 - 是否还有更多数据
      isListLoadingError: false, // 瀑布流加载状态 - 是否加载错误
      showFilter: false, // 筛选状态 - 是否开启
      zypztList: [
        { index: '', name: "请选择" },
        {
          name: "编辑",
          index: 1
        },
        {
          name: "初审",
          index: 2
        },
        {
          name: "有效",
          index: 3
        },
        {
          name: "已验票",
          index: 4
        },
        {
          name: "已终结",
          index: 5
        }
      ], // 作业票状态列表
      dhLevelColumns: [
        { index: '', name: "请选择" },
        {
          name: "制定位置特殊动火作业",
          index: 1
        },
        {
          name: "特殊",
          index: 2
        },
        {
          name: "|类",
          index: 3
        },
        {
          name: "||类",
          index: 4
        }
      ], //动火等级
      selectZypzt: "", // 选择的作业票状态
      selectDhlevel: ""
    };
  },
  mixins: [mixin],
  created() {
    console.log("创建");
    this.getPageData();
    this.initDonghuoPage();
  },
  activated(){
    console.log("激活");
    if(sessionStorage.getItem('success')=='1'){
      this.initDonghuoPage();
      this.getPageData();
      sessionStorage.removeItem('success')
    }
  },
  destroyed () {
    this.$store.dispatch("donghuo/cleanState");
  },
  methods: {
    clearfilter () {
      this.initDonghuoPage();
      this.showFilter = false;
      this.zypztValue = "";
      this.searchValue = "";
      this.dhLevelValue = "";
      this.getPageData();
    },
    initDonghuoPage () {
      this.$store.dispatch("donghuo/cleanState");
      this.$nextTick(() => {
        this.$store.commit("donghuo/add_KeepAlive", "donghuoList");
        this.$store.commit("donghuo/add_KeepAlive", "donghuoindex");
        this.$store.commit("donghuo/add_KeepAlive", "donghuoindex2");
      });
    },
    pageBack() {
      this.$router.push({
        path: "/page_3/index"
      });
    },
    tap(info) {
      let dhzypCode = info.dhzypCode;
      if (Number(info.htStatus) === 1) {
        this.$router.push({
          path: "../donghuo",
          query: { id: dhzypCode }
        });
      } else if (Number(info.htStatus) === 2) {
        this.$api.page_3
          .getTaskInfo({
            taskId: info.actRuTask.id,
            __sid: localStorage.getItem("JiaHuaSessionId")
          })
          .then(res => {
            console.log(res);
            if (res.taskKey === "zyp-dh-01") {
              this.$router.push({
                path: "../donghuo/index2",
                query: { id: dhzypCode }
              });
            } else if (res.taskKey === "zyp-dh1-01") {
              this.$router.push({
                path: "../donghuo/index3",
                query: { id: dhzypCode }
              });
            } else {
              this.$router.push({
                path: "../donghuo/index5",
                query: { id: dhzypCode }
              });
            }
          });
      } else {
        this.$router.push({
          path: "../donghuo/index3",
          query: { id: dhzypCode }
        });
      }
    },
    onClickRight() {
      this.initDonghuoPage();
      this.$router.push({
        path: "../donghuo"
      });
    },
    onClickMenu() {
      this.showPopup = true;
    },
    // 获取页面数据
    // => 'refresh' => 刷新数据
    getPageData(where) {
      if ((where = "refresh")) {
        // this.pageNow = 1;
        this.isRefreshLoading = true;
      }
      console.log(this.sqbm)
      this.$api.page_3
        .htHseDhzypListData({
          htStatus: this.zypztValue.index,
          siteContent: this.searchValue,
          dhLevel: this.dhLevelValue.index,
          applyDept: this.sqbm.length>0?this.sqbm[0].id:'',
          applyRen: this.dhzyRen.length>0?this.dhzyRen[0].userCode:'',
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          if (res.list.length === 0) {
            this.isListLoading = false;
            this.isListMore = true;
          }
          this.listData = res.list;
          this.isFirstLoading = false;

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
    filterSearch(e) {},
    filterSelect_1(e) {
      this.selectZypzt = e.name;
    },
    filterSelect_2(e) {
      console.log(e.name);
      this.selectDhlevel = e.name;
    }
  },
  computed: mapState({
    dhzyRen: state => state.donghuo.dhzyRen,
    sqbm: state => state.donghuo.sqbm
  }),
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

.icon {
  display: flex;
}

.popup {
  padding: 20px 30px;
}

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
  line-height: 118.3 * 2px;
  font-size: 34px;
  width: 112px;
  text-align: center;
  // color: red;
}

.skeleton {
  margin-bottom: 10px;
}
.clear-button{
  width: 100%;
  padding: 10px ;
  text-align: center;
  color: #1989fa;
  border: 1px solid #1989fa;
  margin-bottom: 15px;
  cursor: pointer;
  // border: 1px solid #ff976a93;
}
</style>
