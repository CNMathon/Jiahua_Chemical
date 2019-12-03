<!-- 动火列表页 -->
<template>
  <van-list class="home">
    <van-sticky>
      <van-nav-bar title="临时用电"
                   left-text="返回"
                   right-text="发起"
                   left-arrow
                   @click-left="pageBack"
                   @click-right="onClickRight" />
      <j-filter-bar v-model="searchValue"
                    placeholder="请输入作业内容名称"
                    @search="getListData(true)"
                    @tap="setShowFilter()"></j-filter-bar>
    </van-sticky>
    <j-filter v-model="showFilter"
              @confirm="getListData(true)">
      <j-filter-search v-model="searchValues"
                       @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态"
                     :actions="zypztList"
                     @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
    </j-filter>
    <van-pull-refresh v-model="isLoading"
                      @refresh="getListData(true)">
      <van-skeleton title
                    :row="3"
                    :loading="loading"
                    class="skeleton">
        <div class="list">
          <div class="list-card-area">
            <div v-for="(item, index) in pageList"
                 :key="index"  @click="toIndex(item.htStatus, item)">
              <div class="donghuo-list-card donghuo-list-card-nolast">
                <div class="left">
                  <div class="left-line left-line-notlast">作业内容：{{ item.workContent }}</div>
                  <div class="left-line left-line-notlast">作业地点：{{ item.workLocation }}</div>
                  <div class="left-line left-line-notlast">用电方式：{{ item.powerType === 1 ? "插座" : "插线" }}</div>
                  <div class="left-line left-line-notlast">申请部门：{{ item.sqbm?item.sqbm.officeName:'' }}</div>
                  <div class="left-line left-line-notlast">申请人：{{ item.sqr?item.sqr.userName:'' }}</div>
                  <div class="left-line left-line-notlast">作业开始时间：{{ item.powertimeStart }}</div>
                  <div class="left-line">作业结束时间：{{ item.powertimeEnd }}</div>
                </div>
                <div>
                  <div class="right">{{zypztList[item.htStatus] ? zypztList[item.htStatus].name : '编辑'}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </van-pull-refresh>
  </van-list>
</template>

<script>
  import { mixin } from "@/mixin/mixin";
  export default {
    data () {
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
        cbslist: [],
        selectCbs: {}, //选择的承包商
        confirmSelectCbs: {},
        zypztList: [
          { index: -1, name: "请选择" },
          { index: 1, name: "编辑" },
          { index: 2, name: "初审" },
          { index: 3, name: "有效" },
          { index: 4, name: "已验票" },
          { index: 5, name: "已终结" }
        ], // 作业票状态列表
        searchStatus: ""
      };
    },
    mixins: [mixin],
    methods: {
      pageBack () {
        this.$router.push({
          path: "/page_3/index"
        });
      },
      // 编辑
      toIndex (index, item) {
        let path = '';
        console.log('index', index);
        switch (Number(index)) {
          case 1:
            path += '../linshi/index';
            break;
          case 2:
          case 3:
          case 4:
          case 5:
            path += '../linshi/index2';
            break;
          default:
            path += '../linshi/index';
            break;
        }
        this.$router.push({
            path: path,
            query: { zypCode: item.id }
          });
      },
      /**
       * 获取吊装工作票
       */
      getListData (refresh = false) {
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
        let sendData = {};
        sendData.__sid = this.$userInfo.sessionId;
        sendData.htStatus = this.searchStatus;
        this.$api.page_3
          .htHseLsydzypListData(sendData)
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
      setShowFilter () {
        this.showFilter = true;
      },
      filterSearch () { },
      filterSelect_1 (e) {
        console.log(e)
        this.searchStatus = e.index
      },
      confirmFilter () { },
      onClickRight () {
        sessionStorage.setItem('flag', '1')
        this.$router.push({
          path: "../linshi"
        });
      },
      toDetail (id, status) {
        console.log("id: ", id);
        console.log("status: ", status);
        this.$router.push({
          path: "../linshi",
          query: {
            id: id,
            status: status
          }
        });
      }
    },
    created () {
      this.getListData(true);
      this.$store.dispatch("linshi/cleanState");
      this.$store.commit("linshi/delete_KeepAlive", "linshiindex");
      this.$store.commit("linshi/delete_KeepAlive", "linshiindex2");
      this.$nextTick(() => {
        this.$store.commit("linshi/add_KeepAlive", "linshiindex");
        this.$store.commit("linshi/add_KeepAlive", "linshiindex2");
      });
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
    width: 72%;
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
  }

  .right {
    line-height: 118.3 * 2px;
    font-size: 1.1rem;
  }
</style>
