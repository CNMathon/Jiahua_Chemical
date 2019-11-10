<template>
  <div class="cell" :class="[border ? 'border' : '',disable? 'disable': '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_value" v-if="value">{{ value }}</div>
    <div class="cell_value" v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "cell_input",
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    value: String || Number,
    disable: {
      type: Boolean,
      default: false
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
  .cell_title {
    width: 50%;
    font-size: 28px;
    color: rgba(45, 44, 51, 1);
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  .cell_value {
    width: 50%;
    font-size: 28px;
    text-align: right;
    color: rgba(45, 44, 51, 1);
    line-height: 40px;
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
