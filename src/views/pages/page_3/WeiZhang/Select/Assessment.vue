<template>
  <div class="select-user">
    <van-sticky>
      <van-nav-bar title="考核标准" left-text="返回" left-arrow @click-left="pageBack" />
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        :clearable="false"
      />
    </van-sticky>
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getUserData">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="item.id" @click="radio = index">
              <template slot="title">
                <div class="cell-title">
                  <div class="info">
                    <div class="name">{{ item.normName }}</div>
                  </div>
                </div>
              </template>
              <van-radio slot="icon" :name="index" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </div>
    <div class="action" v-if="!$route.query.radio" @click="pageBack">确定</div>
    <div class="action" v-else @click="pageBack">确定</div>
  </div>
</template>
<script>
export default {
  name: "selectUser",
  data() {
    return {
      pageSetting: {
        count: 10, //数据总条数
        pageNo: 1, // 页码
        pageSize: 20 // 每页条数
      },
      searchValue: "", //搜索内容
      list: [],
      loading: false,
      finished: false,
      radio: ""
    };
  },
  methods: {
    // 搜索
    onSearch() {
      this.list = "";
      this.getUserData();
    },
    // 取消搜索
    onCancel() {
      this.searchValue = "";
      this.list = "";
      this.getUserData();
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
      this.getUserData();
    },
    // 获取数据列表
    getUserData() {
      let sendData = {
        refName: this.searchValue,
        pageNo: this.pageSetting.pageNo,
        pageSize: this.pageSetting.pageSize,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_3
        .violationAssessmentCriteria(sendData)
        .then(res => {
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.list.length >= this.pageSetting.count) {
            this.finished = true;
            return;
          }
          let list = res.list.map(item => {
            let newItem = {};
            newItem.normName = item.normName;
            newItem.normNub = item.normNub;
            return newItem;
          });
          this.pageSetting.count = res.count;
          this.pageSetting.pageNo = res.pageNo + 1;
          this.list = [...this.list, ...list];
        })
        .catch(() => {});
    },
    pageBack() {
      let obj = {
        key: "wzstandard",
        value: this.result
      };
      obj.value = [];
      obj.value.push(this.list[this.radio]);
      this.$store.dispatch(`weizhang/changTag`, obj);
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.select-user {
  padding-bottom: 100px;
  .list {
    .cell-title {
      margin-left: 15px;
      display: flex;
      align-items: center;
      .header {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 20px;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .info {
        width: 500px;
        overflow: hidden;
        .name {
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
        }
        .department {
          font-size: 28px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .action {
    width: 100vw;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
