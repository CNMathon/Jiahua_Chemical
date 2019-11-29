<template>
  <div class="wochuli">
    <van-nav-bar title="我处理的" left-text="返回" left-arrow @click-left="pageBack" />
    <van-tabs
      v-model="active"
      type="card"
      background="#FFFFFF"
      color="#6096F8"
      title-active-color="#FFFFFF"
      title-inactive-color="#6096F8"
    >
      <van-tab :title="'待我处理的 ('+ wait +')' " class="wochuliList-content">
        <wochuliListItem></wochuliListItem>
      </van-tab>
      <van-tab :title="'我已处理的 ('+ myComplete +')' " class="wochuliList-content">
        <wochuliListItem complete></wochuliListItem>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
import wochuliListItem from "@/views/pages/page_3/components/ChuLiListCard.vue";
export default {
  name: "wochuli-Index",
  mixins: [business],
  components: { wochuliListItem },
  data() {
    return {
      myComplete: 4,
      wait: 1,
      active: 1,
      pendLoding
    };
  }
};
</script>
<style lang="scss">
.wochuli .van-tabs--card {
  padding: 0;
}
.wochuli .van-tabs__nav--card {
  border-radius: 1.3vw;
  overflow: hidden;
}
.wochuli .van-tabs__wrap {
  padding: 4vw 5.3vw;
  box-sizing: content-box;
  background-color: #fff;
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
.wochuli {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.wochuliList-content {
  width: 100%;
  padding: 0 4%;
}
</style>