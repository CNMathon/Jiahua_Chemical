<template>
  <div class="guolu" @click="jumpTo(`/page_1/tagsThistory?tagsNameShow=${desc}&tagsName=${id}&unit=${unit}`)">
    <div class="values desc">{{desc}}</div>
    <div class="values id">{{id}}</div>
    <div class="number value">
      <div>{{value}}</div>
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
    value: String,
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
  .desc {
    text-align: left;
    width: 30%;
  }
  .id {
    width: 40%;
    text-align: center;
  }
  .value {
    width: 30%;
  }
  .value,
  .values {
    // flex: 1;
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .number {
    font-size: 40px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: right;
    .unit {
      font-size: 28px;
      text-align: right;
    }
  }
}
</style>
