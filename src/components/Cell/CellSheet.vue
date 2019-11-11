<template>
  <div class="cell" :class="[border ? 'border' : '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell-sheet" @click="selectShow()">
      <span class="cell-sheet__text">{{ value || "请选择" }}</span>
      <van-icon name="arrow-down" color="#C7C7C7" />
    </div>
    <van-action-sheet v-model="showSheet" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
export default {
  name: "cell_sheet",
  props: {
    title: String,
    defaultIndex: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: "",
      showSheet: false
    };
  },
  created() {
    this.value = this.actions[this.defaultIndex].name;
  },
  methods: {
    selectShow() {
      if (this.disable) return;
      this.showSheet = true;
    },
    onSelect(e) {
      this.value = e.name;
      this.showSheet = false;
      this.$emit("select", e);
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
  .cell-sheet {
    width: 520px;
    margin-left: 10px;
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid rgba(229, 229, 229, 1);
    &__text {
      font-size: 24px;
      line-height: 64px;
      color: rgba(153, 153, 153, 1);
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
</style>
