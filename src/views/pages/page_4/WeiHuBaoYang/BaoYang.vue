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
    <div class="content">
      <div class="status-title van-hairline--bottom">任务状态（待处理）</div>
      <cell-value title="计划性检修名称" value="名称"></cell-value>
      <cell-value title="空间设备位号" value="12345566"></cell-value>
      <cell-value title="空间设备名称" value="名称"></cell-value>
      <cell-value title="所属分厂" value="名称"></cell-value>
      <cell-value title="执行岗位" value="名称"></cell-value>
      <cell-value title="定期工作类型" value="名称"></cell-value>
      <cell-textarea
        disabled
        title="作业内容"
        placeholder="请输入作业内容"
      ></cell-textarea>
      <cell-value title="任务生成时间" value="名称"></cell-value>
      <cell-value title="执行时间段" value="名称" :border="false"></cell-value>
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
  name: "ji_hua_xing_zhi_xing",
  mixins: [mixin],
  data() {
    return {
      showSheet: false,
      actions: [{ name: "申请变更", index: 0 }, { name: "执行任务", index: 1 }]
    };
  },
  methods: {
    onClickRight() {
      this.showSheet = true;
    },
    onCancel() {
      this.showSheet = false;
    },
    onSelect(e) {
      if (e.index === 0) {
        this.$router.push({ path: `../shen_qing_bian_geng/${0}` });
      }
      if (e.index === 1) {
        this.$router.push({
          path: `../bao_yang_zhi_xing/${0}`
        });
      }
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
