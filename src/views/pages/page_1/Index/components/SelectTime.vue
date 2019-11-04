<template>
  <div class="select-time">
    <div class="time-select" @click="show = true">
      <div class="time">
        <div class="start" :style="{ color: value ? '#333333' : '#999999' }">
          {{ value || "开始时间" }}
        </div>
      </div>
      <div class="time-icon">
        <van-icon name="notes-o" size="1.125rem" color="#C7C7C7" />
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :max-date="maxDate"
        @confirm="timeConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "selectTime",
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      value: "",
      value1: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "启用", value: 1 },
        { text: "停用", value: 2 }
      ],
      show: false,
      maxDate: new Date(),
      currentDate: new Date()
    };
  },
  methods: {
    timeConfirm(value) {
      let date = dayjs(value).format("YYYY-MM-DD");
      this.show = false;
      this.value = date;
    }
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>
<style lang="scss">
.select-time {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time-select {
    width: 100%;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    border: 1px solid rgba(229, 229, 229, 1);
    .time {
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .start {
        font-size: 24px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 33px;
      }
    }
    .time-icon {
      width: 80px;
      height: 100%;
      border-left: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
