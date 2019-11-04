<template>
  <div class="main">
    <van-sticky>
      <van-nav-bar
        title="申请变更"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
        @click-right="onClickRight"
      >
        <div slot="right">操作</div>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <cell-sheet
        title="申请变更"
        :actions="sheetActions"
        :default-index="selectSheet"
        @select="onSheetSelect"
        required
      ></cell-sheet>
      <cell-textarea
        title="申请原因"
        placeholder="申请原因"
        :border="selectSheet === 0"
        required
      ></cell-textarea>
      <cell-value
        title="执行时间"
        value="2019.03.23"
        v-if="selectSheet === 0"
      ></cell-value>
      <cell-time
        title="申请时间"
        v-model="time"
        required
        :border="false"
        v-if="selectSheet === 0"
      ></cell-time>
    </div>
    <van-action-sheet
      v-model="showSheet"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "ji_hua_xing_zhi_xing_bian_geng",
  mixins: [mixin],
  data() {
    return {
      showSheet: false,
      actions: [{ name: "提交" }],
      time: "",
      selectSheet: 0,
      sheetActions: [{ name: "延期", index: 0 }, { name: "取消", index: 1 }]
    };
  },
  methods: {
    onClickRight() {
      this.showSheet = true;
    },
    onCancel() {
      this.showSheet = false;
    },
    onSelect() {
      let _this = this;
      this.showSheet = false;
      this.$Toast.success({
        message: "提交成功",
        onClose() {
          setTimeout(() => {
            _this.pageBack();
          }, 500);
        }
      });
    },
    onSheetSelect(e) {
      console.log("e: ", e);
      this.selectSheet = e.index;
    }
  }
};
</script>
<style scoped>
.content {
  margin-top: 20px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 0;
}
.status-title {
  width: calc(100% - 80px);
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 20px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(224, 32, 32, 1);
  line-height: 48px;
}
</style>
