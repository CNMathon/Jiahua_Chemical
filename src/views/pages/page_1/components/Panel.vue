<template>
  <div class="panel" :class="{ big: size === 'big' }">
    <div class="panel-icon-row">
      <!-- <div class="panel-icon">
        <van-icon class-prefix="iconfont" color="#DA615F" name="thermometer" size="18px" />
      </div> -->
    </div>
    <div class="panel-value" v-if="size === 'big'">
      {{ value }}
      <span>{{unit}}</span>
    </div>
    <!-- <div class="panel-value" v-else>{{ value }} {{unit}}</div> -->
    <div class="panel-value" v-else>{{ value }} {{unit}}</div>
    <div class="panel-unit">{{name || '温度'}}</div>
  </div>
</template>
<script>
export default {
  name: "panel",
  props: {
    type: String,
    size: {
      type: String,
      default: "min"
    },
    name: String,
    value: String,
    unit: String
  },
  data() {
    return {
      // value: Math.round(Math.random() * 200)
    };
  }
};
</script>
<style lang="scss" scoped>
.panel {
  width: 164px;
  height: 189px;
  box-sizing: border-box;
  padding: 12px;
  background: rgba(96, 150, 248, 1);
  border-radius: 16px;
  .panel-icon-row {
    .panel-icon {
      width: 49px;
      height: 49px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
    }
  }
  .panel-value {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 62px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .panel-unit {
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.big {
  width: 210px;
  height: 190px;
  padding: 20px;
  .panel-value {
    font-size: 40px;
    font-weight: 500;
    line-height: 100px;
    span {
      font-size: 30px;
    }
  }
  .panel-unit {
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }
}
</style>
