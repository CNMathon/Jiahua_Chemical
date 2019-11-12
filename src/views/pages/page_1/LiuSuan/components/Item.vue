<template>
  <div class="guolu">
    <div class="value">装置名称</div>
    <div class="values">{{desc}}</div>
    <div class="values">{{id}}</div>
    <div class="number">
      {{value}}
      <div class="unit">{{unit}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "guoLu",
  props: {
    desc: String,
    id: String,
    value: Number,
    unit: String
  }
}
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
  .value,
  .values {
    flex: 1;
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .values {
    flex: 2;
    text-align: center;
  }
  .number {
    font-size: 40px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: right;
    .unit {
      font-size: 28px;
    }
  }
}
</style>
