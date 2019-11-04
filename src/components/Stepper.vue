<template>
  <div class="stepper">
    <div class="action plus" @click="value++"></div>
    <div class="input">
      <input type="number" v-model="value" />
    </div>
    <div class="action min" @click="value > 1 && value--"></div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {},
  data() {
    return {
      value: 1
    };
  },
  watch: {
    value() {
      this.value = this.value < 0 ? 1 : Number(this.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stepper {
  width: 138px;
  height: 33px;
  display: flex;
  align-items: center;
  .action {
    width: 28px;
    height: 28px;
    border: 2px solid #ffffff;
    border-radius: 50%;
  }
  .plus {
    position: relative;
  }
  .plus::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: currentColor;
    content: "";
    width: 14px;
    height: 1px;
  }
  .plus::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: currentColor;
    content: "";
    width: 1px;
    height: 14px;
  }
  .min {
    position: relative;
  }
  .min::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: currentColor;
    content: "";
    width: 13px;
    height: 1px;
  }
  .input {
    width: 82px;
    height: 33px;
    input {
      width: 82px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background-color: transparent;
      border: none;
      //   border-bottom: 1px solid #ffffff;
    }
  }
}
</style>
