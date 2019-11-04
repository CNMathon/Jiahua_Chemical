<template>
  <div class="cell">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_value" @click="timeShow = true">
      {{ value || "点击选择" }}
    </div>
    <van-icon name="arrow" />
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        ref="van-datetime-picker"
        v-model="selectTime"
        type="datetime"
        :min-date="new Date()"
        @cancel="timeShow = false"
        @confirm="onTimeConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "cell_time",
  model: {
    prop: "value",
    event: "input",
    minTime: String,
    maxTime: String
  },
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    }
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
    // 补零
    addZero: function(str) {
      if (Number(str) < 10) {
        return ("0" + str).substr(str.length);
      } else {
        return str;
      }
    },
    // 确认时间选择
    onTimeConfirm(val) {
      let date = new Date(val);
      let year = date.getFullYear();
      let month = this.addZero(date.getMonth() + 1);
      let day = this.addZero(date.getDate());
      let H = this.addZero(date.getHours());
      let M = this.addZero(date.getMinutes());
      this.timeShow = false;
      this.value = `${year}-${month}-${day} ${H}:${M}`;
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
.cell {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;
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
  .cell_value {
    flex: 1;
    font-size: 28px;
    text-align: right;
    color: #888888;
    line-height: 40px;
  }
  .van-icon-arrow {
    display: flex;
    align-content: center;
    justify-content: center;
    color: #888888;
  }
  .cell::after {
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
</style>
