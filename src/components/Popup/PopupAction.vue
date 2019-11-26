<template>
  <van-popup v-model="vm_showAction" position="bottom" class="action" @close="vm_closeAction">
    <button @click="vm_saveData">提交</button>
    <button @click="vm_closeAction">取消</button>
  </van-popup>
</template>

<script>
export default {
  props: {
    isShowAction: Boolean,
    saveData: Function,
  },
  model: {
    prop: 'isShowAction',
    event: 'change'
  },
  data() {
    return {
      vm_showAction: this.isShowAction
    }
  },
  methods: {
    vm_saveData() {
      this.saveData()
    },
    vm_closeAction() {
      this.$emit('change', false)
    },
  },
  watch: {
    isShowAction(res) {
      this.vm_showAction = res
    }
  }
}
</script>

<style lang="scss" scoped>
.action {
  padding-left: 30px;
  padding-right: 30px;
  background-color: transparent;
  button {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
    background-color: white;
    border: none;
    border-radius: 30px;
    color: rgb(0, 118, 255);
    font-size: 35px;
  }
}
</style>