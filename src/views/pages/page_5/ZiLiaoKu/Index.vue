<template>
  <div class="zi-liao-ku">
    <van-sticky>
      <van-nav-bar
        title="资料库"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <van-search
        v-model="searchValue"
        placeholder="搜索"
        shape="round"
        @search="getPageData(true)"
      ></van-search>
    </van-sticky>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="getPageData(true)"
      class="refresh"
    >
      <div class="content">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="getPageData()"
        >
          <div v-for="(item, index) in pageList" :key="index">
            <div class="item">
              <div class="item__left">
                <div class="title">{{ item.fileName }}</div>
                <div class="sub-title-father">
                  <div class="sub-title">{{ item.createByname }}</div>
                  <div class="sub-title time">
                    上传时间：{{ item.createDate }}
                  </div>
                </div>
                <div class="sub-title">备注：消防手册</div>
              </div>
              <div class="item__right">
                <div class="type">{{ item.fileType.toUpperCase() }}</div>
                <div class="preview" @click="Preview(item)">预览</div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-image-preview
      v-model="showPreview"
      :images="images"
    ></van-image-preview>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "zi_liao_ku",
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
      searchValue: "",
      showPreview: false,
      images: []
    };
  },
  methods: {
    // 获取资料库数据
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
      let sendData = {
        pageNo: this.pageNow,
        pageSize: this.pageSize,
        fileName: this.searchValue,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getksTrainingFiles(sendData)
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
    // 预览
    Preview(info) {
      console.log("info: ", info);
      if (info.fileContentType.includes("image/")) {
        console.log(1);
        this.showPreview = true;
        this.images.push(info);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.zi-liao-ku {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
}
.content {
  padding: 20px 30px;
  box-sizing: border-box;
}
.item {
  margin-bottom: 20px;
  padding: 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  &__left {
    width: calc(100% - 160px);
  }
  &__right {
    width: 140px;
    text-align: center;
    position: relative;
  }
}
.title {
  margin-bottom: 33px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 34px;
}
.sub-title {
  margin-bottom: 20px;
  font-size: 28px;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
}
.type {
  font-size: 34px;
  text-align: right;
  font-weight: 500;
  color: rgba(56, 117, 229, 1);
  line-height: 34px;
}
.preview {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  width: 140px;
  height: 54px;
  background: rgba(96, 150, 248, 1);
  border-radius: 8px;
  font-size: 34px;
  text-align: center;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 54px;
}

.sub-title-father {
  display: flex;
  width: 80vw;
}

.time {
  margin-left: 30px;
}
</style>
