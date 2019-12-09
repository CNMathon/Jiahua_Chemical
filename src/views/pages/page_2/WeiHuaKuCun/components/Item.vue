<template>
  <div class="app">
    <div class="guolu" v-for="(item, index) in info" :key="index" @click="jumpTo(`/page_1/tagsThistory`, {tagsNameShow: item.name, tagsName: item.enName, unit: item.unit})">
      <div class="name">{{item.name}}</div>
      <div class="factory">{{item.factory}}</div>
      <div class="enName">{{item.enName}}</div>
      <div class="value">{{item.value}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "guoLu",
  props: {
    info: Array
  },
  // created() {
    
  // }
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
  color: rgba(255, 255, 255, 1);
  line-height: 33px;
  text-align: left;
  .name {
    font-size: 28px;
    width: 18%;
  }
  .factory {
    width: 20%;
    font-size: 28px;
  }
  .enName {
    font-size: 25px;
    font-weight: 500;
    width: 35%;
    color: rgba(255, 255, 255, 1);
    // line-height: 33px;
  }
  .value {
    width: 20%;
    text-align: right;
    font-size: 34px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
