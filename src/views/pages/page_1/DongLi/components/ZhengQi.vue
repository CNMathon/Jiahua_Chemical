<template>
  <div class="guolu">
    <div class="number">4653213</div>
    <div class="value">
      155
      <span>kWh</span>
    </div>
    <div class="proportion">16.44</div>
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
    span {
      font-size: 28px;
    }
  }
  .proportion {
    font-size: 34px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
