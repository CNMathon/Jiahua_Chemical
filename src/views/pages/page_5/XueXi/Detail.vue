<template>
  <div class="detail">
    <van-sticky>
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="pageBack" />
    </van-sticky>
    <van-pull-refresh v-model="isLoading" @refresh="getMyStudyDetail()">
      <div class="content">
        <div class v-for="(itemss,indexss) in pageList" :key="indexss">
          <div class v-for="(items,indexs) in itemss.father" :key="indexs">
            <div class="item" v-for="(item,index) in items.son" :key="index">
              <div class="title">{{item.fileName}}（{{item.percent}}%）</div>
              <div class="btn">在线预览</div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "study_detail",
  mixins: [mixin],
  data() {
    return {
      title: "学习",
      isLoading: false, //页面是否正在下拉刷新
      pageList: [] //页面数据
    };
  },
  mounted() {
    // 获取学习数据
    this.getMyStudyDetail();
  },
  methods: {
    // 获取学习详情
    getMyStudyDetail() {
      let sendData = {
        courseNameId: this.$route.query.id,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getMyStudyDetail(sendData)
        .then(res => {
          this.title = res[0].courseName;
          // 加载状态结束
          this.isLoading = false;
          this.pageList = res;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    // 课件类型
    type(index) {
      console.log("index: ", index);
      let typeList = [
        "音频",
        "视频",
        "PPT",
        "WORD",
        "EXCEL",
        "PDF文档",
        "URL路径"
      ];
      return typeList[index + 1];
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  height: 100vh;
  background-color: #f6f6f6;
}
.content {
  padding: 20px 30px;
  box-sizing: border-box;
}
.item {
  width: 100%;
  padding: 40px 30px;
  margin-bottom: 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    width: 390px;
    font-size: 32px;
    font-weight: 500;
    color: rgba(68, 68, 68, 1);
    line-height: 40px;
  }
  .btn {
    width: 165px;
    height: 60px;
    font-size: 28px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    background: rgba(96, 150, 248, 1);
    border-radius: 8px;
  }
}
</style>
