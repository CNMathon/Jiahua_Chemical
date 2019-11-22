<template>
  <div class="app">
    <div class="guolu" v-for="(item, index) in info" :key="index">
      <div class="title">{{item.title}}</div>
      <!-- <div class="values">{{item.name}}</div> -->
      <div class="entext">{{item.enText}}</div>
      <div class="number">
        <div class="value">{{item.value}}</div>
        <div class="unit">{{item.unit}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "guoLu",
  props: {
    info: Array
  }
};
</script>
<style lang="scss" scoped>
.guolu {
  width: 100%;
  height: 126px;
  margin: 0 auto;
  margin-bottom: 10px;
  background: rgba(96, 150, 248, 1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    width: 40%;
  }
  .title,
  .entext {
    flex: 1;
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .entext {
    flex: 2;
    text-align: center;
    width: 45%;
  }
  .number {
    width: 15%;
    font-size: 40px;
    font-weight: 500;
    text-align: right;
    color: rgba(255, 255, 255, 1);
    .unit {
      font-size: 28px;
    }
  }
}
</style>
