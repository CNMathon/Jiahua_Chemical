<template>
  <div class="home">
    <van-nav-bar
      title="项目列表"
      left-text="返回"
      right-text="确定"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar
      v-model="searchValue"
      placeholder="搜索"
      @search="getPageData('refresh')"
      @tap="showFilter = true"
    ></j-filter-bar>
    <j-filter v-model="showFilter" @confirm="getPageData('refresh')">
      <j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <j-filter-item title="动火等级" :actions="dhLevelColumns" @select="filterSelect_2"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
    </j-filter>
    <ul class="list-title">
      <li>项目名称</li>
      <li>责任部门</li>
      <li>项目级别</li>
      <li>计划时间</li>
    </ul>
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
              <div class="donghuo-list-card donghuo-list-card-nolast">
                <div class="check-list item">
                  <van-radio shape="square" v-model="radio" :name="index" />
                </div>
                <div class="item">{{item.projectName}}</div>
                <div class="item" v-if="`correlation` in item">{{item.correlation.officeName}}</div>
                <div class="item" v-else>空</div>
                <div class="item">{{item.projectGrade}}</div>
                <div class="item">
                  <div>{{item.planStartDate}}</div>
                  <div>{{item.planEndDate}}</div>
                </div>
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
import { mixin } from "@/mixin/mixin";
import { mapMutations } from "vuex";

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
      selectZypzt: "", // 选择的作业票状态
      selectDhlevel: "",
      radio: -1
    };
  },
  mixins: [mixin],
  created() {
    console.log(`routerQuery: `, this.$route.query)
    console.log(`storeModule: `, this.storeModule)
    console.log(`storeKey: `, this.storeKey)
    console.log(`result: `, this.result)
    this.getPageData();
  },
  methods: {
    // ...mapMutations("quexian", {
    //   setTag: "setTag"
    // }),
    pageBack() {
      this.$router.back(-1)
    },
    onClickRight() {
      let obj = {
        key: this.storeKey,
        value: [this.listData[this.radio]]
      };
      // if (this.$route.query.radio) {
      //   obj.value = [];
      //   obj.value.push(this.list[this.radio]);
      // }
      console.log(`changeVuexData:`, obj)
      this.$store.dispatch(`${this.storeModule}/changTag`, obj);
      this.$router.back();
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

      console.log(this.$api.page_3)
      this.$api.page_3
        .deviceProjectListData({
          // siteContent: this.searchValue,
          // dhLevel: this.selectDhlevel,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log(res)
          if (res.list.length === 0) {
            this.isListLoading = false;
            this.isListMore = true;
          }
          this.listData = res.list;
          console.log(`listData: `, this.listData);
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
  computed: {
    storeModule() {
      return this.$route.query.storeModule
    },
    storeKey() {
      return this.$route.query.storeKey
    },
    result() {
      return this.$store.state[this.storeModule][this.storeKey]
    }
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
  width: 100%;
  background-color: #6096f8;
  padding: 30px 31px 30px 34px;
  color: #ffffff;
  border-radius: 10px;
  line-height: 40px;
  font-size: 25px;
  .item:nth-child(1) {
    width: 10%;
  }
  .item:nth-child(2) {
    width: 35%;
  }
  .item:nth-child(3) {
    width: 25%;
    text-align: center;
  }
  .item:nth-child(4) {
    width: 5%;
    text-align: center;
  }
  .item:nth-child(5) {
    display: flex;
    flex-direction: column;
    width: 25%;
    text-align: right;
  }
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
  font-size: 34px;
  width: 112px;
  text-align: center;
  // color: red;
}

.skeleton {
  margin-bottom: 10px;
}

.list-title {
  display: flex;
  padding: 0px 70px 20px 180px;
  font-size: 28px;
  li {
    width: 33%;
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
}
</style>
