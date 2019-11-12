<template>
  <div>
    <div class="item">
      <div class="guolu">
        <div class="value">级别名称</div>
        <div class="value">甲酯进氢化温度</div>
        <div class="number">
          65
          <div class="unit">°C</div>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="guolu">
        <div class="value">级别名称</div>
        <div class="value">氢化反应器进口温度</div>
        <div class="number">
          65
          <div class="unit">Mpa</div>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="guolu">
        <div class="value">级别名称</div>
        <div class="value">氢化反应器温差</div>
        <div class="number">
          65
          <div class="unit">L/h</div>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="guolu">
        <div class="value">级别名称</div>
        <div class="value">L1201进口压力</div>
        <div class="number">
          65
          <div class="unit">mg/m<sup>3</sup></div>
        </div>
      </div>
    </div>

  </div>
  
  
</template>
<script>
export default {
  name: "guoLu"
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
  .value {
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .number {
    font-size: 40px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    .unit {
      font-size: 28px;
    }
  }
}
.item {
  margin-bottom: 10px;
}
</style>
