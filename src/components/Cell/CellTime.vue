<template>
  <div class="cell" :class="[border ? 'border' : '',disable? 'disable': '',noPadding ? 'cell-no-padding' : '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_value" @click="showTime()">{{ showText() }}</div>
    <van-icon name="arrow" />
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        ref="van-datetime-picker"
        v-model="selectTime"
        :type="type"
        @cancel="timeShow = false"
        @confirm="onTimeConfirm"
        :min-date="now"
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
    value: "",
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "datetime"
    },
    minTime: {
      type: String,
      default: ''
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    startTime:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      values: "",
      timeShow: false,
      now:new Date(),
      minDate: this.minTime,
      selectTime: new Date(),
      pickerTime: ""
    };
  },
  methods: {
    showTime() {
      console.log(new Date(this.startTime).getTime())
      console.log(this.disable);
      if (!this.disable) {
        console.log(this.timeShow);
        this.timeShow = true;
      }
    },
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
      console.log(1)
      if(this.startTime){
        console.log(2)
        if(val.getTime()/1000-new Date(this.startTime).getTime()/1000>28800){
          console.log(val.getTime());
          this.value = val;
          this.values = val;
          this.timeShow = false;
        }else{
          this.$notify("结束时间必须大于开始时间8小时");
        }
      }else{
          this.value = val;
          this.values = val;
          this.timeShow = false;
      }
      
    },
    showText() {
      console.log(
        this.value
          ? this.$dayjs(this.value).format("YYYY-MM-DD HH:mm")
          : "点击选择"
      );
      if (this.type == 'datetime') {
        return this.value
          ? this.$dayjs(this.value).format("YYYY-MM-DD HH:mm")
          : "点击选择";
      }
      if (this.type == 'date') {
        return this.value
          ? this.$dayjs(this.value).format("YYYY-MM-DD")
          : "点击选择";
      }
    }
  },
  watch: {
    values() {
      this.$emit(
        "input",
        this.$dayjs(this.value || this.values).format("YYYY-MM-DD HH:mm:ss")
      );
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
.disable {
  background-color: #f5f5f5 !important;
}
</style>
