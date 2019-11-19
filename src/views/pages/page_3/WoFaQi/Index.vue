<template>
  <div class="wofaqi">
      <van-nav-bar title="我发起的" left-text="返回" left-arrow @click-left="pageBack" />
      <div class="wofaqi-content">
        <wochuliListItem ></wochuliListItem>
      </div>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
import wochuliListItem from "@/views/pages/page_3/components/ChuLiListCard.vue";
export default {
  name: "wofaqi-Index",
  mixins: [business],
  components: {wochuliListItem},
  data() {
    return {
      myComplete: 4,
      wait: 1,
      active: 1,
    };
  }
};
</script>

<style lang="scss" scoped>
.wofaqi {
  min-height: 100vh;
  background-color: #F5F5F5;
}
.wofaqi-content{
  margin-top: 10px;
  padding: 0 4%;
}
</style>