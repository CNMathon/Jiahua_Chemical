<template>
  <div class="qian-dao">
    <van-sticky>
      <van-nav-bar title="培训签到" left-text="返回" left-arrow @click-left="pageBack" />
    </van-sticky>
    <van-skeleton title avatar :row="3" :loading="isSkeLoading">
      <van-pull-refresh v-model="isLoading" @refresh="getPageData" class="refresh">
        <div class="nodata" v-if="!isSkeLoading && pageList.length == 0">暂无数据</div>
        <div class="content">
          <div v-for="(item, index) in pageList" :key="index">
            <div class="item" @click="checkIn(index)">
              <div class="item__head">
                <div class="title van-ellipsis">安全生产知识培训</div>
                <div class="tap">签到</div>
              </div>
              <div class="item__content">
                <div class="text">
                  <div class="text__item">培训部门：{{ item.pxDept }}</div>
                  <div class="text__item">培训负责人：{{ item.pxRen }}</div>
                </div>
                <div class="text">
                  <div class="text__item">培训等级：{{ judgeUserLv(item.pxLevel) }}</div>
                  <div class="text__item">培训方式：{{ judgeUserType(item.pxWay) }}</div>
                </div>
                <div class="text">培训课时：{{ item.pxHours }}课时</div>
                <div class="text">培训时间：{{ item.starttime }}-{{ item.endtime }}</div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </van-skeleton>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "qian_dao",
  mixins: [mixin],
  data() {
    return {
      isLoading: false, //页面是否正在下拉刷新
      isSkeLoading: false,
      pageList: [], //页面数据
      searchValue: "",
      showPreview: false,
      images: []
    };
  },
  created() {
    this.getPageData(`ske`);
  },
  methods: {
    // 获取资料库数据
    getPageData(where) {
      if (where == "ske") {
        this.isSkeLoading = true;
      }
      let sendData = {
        pageNo: this.pageNow,
        pageSize: this.pageSize,
        renName: this.$userInfo.userCode,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .htZxksPxzx(sendData)
        .then(res => {
          // 加载状态结束
          this.isLoading = false;
          this.pageList = res;
          // console.log(1111111);
          console.log(res);
          if (where == "ske") {
            this.isSkeLoading = false;
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    // 签到
    checkIn(index) {
      this.$router.push({
        name: `page_5_qian_dao_photo`,
        params: { id: this.pageList[index].id }
      });
    },
    // 预览
    Preview(info) {
      if (info.fileContentType.includes("image/")) {
        this.showPreview = true;
        this.images.push(info);
      }
    },
    // 判断培训等级
    judgeUserLv(key) {
      let Lv = ["公司级", "车间级", "班组级"];
      return Lv[Number(key)];
    },
    // 判断培训方式
    judgeUserType(key) {
      let Type = ["内部培训", "外部培训", "现场演练", "自学"];
      return Type[Number(key)];
    }
  }
};
</script>
<style lang="scss" scoped>
.nodata {
  text-align: center;
  font-size: 15px;
  margin-top: 30px;
}
.qian-dao {
  width: 100vw;
  min-height: 100vh;
  // background-color: #f6f6f6;
}
.content {
  padding: 20px 30px;
  box-sizing: border-box;
}
.item {
  margin-bottom: 20px;
  // width: 690px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  &__head {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    height: 110px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      width: calc(100% - 160px);
      font-size: 34px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 110px;
    }
    .tap {
      width: 140px;
      height: 54px;
      background: rgba(96, 150, 248, 1);
      border-radius: 8px;
      font-size: 34px;
      font-weight: 500;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 54px;
    }
  }
  &__content {
    padding: 30px;
    box-sizing: border-box;
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      font-size: 28px;
      color: rgba(102, 102, 102, 1);
      line-height: 35px;
      &__item {
        width: 50%;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
