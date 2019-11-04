<template>
  <div class="detail">
    <van-sticky>
      <van-nav-bar
        title="学习"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
    </van-sticky>
    <div class="content">
      <div class="item">
        <div class="title">设备解决方案.doc（20%）</div>
        <div class="btn">在线预览</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "study_detail",
  mixins: [mixin]
};
</script>
<style lang="scss" scoped>
.detail {
  height: 100vh;
  background-color: #f6f6f6;
}
.content {
  padding: 20px 30px;
  box-sizing: border-box;
}
.item {
  width: 100%;
  padding: 40px 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    width: 390px;
    font-size: 32px;
    font-weight: 500;
    color: rgba(68, 68, 68, 1);
    line-height: 40px;
  }
  .btn {
    width: 165px;
    height: 60px;
    font-size: 28px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    background: rgba(96, 150, 248, 1);
    border-radius: 8px;
  }
}
</style>
