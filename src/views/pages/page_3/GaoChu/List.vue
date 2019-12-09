<!-- 动火列表页 -->
<template>
  <div class="home" >
    <van-sticky>
      <van-nav-bar title="高处安全"
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
      <div class="clear-button"  @click="clearfilter">清空条件</div>
    </j-filter>
    <van-pull-refresh v-model="isLoading"
                      @refresh="getListData(true)">
        <div class="list">
          <div class="list-card-area">
            <div v-for="(item, index) in pageList"
                 :key="index"  @click.stop="toDetail(item.htStatus,item.gczyCode)">
              <div class="donghuo-list-card donghuo-list-card-nolast">
                <div class="left">
                  <div class="left-line left-line-notlast">作业内容：{{ item.workContent }}</div>
                  <div class="left-line left-line-notlast">作业地点：{{ item.workAddress }}</div>
                  <div class="left-line left-line-notlast">登高类别：{{ item.heightType }}</div>
                  <div class="left-line left-line-notlast">申请部门：{{item.office==null?'':item.office.officeName}}</div>
                  <div class="left-line left-line-notlast">申请人：{{item.user==null?'':item.user.userName}}</div>
                  <div class="left-line left-line-notlast">作业开始时间：{{ item.startTime }}</div>
                  <div class="left-line">作业结束时间：{{ item.endTime }}</div>
                </div>
                <div class="right">{{zypztList[item.htStatus].name}}</div>
              </div>
            </div>
          </div>
        </div>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { mixin } from "@/mixin/mixin";
  export default {
    name: 'gaochuList',
    data () {
      return {
        storeModule: 'gaochu',
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
        zypztList: [ // 作业票状态列表
          { index: '', name: "请选择" },
          { index: 1, name: "编辑" },
          { index: 2, name: "初审" },
          { index: 3, name: "审核" },
          { index: 4, name: "有效" },
          { index: 5, name: "已终结" }
        ],
        status: "",
      };
    },
    mixins: [mixin],
    created () {
      this.getListData(true);
      this.initGaoChuPage();
    },
    methods: {
      clearfilter () {
      this.initGaoChuPage();
      this.searchValue = '';
      this.status = '';
      this.showFilter = false;
      this.getListData(true);
      },
      initGaoChuPage () {
        this.$store.dispatch("gaochu/cleanState");
        this.$nextTick(() => {
          this.$store.commit("gaochu/add_KeepAlive", "gaochuList");
          this.$store.commit("gaochu/add_KeepAlive", "gaochuindex");
        });
      },
      pageBack () {
        this.$router.push({
          path: "/page_3/index"
        });
      },
      // 获取工作票
      getListData (refresh = false) {
        console.log('this.isLoading', this.isLoading);
        if (refresh) {
          this.pageNow = 1;
          this.isLoading = true;
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
        sendData.workContent = this.searchValue;
        sendData.htStatus = this.status;
        sendData.applyDept= this.sqbm.length>0?this.sqbm[0].id:'',
        sendData.applyRen= this.dhzyRen.length>0?this.dhzyRen[0].userCode:'',
        this.$api.page_3
          .htHseUpworkticketListData(sendData)
          .then(res => {
            console.log("res", res);
            // 加载状态结束
            this.loading = false;
            this.isLoading = false;
            // this.finished = false;
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
        if (e.index == -1) {
          this.status = ""
        }
        else {
          this.status = e.index
        }
      },
      confirmFilter () { },
      onClickRight () {
        this.initGaoChuPage();
        this.$router.push({
          path: "../gaochu"
        });
      },
      toDetail (id, status) {
        this.initGaoChuPage();
        sessionStorage.setItem('flag', '1');
        if (parseInt(id) === 1) {
          this.$router.push({ path: '/page_3/gaochu/index', query: { gczyCode: status } })
        } else if (parseInt(id)  === 2) {
          this.$router.push({ path: '/page_3/gaochu/index2', query: { gczyCode: status } })
        }else{
          this.$router.push({ path: '/page_3/gaochu/index3', query: { gczyCode: status } })
        }
      },
    },
    computed: mapState({
      dhzyRen: state => state.gaochu.dhzyRen,
      sqbm: state => state.gaochu.sqbm
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
    width: 71%;
  }

  .right {
    line-height: 118.3 * 2px;
    font-size: 1.1rem;
    width: 20%;
    text-align: center;
  }
</style>
