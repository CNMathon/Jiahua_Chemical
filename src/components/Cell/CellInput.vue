<template>
  <div class="cell" :class="[border ? 'border' : '',disable? 'disable': '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_input">
      <input
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disable"
        ref="cell_input"
        :value="locaValue"
        @input="$emit('input', $event.target.value)"
      />
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "cell_input",
  props: {
    title: String,
    inputType: {
      type: String,
      default: "text"
    },
    required: {
      type: Boolean,
      default: false
    },
    value: String || Number,
    placeholder: String,
    border: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      locaValue: this.value
    }
  },
  watch: {
    value (val) {
      this.locaValue = val;
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
  font-size: 28px;
  color: #666666;
  .cell_title {
    width: 50%;
    font-size: 28px;
    font-weight: 400;
    color: rgba(45, 44, 51, 1);
    .required {
      color: #cf2323;
    }
  }
  // 输入框
  .cell_input {
    width: 50%;
    display: flex;
    align-items: center;
    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: transparent;
      border: 0;
      resize: none;
      text-align: right;
      font-size: 28px;
      color: #2d2c33;
    }
  }
}
.border {
  position: relative;
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
