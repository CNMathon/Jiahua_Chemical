<template>
  <div class="cell" :class="[border ? 'border' : '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="time start" @click="showStartTime = true">点击选择开始时间</div>
    <div class="line"></div>
    <div class="time end" @click="showEndTime = true">点击选择结束时间</div>
    <van-popup position="bottom" v-model="showStartTime">
      <van-datetime-picker
        v-model="startTime"
        type="datetime"
        :max-date="endTime || new Date()"
        @cancel="showStartTime = false"
        @confirm="showStartTime = false"
      />
    </van-popup>
    <van-popup position="bottom" v-model="showEndTime">
      <van-datetime-picker
        v-model="endTime"
        type="datetime"
        :min-date="new Date(2019, 10, 1) ||startTime"
        :max-date="new Date()"
        @cancel="showEndTime = false"
        @confirm="showEndTime = false"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "cell_sheet",
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showStartTime: false,
      showEndTime: false,
      startTime: "",
      endTime: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.cell {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
  .cell_title {
    flex: 1;
    font-size: 28px;
    color: #2d2c33;
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  .time {
    padding: 0 20px;
    font-size: 24px;
    line-height: 64px;
    color: rgba(153, 153, 153, 1);
  }
  .line {
    width: 30px;
    height: 1px;
    background-color: rgba(153, 153, 153, 1);
  }
}
.border {
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    width: calc(100% - 80px);
    bottom: 0;
    left: 40px;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.pop-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 100;
}
.pop {
  position: fixed;
  z-index: 999;
  background-color: #ffffff;
  max-height: 400px;
  overflow-y: scroll;
  .pop-item {
    height: 80px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
}
</style>
