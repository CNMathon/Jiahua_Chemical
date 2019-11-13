<template>
  <div class="cell" :class="[border ? 'border' : '',disable? 'disable': '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_other">
      <textarea
        ref="cell_textarea"
        class="cell_textarea"
        cols="30"
        rows="10"
        type="text"
        :placeholder="placeholder"
        :value="value"
        :disabled="disable"
        @input="$emit('input', $event.target.value)"
      ></textarea>
    </div>
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
    border: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    value: String,
    placeholder: String
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
  .cell_title {
    width: 50%;
    font-size: 28px;
    font-weight: 400;
    color: rgba(45, 44, 51, 1);
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  // 多行输入框
  .cell_other {
    width: 100%;
    margin-top: 15px;
    // 多行文本框
    .cell_textarea {
      padding: 20px;
      width: 100%;
      height: 171px;
      border-radius: 8px;
      border: 1px solid rgba(229, 229, 229, 1);
      font-size: 24px;
      font-weight: 400;
      color: #2d2c33;
      line-height: 33px;
    }
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
