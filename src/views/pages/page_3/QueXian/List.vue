<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="缺陷列表"
      left-text="返回"
      right-text="新增"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar v-model="searchValue" @search="getPageData(true)" @tap="showFilter = true"></j-filter-bar>

    <div class="list-card-area">
      <div class="app">
        <div class="list-title">
          <ul>
            <li>设备编号</li>
            <li>设备名称</li>
            <li>缺陷类型</li>
            <li>缺陷状态</li>
          </ul>
        </div>
        <van-skeleton
          title
          :row="3"
          :loading="isLoading"
          class="skeleton"
          v-for="(item, index) in 3"
          :key="index"
        ></van-skeleton>
        <label v-for="(item, index) in listData" :key="index">
          <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
          <div class="donghuo-list-card donghuo-list-card-nolast">
            <div class="top">
              <div class="top-item">03040898</div>
              <div class="top-item">安全阀</div>
              <div class="top-item">设备渗漏</div>
              <div class="top-item">缺陷验收</div>
            </div>
            <div class="bottom">
              <div class="bottom-item">缺陷描述缺陷描述缺陷描述缺陷描述缺陷描述缺陷描述缺陷描述</div>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
export default {
  data() {
    return {
      searchValue: "",
      listData: [],
      showPopup: true,
      isLoading: true
    };
  },
  mixins: [mixin],
  methods: {
    onClickRight() {
      this.$router.push({
        path: "./index"
      });
    },
    onClickMenu() {
      this.showPopup = true;
    },
    listSelect() {
       this.$api.page_3
         .htCbsBreakrulesmanageListData({
           __sid: localStorage.getItem("JiaHuaSessionId")
         })
         .then(res => {
           this.listData = res.list;
           this.isLoading = false
           console.log(this.listData)
         });
    }
  },
  created() {
    this.listSelect()
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

.icon {
  display: flex;
}

.popup {
  padding: 20px 30px;
}

.donghuo-list-card {
  // display: flex;
  // justify-content: space-between;
  width: 100%;
  background-color: #6096f8;
  padding: 22px 31px 22px 34px;
  color: #ffffff;
  border-radius: 10px;
}

.donghuo-list-card-nolast {
  margin-bottom: 20px;
}

.left-line-notlast {
  margin-bottom: 15px;
}

.left {
  font-size: 0.8rem;
  font-family: PingFangSC-Regular, PingFang SC;
}

.right {
  line-height: 120 * 2px;
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
}

.left-line-hor-2 {
  margin-left: 50px;
}

.list-title {
  margin-bottom: 10px;
  font-size: 28px;
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0 31px 0 34px;
    li {
      width: 25%;
      text-align: center;
      font-size: 25px;
    }
  }
}

.top {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
}

.top-item {
  width: 25%;
  text-align: center;
  line-height: 40px;
  font-size: 27px;
}

.bottom-item {
  font-size: 25px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
</style>


