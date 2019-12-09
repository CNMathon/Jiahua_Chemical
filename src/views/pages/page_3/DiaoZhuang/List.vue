<!-- 吊装列表页 -->
<template>
  <van-list class="home"  v-model="loading"
                :finished="finished" 
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="getListData" >
    <van-sticky>
      <van-nav-bar title="吊装安全"
                   left-text="返回"
                   right-text="发起"
                   left-arrow
                   @click-left="pageBack"
                   @click-right="onClickRight" />
      <j-filter-bar v-model="searchValue"
                    placeholder="请输入吊装内容名称"
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
                 :key="index" @click="jumpToMorePage(item.htStatus,item.zypcode)">
              <div class="donghuo-list-card donghuo-list-card-nolast">
                <div class="left">
                  <div class="left-line left-line-notlast">吊装内容：{{ item.dznr }}</div>
                  <div class="left-line left-line-notlast">吊装地点：{{ item.dzdd }}</div>
                  <div class="left-line left-line-notlast">起吊重物质量：{{ item.qdzwzl }}</div>
                  <div class="left-line left-line-notlast">申请部门：{{item.sqbmDept==null?'':item.sqbmDept.officeName}}</div>
                  <div class="left-line left-line-notlast">申请人：{{ item.sqr }}</div>
                  <div class="left-line left-line-notlast">作业开始时间：{{ item.zyksDate }}</div>
                  <div class="left-line">作业结束时间：{{ item.zyjsDate }}</div>
                </div>
                 <div class="right">{{zypztList[item.htStatus].name}}</div>
              </div>
            </div>
          </div>
        </div>
    </van-pull-refresh>
  </van-list>
</template>

<script>
  import { mapState } from "vuex";
  import {
    mixin
  } from "@/mixin/mixin";
  export default {
    name: 'diaozhuangList',
    data () {
      return {
        storeModule: 'diaozhuang',
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
          {
          name: '选择',
          index: ''
        },{
          name: "编辑",
          index: 1
        },
        {
          name: "初审",
          index: 2
        },
        {
          name: "审核",
          index: 3
        },
        {
          name: "有效",
          index: 4
        },
        {
          name: "已终结",
          index: 5
        }
        ] // 作业票状态列表
      };
    },
    searchStatus: "",
    mixins: [mixin],
    created () {
      this.getListData(true);
      this.initDiaoZhuangPage();
    },
    methods: {
      clearfilter () {
      this.initDiaoZhuangPage();
      this.searchValue = '';
      this.searchStatus = '';
      this.showFilter = false;
      this.getListData(true);
      },
      initDiaoZhuangPage () {
        this.$store.dispatch("diaozhuang/cleanState");
        this.$nextTick(() => {
          this.$store.commit("diaozhuang/add_KeepAlive", "diaozhuangList");
          this.$store.commit("diaozhuang/add_KeepAlive", "diaozhuang_index");
        });
      },
      // 跳转至详情页
    jumpToMorePage (status, code) {
      this.initDiaoZhuangPage();
      localStorage.setItem('isfresh',"diaozhuanglist");
      let path = '';
      switch (Number(status)) {
        case 1:
          path += '/page_3/diaozhuang/index';
          break;
        case 2:
          path += '/page_3/diaozhuang/index2';
          break;
        case 3:
        case 4:
        case 5:
        case 6:
          path += '/page_3/diaozhuang/index3';
          break;
      }
      this.$router.push({
          path: path,
          query: { zypcode: code }
        });
    },
      pageBack () {
        this.$router.push({
          path: "/page_3/index"
        });
      },
			/**
			 * 获取吊装工作票
			 */
      getListData (refresh = false) {
        if (refresh) {
          this.pageNow = 10;
          this.isLoading = true;
          this.finished = true;
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
        sendData.dznr = this.searchValue;
        sendData.htStatus = this.searchStatus;
        sendData.sqbm= this.sqbm.length>0?this.sqbm[0].id:'',
        sendData.sqr_code= this.dhzyRen.length>0?this.dhzyRen[0].userCode:'',
        this.$api.page_3
          .htHseDzzypList(sendData)
          .then(res => {
            // 加载状态结束
            console.log(res)
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
		  
      localStorage.setItem("isfresh",true);
      this.initDiaoZhuangPage();
        this.$router.push({
          path: "../diaozhuang"
        });
      }
    },
    computed: mapState({
      dhzyRen: state => state.diaozhuang.dhzyRen,
      sqbm: state => state.diaozhuang.sqbm
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
  }

  .right {
    line-height: 118.3 * 2px;
    font-size: 1.1rem;
  }
</style>
