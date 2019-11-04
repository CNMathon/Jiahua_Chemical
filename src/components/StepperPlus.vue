<template>
  <div id="app">
    <div class="operation" @click="onClickMinus">-</div>
    <input class="input" v-model="modelValue" :disabled="modelDisabled"/>
    <div class="operation" @click="onClickPlus">+</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelMin: null,
      modelMax: null,
      modelValue: null,
      modelStep: 1,
      modelDisabled: true,
      isError: false // 是否存在Error
    };
  },

  props: {
    min: Number, // 最小值
    max: Number, // 最大值
    value: Number, // 初始值
    step: Number, // 步长
    disabled: Boolean // 是否禁用输入框
  },

  created() {
    // 注意：errorThrow() 和 initUserSetting() 有先后执行顺序，不可替换
    // 错误处理
    this.errorThrow();
    // 应用用户设定
    this.initUserSetting();
  },
  methods: {
    // 加运算
    onClickPlus() {
      // console.log(`最大值 = ${this.modelMax}`)
      // console.log(`开始值 = ${this.modelValue}`)
      // console.log(`步长 = ${this.modelStep}`)
      // console.log(`结束值 = ${this.modelValue + this.modelStep}`)
      // console.log(this.isError)
      if (this.isError == false && (this.modelMax == null || this.modelValue + this.modelStep <= this.modelMax)) {
        console.log("+");
        this.modelValue += this.modelStep;
        this.$emit('getNewValue', this.modelValue)
      }
    },
    // 减运算
    onClickMinus() {
      // console.log(this.modelMin)
      // console.log(this.modelValue)
      // console.log(this.modelStep)
      // console.log(this.modelStep)
      if (this.isError == false && (this.modelMin == null || this.modelValue - this.modelStep >= this.modelMin)) {
        console.log("-");
        this.modelValue -= this.modelStep;
        this.$emit('getNewValue', this.modelValue)

      }
    },
    // 应用用户设定
    initUserSetting() {
      // 判断是否设置 value 值
      if (this.value != undefined) {
        this.modelValue = this.value;
      }
      // 判断是否设置 max 值
      if (this.max != undefined) {
        this.modelMax = this.max;
      }
      // 判断是否设置 min 值
      if (this.min != undefined) {
        this.modelMin = this.min;
      }
      // 判断是否设置 step 值
      if (this.step != undefined) {
        this.modelStep = this.step;
      }
      // 判断是否设置 disabled 值
      if (this.disabled != undefined) {
        this.modelDisabled = this.disabled;
      }
    },
    // 错误处理
    errorThrow() {
      try {
        // 判断设定的 value 值是否为 max 和 min 范围内
        // （防止用户设置的 value 默认值与用户设置的 min 或 max 值冲突的情况）
        if (this.value < this.min || this.value > this.max) {
          this.modelValue = "";
          this.isError = true;
          throw `[Stepper]: The value of the "value" entered is less than the supplied "min" value or greater than the supplied "max" value.`;
        }
        if (this.value == null) {
          this.isError = true;
          throw `[Stepper]: The Item of "value" is required and cannot be empty.`;          
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: inline-block;
}

.input {
  display: inline-block;
  width: 35px;
  color: black;
  text-align: center;
}

.operation {
  display: inline-block;
  border: 1px solid;
  // padding: 10px;
  line-height: 0.94rem;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
}
</style>
