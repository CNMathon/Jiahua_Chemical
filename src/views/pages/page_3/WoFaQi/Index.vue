<template>
  <div class="wofaqi">
    <van-nav-bar title="我发起的" left-text="返回" left-arrow @click-left="pageBack" fixed/>
    <van-skeleton title avatar :row="3" :loading="isLoading" class="fixed-first">
      <div class="wofaqi-content fixed-first">
        <wochuliListItem :info="pageList"></wochuliListItem>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
import wochuliListItem from "@/views/pages/page_3/components/ChuLiListCard.vue";
export default {
  name: "wofaqi-Index",
  mixins: [business],
  components: { wochuliListItem },
  data() {
    return {
      myComplete: 4,
      wait: 1,
      active: 1,
      isLoading: false,
      pageList: []
    };
  },
  methods: {
    getPageList() {
      this.isLoading = true
      this.$api.page_3
        .clientStartListData({
          __sid: localStorage.JiaHuaSessionId
        })
        .then(res => {
          this.isLoading = false
          this.pageList = res.list
          console.log(`initData: `, this.pageList)
        })
    }
  },
  created() {
    this.getPageList()
  }
};
</script>

<style lang="scss" scoped>
.wofaqi {
  min-height: 100vh;
  // background-color: #f5f5f5;
}
.wofaqi-content {
  margin-top: 10px;
  padding: 0 4%;
}
</style>