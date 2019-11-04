<template>
  <div class="weihua">
    <van-nav-bar
      title="数据监控"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    ></van-nav-bar>
    <div class="top van-hairline--bottom">
      <div class="search">
        <van-search
          class="van-search"
          placeholder="搜索"
          v-model="value"
          shape="round"
        />
      </div>
      <div class="tip">
        <div class="text">库存状态</div>
        <div class="icon" @click="show = true">
          <van-icon class="van-icon" name="bars" size="18px" color="#6096F8" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="head">
        <div>危化品</div>
        <div>库存</div>
        <div>库存状态</div>
      </div>
      <div class="list">
        <div class="item" v-for="index in 20" :key="index">
          <Item></Item>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import Item from "./components/Item";
export default {
  name: "weihua",
  components: {
    Item
  },
  data() {
    return {
      value: "",
      show: false,
      columns: ["偏高", "正常", "偏低"]
    };
  },
  methods: {
    onConfirm(value, index) {
      console.log("index: ", index);
      console.log("value: ", value);
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    pageBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.weihua {
  background-color: #f5f5f5;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    box-sizing: border-box;
    padding: 18px 30px;
    .search {
      flex: auto;
      .van-search {
        padding: 0;
        padding-right: 20px;
      }
    }
    .tip {
      display: flex;
      align-items: center;
      .text {
        font-size: 28px;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        padding-right: 20px;
      }
      .icon {
        .van-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .content {
    width: 100%;
    background: #ffffff;
    .content-title {
      padding: 16px 30px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 42px;
      border-bottom: 1px solid #fafafa;
    }
    .head {
      width: 100vw;
      box-sizing: border-box;
      padding: 20px 60px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 32px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 32px;
      background-color: #ffffff;
    }
    .list {
      box-sizing: border-box;
      padding: 30px;
      padding-top: 0;
      background-color: #ffffff;
      .item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
