<template>
  <div class="main">
    <van-sticky>
      <van-nav-bar
        title="任务详细"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
        @click-right="onClickRight"
      >
        <div slot="right">操作</div>
      </van-nav-bar>
    </van-sticky>
    <div class="content disabled">
      <div class="status-title van-hairline--bottom">任务状态（待处理）</div>
      <cell-value title="润滑任务" value="名称"></cell-value>
      <cell-value title="空间设备位号" value="12345566"></cell-value>
      <cell-value title="空间设备名称" value="名称"></cell-value>
      <cell-value title="所属分厂" value="名称"></cell-value>
      <cell-value title="执行岗位" value="名称"></cell-value>
      <cell-value title="润滑点数" value="名称"></cell-value>
      <cell-value title="油品型号" value="名称"></cell-value>
      <cell-value title="润滑方式" value="名称"></cell-value>
      <cell-value title="标准油量（L）" value="名称"></cell-value>
      <cell-value title="润滑天数（天）" value="名称"></cell-value>
      <cell-value title="执行时间段" value="名称" :border="false"></cell-value>
    </div>
    <div class="content">
      <cell-value title="实际加油量" value="名称"></cell-value>
      <cell-value title="执行时间" value="12345566"></cell-value>
      <cell-value title="执行人" value="名称"></cell-value>
      <cell-textarea
        title="执行说明"
        placeholder="执行说明"
        required
      ></cell-textarea>
      <cell-textarea
        title="备注"
        placeholder="备注内容"
        required
        :border="false"
      ></cell-textarea>
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
  name: "ji_hua_xing_zhi_xing_fei_gong_dan",
  mixins: [mixin],
  data() {
    return {
      showSheet: false,
      actions: [{ name: "提交", index: 0 }]
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
.disabled {
  background: rgba(249, 249, 249, 1);
}
.disabled >>> .cell {
  background: rgba(249, 249, 249, 1);
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
