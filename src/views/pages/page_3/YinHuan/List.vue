<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="隐患列表"
      left-text="返回"
      right-text="新建隐患"
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
              <div class="left-line left-line-notlast">整改单名称：{{item.rectificationName}}</div>
              <div class="left-line left-line-notlast">隐患部门：{{item.zgbm.officeName}}</div>
              <div class="left-line left-line-notlast">隐患负责人：{{item.zgfzr.userName}}</div>
              <div class="left-line left-line-notlast">隐患等级：{{item.dangerLevel}}</div>
              <div class="left-line left-line-notlast">隐患类型：{{item.dangerType}}</div>
            </div>
            <div class="right" v-if="item.htStatus == 1">编辑</div>
            <div class="right" v-if="item.htStatus == 2">验收关闭</div>
            <div class="right" v-if="item.htStatus == 3">整改中</div>
            <div class="right" v-if="item.htStatus == 4">预申请</div>
            <div class="right" v-if="item.htStatus == 5">验收中</div>
            <div class="right" v-if="item.htStatus == 6">拒绝</div>
            <div class="right" v-if="item.htStatus == 7">挂起</div>
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
  margin-bottom: 15px;
}

.left {
  font-size: 0.8rem;
  font-family: PingFangSC-Regular, PingFang SC;
}

.right {
  line-height: 30 * 2px;
  font-size: 34px;
  width: 100px;
  flex-direction: column;
  justify-content: center;
  display: flex;
  button {
    width: 100%;
    border-radius: 10px;
    border: none;
    background-color: white;
    font-size: 28px;
    &:active {
      background-color: #ddd;
    }
  }
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
    li {
      width: 25%;
      text-align: center;
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
}

.bottom-item {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
</style>
