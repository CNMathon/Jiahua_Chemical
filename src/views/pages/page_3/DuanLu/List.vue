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
      <j-filter-item title="作业票状态" :actions="zypStatusList" @select="filterSelect_2"></j-filter-item>
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
        >
          <label v-for="(item, index) in listData" :key="index">
            <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
            <div class="donghuo-list-card donghuo-list-card-nolast" @click="jumpToMorePage(item.htStatus, item.permitCode)">
              <div class="left">
                <div class="left-line left-line-notlast">许可证编号：{{item.permitCode}}</div>
                <div class="left-line left-line-notlast" v-if="item.reason == 1">断路原因：维修马路</div>
                <div class="left-line left-line-notlast" v-if="item.reason == 2">断路原因：开挖埋设水管</div>
                <div class="left-line left-line-notlast" v-if="item.reason == 3">断路原因：埋设电缆</div>
                <div class="left-line left-line-notlast" v-if="item.reason == 4">断路原因：开挖沟渠</div>
                <div class="left-line left-line-notlast" v-if="item.reason == 5">断路原因：吊装设备</div>
                <div class="left-line left-line-notlast" v-if="item.reason == 6">断路原因：管道</div>
                <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.sqbm==null?'':item.sqbm.officeName}}</div>
                <div class="left-line left-line-notlast left-line-hor">申请人：{{item.sqr==null?'':item.sqr.userName}}</div>
                <div class="left-line left-line-notlast">作业开始时间：{{item.offtimeStart}}</div>
                <div class="left-line">作业结束时间：{{item.offtimeEnd}}</div>
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
// import ListCard from "@/views/pages/page_3/components/DuanLuListCard";
export default {
  created() {
    this.getPageData();
  },
  data() {
    return {
      showFilter: false,
      searchValue: "",
      searchValues: "",
      zypztList: [ // 作业票状态列表
        {index: -1, name: "请选择"},
        {index: 1, name: "修理马路"},
        {index: 2, name: "开挖埋设水管"},
        {index: 3, name: "埋设电缆"},
        {index: 4, name: "开挖沟渠"},
        {index: 5, name: "吊装设备"},
        {index: 6, name: "管道"}
      ],
      zypStatusList: [
        {index: -1, name: "请选择"},
        {index: 1, name: "编辑"},
        {index: 2, name: "初审"},
        {index: 3, name: "审核"},
        {index: 4, name: "有效"},
        {index: 5, name: "已终结"},
      ],
      isLoading: true,
      listData: [],
      reason: '',
      status: '',
    };
  },
  mixins: [mixin],
  methods: {
    // 跳转至详情页
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

    // 点击右侧文案事件
    onClickRight() {
      this.$router.push({
        path: "../duanlu"
      });
    },

    // 获取页面数据
    getListData() {
      this.isLoading = true
      this.$api.page_3
        .htHseDlzypListData({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          reason: this.reason,
          htStatus:this.status
        })
        .then(res => {
          this.listData = res.list;
          this.isLoading = false
          console.log(this.listData)

        });
    },
    // 确认筛选
    confirmFilter() {
      this.getListData();
    },
    
    // 选择断路原因
    filterSelect_1(e) {
      console.log(e)
      if (e.index == -1) {
        this.reason = ""
      }
      else {
        this.reason = e.index
      }
      this.getListData();
    },

    // 选择状态
    filterSelect_2(e) {
      console.log(e)
      if (e.index == -1) {
        this.status = ""
      }
      else {
        this.status = e.index
      }
    }

  },
  created() {
    this.getListData()
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

<!-- List Card -->
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
  &:nth-child(4) {
    margin-left: 50px;
  }
}
</style>
