<template>
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
      <div class="donghuo-list-card donghuo-list-card-nolast" @click="tap(item)">
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
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      isLoading: true
    };
  },
  methods: {
    selectDonghuoZyp() {
      this.$api.page_3
        .htHseDhzypListData({
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.listData = res.list;
          this.isLoading = false;
          console.log(this.listData);
        });
    },
    tap(info) {
      console.log("info: ", info);
      let dhzypCode = info.dhzypCode;
      this.$router.push({
        path: "../dongtu",
        query: { id: dhzypCode }
      });
    }
  },
  created() {
    this.selectDonghuoZyp();
  }
};
</script>

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
  line-height: 118.3 * 2px;
  font-size: 34px;
  width: 112px;
  text-align: center;
  // color: red;
}

.skeleton {
  margin-bottom: 10px;
}
</style>
