<template>
  <div class="cell">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_value" @click="pickerShow = true">
      {{ text || "点击选择" }}
    </div>
    <van-icon name="arrow" />
    <!-- 时间选择 -->
    <van-popup v-model="pickerShow" position="bottom">
      <van-picker
        show-toolbar
        :title="title"
        :columns="columns"
        @cancel="onMaterialCancel"
        @confirm="onMaterialConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "cell_input",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array
    }
  },
  data() {
    return {
      value: "",
      text: "",
      pickerShow: false
    };
  },
  methods: {
    // 确认选择
    onMaterialConfirm(value, index) {
      this.pickerShow = false;
      this.text = value;
      this.value = index;
    },
    // 取消选择
    onMaterialCancel() {
      this.pickerShow = false;
    }
  },
  watch: {
    value() {
      this.$emit("input", this.value + 1);
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
