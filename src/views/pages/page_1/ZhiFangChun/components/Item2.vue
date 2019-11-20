<template>
  <div>
    <div class="item" v-for="(item, index) in value" :key="index">
      <div class="guolu">
        <div class="value">{{item.text}}</div>
        <div class="value entext">{{item.enText}}</div>
        <div class="number">
          {{item.value}}
          <div class="unit">{{item.unit}}</div>
        </div>
      </div>
    </div>
  </div>
  
  
</template>
<script>
export default {
  name: "guoLu",
  props: {
    value: Array
  },
  // methods: {
    
  // }
};
</script>
<style lang="scss" scoped>
.guolu {
  width: 100%;
  height: 126px;
  margin: 0 auto;
  background: rgba(96, 150, 248, 1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // * {
  //   width: 33%;
  // }
  .entext {
    text-align: center;
  }
  .value {
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    width: 35%;
  }
  .number {
    font-size: 35px;
    font-weight: bold;
    text-align: right;
    color: rgba(255, 255, 255, 1);
    width: 20%;
    .unit {
      font-size: 28px;
      text-align: right;
    }
  }
}
.item {
  margin-bottom: 10px;
}
</style>
