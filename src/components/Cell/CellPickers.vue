<template>
  <div class="template-picker" :class="[disable? 'disable': '']" @click="showPicker()">
    <div class="name">{{ showText() }}</div>
    <van-icon class-prefix="iconfont" name="xuanze" />
    <van-popup v-model="pickerShow" position="bottom" @click.stop>
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
    event: "change"
  },
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array
    },
    keyType: String,
    disable: {
      type: Boolean,
      default: false
    },
    value: null
  },
  data() {
    return {
      text: "",
      values: Number,
      pickerShow: false
    };
  },
  methods: {
    // 显示选择
    showPicker() {
      if (this.disable) return;
      this.pickerShow = true;
    },
    // 确认选择
    onMaterialConfirm(value, index) {
      this.pickerShow = false;
      this.values = index;
      this.$emit("change", this.values + 1);
    },
    // 取消选择
    onMaterialCancel() {
      this.pickerShow = false;
    },
    showText() {
      return this.columns[Number(this.value) - 1] || "点击选择";
    }
  }
};
</script>
<style lang="scss" scoped>
.template-picker {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  color: #2d2c33;
  line-height: 40px;
  padding: 10px;
  box-sizing: border-box;
  margin-right: auto;
  left: 8px;
  border-radius: 10px;
  border: 1px solid rgba(187, 187, 187, 1);
}
.disable {
  background-color: #f5f5f5 !important;
}
</style>
