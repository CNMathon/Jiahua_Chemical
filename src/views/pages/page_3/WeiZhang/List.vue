<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="违章列表"
      left-text="返回"
      right-text="新建违章"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar v-model="searchValue" @search="getPageData(true)" @tap="showFilter = true"></j-filter-bar>

    <div class="list-card-area">
      <div class="app">
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
            <div class="left">
              <div class="left-line left-line-notlast">动火地点及内容：{{item.siteContent}}</div>
              <div class="left-line left-line-notlast">动火级别：{{item.dhLevel}}</div>
              <div class="left-line left-line-notlast">申请部门：{{item.applyDept}}</div>
              <div class="left-line left-line-notlast">申请人：{{item.applyRen}}</div>
              <div class="left-line left-line-notlast">动火开始时间：{{item.dhStarttime}}</div>
              <div class="left-line">动火结束时间：{{item.dhEndtime}}</div>
            </div>
            <div class="right" v-if="item.htStatus == 1">编辑</div>
            <div class="right" v-if="item.htStatus == 2">初审</div>
            <div class="right" v-if="item.htStatus == 3">有效</div>
            <div class="right" v-if="item.htStatus == 4">已验票</div>
            <div class="right" v-if="item.htStatus == 5">已终结</div>
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
        .dangerRectificationListData({
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
</style>
