<template>
  <div class="app">
    <van-skeleton
      title
      :row="3"
      :loading="isLoading"
      class="skeleton"
      v-for="(item, index) in 3"
      :key="index"
    >
    </van-skeleton>
    <label v-for="(item, index) in listData" :key="index">
      <!-- 此处在做完AJAX后需要判断是否为最后行 - class存在判断 -->
      <div class="donghuo-list-card donghuo-list-card-nolast">
        <div class="left">
          <div class="left-line left-line-notlast">作业内容：{{item.sxkjNeurogen}}</div>
          <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.office.officeName}}</div>
          <div class="left-line left-line-notlast left-line-hor">申请人：{{item.applyRen}}</div>
          <div class="left-line left-line-notlast">作业开始时间：{{item.zyStarttime}}</div>
          <div class="left-line">作业结束时间：{{item.zyEndtime}}</div>
        </div>
        <div class="right" v-if="item.htStatus == 1">编辑</div>
        <div class="right" v-if="item.htStatus == 2">初审</div>
        <div class="right" v-if="item.htStatus == 3">审核</div>
        <div class="right" v-if="item.htStatus == 4">审批</div>
        <div class="right" v-if="item.htStatus == 5">有效</div>
        <div class="right" v-if="item.htStatus == 6">终结</div>
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
    selectKongJianZyp() {
      this.$api.page_3
        .htHseSxkjzypListData({
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
    this.selectKongJianZyp()
  },
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
  line-height: 80 * 2px;
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
  &:nth-child(3) {
    margin-left: 50px;
  }
}
</style>
