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
          <div class="left-line left-line-notlast">许可证编号：{{item.permitCode}}</div>
          <div class="left-line left-line-notlast">断路原因：{{item.reason}}</div>
          <div class="left-line left-line-notlast left-line-hor">申请部门：{{item.applyDept}}</div>
          <div class="left-line left-line-notlast left-line-hor">申请人：{{item.applyer}}</div>
          <div class="left-line left-line-notlast">作业开始时间：{{item.offtimeStart}}</div>
          <div class="left-line">作业结束时间：{{item.offtimeEnd}}</div>
        </div>
        <div class="right" @click.stop="()=>{$router.push({path:'/page_3/duanlu/index',query:{id:item.id}})}" v-if="item.htStatus == 1">编辑</div>
        <div class="right" @click.stop="()=>{$router.push({path:'/page_3/duanlu/index2',query:{id:item.id}})}" v-if="item.htStatus == 2">初审</div>
        <div class="right" v-if="item.htStatus == 3">审核</div>
        <div class="right" v-if="item.htStatus == 4">有效</div>
        <div class="right" v-if="item.htStatus == 5">结束</div>
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
    selectDuanLuZyp() {
      this.$api.page_3
        .htHseDlzypListData({
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
    this.selectDuanLuZyp()
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
  &:nth-child(4) {
    margin-left: 50px;
  }
}
</style>
