<template>
  <div class="confirm_item BGblue" >
    <div class="confirm_item_content">
      <slot></slot>
    </div>
    <!-- v-model="localChecked" -->
    <div class="confirm_item_check success">
      <van-checkbox  :value="localChecked"  @click="showSignature" checked-color="#07c160"  :disabled="disable"></van-checkbox>
    </div>
    <div class="confirm_item_signature" v-if="img">
      <van-image width="100%" height="100%" fit="scale-down" :src="img" />
    </div>
  </div>
</template>
<script>
import { business } from "@/mixin/business";
export default {
  mixins: [business],
  name: "signature",
  data() {
    return {
      localChecked: this.checked,
      tempChecked: Boolean
    };
  },
  props: {
    img: {
      type: String,
      default: ""
    },
    checked: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
  },
  watch: {
    checked (val) {
      console.log('checked new val', val);
      this.localChecked = val;
    },
  },
  methods: {
    showSignature($event) {
      console.log('$event', $event);
      if (this.disable) {return}
      if ($event) {
        this.changeChecked();
      } else {
        this.cancel();
      }
    },
    changeChecked() {
      this.$emit("checked");
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="scss" scoped>
.BGblue {
  background: rgba(96, 150, 248, 1);
}
.confirm_item {
  width: 100%;
  min-height: 126px;
  padding: 30px 30px 30px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  .confirm_item_content {
    width: 392px;
    height: auto;
    font-size: 24px;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
    margin-right: 39px;
    display: flex;
    flex-wrap: wrap;
    .seclct_tag {
      height: 34px;
      padding: 0 15px;
      font-size: 22px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 34px;
      background-color: #ffffff;
      margin-right: 10px;
      margin-bottom: 5px;
      border-radius: 5px;
    }
    .is_select {
      color: rgba(255, 255, 255, 1);
      background-color: #1fc41d;
    }
    .textarea {
      width: 392px;
      height: 170px;
      background: rgba(255, 255, 255, 1);
      border: none;
    }
  }
  .confirm_item_check {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6096f8;
    background: rgba(255, 255, 255, 1);
  }
  .error {
    color: #ffffff;
    background: #e45454;
  }
  .confirm_item_signature {
    width: 130px;
    height: 66px;
    background: rgba(255, 255, 255, 1);
    margin-left: auto;
  }
  .content_lang_input {
    width: 100%;
    input {
      width: 100%;
      line-height: 1.03125rem;
      text-align: center;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ffffff;
    }
  }
}
</style>
