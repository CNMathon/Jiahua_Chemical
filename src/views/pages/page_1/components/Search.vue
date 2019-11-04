<template>
  <div class="search van-hairline--bottom">
    <van-search placeholder="搜索客户" v-model="value" shape="round" />
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      value: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 102px;
  background: rgba(255, 255, 255, 1);
}
</style>
