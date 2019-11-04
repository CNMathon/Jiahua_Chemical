<template>
  <div class="cheng-bao-shang">
    <van-sticky>
      <van-nav-bar
        title="承包商信息"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <van-search
        placeholder="搜索"
        shape="round"
        v-model="searchValue"
        @search="getUserList(true)"
      />
    </van-sticky>
    <div class="list">
      <van-pull-refresh v-model="isLoading" @refresh="getUserList(true)">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="getUserList()"
        >
          <div v-for="(item, index) in list" :key="index">
            <div class="item">
              <div class="left">
                <div class="title">{{ item.cbsName }}</div>
                <div class="sub-title">
                  <div class="text">
                    公司性质：{{ companyType[item.companyType] }}
                  </div>
                </div>
                <div class="sub-title">
                  <div class="text">公司电话：{{ item.companyTel }}</div>
                </div>
              </div>
              <div class="right">
                <div class="btn" @click="toDetail(item.id)">查看详情</div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "cheng_bao_shang_index",
  mixins: [mixin],
  data() {
    return {
      isLoading: false, //页面是否正在下拉刷新
      error: false, //加载错误
      loading: false, //页面是否在加载中
      finished: false, //数据是否加载完毕
      searchValue: "", //搜索框输入内容
      list: [], //承包商数据
      pageNow: 1, //当前页数
      pageSize: 20, //每页加载数量
      totalNumber: 10, //总条数
      companyType: [
        "国有企业",
        "集体所有制企业",
        "联营企业",
        "中外合资企业",
        "外商独资企业",
        "中外合作企业",
        "私营企业",
        "其他企业"
      ]
    };
  },
  created() {},
  methods: {
    // 获取承包商列表
    getUserList(refresh = false) {
      if (refresh) {
        this.pageNow = 1;
        this.loading = true;
        this.finished = false;
      }
      // 数据全部加载完成
      else if (this.list.length >= this.totalNumber) {
        this.loading = false;
        this.finished = true;
        this.isLoading = false;
        return;
      }
      let sendData = {
        pageNo: this.pageNow,
        pageSize: this.pageSize,
        cbsName: this.searchValue,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4
        .htCbsXxglJbxxList(sendData)
        .then(res => {
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          this.pageNow = this.pageNow + 1;
          if (res.list === []) {
            this.finished = true;
            return;
          }
          this.list = refresh ? res.list : [...this.list, ...res.list];
          this.totalNumber = res.count;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
          this.finished = false;
          this.isLoading = false;
        });
    },
    toDetail(id) {
      this.$router.push({ path: `./detail/${id}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.cheng-bao-shang {
  .list {
    padding-top: 20px;
    .item {
      width: 690px;
      min-height: 130px;
      margin: 0 auto;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20px;
      .left {
        width: calc(100% - 175px);
        .title {
          font-size: 32px;
          font-weight: 500;
          color: rgba(68, 68, 68, 1);
          line-height: 35px;
        }
        .sub-title {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .text {
            font-size: 28px;
            color: rgba(102, 102, 102, 1);
            line-height: 28px;
          }
        }
      }
      .right {
        width: 165px;
        margin-left: 10px;
        .btn {
          width: 165px;
          height: 60px;
          text-align: center;
          font-size: 28px;
          color: rgba(255, 255, 255, 1);
          line-height: 60px;
          background: rgba(96, 150, 248, 1);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
