<template>
  <div class="guolu">
    <div class="number">{{info.name}}</div>
    <div class="value">
      {{info.so2}}
      <div class="unit">mg/Nm³</div>
    </div>
    <div class="value">
      {{info.nox}}
      <div class="unit">mg/Nm³</div>
    </div>
    <div class="value">
      {{info.yanchen}}
      <div class="unit">mg/Nm³</div>
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
  .number {
    font-size: 28px;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
  }
  .value {
    font-size: 40px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
    text-align: center;
    .unit {
      font-size: 26px;
    }
  }
}
</style>
