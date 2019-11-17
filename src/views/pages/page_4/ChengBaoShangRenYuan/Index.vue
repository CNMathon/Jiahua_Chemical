<template>
  <div class="cheng-bao-shang-ren-yuan">
    <van-sticky>
      <van-nav-bar
        title="承包商人员信息"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <j-filter-bar
        v-model="searchValue"
        @search="getPageData(true)"
        @tap="setShowFilter()"
      ></j-filter-bar>
    </van-sticky>
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-search
        v-model="searchValues"
        @search="filterSearch"
      ></j-filter-search>
      <j-filter-item
        title="承包商"
        :actions="cbslist"
        :valueKey="'cbsName'"
        @select="filterSelect_1"
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
          <div v-for="(item, index) in pageList" :key="index">
            <div class="item">
              <div class="info">
                <div class="left">
                  <div class="title">
                    <div class="text">员工姓名：{{ item.empName }}</div>
                    <div class="text">性别：{{ judgeUserSex(item.sex) }}</div>
                  </div>
                  <div class="title">
                    <div class="text">
                      年龄：{{ judgeAge(item.birthday) }}岁
                    </div>
                  </div>
                  <div class="title">
                    <div class="text">身份证号码：{{ item.empIdnumber }}</div>
                  </div>
                </div>
                <div class="right">
                  <div class="btn" @click="toDetail(item.id)">查看详情</div>
                </div>
              </div>
              <div class="sub-title">承包商名称：{{ item.cbs.cbsName }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { mixin } from "@/mixin/mixin";
export default {
  name: "cheng_bao_shang_ren_yuan_index",
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
      selectCbs: {}, //选择的承包商
      confirmSelectCbs: {},
      cbslist: [], // 承包商列表
      cbspageNow: 1, // 承包商-当前页码
      cbspageSize: 10000, // 承包商-每页条数
      cbstotalNumber: 20 // 承包商-总条数
    };
  },
  methods: {
    // 过滤-搜索
    filterSearch(e) {
      console.log("e: ", e);
    },
    filterSelect_1(e) {
      console.log("e: ", e);
      this.selectCbs = e;
    },
    // 确认筛选
    confirmFilter() {
      this.confirmSelectCbs = this.selectCbs;
      this.showFilter = false;
      this.$nextTick(() => {
        console.log(11);
        // 获取承包商人员列表
        this.getPageData(true);
      });
    },
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
      if(this.searchValue!=''){
        this.confirmSelectCbs.cbsName=undefined
      }
      console.log(this.confirmSelectCbs.cbsName)
      let sendData = {
        pageNo: this.pageNow,
        pageSize: this.pageSize,
        empName: this.searchValue,
        'cbs.cbsName':this.confirmSelectCbs.cbsName,
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
    // 判断用户性别
    judgeUserSex(type) {
      return type === 1 ? "男" : "女";
    },
    // 计算用户年龄
    judgeAge(date) {
      const date1 = dayjs(new Date());
      const date2 = dayjs(date);
      return date1.diff(date2, "year");
    },
    // 获取承包商列表
    getUserList() {
      let sendData = {
        pageNo: this.cbspageNow,
        pageSize: this.cbspageSize,
        cbsName: "",
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4
        .htCbsXxglJbxxList_2(sendData)
        .then(res => {
          // 加载状态结束
          this.cbspageNow = this.cbspageNow + 1;
          this.cbslist = [...this.cbslist, ...res.list];
          this.cbstotalNumber = res.count;
          this.showFilter = true;
        })
        .catch(() => {});
    },
    setShowFilter() {
      if (this.cbslist.length === 0) {
        // 获取承包商列表
        this.getUserList();
      } else {
        this.showFilter = true;
      }
    },
    toDetail(id) {
      this.$router.push({ path: `./detail/${id}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.cheng-bao-shang-ren-yuan {
  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list {
    padding-top: 20px;
    .item {
      width: 690px;
      margin: 0 auto;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20px;
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: calc(100% - 220px);
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            .text {
              font-size: 32px;
              font-weight: 500;
              color: rgba(68, 68, 68, 1);
              line-height: 1;
            }
          }
        }
        .right {
          width: 165px;
          .btn {
            width: 165px;
            text-align: center;
            font-size: 28px;
            color: rgba(255, 255, 255, 1);
            line-height: 60px;
            background: rgba(96, 150, 248, 1);
            border-radius: 8px;
          }
        }
      }
      .sub-title {
        font-size: 28px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 1;
      }
    }
  }
}
</style>
