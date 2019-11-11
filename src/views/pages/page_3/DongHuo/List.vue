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
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-item title="动火等级" :actions="dhLevelColumns" @select="filterSelect_2"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title :row="5" :loading="isFirstLoading" class="skeleton">
          <van-pull-refresh v-model="isRefreshLoading" @refresh="getPageData('refresh')">
            <van-list
              v-model="isListLoading"
              :finished="isListMore"
              :error.sync="isListLoadingError"
              error-text="请求失败，点击重新加载"
              finished-text="没有更多了"
              @load="getPageData('list')"
            >
              <label v-for="(item, index) in listData" :key="index">
                <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
                <div class="donghuo-list-card donghuo-list-card-nolast" @click="tap(item)">
                  <div class="left">
                    <div class="left-line left-line-notlast">动火地点及内容：{{item.siteContent}}</div>
                    <div class="left-line left-line-notlast">动火级别：{{item.dhLevel}}</div>
                    <div class="left-line left-line-notlast">申请部门：{{item.applyDept}}</div>
                    <div class="left-line left-line-notlast">申请人：{{item.applyRen}}</div>
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
            </van-list>
          </van-pull-refresh>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
export default {
  data() {
    return {
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
      dhLevelColumns: [
        {
          name: "制定位置特殊动火作业",
          idnex: 5
        },
        {
          name: "特殊",
          idnex: 5
        },
        {
          name: "|类",
          idnex: 5
        },
        {
          name: "||类",
          idnex: 5
        }
      ], //动火等级
      selectZypzt: {} // 选择的作业票状态
    };
  },
  mixins: [mixin],
  methods: {
    tap(info) {
      let dhzypCode = info.dhzypCode;
      if (Number(info.htStatus) === 1) {
        this.$router.push({
          path: "../donghuo",
          query: { id: dhzypCode }
        });
      } else {
        this.$router.push({
          path: "../donghuo/index2",
          query: { id: dhzypCode }
        });
      }
    },
    onClickRight() {
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

      this.$api.page_3
        .htHseDhzypListData({
          siteContent: this.searchValue,
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
      this.selectZypzt = e;
    },
    filterSelect_2(e) {
      this.selectZypzt = e;
    }
  },
  created() {
    this.getPageData();
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
</style>
