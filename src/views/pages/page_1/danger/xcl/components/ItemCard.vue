<template>
  <div class="danger-content">
    <div class="item-title">
      <div class="item-title-item">名称</div>
      <div class="item-title-item">值</div>
    </div>
    <div class="item-area">
      <Item size="big" :info="info" />
    </div>
  </div>
</template>

<script>
import Item from "./Item";
export default {
  props: {
    info: Array
  },
  components: {
    Item
  }
};
</script>

<style lang="scss" scoped>
.danger-content {
  padding-left: 30px;
  padding-right: 30px;
  .item-title {
    display: flex;
    justify-content: space-between;
    padding: 10px 50px 10px 50px;
  }
}
</style>