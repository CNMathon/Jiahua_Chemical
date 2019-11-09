<template>
  <div class="cell" :class="[border ? 'border' : '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell-sheet"></div>
    <div>
      <van-icon name="search" color="rgba(153, 153, 153, 1)" />
    </div>
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
    return {};
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
  .cell-sheet {
    width: 520px;
    margin-left: 10px;
    height: 64px;
    padding: 0 20px;
    font-size: 24px;
    line-height: 64px;
    color: rgba(153, 153, 153, 1);
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
