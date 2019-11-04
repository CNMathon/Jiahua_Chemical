<template>
  <div class="shebei">
    <div class="title">设备类型名称</div>
    <div class="list">
      <div class="item van-hairline--surround" v-for="index in 12" :key="index">
        设备名称
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shebei"
};
</script>
<style lang="scss" scoped>
.shebei {
  box-sizing: border-box;
  padding: 30px;
  .title {
    font-size: 31px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 30px;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px 20px;
    .item {
      font-size: 28px;
      color: rgba(51, 51, 51, 1);
      border-radius: 8px;
      line-height: 70px;
      text-align: center;
    }
  }
}
</style>
