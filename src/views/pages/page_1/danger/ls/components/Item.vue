<template>
  <div class="guolu">
    <div class="main" v-for="(item, index) in info" :key="index">
      <div class="number">{{item.itemName}}</div>
      <div class="proportion">{{item.value}}{{item.unit}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "guoLu",
  props: {
    info: Array
  },
  mounted(){
    console.log(this.info)
  }
};
</script>
<style lang="scss" scoped>
.main {
  margin-bottom: 15px;
  width: 100%;
  height: 126px;
  // margin: 0 auto;
  background: rgba(96, 150, 248, 1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px 50px 30px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .number {
    width: 33%;
    font-size: 28px;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
  }
  .value {
    width: 33%;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
    span {
      font-size: 28px;
    }
  }
  .proportion {
    text-align: right;
    width: 33%;
    font-size: 34px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
