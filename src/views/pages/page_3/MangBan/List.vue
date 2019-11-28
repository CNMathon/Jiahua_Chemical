<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar title="盲板抽堵安全"
                 left-text="返回"
                 right-text="发起"
                 left-arrow
                 @click-left="pageBack"
                 @click-right="onClickRight" />
    <j-filter-bar v-model="searchValue"
                  placeholder="请输入设备管道名称"
                  @search="getPageData"
                  @tap="showFilter = true" />
    <j-filter v-model="showFilter"
              @confirm="getPageData">
      <j-filter-search v-model="searchValues"
                       @search="filterSearch"></j-filter-search>
      <j-filter-item title="作业票状态"
                     :actions="zypztList"
                     @select="filterSelect_1"></j-filter-item>
      <j-filter-cell title="申请部门"></j-filter-cell>
      <j-filter-cell title="申请人"></j-filter-cell>
      <j-filter-time title="创建时间"></j-filter-time>
    </j-filter>
    <div class="list-card-area">
      <div class="app">
        <van-skeleton title
                      :row="3"
                      :loading="isLoading"
                      class="skeleton">
          <label v-for="(item, index) in listData"
                 :key="index">
            <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
            <div class="donghuo-list-card donghuo-list-card-nolast" @click.stop="jumpToMorePage(item.htStatus, item.id)">
              <div class="left">
                <div class="left-line left-line-notlast">设备管道名称：{{item.pipe}}</div>
                <div class="left-line left-line-notlast">盲板抽堵编号：{{item.mbzypCode}}</div>
                <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.office==null?'':item.office.officeName}}</div>
                <div class="left-line left-line-notlast left-line-hor">申请人：{{item.user==null?'':item.user.userName}}</div>
                <div class="left-line left-line-notlast">生活部门产品负责人：{{item.sc?item.sc.userName:''}}</div>
                <div class="left-line">作业部门负责人：{{item.zy?item.zy.userName:''}}</div>
              </div>
              <div class="right">{{zypztList[item.htStatus].name}}</div>
            </div>
          </label>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
  import { mixin } from "@/mixin/mixin";
  export default {
    data () {
      return {
        showFilter: false,
        searchValue: "",
        searchValues: "",
        zypztList: [
          // 作业票状态列表
          { name: "请选择", index: -1 },
          { name: "编辑", index: 1 },
          { name: "提交资料", index: 2 },
          { name: "初审", index: 3 },
          { name: "审核", index: 4 },
          { name: "有效", index: 5 },
          { name: "结束", index: 6 }
        ],
        searchStatus: "",
        isLoading: true,
        listData: [],
        status: ""
      };
    },
    mixins: [mixin],
    created () {
      this.getPageData();
      this.$store.dispatch("mangban/cleanState");
      this.$store.commit("mangban/delete_KeepAlive", "mangbanindex");
      this.$nextTick(() => {
        this.$store.commit("mangban/add_KeepAlive", "mangbanindex");
      });
    },
    methods: {
      // 跳转至详情页
      jumpToMorePage (status, code) {
        let path = '';
        switch (Number(status)) {
          case 1:
            path += '../mangban';
            break;
          case 2:
            path += '../mangban/index2';
            break;
          case 3:
            path += '../mangban/index3';
            break;
          case 4:
          case 5:
          case 6:
            path += '../mangban/index4';
            break;
        }
        this.$router.push({
            path: path,
            query: { id: code }
          });
      },
      pageBack () {
        this.$router.push({
          path: "/page_3/index"
        });
      },
      // 右侧文字点击文案
      onClickRight () {
        this.$router.push({
          path: "../mangban"
        });
      },

      // 获取页面数据
      getPageData (where) {
        this.isLoading = true;
        this.$api.page_3
          .htHseMbzypListData({
            pipe: this.searchValue,
            htStatus: this.searchStatus,
            __sid: localStorage.getItem("JiaHuaSessionId")
          })
          .then(res => {
            this.isLoading = false;
            this.listData = res.list;
            this.isFirstLoading = false;
            console.log(this.listData);

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
      filterSearch () { },
      filterSelect_1 (e) {
        console.log(e);
        this.searchStatus = e.index;
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
</style>


<!-- listData样式 -->
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
    width: 150px;
    text-align: center;
    // color: red;
    word-break: keep-all;
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
