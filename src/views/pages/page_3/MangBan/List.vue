<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="盲板抽堵安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <van-search
      placeholder="请输入动火地点及内容名称进行搜索"
      v-model="searchValue"
      right-icon="wap-nav"
    />
    <div class="list-card-area">
      <list-card></list-card>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import ListCard from "@/views/pages/page_3/components/MangBanListCard";
export default {
  data() {
    return {
      searchValue: ""
    };
  },
  mixins: [mixin],
  methods: {
    onClickRight() {
      this.$router.push({
        path: "../donghuo"
      });
    },
    // selectDonghuoZyp() {
    //   this.$api.page_3
    //     .userSelect({
    //       __sid: localStorage.getItem("JiaHuaSessionId")
    //     })
    //     .then(res => {
    //       console.log(111111111)
    //       console.log(res)
    //     })
    // }
  },
  // created() {
  //   this.selectDonghuoZyp()
  // },
  components: {
    ListCard
  }
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
</style>
