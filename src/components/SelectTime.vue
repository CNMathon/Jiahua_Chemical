<template>
  <div class="select-time">
    <div class="value" @click="timeShow = true">{{ value || title }}</div>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        ref="van-datetime-picker"
        v-model="selectTime"
        :type="type"
        :mim-date="minTime"
        :max-date="maxTime"
        @cancel="timeShow = false"
        @confirm="onTimeConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "select_time",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    type: {
      type: String,
      default: "datetime"
    },
    title: String,
    minTime: Date,
    maxTime: Date
  },
  data() {
    return {
      value: "",
      timeShow: false,
      selectTime: new Date(),
      pickerTime: ""
    };
  },
  methods: {
    // 确认时间选择
    onTimeConfirm(val) {
      this.timeShow = false;
      if (this.type === "datetime") {
        this.value = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      }
      if (this.type === "year-month") {
        this.value = dayjs(val).format("YYYY-MM");
      }
      if (this.type === "date") {
        this.value = dayjs(val).format("YYYY-MM-DD");
      }
    }
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.select-time {
  .value {
    flex: 1;
    font-size: 28px;
    text-align: center;
    color: #888888;
    line-height: 40px;
  }
}
</style>
