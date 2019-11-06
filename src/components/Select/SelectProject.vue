<template>
  <div id="app">
    <van-nav-bar
      title="请选择"
      left-text="返回"
      right-text="新建违章"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <van-cell title="URL 跳转" is-link url="/vant/mobile.html" />
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
export default {
}
</script>