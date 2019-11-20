<template>
  <div class="home">
    <van-nav-bar title="流程记录" left-text="返回" left-arrow @click-left="pageBack" fixed/>
    <div class="liu-cheng-head">
      <span v-for="(item,index) in head" :key="index">{{item}}</span>
    </div>
    <div class="liu-cheng-content">
      <div class="item">
        <span></span>
        <span>MeS管理员</span>
        <span>已审批</span>
        <span></span>
        <span>2019-01-01 06:00:00</span>
      </div>
      <div class="item">
        <span>基础信息填写</span>
        <span></span>
        <span>已审批</span>
        <span>同意</span>
        <span>2019-01-01 06:00:00</span>
      </div>
       <div class="item">
        <span></span>
        <span>MeS管理员</span>
        <span>已审批</span>
        <span>专工签发</span>
        <span>2019-01-01 06:00:00</span>
      </div>
    </div>
  </div>
</template>F

<script>
import { business } from "@/mixin/business";
export default {
  name: "liucheng",
  mixins: [business],
  components: {},
  data() {
    return {
      head: ["节点", "处理人", "状态", "处理意见", "处理时间"]
    };
  },
  methods: {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    onClickRight() {},
    jieDianManSelect(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.whiteCell {
  background-color: #fff !important;
}
.liu-cheng-head {
  border-bottom: 1px solid #eee;
  overflow: hidden;
  span {
    width: 20%;
    float: left;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    line-height: 2.03125rem;
    overflow: hidden;
  }
}
.liu-cheng-content {
  .item {
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    line-height: 1.53125rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      text-align: center;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.775rem;
      overflow: hidden;
    }
  }
}
</style>>
