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
    <j-filter v-model="showFilter" @confirm="getPageData">
      <j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
      <cell-select-department
        title="申请部门"
        radio
        :storeModule="storeModule"
        storeKey="sqbm"
        v-model="sqbm"
      />
      <select-organization 
        title="申请人"
        max="9"
        :storeModule="storeModule"
        storeKey="zyRen"
        v-model="zyRen"
        no-padding
      />
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title :row="3" :loading="isLoading" class="skeleton">
          <label v-for="(item, index) in listData" :key="index">
            <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
            <div
              class="donghuo-list-card donghuo-list-card-nolast"
              @click="jumpToMorePage(item.htStatus, item.sxkjCode)"
            >
              <div class="left">
                <div class="left-line left-line-notlast">作业内容：{{item.zyContent}}</div>
                <div
                  class="left-line left-line-notlast left-line-hor"
                >申请部门：{{item.office==null?'':item.office.officeName}}</div>
                <div
                  class="left-line left-line-notlast left-line-hor"
                >申请人：{{item.user==null?'':item.user.userName}}</div>
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
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mixin } from "@/mixin/mixin";
export default {
  name: "kongjian_list",
  data() {
    return {
      storeModule: 'kongjian',
      showFilter: false,
      searchValue: "",
      searchValues: "",
      zypztList: [
        { index: -1, name: "请选择" },
        { index: 1, name: "编辑" },
        { index: 2, name: "初审" },
        { index: 3, name: "审核" },
        { index: 4, name: "审批" },
        { index: 5, name: "有效" },
        { index: 6, name: "终结" }
      ], // 作业票状态列表
      listData: [],
      isLoading: true,
      status: ""
    };
  },
  mixins: [mixin],
  created() {
    this.getPageData();
    this.$store.dispatch("kongjian/cleanState");
    this.$store.commit("kongjian/delete_KeepAlive", "kongjianindex");
    this.$store.commit("kongjian/delete_KeepAlive", "kongjianindex2");
    this.$nextTick(() => {
      this.$store.commit("kongjian/add_KeepAlive", "kongjianindex");
      this.$store.commit("kongjian/add_KeepAlive", "kongjianindex2");
    });
  },
  methods: {
    pageBack() {
      this.$router.push({
        path: "/page_3/index"
      });
    },
    getPageData() {
      this.isLoading = true;
      this.$api.page_3
        .htHseSxkjzypListData({
          zyContent: this.searchValue,
          htStatus: this.status,
          applyDept: this.sqbm[0].id,
          applyRen: this.sqRen[0].userCode,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
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
    jumpToMorePage(status, code) {
      if (Number(status) === 1) {
        this.$router.push({
          path: "../kongjian",
          query: { id: code }
        });
      } else if (Number(status) === 2) {
        this.$router.push({
          path: "../kongjian/index2",
          query: { id: code }
        });
      } else {
        console.log(3234);
        this.$router.push({
          path: "/page_3/kongjian/index3",
          query: { id: code }
        });
      }
    },
    confirmFilter() {},
    filterSearch() {},
    // 选择断路原因
    filterSelect_1(e) {
      if (e.index == -1) {
        this.status = "";
      } else {
        this.status = e.index;
      }
    }
  },
  computed: mapState({
    zyRen: state => state.kongjian.zyRen,
    sqbm: state => state.kongjian.sqbm
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
  margin-bottom: 10px;
}

.left-line-hor {
  display: inline;
  &:nth-child(3) {
    margin-left: 50px;
  }
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";

.mangban {
  .next {
    width: 100%;
    height: 98px;
    margin-top: 25px;
    font-size: 32px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 98px;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  }
}

.head {
  display: flex;
  text-align: center;
  margin-bottom: 20px;

  .head_1 {
    width: 420px;
  }

  .head_2 {
    width: 100px;
  }

  .head_3 {
    width: 300px;
  }
}

.action {
  padding-left: 30px;
  padding-right: 30px;
  background-color: transparent;

  button {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
    background-color: white;
    border: none;
    border-radius: 30px;
    color: rgb(0, 118, 255);
    font-size: 35px;
  }
}
</style>
