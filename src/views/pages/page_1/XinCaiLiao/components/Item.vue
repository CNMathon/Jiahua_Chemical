<template>
  <div class="guolu">
    <div class="value title">{{info.title}}</div>
    <div class="values name">{{info.name}}</div>
    <div class="values key">{{info.key}}</div>
    <div class="number">
      {{info.value}}
      <div class="unit">{{info.unit}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "guoLu",
  props: {
    info: Object
  }
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
  .title {
    width: 20%;
  }
  .key{
    text-align: right;
  }
  .name {
    width: 25%;
  }
  .value,
  .values {
    // flex: 1;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .values {
    // flex: 2;
    text-align: center;
  }
  .number {
    font-size: 32px;
    font-weight: 500;
    width: 15%;
    text-align: right;
    color: rgba(255, 255, 255, 1);
    .unit {
      font-size: 28px;
    }
  }
}
</style>
